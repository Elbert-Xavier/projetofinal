const API_BUSCAR_POR_ID ='http://localhost:8000/usuarios/listarPorID';
const API_ATUALIZAR = 'http://localhost:8000/usuarios/atualizarPrimeiroLogin';
let Conta = null;

async function concluirCadastro() {
	
	let celular = document.getElementById('telefone').value;
	let senha = document.getElementById('senha').value;
	let confirmarSenha = document.getElementById('confirmarSenha').value;
	if(senha == confirmarSenha) {
		
		if(validarCelular(celular) == true){
			
			const gmailUsuario = new URLSearchParams(window.location.search);
			const id = gmailUsuario.get('id');
			
			const UsuarioAtualizado = {
				tipoUsuario: Conta.tipoUsuario,
				nome: document.getElementById('nome').value,
			    cpf: document.getElementById('cpf').value,
			    cargo: document.getElementById('cargo').value,
				email:Conta.email,
				telefone: celular,
			    senha: confirmarSenha,
				isAdmin: Conta.isAdmin
				}
			
			const response = await fetch(`${API_ATUALIZAR}/${id}`,{
				method : 'POST',
				headers : {
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify(UsuarioAtualizado)
			})
			alert("salvo Com Sucesso")
			window.location.href = 'http://localhost:8000/login.html'

		}else{
			alert("numero de celular nao valido")
		}
	}else{
		alert("as senhas nao conferem")
	}
	
	
}
document.addEventListener("DOMContentLoaded",() =>{
	AtualizarHora()
})
async function AtualizarHora() {
	const gmailUsuario = new URLSearchParams(window.location.search);
	const id = gmailUsuario.get('id');

	const responseConta = await fetch(`${API_BUSCAR_POR_ID}/${id}`)
	const dadosConta = await responseConta.json();
	
	Conta = dadosConta;
	
	document.getElementById('dataCadastro').value = dadosConta.dataCadastro;
	
	
}

function validarCelular(celular) {
	
    if (!celular) return false;

    const numerosApenas = String(celular).replace(/[^\d]+/g, '');

    const numeroValidar = (numerosApenas.length === 13 && numerosApenas.startsWith('55')) 
        ? numerosApenas.substring(2) 
        : numerosApenas;

    const regexCelular = /^[1-9][1-9]9\d{8}$/;

    return regexCelular.test(numeroValidar);
}
function validarCPF(cpf) {
	
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

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
    let valor = input.value.replace(/\D/g, '');
    
    if (valor.length > 11) valor = valor.slice(0, 11);
    
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    input.value = valor;
}
function mascaraCelular(input) {
    let valor = input.value.replace(/\D/g, '');
    
    if (valor.length > 11) valor = valor.slice(0, 11);

    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    
    input.value = valor;
}