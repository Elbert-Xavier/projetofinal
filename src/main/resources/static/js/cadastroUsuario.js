const API_SALVAR = 'http://192.168.10.22/usuarios/salvar';
const API_BUSCAR_GMAIL ='http://192.168.10.22/usuarios/BuscarPorEmail';

async function Salvar() {
	
	let gmail = document.getElementById('email').value;
	let senha = document.getElementById('senha').value;
	
	const response = await fetch(`${API_BUSCAR_GMAIL}/${gmail}`)
	const existe = await response.json();
	
	if(existe){
		alert("email ja existe")
	}else if(senha.length < 8) {
		alert("a senha deve possuir no minimo 8 digitos")
	}
	else{
		
	
	const usuario = {
	    tipoUsuario: document.getElementById('tipoUsuario').value,
	    nome: document.getElementById('nome').value,
	    titulo: document.getElementById('titulo').value,
	    telefone: document.getElementById('telefone').value,
	    nivelHierarquico: document.getElementById('nivelHierarquico').value,
	    email: gmail,
	    senha: senha
	}
	
		await fetch(API_SALVAR,{
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify(usuario)
		})


}
}

function revelar() {
    
	const input = document.getElementById('senha');

    
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}