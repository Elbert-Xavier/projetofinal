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
function validarCPF(cpf) {
    // Remove caracteres não numéricos (pontos e traços)
    cpf = cpf.replace(/[^\d]+/g, '');

    // CPF precisa ter 11 dígitos e não pode ser uma sequência repetida (ex: 111.111.111-11)
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
}
function mascaraCPF(input) {
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não é número
    
    if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos
    
    // Aplica a máscara dinamicamente
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    input.value = valor; // Devolve o valor formatado para o campo
}
function mascaraCelular(input) {
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não é número
    
    if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos (DDD + 9 dígitos)

    // Aplica a máscara dinamicamente passo a passo
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca os parênteses no DDD e o espaço
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');     // Coloca o hífen no bloco de 5 dígitos
    
    input.value = valor; // Devolve o valor formatado para o campo
}