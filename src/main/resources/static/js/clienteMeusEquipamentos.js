const API_BUSCAR_TODOS = 'http://localhost:8000/equipamentos/listarTodos';
const API_BUSCAR_ID = 'http://localhost:8000/equipamentos/listaPorID';
const API_BUSCAR_POR_MODELO = 'http://localhost:8000/equipamentos/listarmodelo';
const API_BUSCAR_POR_FABRICANTE = 'http://localhost:8000/equipamentos/listarmarca';
const API_BUSCAR_POR_SERIE = 'http://localhost:8000/equipamentos/listarserie';
const API_BUSCAR_POR_TIPO = 'http://localhost:8000/equipamentos/listartipo';
const API_BUSCAR_NOME = 'http://localhost:8000/equipamentos/listarnome';

async function listarEquipamentos() {
	const response = await fetch(API_BUSCAR_TODOS);
	const listaEquipamentos = await response.json();

	console.log('RESPOSTA')
	console.log(response);
	console.log('JSON')
	console.log(listaEquipamentos);

	const corpoTabela = document.getElementById('tabelaEquipamento');
	        
	        corpoTabela.innerHTML = ''; 

	        listaEquipamentos.forEach(equipamento => {
	            corpoTabela.innerHTML += `	
	            <button type="button" onclick="exibirModelProduto(this)" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center border rounded-3 p-3 mb-2" data-bs-toggle="modal" data-bs-target="#equipmentModal">
	                <div class="d-flex align-items-center gap-3">
	                    <div class="item-icon text-center"><i class="fa-solid fa-laptop fs-4"></i></div>
	                    <div>
	                        <h3 class="h6 mb-1 fw-semibold text-dark-blue">${equipamento.nome}</h3>
	                        <p class="text-muted small mb-0">Série: ${equipamento.numeroSerie}</p>
							<p style="display: none" id="idEquipamento">${equipamento.id}</p>
	                    </div>
	                </div>
	                <i class="fa-solid fa-chevron-right text-muted fs-small"></i>
	            </button>`;
	        });
			console.log(corpoTabela)
}
document.addEventListener("DOMContentLoaded",() =>{
	listarEquipamentos();
})
async function exibirModelProduto(button) {
	
	const EquipamentoID = button.querySelector('#idEquipamento');
	    
	    // Pega o texto (o ID do equipamento) de dentro do <p>
	    const id = EquipamentoID.textContent;
	
	console.log(EquipamentoID)
	
	const response = await fetch(`${API_BUSCAR_ID}/${id}`)
	const tabela = await response.json();
	
	console.log(tabela);
	console.log(tabela.imagem);
	
	document.getElementById('tipoEquipamento').innerText = tabela.tipo;
	document.getElementById('fabricante').innerText = tabela.fabricante;
	document.getElementById('modelo').innerText = tabela.modelo;
	document.getElementById('numeroSerie').innerText = tabela.numeroSerie;
	document.getElementById('dataCadastro').innerText = tabela.dataCadastro;
	document.getElementById('imagemEquipamento').src = `/img/${tabela.imagem}`;

}

async function filtro(input) {
	console.log(input)
	let statusFiltro = document.getElementById('filtroCriterio').value;
	let dadosEquipamento = null;
	
	if(input !== undefined && input !== null && input !== "") {
		if(statusFiltro == "nome"){
			const response = await fetch(`${API_BUSCAR_NOME}/${input}`)
			const dados = await response.json();
			dadosEquipamento = dados;		
		}
		if(statusFiltro == "serie"){
			const response = await fetch(`${API_BUSCAR_POR_SERIE}/${input}`)
			const dados = await response.json();
			dadosEquipamento = dados;
		}else if(statusFiltro == "fabricante"){
			const response = await fetch(`${API_BUSCAR_POR_FABRICANTE}/${input}`)
			const dados = await response.json();
			dadosEquipamento = dados;
		}else if(statusFiltro == "modelo"){
			const response = await fetch(`${API_BUSCAR_POR_MODELO}/${input}`)
			const dados = await response.json();
			dadosEquipamento = dados;
		}else if(statusFiltro == "tipo"){
			const response = await fetch(`${API_BUSCAR_POR_TIPO}/${input}`)
			const dados = await response.json();
			dadosEquipamento = dados;
		}
		const corpoTabela = document.getElementById('tabelaEquipamento');
		
	        corpoTabela.innerHTML = ''; 

	        dadosEquipamento.forEach(equipamento => {
	            corpoTabela.innerHTML += `	
	            <button type="button" onclick="exibirModelProduto(this)" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center border rounded-3 p-3 mb-2" data-bs-toggle="modal" data-bs-target="#equipmentModal">
	                <div class="d-flex align-items-center gap-3">
	                    <div class="item-icon text-center"><i class="fa-solid fa-laptop fs-4"></i></div>
	                    <div>
	                        <h3 class="h6 mb-1 fw-semibold text-dark-blue">${equipamento.nome}</h3>
	                        <p class="text-muted small mb-0">Série: ${equipamento.numeroSerie}</p>
							<p style="display: none" id="idEquipamento">${equipamento.id}</p>
	                    </div>
	                </div>
	                <i class="fa-solid fa-chevron-right text-muted fs-small"></i>
	            </button>`;
	        });
	
	}else{
	}
}

























function abrirModal() {
	const modal = new bootstrap.Modal(document.getElementById('equipmentModal'));
	modal.show();
}
function fecharModal() {
	const modalElement = document.getElementById("equipmentModal");
	const modal = bootstrap.Modal.getInstance(modalElement);
	modal.hide();
}