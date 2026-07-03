
const API_BUSCAR_GMAIL = 'http://localhost:8000/usuarios/BuscarPorEmail';


let revelarValor = 1

async function revelar() {
	
	const revela = document.getElementById('senha')
	console.log(revela)
	
	if(revelarValor == 1){
		revela.type = "text";
		revelarValor=2;
		
	}else if(revelarValor == 2) {
		revela.type = "password";
		revelarValor=1;
	}
}
async function logar(){
	const email = document.getElementById('email').value
	const senha = document.getElementById('senha').value
	
	const responsta = await fetch(`${API_BUSCAR_GMAIL}/${email}`);
	const dadosUsuario = await responsta.json();
	
	const Usuario = {
			email: email,
			senha: senha,
	};
	const response = await fetch("http://localhost:8000/usuarios/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(Usuario)
		
	});
	if(response.ok) {
		const data = await response.json();
		localStorage.setItem(
			"usuarioLogado",
			JSON.stringify(data)
		);
		localStorage.setItem("usuario","logado")
		
		if(dadosUsuario.primeiroLogin == true){
			window.location.href = "http://localhost:8000/html/concluirCadastro.html?id="+dadosUsuario.id;
		}else if(dadosUsuario.tipoUsuario == "gestor"){
			window.location.href = "http://localhost:8000/html/GestorDashboard.html";
		}else if(dadosUsuario.tipoUsuario == "tecnico"){
			window.location.href = "http://localhost:8000/";
		}else if(dadosUsuario.tipoUsuario == "cliente"){
			window.location.href = "http://localhost:8000/html/clienteMeusChamados.html";
		}else{
			alert("algum Erro foi encontrado tente novamente mais tarde")
		}
	}else{
		alert("Email ou Senha invalidos!");
	}
}
document.addEventListener("DOMContentLoaded",() =>{
	localStorage.clear();
})

