const API_BUSCAR_GMAIL ='http://localhost:8000/usuarios/BuscarPorEmail';
const API_NOVA_SENHA = 'http://localhost:8000/usuarios/novaSenha';

function revelarSenha(inputId, iconId) {
    
	const input = document.getElementById(inputId);
    const icone = document.getElementById(iconId);
    
    if (input.type === "password") {
        input.type = "text";
        icone.classList.remove("fa-eye-slash");
        icone.classList.add("fa-eye");
    } else {
        input.type = "password";
        icone.classList.remove("fa-eye");
        icone.classList.add("fa-eye-slash");
    }	
}

async function novasenha() {
	
	let senhanova = document.getElementById('novaSenha').value
	let confirmacao = document.getElementById('confirmarSenha').value
	
	if(senhanova == confirmacao) {
		
		alert("Senha redefinida Com sucesso")
	
	const gmailUsuario = new URLSearchParams(window.location.search);
	const gmail = gmailUsuario.get('email');
	
	const response = await fetch(`${API_BUSCAR_GMAIL}/${gmail}`)
	const dados = await response.json();
	
	console.log(dados)
	
	
		
	const salvar = await fetch(`${API_NOVA_SENHA}/${senhanova}/${confirmacao}`,{
			method : 'PUT',
			headers : {
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify(dados)
		})
		
		window.location.href ="login.html"
		
		console.log(salvar)
	}else{
		
		alert("Senhas digitadas nao conferem")
		document.getElementById('confirmarSenha').value = "";
		
	}
	
}