const API_SALVA = 'http://192.168.10.22/enderecos/gravar';

async function buscarCep(cep) {
	
	const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);
	const dados = await response.json();
	
	console.log(dados)
	
	document.getElementById('logradouro').value = dados.logradouro
	document.getElementById('complemento').value = dados.complemento
	document.getElementById('uf').value = dados.uf
	document.getElementById('bairro').value = dados.bairro
	document.getElementById('cidade').value = dados.localidade


	
}

async function salvarEndereco() {
		
		const Endereco = {
			tipoLogradouro: document.getElementById('tipoLogradouro').value,
			logradouro: document.getElementById('logradouro').value,
			numero: document.getElementById('numero').value,
			cep: document.getElementById('cep').value,
			complemento: document.getElementById('complemento').value,
			referencia: document.getElementById('referencia').value,
			bairro: document.getElementById('bairro').value,
			cidade: document.getElementById('cidade').value,
			uf: document.getElementById('uf').value
		}
		
		console.log(Endereco)
	
		
		await fetch(API_SALVA,{
			method : 'POST', 
			headers : { 
				'Content-Type' : 'application/json' 
			},
			body : JSON.stringify(Endereco)
		})

}