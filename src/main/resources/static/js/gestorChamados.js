const API_BUSCAR_CHAMADO = 'http://localhost:8010/chamados/listartodos';
const API_BUSCAR_CHAMADO_ID = 'http://localhost:8010/chamados/listarPorID';
const API_BUSCAR_CHAMADOS_ABERTOS = 'http://localhost:8010/chamados/ListarChamadoStatus';
const API_BUSCAR_TECNICOS = 'http://localhost:8010/usuarios/listarTecnicos';
const API_ATUALIZAR_CHAMADO = 'http://localhost:8010/chamados/atualizar';
const API_BUSCAR_CHAMADO_MENOS_ABERTO = 'http://localhost:8010/chamados/ListarChamadoMenosAberto'

async function selectTecnico() {
		
		const response = await fetch(API_BUSCAR_TECNICOS);
		const areas = await response.json();
		
		let select = document.getElementById("modalDetalheTecnico");
			
			areas.forEach(area =>{
				let option = document.createElement("option")
				option.value = area.id;
				option.text = area.nome;
				
				select.appendChild(option)
			})
}
async function listarChamadosAbertos() {
	const response = await fetch(API_BUSCAR_CHAMADOS_ABERTOS);
	const listaChamados = await response.json();

	console.log('RESPOSTA')
	console.log(response);
	console.log('JSON')
	console.log(listaChamados);

	const corpoTabela = document.getElementById('tabelaChamadosAbertos');
		        
		        corpoTabela.innerHTML = ''; 

		        listaChamados.forEach(Chamados => {
					
					
					let opcao = null;
					let Cliente = null;
					let Equipamento = null;
					if(Chamados.cliente == null){
						Cliente = "Não Definido"
					}else{
						Cliente = Chamados.cliente.nome;
					}
					if(Chamados.equipamento == undefined){
						Equipamento = "Não Definido"
					}else{
						Equipamento = Chamados.equipamento.modelo;
					}
					
					if(Chamados.prioridade == "ALTA"){
						opcao = `<td><span class="badge-urgencia alta">${Chamados.prioridade}</span></td>`
					}else if(Chamados.prioridade == "MEDIA"){
						opcao = `<td><span class="badge-urgencia media">${Chamados.prioridade}</span></td>`
					}else if(Chamados.prioridade == "BAIXA"){
						opcao = `<td><span class="badge-urgencia baixa">${Chamados.prioridade}</span></td>`
					}else{
						opcao = `<td><span class="badge-urgencia indefinido">${Chamados.prioridade}</span></td>`
					}
					
		            corpoTabela.innerHTML += `	
					<tr>
					    <td class="ps-3"><span class="font-monospace fw-semibold text-secondary">#${Chamados.id}</span></td>
					    <td class="fw-semibold" style="color: var(--dark-blue);">${Cliente}</td>
					    <td class="small text-muted">${Equipamento}</td>
					    <td>
					        <div class="text-truncate small text-muted" style="max-width: 250px;">${Chamados.descricao}</div>
					    </td>
					    <td class="text-center pe-3">
					        <button class="btn btn-outline-primary btn-sm fw-semibold w-100 w-sm-auto" data-bs-toggle="modal" data-bs-target="#modalDetalhesChamado" title="Analisar Detalhes e Atribuir Técnico" onclick="detalhesChamados(this)">
					            <i class="fa-solid fa-clipboard-check me-1"></i> Triar
								<span id="idChamados" hidden=true>${Chamados.id}</span>
					        </button>
					    </td>
					</tr>
		        	`
					});
				console.log(corpoTabela)
}

async function listarChamados() {
	const response = await fetch(API_BUSCAR_CHAMADO_MENOS_ABERTO);
	const listaChamados = await response.json();

	console.log('RESPOSTA')
	console.log(response);
	console.log('JSON')
	console.log(listaChamados);

	const corpoTabela = document.getElementById('corpoTabela');
		        
		        corpoTabela.innerHTML = ''; 

		        listaChamados.forEach(Chamados => {
	
				
					
					let opcao = null;
					let Cliente = null;
					let Tecnico = null;
					if(Chamados.cliente == null){
						Cliente = "Nao Definido"
					}else{
						Cliente = Chamados.cliente.cliente.nomeFantasia;
					}
					if(Chamados.tecnico == null){
						Tecnico = "Nao Definido"
					}else{
						Tecnico = Chamados.tecnico.nome;
					}
					if(Chamados.prioridade == "ALTA"){
						opcao = `<td><span class="badge text-bg-danger">${Chamados.prioridade}</span></td>`
					}else if(Chamados.prioridade == "MEDIA"){
						opcao = `<td><span class="badge text-bg-warning">${Chamados.prioridade}</span></td>`
					}else if(Chamados.prioridade == "BAIXA"){
						opcao = `<td><span class="badge text-bg-secondary">${Chamados.prioridade}</span></td>`
					}else{
						opcao = `<td><span class="badge text-bg-primary">${Chamados.prioridade}</span></td>`
					}
					
		            corpoTabela.innerHTML += `	
					<tr>
					    <td class="ps-3 small text-muted">${Chamados.dataAbertura}</td>
					    <td><span class="font-monospace fw-semibold text-secondary">#${Chamados.id}</span></td>
					    <td class="fw-semibold" style="color: var(--dark-blue);">${Cliente}</td>
					    <td class="small text-muted">${Tecnico}</td>
					    ${opcao}
					    <td><span class="badge text-bg-info text-white">${Chamados.status}</span></td>
					    <td class="text-center pe-3">
					        <button class="btn btn-light btn-sm border text-secondary" data-bs-toggle="modal" data-bs-target="#modalHistoricoAtribuido" title="Revisar Chamado" onclick="historicoChamados(this)">
					            <i class="fa-solid fa-arrow-right-to-bracket"></i>
								<span id="idChamadosHistorico" hidden=true>${Chamados.id}</span>
					        </button>
					    </td>
					</tr>
		        	`
					});
				console.log(corpoTabela)
}
document.addEventListener("DOMContentLoaded",() =>{
	listarChamados();
	listarChamadosAbertos();
	selectTecnico();
})
async function detalhesChamados(button) {
		
		const ChamadoID = button.querySelector('#idChamados');
		    const id = ChamadoID.textContent;
		
		const response = await fetch(`${API_BUSCAR_CHAMADO_ID}/${id}`)
		const dados = await response.json();
		
		console.log(dados);
		
		let imagem = null;
		let Cliente = null;
		let equipamento = null;
		if(dados.urlImagem == null){
			imagem = "Nao Definido"
		}else{
			imagem = dados.urlImagem;
		}
		if(dados.cliente == null){
			Cliente = "Nao Definido"
		}else{
			Cliente = dados.cliente.cliente.nomeFantasia;
		}
		if(dados.equipamento == null){
			equipamento = "Nao Definido"
		}else{
			equipamento = dados.equipamento.modelo;
		}
		
		document.getElementById('modalCodigo').innerText = "#"+dados.id;
		document.getElementById('idChamadoAtualizar').innerText = dados.id;
		document.getElementById('modalCliente').innerText = Cliente;
		document.getElementById('modalEquipamento').innerText = equipamento;
		document.getElementById('modalTitulo').innerText = dados.titulo;
		document.getElementById('modalDescricao').innerText = dados.descricao;
		document.getElementById('modalFoto').src = `/img/${dados.urlImagem}`;
}
async function historicoChamados(button) {
		
		const ChamadoID = button.querySelector('#idChamadosHistorico');
		    const id = ChamadoID.textContent;
		
		const response = await fetch(`${API_BUSCAR_CHAMADO_ID}/${id}`)
		const dados = await response.json();
		
		console.log(dados);
		
		let imagem = null;
		let Cliente = null;
		let Tecnico = null;
		if(dados.urlImagem == null){
			imagem = "Nao Definido"
		}else{
			imagem = dados.urlImagem;
		}
		if(dados.cliente == null){
			Cliente = "Nao Definido"
		}else{
			Cliente = dados.cliente.cliente.nomeFantasia;
		}
		if(dados.tecnico == null){
			Tecnico = "Nao Definido"
		}else{
			Tecnico = dados.tecnico.nome;
		}
		
		document.getElementById('modalHistCodigo').innerText = "#"+dados.id;
		document.getElementById('modalHistCliente').innerText = Cliente;
		

			if(dados.prioridade == "ALTA"){
				document.getElementById('modalHistUrgencia').className = "badge text-bg-danger";
				document.getElementById('modalHistUrgencia').innerText = dados.prioridade;
			}else if(dados.prioridade == "MEDIA"){
				document.getElementById('modalHistUrgencia').className = "badge text-bg-warning";
				document.getElementById('modalHistUrgencia').innerText = dados.prioridade;
			}else if(dados.prioridade == "BAIXA"){
				document.getElementById('modalHistUrgencia').className = "badge text-bg-secondary";
				document.getElementById('modalHistUrgencia').innerText = dados.prioridade;
			}else{
				document.getElementById('modalHistUrgencia').className = "badge text-bg-primary";
				document.getElementById('modalHistUrgencia').innerText = dados.prioridade;
			}
		
		document.getElementById('modalHistTecnico').innerText = Tecnico;
		document.getElementById('modalHistStatus').innerText = dados.status
		document.getElementById('modalHistTitulo').innerText = dados.titulo
		document.getElementById('modalHistDescricao').innerText = dados.descricao
		document.getElementById('modalHistFoto').src = "/img/"+imagem;
		document.getElementById('modalHistOrientaçoes').innerText = dados.orientacao
}
async function AtualizarChamado(){
	
	    const idChamado = document.getElementById('idChamadoAtualizar').innerText;

	console.log(idChamado)

	const response = await fetch(`${API_BUSCAR_CHAMADO_ID}/${idChamado}`)
	const dados = await response.json();
	
	const id = dados.id
	const ChamadoAtualizar = {
		urlImagem: dados.urlImagem,
		titulo: dados.titulo,
		descricao: dados.descricao,
	    orientacao: document.getElementById('txtOrientaçoesTriagem').value,
	    prioridade: document.getElementById('selectUrgenciaTriagem').value,
	    status: "EM_ANDAMENTO",
	    tecnico: { 
	        id: Number(document.getElementById('modalDetalheTecnico').value)
	    },
		cliente: {
			id: dados.cliente.id
		},
		equipamento: {
			id: dados.equipamento.id
		}
	}
	
	await fetch(`${API_ATUALIZAR_CHAMADO}/${id}`,{
		method : 'PUT', 
		headers : { 
			'Content-Type' : 'application/json' 
		},
		body : JSON.stringify(ChamadoAtualizar)
	})
	listarChamados();
	listarChamadosAbertos();
	fecharModal1();
}
function abrirModal1() {
	const modal = new bootstrap.Modal(document.getElementById('modalDetalhesChamado'));
	modal.show();
}
function fecharModal1() {
	const modalElement = document.getElementById("modalDetalhesChamado");
	const modal = bootstrap.Modal.getInstance(modalElement);
	modal.hide();
}
function abrirModal2() {
	const modal = new bootstrap.Modal(document.getElementById('modalHistoricoAtribuido'));
	modal.show();
}
function fecharModal2() {
	const modalElement = document.getElementById("modalHistoricoAtribuido");
	const modal = bootstrap.Modal.getInstance(modalElement);
	modal.hide();
}



