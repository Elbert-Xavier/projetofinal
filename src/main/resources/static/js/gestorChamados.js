const API_BUSCAR_CHAMADO = 'http://localhost:8000/chamados/listartodos';
const API_BUSCAR_CHAMADO_ID = 'http://localhost:8000/chamados/listarPorID';
const API_BUSCAR_CHAMADOS_ABERTOS = 'http://localhost:8000/chamados/ListarChamadoStatus';
const API_BUSCAR_TECNICOS = 'http://localhost:8000/usuarios/listarTecnicos';
const API_ATUALIZAR_CHAMADO = 'http://localhost:8000/chamados/atualizar';

async function selectAlunos() {
		
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
					        <button class="btn btn-outline-primary btn-sm fw-semibold w-100 w-sm-auto" data-bs-toggle="modal" data-bs-target="#modalDetalhesChamado" title="Analisar Detalhes e Atribuir Técnico">
					            <i class="fa-solid fa-clipboard-check me-1"></i> Triar
					        </button>
					    </td>
					</tr>
		        	`
					});
				console.log(corpoTabela)
}

async function listarChamados() {
	const response = await fetch(API_BUSCAR_CHAMADO);
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
						Cliente = Chamados.cliente.nome;
					}
					if(Chamados.tecnico == null){
						Tecnico = "Nao Definido"
					}else{
						Tecnico = Chamados.tecnico.nome;
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
					    <td class="ps-3 small text-muted">23/06/2026 14:30</td>
					    <td><span class="font-monospace fw-semibold text-secondary">#CH-2026-0475</span></td>
					    <td class="fw-semibold" style="color: var(--dark-blue);">Padaria Pão Quente</td>
					    <td class="small text-muted">Fernanda Lima</td>
					    <td><span class="badge text-bg-warning">MÉDIA</span></td>
					    <td><span class="badge text-bg-info text-white">ATRIBUÍDO</span></td>
					    <td class="text-center pe-3">
					        <button class="btn btn-light btn-sm border text-secondary" data-bs-toggle="modal" data-bs-target="#modalHistoricoAtribuido" title="Revisar Chamado">
					            <i class="fa-solid fa-arrow-right-to-bracket"></i>
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
	selectAlunos();
})
async function detalhesChamados(button) {
		
		const ChamadoID = button.querySelector('#idChamados');
		    const id = ChamadoID.textContent;
		
		const response = await fetch(`${API_BUSCAR_CHAMADO_ID}/${id}`)
		const dados = await response.json();
		
		console.log(dados);
		
		document.getElementById('chamadoID').innerText = "#"+dados.id;
		document.getElementById('idChamadoAtualizar').innerText = dados.id;
		document.getElementById('nomeCliente').innerText = dados.cliente.nome;
		document.getElementById('dataChamado').innerText = dados.dataAbertura;
		document.getElementById('equipamento').innerText = dados.equipamento.modelo;
		document.getElementById('observacao').innerText = dados.equipamento.observacoes;
		document.getElementById('DescricaoProblema').innerText = dados.descricao;
		document.getElementById('imagem').src = `/img/+${dados.urlImagem}`;
}
async function historicoChamados(button) {
		
		const ChamadoID = button.querySelector('#idChamadosHistorico');
		    const id = ChamadoID.textContent;
		
		const response = await fetch(`${API_BUSCAR_CHAMADO_ID}/${id}`)
		const dados = await response.json();
		
		console.log(dados);
		
		document.getElementById('chamadoIDHistorico').innerText = "Chamado #"+dados.id;
		document.getElementById('nomeClienteHistorico').innerText
		
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
			Cliente = dados.cliente.nome;
		}
		if(dados.tecnico == null){
			Tecnico = "Nao Definido"
		}else{
			Tecnico = dados.tecnico.nome;
		}
			if(dados.prioridade == "ALTA"){
				document.getElementById('prioridadeHistorico').className = "badge-urgencia alta";
				document.getElementById('prioridadeHistorico').innerText = dados.prioridade;
			}else if(dados.prioridade == "MEDIA"){
				document.getElementById('prioridadeHistorico').className = "badge-urgencia media";
				document.getElementById('prioridadeHistorico').innerText = dados.prioridade;
			}else if(dados.prioridade == "BAIXA"){
				document.getElementById('prioridadeHistorico').className = "badge-urgencia baixa";
				document.getElementById('prioridadeHistorico').innerText = dados.prioridade;
			}else{
				document.getElementById('prioridadeHistorico').className = "badge-urgencia indefinido";
				document.getElementById('prioridadeHistorico').innerText = dados.prioridade;
			}
		
		document.getElementById('tecnicoHistorico').innerText = Tecnico;
		document.getElementById('dataHistorico').innerText = dados.dataAbertura
		document.getElementById('DescricaoHistorico').innerText = dados.descricao
		document.getElementById('imagemHistorico').src = "/img/"+imagem;
}
async function AtualizarChamado(){
	
	    const idChamado = document.getElementById('idChamadoAtualizar').innerText;

	console.log(idChamado)

	const response = await fetch(`${API_BUSCAR_CHAMADO_ID}/${idChamado}`)
	const dados = await response.json();
	
	const id = dados.id
	const ChamadoAtualizar = {
		titulo: dados.titulo,
		descricao: dados.descricao,
	    orientacao: document.getElementById('modalObs').value,
	    prioridade: document.getElementById('modalDetalhePrioridade').value,
	    status: "EM_ANDAMENTO",
	    tecnico: { 
	        id: Number(document.getElementById('modalDetalheTecnico').value)
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



