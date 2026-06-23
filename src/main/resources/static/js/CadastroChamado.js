const API_SALVAR ='http://localhost:8000/chamados/salvar';

async function salvarChamado(){
	
	console.log(salvarChamado);
	

	const titulo = document.getElementById("titulo").value;
	const descricao = document.getElementById("descricao").value;
		// Pegando o arquivo da foto selecionada pelo usuário
	    const foto =
	        document.getElementById("urlImagem").files[0];

	    const formData = new FormData();
		//
		formData.append("titulo", titulo);
		formData.append("descricao", descricao);


		// Verificando se o usuário selecionou uma foto antes de adicionar ao FormData
	    if(foto){
	        formData.append("imagem", foto);
	    }
		console.log(formData)
		
		    await fetch(API_SALVAR, {
		        method: "POST",
		        body: formData
		    });
}