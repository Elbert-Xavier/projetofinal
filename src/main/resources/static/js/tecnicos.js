const API_LISTAR_TECNICO = 'http://192.168.10.22:8010/usuarios/listarTecnicos';
const API_LISTAR_TECNICO_POR_NOME = 'http://192.168.10.22:8010/usuarios/listarTecnicosNome';
const API_SALVAR_TECNICO = 'http://192.168.10.22:8010/usuarios/salvarTecnico';

async function listarTecnico() {
	const response = await fetch(API_LISTAR_TECNICO);
	const tecnicos = await response.json();
	
	console.log('RESPOSTA')
	console.log(response);
	console.log('JSON')
	console.log(tecnicos);
	
	const tbody = document.querySelector("tbody")
	tbody.innerHTML = "";
		
	tecnicos.forEach(tecnico => {
		
		const tr = document.createElement("tr")
		
		tr.innerHTML = `		
		<td class="ps-3 py-3">
		    <div class="d-flex align-items-center gap-3">
		        <img src="https://ui-avatars.com/api/?name=${tecnico.nome}&background=random&color=fff" class="rounded-circle" style="width: 40px; height: 40px; object-fit: cover;" alt="${tecnico.nome}>
		        <div>
		            <div class="fw-bold" style="color: var(--dark-blue);">${tecnico.nome}</div>
		            <div class="text-muted small">${tecnico.email}</div>
		        </div>
		    </div>
		</td>
		<td class="text-center fw-bold fs-5" style="color: var(--dark-blue);">2</td>
		`;
		
		tbody.appendChild(tr);
		});
}
document.addEventListener("DOMContentLoaded",() =>{
	listarTecnico();
})

async function buscarTecnico() {
		
	let input = document.getElementById('filterNome').value
	
		const response = await fetch(`${API_LISTAR_TECNICO_POR_NOME}/${input}`);
		const dados = await response.json();
		
		console.log(dados);
		
		const tbody = document.querySelector("tbody")
		
		tbody.innerHTML = '';
		
		dados.forEach(dado => {
				
				const tr = document.createElement("tr")
				
				tr.innerHTML = `		
								<td class="ps-3 py-3">
								    <div class="d-flex align-items-center gap-3">
								        <img src="https://ui-avatars.com/api/?name=${dado.nome}&background=random&color=fff" class="rounded-circle" style="width: 40px; height: 40px; object-fit: cover;" alt="${dado.nome}>
								        <div>
								            <div class="fw-bold" style="color: var(--dark-blue);">${dado.nome}</div>
								            <div class="text-muted small">${dado.email}</div>
								        </div>
								    </div>
								</td>
								<td class="text-center fw-bold fs-5" style="color: var(--dark-blue);">2</td>
				        `;
				tbody.appendChild(tr);
				
			})
	
}

async function CadastrarTecnico() {
	const nome = document.getElementById('nomeTecnico').value;
	const email = document.getElementById('emailTecnico').value;
	const telefone = document.getElementById('telTecnico').value;
	
	if(validarCelular(telefone) == true,nome,email){
		
		const tecnico = {
			nome: nome,
			telefone: telefone,
			email: email
		}
		
		const response = await fetch(API_SALVAR_TECNICO,{
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify(tecnico)
		})
		
		alert("salvo Com Sucesso")
		
		listarTecnico();
		fecharModal();
	}else{
		alert("Preencha os campos de forma correta")
	}
}
function validarCelular(celular) {

    if (!celular) return false;

    const numerosApenas = String(celular).replace(/[^\d]+/g, '');

    const numeroValidar = (numerosApenas.length === 13 && numerosApenas.startsWith('55')) 
        ? numerosApenas.substring(2) 
        : numerosApenas;

    const regexCelular = /^[1-9][1-9]9\d{8}$/;

    return regexCelular.test(numeroValidar); // Retorna estritamente true ou false
}



function mascaraCelular(input) {
    let valor = input.value.replace(/\D/g, ''); 
    
    if (valor.length > 11) valor = valor.slice(0, 11); 

    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2'); 
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');     
    
    input.value = valor; 
}
function abrirModal() {
	const modal = new bootstrap.Modal(document.getElementById('modalNovoTecnico'));
	modal.show();
}
function fecharModal() {
	const modalElement = document.getElementById("modalNovoTecnico");
	const modal = bootstrap.Modal.getInstance(modalElement);
	modal.hide();
}