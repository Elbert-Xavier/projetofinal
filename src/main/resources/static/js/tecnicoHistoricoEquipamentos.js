const API_EQUIPAMENTOS = 'http://192.168.10.22:8010/equipamentos';
const API_CHAMADOS = 'http://192.168.10.22:8010/chamados';

document.addEventListener("DOMContentLoaded", () => {
    carregarEquipamentos();
    document.getElementById('filtroBuscaGeral').addEventListener('input', filtrarEquipamentos);
});

let listaEquipamentosLocal = [];

async function carregarEquipamentos() {
    const container = document.getElementById('listaEquipamentosContainer');
    
    const response = await fetch(API_EQUIPAMENTOS);
    if (!response.ok) {
        container.innerHTML = '<div class="text-center text-muted p-4">Nenhum equipamento cadastrado no sistema.</div>';
        return;
    }

    listaEquipamentosLocal = await response.json();
    filtrarEquipamentos();
}

function filtrarEquipamentos() {
    const container = document.getElementById('listaEquipamentosContainer');
    const busca = document.getElementById('filtroBuscaGeral').value.toLowerCase().trim();

    let filtrados = listaEquipamentosLocal;

    if (busca) {
        filtrados = filtrados.filter(e => 
            (e.tipo && e.tipo.toLowerCase().includes(busca)) ||
            (e.modelo && e.modelo.toLowerCase().includes(busca)) ||
            (e.numeroSerie && e.numeroSerie.toLowerCase().includes(busca)) ||
            (e.fabricante && e.fabricante.toLowerCase().includes(busca)) ||
            (e.cliente && e.cliente.nome && e.cliente.nome.toLowerCase().includes(busca))
        );
    }

    if (filtrados.length === 0) {
        container.innerHTML = '<div class="text-center text-muted p-4">Nenhum equipamento corresponde à pesquisa.</div>';
        return;
    }

    container.innerHTML = '';
    filtrados.forEach(eq => {
        const clienteNome = eq.cliente ? eq.cliente.nome : 'Não informado';
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'list-group-item list-group-item-action border rounded-3 p-3 text-start mb-2';
        item.onclick = () => buscarHistoricoEquipamento(eq);

        item.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h3 class="h6 mb-1 fw-semibold text-dark-blue">${eq.fabricante} ${eq.modelo}</h3>
                    <span class="text-muted small d-block">Série: <strong class="text-uppercase">${eq.numeroSerie}</strong> | Tipo: <strong>${eq.tipo}</strong></span>
                </div>
                <span class="badge bg-light border text-secondary"><i class="fa-regular fa-user me-1"></i> ${clienteNome}</span>
            </div>
        `;
        container.appendChild(item);
    });
}

async function buscarHistoricoEquipamento(equipamento) {
    document.getElementById('modalTipo').innerText = equipamento.tipo || '---';
    document.getElementById('modalFabricante').innerText = equipamento.fabricante || '---';
    document.getElementById('modalModelo').innerText = equipamento.modelo || '---';
    document.getElementById('modalSerie').innerText = equipamento.numeroSerie || '---';
    document.getElementById('modalClienteDono').innerText = equipamento.cliente ? equipamento.cliente.nome : 'Não informado';

    const tabelaCorpo = document.getElementById('tabelaChamadosFinalizados');
    tabelaCorpo.innerHTML = '<tr><td colspan="3" class="text-center py-3"><i class="fa-solid fa-circle-notch fa-spin me-2"></i>Buscando histórico de ordens...</td></tr>';

    const modal = new bootstrap.Modal(document.getElementById('historicoModal'));
    modal.show();

    const response = await fetch(`${API_CHAMADOS}/listarTodos/${equipamento.id}`);
    if (!response.ok) {
        tabelaCorpo.innerHTML = '<tr><td colspan="3" class="text-center text-muted py-3">Nenhum histórico registrado.</td></tr>';
        return;
    }

    const todosChamados = await response.json();
    const finalizados = todosChamados.filter(c => c.status === 'FINALIZADO');

    if (finalizados.length === 0) {
        tabelaCorpo.innerHTML = '<tr><td colspan="3" class="text-center text-muted py-3">Nenhuma manutenção finalizada para este equipamento.</td></tr>';
        return;
    }

    tabelaCorpo.innerHTML = '';
    finalizados.forEach(chamado => {
        const tecnicoNome = chamado.tecnico ? chamado.tecnico.nome : 'Não atribuído';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="fw-semibold text-secondary">#CH-${chamado.id}</td>
            <td>
                <div class="fw-semibold text-dark-blue">${chamado.titulo}</div>
                <div class="text-muted fs-xs text-truncate" style="max-width: 350px;">${chamado.descricao || ''}</div>
            </td>
            <td class="text-muted"><i class="fa-solid fa-user-gear me-1"></i>${tecnicoNome}</td>
        `;
        tabelaCorpo.appendChild(tr);
    });
}