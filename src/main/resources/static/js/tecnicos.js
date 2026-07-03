const API_LISTAR_TECNICO = 'http://localhost:8000/usuarios/listarTecnicos';
const API_LISTAR_TECNICO_POR_NOME = 'http://localhost:8000/usuarios/listarTecnicosNome';

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
		<td>
		    <div class="user-table-profile">
				<img src="https://ui-avatars.com/api/?name=${tecnico.nome}&background=random&color=fff" class="avatar-table" alt="${tecnico.nome}">
		        <div>
		            <strong class="font-medium">${tecnico.nome}</strong>
		            <span class="subtext-table">${tecnico.email}</span>
		        </div>
		    </div>
		</td>
		<td class="text-center font-bold-count" style="font-size: 16px;">0</td>
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
				        <td>
				            <div class="user-table-profile">
				                <img src="https://ui-avatars.com/api/?name=${dado.nome}&background=0369a1&color=fff" class="avatar-table" alt="${dado.nome}">
				                <div>
				                    <strong class="font-medium">${dado.nome}</strong>
				                    <span class="subtext-table">${dado.email}</span>
				                </div>
				            </div>
				        </td>
				        <td class="text-center font-bold-count" style="font-size: 16px;">0</td>
				        `;
				tbody.appendChild(tr);
				
			})
	
}

async function CadastrarTecnico() {
	const nome = document.getElementById('nomeTecnico').value;
	const email = document.getElementById('emailTecnico').value;
	const telefone = document.getElementById('telTecnico').value;
	
	if(validarCelular(telefone) == true,nome,email){
		
		
		
		
		
		
		
		

		
		
		
		
		
		
		await fetch(API_SALVAR,{
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify(Tecnico)
		})
		
		
		
		
		
		
		
	}else{
		alert("Preencha os campos de forma correta")
	}
}
function validarCelular(celular) {
    // Se não for enviado nada, ou não for uma string/número, já retorna false
    if (!celular) return false;

    // Remove tudo o que não for número e transforma em String
    const numerosApenas = String(celular).replace(/[^\d]+/g, '');

    // Se tiver o DDI do Brasil (55) na frente, remove para validar apenas o DDD + Número
    const numeroValidar = (numerosApenas.length === 13 && numerosApenas.startsWith('55')) 
        ? numerosApenas.substring(2) 
        : numerosApenas;

    // Regex: Verifica se tem 11 dígitos, se o DDD é válido e se começa com 9
    const regexCelular = /^[1-9][1-9]9\d{8}$/;

    return regexCelular.test(numeroValidar); // Retorna estritamente true ou false
}























function mascaraCelular(input) {
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não é número
    
    if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos (DDD + 9 dígitos)

    // Aplica a máscara dinamicamente passo a passo
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca os parênteses no DDD e o espaço
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');     // Coloca o hífen no bloco de 5 dígitos
    
    input.value = valor; // Devolve o valor formatado para o campo
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