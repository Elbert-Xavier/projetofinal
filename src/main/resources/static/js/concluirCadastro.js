const API_BUSCAR_POR_ID ='http://localhost:8000/usuarios/listarPorID';

async function concluirCadastro() {
	
	let celular = document.getElementById('telefone').value;
	let senha = document.getElementById('senha').value;
	let confirmarSenha = document.getElementById('confirmarSenha').value;
	let tipoUsuario = null;
	if(senha == confirmarSenha) {
		
		if(validarCelular(celular) == true){
			
			const gmailUsuario = new URLSearchParams(window.location.search);
			const id = gmailUsuario.get('id');
			
			const responseConta = await fetch(`${API_BUSCAR_POR_ID}/${id}`)
			const dadosConta = await responseConta.json();
			
			if(dados.tipoUsuario == "gestorPrimeiroLogin"){
				tipoUsuario = "gestor"
			}else if(dados.tipoUsuario == "tecnicoPrimeiroLogin"){
				tipoUsuario	= "tecnico"
			}else if(dados.tipoUsuario == "clientePrimeiroLogin"){
				tipoUsuario = "cliente"
			}
			
			const UsuarioAtualizado = {
				id: id,
				tipoUsuario: tipoUsuario,
				nome: document.getElementById('nome').value,
				cargo: document.getElementById('cargo').value,
				telefone: celular,
				email: dadosConta.email,
				senha: confirmarSenha
				
			}
			
			await fetch(`${API_ATUALIZAR}/${id}`,{
				method : 'POST',
				headers : {
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify(UsuarioAtualizado)
			})
			
			
			
			
			
			
		}else{
			alert("numero de celular nao valido")
		}
	}else{
		alert("as senhas nao conferem")
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