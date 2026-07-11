const API_CHAMADOS = 'http://localhost:8010/chamados/listarTecnicoPorID';

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const statusFiltro = urlParams.get('status');
    const prioridadeFiltro = urlParams.get('prioridade');
    const selectCriterio = document.getElementById('filtroCriterio');

    if (statusFiltro === 'aberto') {
        selectCriterio.value = 'aberto';
    } else if (prioridadeFiltro === 'alta') {
        selectCriterio.value = 'alta';
    }

    listarChamados();

    selectCriterio.addEventListener('change', listarChamados);
    document.getElementById('filtroBusca').addEventListener('input', filtrarLista);
    document.getElementById('btnSalvarAlteracoes').addEventListener('click', atualizarChamado);
});

let listaChamadosLocal = [];

async function listarChamados() {
    const container = document.getElementById('listaChamadosContainer');
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuarioLogado || !usuarioLogado.id) {
        container.innerHTML = '<div class="text-center text-danger p-4">Erro: Usuário técnico não autenticado.</div>';
        return;
    }

    const response = await fetch(`${API_CHAMADOS}/${usuarioLogado.id}`);
    
    if (!response.ok) {
        container.innerHTML = '<div class="text-center text-muted p-4">Nenhum chamado encontrado para você.</div>';
        return;
    }

    listaChamadosLocal = await response.json();
    filtrarLista();
}

function filtrarLista() {
    const container = document.getElementById('listaChamadosContainer');
    const criterio = document.getElementById('filtroCriterio').value;
    const busca = document.getElementById('filtroBusca').value.toLowerCase().trim();

    let chamadosFiltrados = listaChamadosLocal;

    if (criterio === 'aberto') {
        chamadosFiltrados = chamadosFiltrados.filter(c => c.status !== 'FINALIZADO');
    } else if (criterio === 'finalizado') {
        chamadosFiltrados = chamadosFiltrados.filter(c => c.status === 'FINALIZADO');
    } else if (criterio === 'alta') {
        chamadosFiltrados = chamadosFiltrados.filter(c => c.prioridade === 'ALTA' || c.prioridade === 'HIGH');
    }

    if (busca) {
        chamadosFiltrados = chamadosFiltrados.filter(c => 
            (c.id && c.id.toString().includes(busca)) ||
            (c.titulo && c.titulo.toLowerCase().includes(busca)) ||
            (c.cliente && c.cliente.nome && c.cliente.nome.toLowerCase().includes(busca))
        );
    }

    if (chamadosFiltrados.length === 0) {
        container.innerHTML = '<div class="text-center text-muted p-4">Nenhum chamado corresponde aos filtros aplicados.</div>';
        return;
    }

    container.innerHTML = '';
    chamadosFiltrados.forEach(chamado => {
        const badgePrioridade = chamado.prioridade === 'ALTA' || chamado.prioridade === 'HIGH' ? 'bg-danger text-white' : 'bg-secondary text-white';
        const badgeStatus = chamado.status === 'FINALIZADO' ? 'bg-success text-white' : 'bg-warning text-dark';
        const clienteNome = chamado.cliente ? chamado.cliente.nome : 'Não informado';

        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'list-group-item list-group-item-action border rounded-3 p-3 text-start mb-2';
        item.onclick = () => exibirModalChamado(chamado);

        item.innerHTML = `
            <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                <div>
                    <span class="badge text-bg-light border text-secondary mb-1">#${chamado.id}</span>
                    <h3 class="h6 mb-1 fw-semibold text-dark-blue">${chamado.titulo}</h3>
                </div>
                <div class="d-flex gap-1">
                    <span class="badge ${badgePrioridade}">${chamado.prioridade}</span>
                    <span class="badge ${badgeStatus}">${chamado.status}</span>
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center text-muted small mt-2 pt-2 border-top border-light">
                <span><i class="fa-regular fa-user me-1"></i> Cliente: <strong>${clienteNome}</strong></span>
            </div>
        `;
        container.appendChild(item);
    });
}

let chamadoSelecionadoId = null;

function exibirModalChamado(chamado) {
    chamadoSelecionadoId = chamado.id;
    
    document.getElementById('modalIdChamado').innerText = `#${chamado.id}`;
    document.getElementById('modalTitulo').innerText = chamado.titulo || '---';
    document.getElementById('modalDescricao').innerText = chamado.descricao || '---';
    document.getElementById('modalCliente').innerText = chamado.cliente ? chamado.cliente.nome : 'Não informado';
    document.getElementById('modalEquipamento').innerText = chamado.equipamento ? `${chamado.equipamento.fabricante} ${chamado.equipamento.modelo}` : 'Não informado';
    
    const prioridadeElement = document.getElementById('modalPrioridade');
    prioridadeElement.innerText = chamado.prioridade;
    prioridadeElement.className = chamado.prioridade === 'ALTA' || chamado.prioridade === 'HIGH' ? 'badge bg-danger' : 'badge bg-secondary';

    const statusElement = document.getElementById('modalStatus');
    statusElement.innerText = chamado.status;
    statusElement.className = chamado.status === 'FINALIZADO' ? 'badge bg-success' : 'badge bg-warning text-dark';

    document.getElementById('atualizarStatus').value = chamado.status === 'FINALIZADO' ? 'FINALIZADO' : 'EM_ANDAMENTO';

    const modal = new bootstrap.Modal(document.getElementById('chamadoModal'));
    modal.show();
}

async function atualizarChamado() {
    if (!chamadoSelecionadoId) return;

    const novoStatus = document.getElementById('atualizarStatus').value;

    const response = await fetch(`${API_CHAMADOS}/atualizarStatus/${chamadoSelecionadoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: novoStatus })
    });

    if (response.ok) {
        const modalElement = document.getElementById('chamadoModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }
        listarChamados();
    } else {
        alert('Erro ao atualizar o status do chamado.');
    }
}