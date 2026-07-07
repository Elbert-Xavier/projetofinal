const API_CHAMADOS_LISTAR = 'http://localhost:8000/chamados/listarTodos';
const API_CHAMADOS_FILTRAR = 'http://localhost:8000/chamados/filtrar'; 
const API_CHAMADOS_ATRIBUIR = 'http://localhost:8000/chamados/atribuir';
const API_CLIENTES_LISTAR = 'http://localhost:8000/clientes/listarTodos';
const API_TECNICOS_LISTAR = 'http://localhost:8000/usuarios/listarTodos'; 

let chamadosLocaiscache = [];

document.addEventListener('DOMContentLoaded', function() {
    carregarClientesFiltro();
    carregarTecnicosModal();
    carregarTodosOsChamados();

    const formFiltro = document.querySelector('.filter-bar');
    if (formFiltro) {
        formFiltro.addEventListener('submit', executingFiltragemHistorial);
    }

    const formModal = document.querySelector('.modal-form');
    if (formModal) {
        formModal.addEventListener('submit', salvarTriagemChamado);
    }
});

function carregarTodosOsChamados() {
    fetch(API_CHAMADOS_LISTAR)
        .then(response => {
            if (response.ok) return response.json();
        })
        .then(data => {
            if (data) {
                chamadosLocaiscache = data;
                renderizarTabelaTriagem(data);
                renderizarTabelaHistorico(data);
            }
        });
}

function carregarClientesFiltro() {
    const select = document.getElementById('filterCliente');
    if (!select) return;

    fetch(API_CLIENTES_LISTAR)
        .then(response => {
            if (response.ok) return response.json();
        })
        .then(clientes => {
            if (clientes) {
                select.innerHTML = '<option value="">Todos os Clientes</option>';
                clientes.forEach(c => {
                    const option = document.createElement('option');
                    option.value = c.id;
                    option.textContent = c.nomeFantasia || c.razaoSocial;
                    select.appendChild(option);
                });
            }
        });
}

function carregarTecnicosModal() {
    const select = document.getElementById('modalDetalheTecnico');
    if (!select) return;

    fetch(API_TECNICOS_LISTAR)
        .then(response => {
            if (response.ok) return response.json();
        })
        .then(usuarios => {
            if (usuarios) {
                select.innerHTML = '<option value="" disabled selected>Selecione o profissional para a rota</option>';
                const tecnicos = usuarios.filter(u => (u.perfil && u.perfil.toUpperCase() === 'TECNICO') || (u.tipo && u.tipo.toUpperCase() === 'TECNICO'));
                tecnicos.forEach(t => {
                    const option = document.createElement('option');
                    option.value = t.id;
                    option.textContent = t.nome;
                    select.appendChild(option);
                });
            }
        });
}

function renderizarTabelaTriagem(chamados) {
    const tbody = document.getElementById('tbodyTriagem');
    if (!tbody) return;

    tbody.innerHTML = '';
    
    const pendentes = chamados.filter(c => {
        const st = (c.status || '').toUpperCase().trim();
        return st === 'EM ANALISE' || st === 'ABERTO';
    });

    if (pendentes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Nenhum chamado aguardando triagem operacional.</td></tr>';
        return;
    }

    pendentes.forEach(c => {
        const empresa = c.equipamento && c.equipamento.cliente ? (c.equipamento.cliente.nomeFantasia || c.equipamento.cliente.razaoSocial) : 'N/A';
        const equip = c.equipamento ? `${c.equipamento.tipo} ${c.equipamento.modelo}` : 'N/A';
        
        tbody.innerHTML += `
            <tr>
                <td class="font-code">#CH-${c.id}</td>
                <td class="font-medium">${empresa}</td>
                <td>${equip}</td>
                <td class="text-truncate" style="max-width: 250px;">${c.titulo || c.descricao}</td>
                <td class="text-center">
                    <button class="btn-action-view" style="border:none; cursor:pointer;" onclick="preencherEAbriModalTriagem(${c.id})">
                        <i class="fa-solid fa-clipboard-check"></i> Triar e Atribuir
                    </button>
                </td>
            </tr>
        `;
    });
}

function renderizarTabelaHistorico(chamados) {
    const tbody = document.getElementById('tbodyHistorico');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (chamados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">Nenhum chamado localizado no histórico.</td></tr>';
        return;
    }

    chamados.forEach(c => {
        const dataFmt = c.dataAbertura ? c.dataAbertura.split('-').reverse().join('/') : '-';
        const empresa = c.equipamento && c.equipamento.cliente ? (c.equipamento.cliente.nomeFantasia || c.equipamento.cliente.razaoSocial) : 'N/A';
        const tecnico = c.tecnico ? c.tecnico.nome : 'Não Atribuído';
        
        const classeUrgencia = (c.prioridade || 'BAIXA').toLowerCase();
        const classeStatus = (c.status || 'ABERTO').toLowerCase().replace(' ', '-');

        tbody.innerHTML += `
            <tr>
                <td class="text-muted">${dataFmt}</td>
                <td class="font-code">#CH-${c.id}</td>
                <td class="font-medium">${empresa}</td>
                <td>${tecnico}</td>
                <td><span class="badge-urgencia ${classeUrgencia}">${(c.prioridade || 'EM ANÁLISE').toUpperCase()}</span></td>
                <td><span class="badge-status ${classeStatus}">${c.status.toUpperCase()}</span></td>
                <td class="text-center">
                    <button class="btn-action-history-view" style="border:none; background:none; cursor:pointer;" onclick="visualizarDetalhesHistorico(${c.id})">
                        <i class="fa-solid fa-arrow-right-to-bracket"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

function preencherEAbriModalTriagem(id) {
    const chamado = chamadosLocaiscache.find(c => c.id === id);
    if (!chamado) return;

    const modal = document.getElementById('modalDetalhesChamado');
    modal.querySelector('.modal-header h2').textContent = `Chamado #CH-${chamado.id}`;
    modal.querySelector('.details-section .form-row-2-col .detail-group:nth-child(1) .detail-value-text').textContent = chamado.equipamento && chamado.equipamento.cliente ? (chamado.equipamento.cliente.razaoSocial || chamado.equipamento.cliente.nomeFantasia) : 'N/A';
    
    const dataFmt = chamado.dataAbertura ? chamado.dataAbertura.split('-').reverse().join('/') : '-';
    modal.querySelector('.details-section .form-row-2-col .detail-group:nth-child(2) .detail-value-text').innerHTML = `<i class="fa-regular fa-clock"></i> ${dataFmt}`;
    modal.querySelector('.details-section .detail-group:nth-of-type(2) .detail-value-text').textContent = chamado.equipamento ? `${chamado.equipamento.fabricante} ${chamado.equipamento.modelo}` : 'N/A';
    modal.querySelector('.details-section .detail-group:nth-of-type(3) .detail-value-text').textContent = chamado.titulo || 'Sem Título';
    modal.querySelector('.details-section .detail-description-box').textContent = chamado.descricao;

    modal.setAttribute('data-chamado-id', chamado.id);
    window.location.hash = 'modalDetalhesChamado';
}

function salvarTriagemChamado(e) {
    e.preventDefault();
    const modal = document.getElementById('modalDetalhesChamado');
    const id = modal.getAttribute('data-chamado-id');
    
    const prioridade = document.getElementById('modalDetalhePrioridade').value;
    const tecnicoId = document.getElementById('modalDetalheTecnico').value;
    const obs = document.getElementById('modalObs').value;

    const url = `${API_CHAMADOS_ATRIBUIR}/${id}?prioridade=${prioridade}&idTecnico=${tecnicoId}&orientacoes=${encodeURIComponent(obs)}`;

    fetch(url, { method: 'PUT' })
        .then(response => {
            if (response.ok) {
                alert("Chamado triado e destinado ao técnico com sucesso!");
                window.location.hash = '#';
                document.querySelector('.modal-form').reset();
                carregarTodosOsChamados();
            } else {
                alert("Erro ao realizar processamento da triagem.");
            }
        });
}

function executingFiltragemHistorial(e) {
    e.preventDefault();
    const clienteId = document.getElementById('filterCliente').value;
    const status = document.getElementById('filterStatus').value;
    const equipamento = document.getElementById('filterEquipamento').value;
    const fabricante = document.getElementById('filterFabricante').value;
    const dataInic = document.getElementById('filterDataInicio').value;
    const dataFim = document.getElementById('filterDataFim').value;

    let resultado = chamadosLocaiscache;

    if (clienteId) resultado = resultado.filter(c => c.equipamento && c.equipamento.cliente && String(c.equipamento.cliente.id) === clienteId);
    if (status) resultado = resultado.filter(c => (c.status || '').toUpperCase() === status.toUpperCase());
    if (equipamento) resultado = resultado.filter(c => c.equipamento && c.equipamento.tipo.toLowerCase().includes(equipamento.toLowerCase()));
    if (fabricante) resultado = resultado.filter(c => c.equipamento && c.equipamento.fabricante.toLowerCase().includes(fabricante.toLowerCase()));
    if (dataInic) resultado = resultado.filter(c => c.dataAbertura >= dataInic);
    if (dataFim) resultado = resultado.filter(c => c.dataAbertura <= dataFim);

    renderizarTabelaHistorico(resultado);
}

function visualizarDetalhesHistorico(id) {
    const chamado = chamadosLocaiscache.find(c => c.id === id);
    if (!chamado) return;

    const st = (chamado.status || '').toUpperCase();

    if (st === 'FINALIZADO') {
        const modal = document.getElementById('modalHistoricoFinalizado');
        modal.querySelector('.modal-header h2').textContent = `Chamado #CH-${chamado.id}`;
        modal.querySelector('.details-section-grid .detail-group:nth-child(1) .detail-value-text').textContent = chamado.equipamento && chamado.equipamento.cliente ? chamado.equipamento.cliente.razaoSocial : 'N/A';
        modal.querySelector('.details-section-grid .detail-group:nth-child(2) .detail-value-text').textContent = chamado.tecnico ? chamado.tecnico.nome : 'N/A';
        modal.querySelector('.form-row-2-col strong').textContent = chamado.equipamento ? `Equipamento: ${chamado.equipamento.tipo} ${chamado.equipamento.modelo}` : 'N/A';
        modal.querySelector('.form-row-2-col .detail-description-box').textContent = (chamado.titulo || '') + " - " + chamado.descricao;
        window.location.hash = 'modalHistoricoFinalizado';
    } else {
        const modal = document.getElementById('modalHistoricoAtribuido');
        modal.querySelector('.modal-header h2').textContent = `Chamado #CH-${chamado.id}`;
        modal.querySelector('.details-section .form-row-2-col:nth-of-type(1) .detail-group:nth-child(1) .detail-value-text').textContent = chamado.equipamento && chamado.equipamento.cliente ? chamado.equipamento.cliente.razaoSocial : 'N/A';
        modal.querySelector('.details-section .form-row-2-col:nth-of-type(2) .detail-group:nth-child(1) .detail-value-text').textContent = chamado.tecnico ? chamado.tecnico.nome : 'Não Atribuído';
        modal.querySelector('.details-section .badge-urgencia').textContent = (chamado.prioridade || 'BAIXA').toUpperCase();
        modal.querySelector('.details-section .detail-description-box').textContent = (chamado.titulo || '') + ": " + chamado.descricao;
        window.location.hash = 'modalHistoricoAtribuido';
    }
}