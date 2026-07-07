const API_BUSCAR_CHAMADO = 'http://localhost:8000/chamados/listartodos';
const API_BUSCAR_CHAMADO_ID = 'http://localhost:8000/chamados/listarPorID';
const API_BUSCAR_CHAMADOS_ABERTOS = 'http://localhost:8000/chamados/ListarChamadoStatus';
const API_BUSCAR_TECNICOS = 'http://localhost:8000/usuarios/listarTecnicos';

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
					<td class="font-code">#${Chamados.id}</td>
					<td class="font-medium">${Cliente}</td>
					<td>${Tecnico}</td>
					<td class="text-truncate">${Chamados.descricao}</td>
					<td class="text-center">
					    <a href="#modalDetalhesChamado" class="btn-action-view" title="Analisar Detalhes e Atribuir Técnico" onclick="detalhesChamados(this)">
					        <i class="fa-solid fa-clipboard-check"></i> Triar e Atribuir
							<span id="idChamados" hidden=true>${Chamados.id}</span>
					    </a>
					</td>
					    </td>
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
					}
					
		            corpoTabela.innerHTML += `	
					<tr>
					    <td class="text-muted">${Chamados.dataAbertura}</td>
					    <td class="font-code">#${Chamados.id}</td>
					    <td class="font-medium">${Cliente}</td>
					    <td>${Tecnico}</td>
					    ${opcao}
					    <td><span class="badge-status atribuido">${Chamados.status}</span></td>
					    <td class="text-center">
					        <a href="#modalHistoricoAtribuido" class="btn-action-history-view" title="Revisar Chamado Atribuído">
					            <i class="fa-solid fa-arrow-right-to-bracket"></i>
								<span id="idChamados" hidden=true>${Chamados.id}</span>
					        </a>
					    </td>
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
		    
		    // Pega o texto (o ID do equipamento) de dentro do <p>
		    const id = ChamadoID.textContent;
		
		console.log(ChamadoID)
		
		const response = await fetch(`${API_BUSCAR_CHAMADO_ID}/${id}`)
		const dados = await response.json();
		
		console.log(dados);
		
		document.getElementById('chamadoID').innerText = "#"+dados.id;
		document.getElementById('nomeCliente').innerText = dados.cliente.nome;
		document.getElementById('dataChamado').innerText = dados.dataAbertura;
		document.getElementById('equipamento').innerText = dados.equipamento.modelo;
		document.getElementById('observacao').innerText = dados.equipamento.observacoes;
		document.getElementById('DescricaoProblema').innerText = dados.descricao;
		document.getElementById('imagem').src = `/img/+${dados.urlImagem}`;
}
async function SalvarGestor(){
	const tituloInput = document.getElementById('ticketTitle');
	const Tecnico = document.getElementById('ticketDescription');
	const Prioridade = document.getElementById('fileUpload');
}




