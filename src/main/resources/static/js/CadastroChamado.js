const API_SALVAR ='http://localhost:8000/chamados/salvar';

async function salvarChamado(){
	
	console.log(salvarChamado);
	

	const titulo = document.getElementById("titulo").value;
	const descricao = document.getElementById("descricao").value;
	    const foto = document.getElementById("urlImagem").files[0];
	   
		 const formData = new FormData();
		formData.append("titulo", titulo);
		formData.append("descricao", descricao);
		
	    if(foto){
	        formData.append("urlImagem", foto);
	    }
		console.log(formData)
		
		    await fetch(API_SALVAR, {
		        method: "POST",
		        body: formData
		    });
}