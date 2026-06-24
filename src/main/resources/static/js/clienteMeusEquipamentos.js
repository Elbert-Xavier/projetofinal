const API_BUSCAR_TODOS = 'http://localhost:8000/equipamentos/listarTodos';
const API_BUSCAR_ID = 'http://localhost:8000/equipamentos/listaPorID';

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
	            <button type="button"  class="list-group-item list-group-item-action d-flex justify-content-between align-items-center border rounded-3 p-3 mb-2" data-bs-toggle="modal" data-bs-target="#equipmentModal">
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
}
document.addEventListener("DOMContentLoaded",() =>{
	listarEquipamentos();
})
async function exibirModelProduto() {
	
	let idEquipamento = document.getElementById('idEquipamento').innerText;
	
	const response = await fetch(`${API_BUSCAR_ID}/${idEquipamento}`)
	const tabela = await response.json();
	
	const caminhoImg = '//SC-ALPHA/deploy/gestoretech/img/'
	
	console.log(tabela);
	
	document.getElementById('tipoEquipamento').innerText = tabela.tipo;
	document.getElementById('fabricante').innerText = tabela.fabricante;
	document.getElementById('modelo').innerText = tabela.modelo;
	document.getElementById('numeroSerie').innerText = tabela.numeroSerie;
	document.getElementById('dataCadastro').innerText = tabela.dataCadastro;
	document.getElementById('dataCadastro').src = caminhoImg + tabela.imagem;

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