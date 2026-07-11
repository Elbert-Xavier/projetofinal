const API_LISTAR_CLIENTES = 'http://localhost:8010/clientes/listarTodos';
const API_PESQUISAR_CLIENTES = 'http://localhost:8010/clientes/pesquisar';
const API_PESQUISAR_EQUIPAMENTOS = 'http://localhost:8010/equipamentos/pesquisar';
const API_SALVAR_EQUIPAMENTO = 'http://localhost:8010/equipamentos/salvar';

document.addEventListener('DOMContentLoaded', async function() {
    await carregarTodosOsClientes();
    
    const btnBuscar = document.getElementById('btnBuscarCliente');
    if (btnBuscar) {
        btnBuscar.addEventListener('click', pesquisarClientes);
    }

    const inputSearch = document.getElementById('searchCliente');
    if (inputSearch) {
        inputSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                pesquisarClientes();
            }
        });
    }

    const btnFiltrarEquip = document.getElementById('btnFiltrarEquipamentos');
    if (btnFiltrarEquip) {
        btnFiltrarEquip.addEventListener('click', carregarEquipamentosDossie);
    }

    const formVincular = document.getElementById('formVincularEquipamento');
    if (formVincular) {
        formVincular.addEventListener('submit', salvarNovoEquipamento);
    }
});

async function carregarTodosOsClientes() {
    const response = await fetch(API_LISTAR_CLIENTES);
    if (response.ok) {
        const dados = await response.json();
        renderizarTabela(dados);
    } else {
        alert("Erro ao carregar a lista de clientes. Verifique o servidor.");
    }
}

async function pesquisarClientes() {
    let termoBusca = document.getElementById('searchCliente').value;

    if (/\d/.test(termoBusca)) {
        termoBusca = termoBusca.replace(/\D/g, ''); 
    }

    if (!termoBusca) {
        await carregarTodosOsClientes();
        return;
    }

    const params = new URLSearchParams();
    params.append('searchCliente', termoBusca);

    const response = await fetch(`${API_PESQUISAR_CLIENTES}?${params.toString()}`);
    if (response.ok) {
        const dados = await response.json();
        renderizarTabela(dados);
    } else {
        alert("Erro ao realizar a busca de clientes.");
    }
}

function renderizarTabela(listaClientes) {
    const tbody = document.querySelector('.chamados-table tbody');
    tbody.innerHTML = ''; 

    if (listaClientes && listaClientes.length > 0) {
        for (let cliente of listaClientes) {
            const razao = cliente.razaoSocial || 'Não informada';
            const fantasia = cliente.nomeFantasia || '';
            const cnpj = cliente.cnpj || 'N/A';
            const contato = cliente.nomeResponsavel || 'Sem contato';
            const telefone = cliente.telefoneResponsavel || 'N/A';
            const totalEquip = cliente.totalEquipamentos !== undefined && cliente.totalEquipamentos !== null ? cliente.totalEquipamentos : 0;
            const totalChamados = cliente.totalChamadosAbertos !== undefined && cliente.totalChamadosAbertos !== null ? cliente.totalChamadosAbertos : 0;

            let badgeChamadosHtml = '';
            if (totalChamados > 0) {
                badgeChamadosHtml = `<span class="badge-urgencia alta" style="padding: 4px 10px; background-color: #fee2e2; color: #ef4444; border-radius: 6px; font-weight: 600;">${totalChamados} ativo${totalChamados > 1 ? 's' : ''}</span>`;
            } else {
                badgeChamadosHtml = `<span style="padding: 2px 8px; background-color: #f1f5f9; color: #64748b; border-radius: 6px; font-size: 13px; font-weight: 500;">0</span>`;
            }

            tbody.innerHTML += `
                <tr>
                    <td class="font-medium">
                        ${razao} <br>
                        <small class="text-muted">${fantasia}</small>
                    </td>
                    <td class="text-muted font-code">${cnpj}</td>
                    <td>
                        ${contato} <br>
                        <small>${telefone}</small>
                    </td>
                    <td class="text-center font-medium" style="font-weight: 600; color: #1e293b;">${totalEquip}</td>
                    <td class="text-center">${badgeChamadosHtml}</td>
                    <td class="text-center">
                        <button type="button" class="btn border-0 p-0 shadow-none" onclick="prepararEDirecionarDossie(${JSON.stringify(cliente).replace(/"/g, '&quot;')})" title="Ver Equipamentos e Histórico" style="color: #5334ea; background: none;">
                            <i class="fa-solid fa-folder-open fs-5"></i>
                        </button>
                    </td>
                </tr>
            `;
        }
    } else {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted py-4">
                    <i class="fa-solid fa-box-open fs-4 mb-2 d-block text-black-50"></i>
                    Nenhum cliente encontrado com os filtros informados.
                </td>
            </tr>
        `;
    }
}
function prepararEDirecionarDossie(cliente) {
    document.getElementById('dossieClienteId').value = cliente.id;
    document.getElementById('dossieNomeCliente').innerText = cliente.nomeFantasia || cliente.razaoSocial;
    
    const enderecoCompleto = `${cliente.logradouro || ''}, ${cliente.numero || ''} - ${cliente.bairro || ''} - ${cliente.cidade || ''}/${cliente.uf || ''}`;
    document.getElementById('dossieEnderecoCliente').innerHTML = `<i class="fa-solid fa-location-dot me-2 text-muted"></i>${enderecoCompleto}`;
    document.getElementById('dossieContatoCliente').innerHTML = `<i class="fa-solid fa-user me-2 text-muted"></i>${cliente.nomeResponsavel || 'Não informado'}`;

    document.getElementById('buscarEquipSerie').value = '';
    document.getElementById('buscarEquipModelo').value = '';
    document.getElementById('buscarEquipFabricante').value = '';
    document.getElementById('buscarEquipLocalizacao').value = '';

    carregarEquipamentosDossie();

    const modalDossie = new bootstrap.Modal(document.getElementById('modalDossieCliente'));
    modalDossie.show();
}

async function carregarEquipamentosDossie() {
    const clienteId = document.getElementById('dossieClienteId').value;
    const params = new URLSearchParams();
    params.append('clienteId', clienteId);
    
    const numSerie = document.getElementById('buscarEquipSerie').value;
    const modelo = document.getElementById('buscarEquipModelo').value;
    const fabricante = document.getElementById('buscarEquipFabricante').value;
    const localizacao = document.getElementById('buscarEquipLocalizacao').value;

    if (numSerie) params.append('numeroSerie', numSerie);
    if (modelo) params.append('modelo', modelo);
    if (fabricante) params.append('fabricante', fabricante);
    if (localizacao) params.append('localizacao', localizacao);

    const response = await fetch(`${API_PESQUISAR_EQUIPAMENTOS}?${params.toString()}`);
    const tbody = document.querySelector('#tabelaEquipamentos tbody');
    tbody.innerHTML = '';

    if (response.ok) {
        const listaEquipamentos = await response.json();
        if (listaEquipamentos && listaEquipamentos.length > 0) {
            listaEquipamentos.forEach(equip => {
                const dataFmt = equip.dataCadastro ? equip.dataCadastro.split('-').reverse().join('/') : '-';
                tbody.innerHTML += `
                    <tr>
                        <td class="font-code ps-3 py-2">${equip.numeroSerie || 'N/A'}</td>
                        <td class="fw-medium text-dark">${equip.tipo || ''} ${equip.modelo || ''}</td>
                        <td>${equip.fabricante || 'N/A'}</td>
                        <td>${equip.observacoes || 'Não especificado'}</td>
                        <td class="text-muted pe-3">${dataFmt}</td>
                    </tr>
                `;
            });
            return;
        }
    }
    
    tbody.innerHTML = `
        <tr>
            <td colspan="5" class="text-center text-muted py-3">Nenhum equipamento vinculado encontrado.</td>
        </tr>
    `;
}

async function salvarNovoEquipamento(e) {
    e.preventDefault();
    const clienteId = document.getElementById('dossieClienteId').value;

    const payload = {
        tipo: document.getElementById('equipTipo').value,
        fabricante: document.getElementById('equipFabricante').value,
        modelo: document.getElementById('equipModelo').value,
        numeroSerie: document.getElementById('equipNumSerie').value,
        observacoes: document.getElementById('equipObs').value
    };

    const response = await fetch(`${API_SALVAR_EQUIPAMENTO}?clienteId=${clienteId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        document.getElementById('formVincularEquipamento').reset();
        
        const modalVincularEl = document.getElementById('modalVincularEquipamento');
        const modalVincularInstance = bootstrap.Modal.getInstance(modalVincularEl);
        if (modalVincularInstance) modalVincularInstance.hide();

        await carregarEquipamentosDossie();
        await carregarTodosOsClientes();

        const modalDossieEl = document.getElementById('modalDossieCliente');
        const modalDossieInstance = bootstrap.Modal.getOrCreateInstance(modalDossieEl);
        modalDossieInstance.show();
    } else {
        alert("Erro ao tentar vincular o equipamento.");
    }
}