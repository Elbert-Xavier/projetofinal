const API_BUSCAR_CHAMADO = 'http://localhost:8000/chamados/listartodos';
const API_BUSCAR_CHAMADO_ID = 'http://localhost:8000/chamados/listarPorID';

document.addEventListener("DOMContentLoaded",() =>{
	listarChamados();
})
async function listarChamados() {
	const response = await fetch(API_BUSCAR_CHAMADO);
	const listaChamados = await response.json();

	console.log('RESPOSTA')
	console.log(response);
	console.log('JSON')
	console.log(listaChamados);

	const corpoTabela = document.getElementById('listaChamadosContainer');
		        
		        corpoTabela.innerHTML = ''; 

		        listaChamados.forEach(Chamados => {
		            corpoTabela.innerHTML += `	
					<button type="button" onclick="exibirModelChamado(this)" class="list-group-item list-group-item-action border rounded-3 p-3 text-start" data-bs-toggle="modal" data-bs-target="#ticketModal1" 
					data-status="atendimento" data-tipo="notebook" data-fabricante="dell" data-modelo="inspiron 15" data-data="2026-06-25">
					                        <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
					                            <div>
					                                <span class="badge text-bg-light border text-secondary mb-1">#${Chamados.id}</span>
					                                <h3 class="h6 mb-1 fw-semibold text-dark-blue chamado-titulo">${Chamados.titulo}</h3>
					                            </div>
					                            <span class="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">${Chamados.status}</span>
					                        </div>
					                        <div class="d-flex justify-content-between align-items-center text-muted small mt-2 pt-2 border-top-dashed">
					                            <span>${Chamados.equipamento.nome}</span>
					                            <span>Técnico: <strong>${Chamados.usuario.nome}</strong></span>
					                            <span>Atua. em: ${Chamados.dataAbertura}</span>
												<p style="display: none" id="idChamado">${Chamados.id}</p>
					                        </div>
					                    </button>`
		        });
				console.log(corpoTabela)
}

async function exibirModelChamado(button) {
	
	const IDchamado = button.querySelector('#idChamado');
	    
	    const id = IDchamado.textContent;
	
	console.log(id)
	
	const response = await fetch(`${API_BUSCAR_CHAMADO_ID}/${id}`)
	const tabela = await response.json();
	
	console.log(tabela);
	console.log(tabela.imagem);
	
	document.getElementById('descricao').innerText = tabela.descricao;
	document.getElementById('equipamento').innerText = tabela.equipamento.nome;
	document.getElementById('Tecnico').innerText = tabela.usuario.nome;
	document.getElementById('Status').innerText = tabela.status;
	document.getElementById('data').innerText = tabela.dataAbertura;
	document.getElementById('Imagem').src = `/img/${tabela.urlImagem}`
}

async function filtro(input) {
	
	
	
}


































function abrirModal() {
	const modal = new bootstrap.Modal(document.getElementById('ticketModal1'));
	modal.show();
}
function fecharModal() {
	const modalElement = document.getElementById("ticketModal1");
	const modal = bootstrap.Modal.getInstance(modalElement);
	modal.hide();
}