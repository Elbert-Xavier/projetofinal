const API_SALVA = 'http://localhost:8000/clientes/gravar';

async function salvarCliente() {
		
		//RECUPERANDO OS VALORES DOS IMPUTS
		const cliente = {
			cnpj: document.getElementById('cnpj').value,
			nomeFantasia: document.getElementById('nomeFantasia').value,
			razaoSocial: document.getElementById('RazaoSocial').value,
			tituloResponsavel: document.getElementById('TituloResponsavel').value,
			nome: document.getElementById('nome').value,
			telefone:document.getElementById('Telefone').value,
			email:document.getElementById('Email').value
		}
		
		console.log(cliente)
		//METODO
		//CABEÇALHO
		//MEU OBJETO

			//inserindo
		
		await fetch(API_SALVA,{
			method : 'POST', //METODO DA MINHA API
			headers : { //CABEÇALHO INDICANDO O FORMATO QUE IREI PASSAR OS DADOS
				'Content-Type' : 'application/json' //SERÁ UM PADRÃO NOSSO
			},
			body : JSON.stringify(cliente)//CONVERTE EM FORMATO JSON
		})

}
function mudarpagina() {
	window.location = "http://localhost:8000/html/CadastroEndereco.html"
}
