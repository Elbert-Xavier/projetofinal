const API_BUSCAR_TODOS = 'http://localhost:8010/equipamentos/listarTodos'; 
const API_BUSCAR_ID = 'http://localhost:8010/equipamentos/listaPorID';
const API_BUSCAR_POR_MODELO = 'http://localhost:8010/equipamentos/listarmodelo';
const API_BUSCAR_POR_FABRICANTE = 'http://localhost:8010/equipamentos/listarmarca';
const API_BUSCAR_POR_SERIE = 'http://localhost:8010/equipamentos/listarserie';
const API_BUSCAR_POR_TIPO = 'http://localhost:8010/equipamentos/listartipo';
const API_BUSCAR_NOME = 'http://localhost:8010/equipamentos/listarnome';

document.addEventListener("DOMContentLoaded", () => {
    listarEquipamentos();
	usuarioEstaLogado();
   
    document.getElementById('filtroBusca').addEventListener('input', (e) => {
        filtro(e.target.value);
    });
});

function usuarioEstaLogado(){
	const usuarioLogado = localStorage.getItem('usuarioLogado');
		console.log(usuarioLogado)
	const usuario = JSON.parse(usuarioLogado);
	console.log(usuario)
	
	if (!usuarioLogado) {
	    window.location.href = 'http://localhost:8000/login.html';
	}
}

function obterIconeEquipamento(tipo) {
    const t = (tipo || '').toLowerCase();
    if (t.includes('monitor') || t.includes('tela')) return 'fa-desktop';
    if (t.includes('impressora') || t.includes('copiadora')) return 'fa-print';
    if (t.includes('celular') || t.includes('smartphone')) return 'fa-mobile-screen-button';
    return 'fa-laptop'; 
}

async function listarEquipamentos() {
	
    const response = await fetch(API_BUSCAR_TODOS);
    
    if (!response.ok) {
        console.error("Erro ao buscar equipamentos:", response.status);
        document.getElementById('tabelaEquipamento').innerHTML = `<div class="text-center text-danger p-4">Erro ${response.status}: Rota de equipamentos não localizada.</div>`;
        return;
    }

    const listaEquipamentos = await response.json();
    renderizarEquipamentos(listaEquipamentos);
}

function renderizarEquipamentos(equipamentos) {
    const corpoTabela = document.getElementById('tabelaEquipamento');
    corpoTabela.innerHTML = ''; 

    if (!equipamentos || equipamentos.length === 0) {
        corpoTabela.innerHTML = '<div class="text-center text-muted p-4">Nenhum equipamento localizado.</div>';
        return;
    }

    equipamentos.forEach(equipamento => {
        const icone = obterIconeEquipamento(equipamento.tipo);
        const tituloEquipamento = `${equipamento.fabricante} ${equipamento.modelo}`;

        corpoTabela.innerHTML += `	
            <button type="button" onclick="exibirModelProduto(this)" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center border rounded-3 p-3 mb-2" 
                    data-id="${equipamento.id}">
                <div class="d-flex align-items-center gap-3">
                    <div class="item-icon text-center"><i class="fa-solid ${icone} fs-4"></i></div>
                    <div>
                        <h3 class="h6 mb-1 fw-semibold text-dark-blue">${tituloEquipamento}</h3>
                        <p class="text-muted small mb-0">Série: ${equipamento.numeroSerie}</p>
                    </div>
                </div>
                <i class="fa-solid fa-chevron-right text-muted fs-small"></i>
            </button>`;
    });
}

async function exibirModelProduto(button) {
    const id = button.getAttribute('data-id');
    console.log("Buscando Produto ID:", id);
    
    const response = await fetch(`${API_BUSCAR_ID}/${id}`);
    const tabela = await response.json();
    
	console.log(tabela);
	
    const dataFmt = tabela.dataCadastro ? tabela.dataCadastro.split('-').reverse().join('/') : 'Não Informada';
    
    document.getElementById('tipoEquipamento').innerText = tabela.tipo || 'N/A';
    document.getElementById('fabricante').innerText = tabela.fabricante || 'N/A';
    document.getElementById('modelo').innerText = tabela.modelo || 'N/A';
    document.getElementById('numeroSerie').innerText = tabela.numeroSerie || 'N/A';
    document.getElementById('dataCadastro').innerText = dataFmt;
    
    const imgElement = document.getElementById('imagemEquipamento');
    if (tabela.imagem) {
        imgElement.src = `/img/${tabela.imagem}`;
        imgElement.style.display = 'block';
    } else {
        imgElement.src = 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=300';
    }

    abrirModal();
}

async function filtro(input) {
    console.log("Texto digitado para busca:", input);
    const statusFiltro = document.getElementById('filtroCriterio').value;
    
    if (!input || input.trim() === "") {
        listarEquipamentos();
        return;
    }

    let dadosEquipamento = [];
    let urlFiltro = '';

    if (statusFiltro === "nome") {
        urlFiltro = `${API_BUSCAR_NOME}/${input}`;
    } else if (statusFiltro === "serie") {
        urlFiltro = `${API_BUSCAR_POR_SERIE}/${input}`;
    } else if (statusFiltro === "fabricante") {
        urlFiltro = `${API_BUSCAR_POR_FABRICANTE}/${input}`;
    } else if (statusFiltro === "modelo") {
        urlFiltro = `${API_BUSCAR_POR_MODELO}/${input}`;
    } else if (statusFiltro === "tipo") {
        urlFiltro = `${API_BUSCAR_POR_TIPO}/${input}`;
    } else {
        urlFiltro = `${API_BUSCAR_POR_MODELO}/${input}`;
    }

    const response = await fetch(urlFiltro);
    if (response.ok) {
        dadosEquipamento = await response.json();
    }

    renderizarEquipamentos(dadosEquipamento);
}

function abrirModal() {
    const modalElement = document.getElementById('equipmentModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function fecharModal() {
    const modalElement = document.getElementById("equipmentModal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) modal.hide();
}