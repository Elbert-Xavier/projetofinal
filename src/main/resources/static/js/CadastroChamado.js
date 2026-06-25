const API_SALVAR ='http://localhost:8000/chamados/salvar';

async function salvarChamado(){
	
	
	

	const titulo = document.getElementById("ticketTitle").value;
	const descricao = document.getElementById("ticketDescription").value;
	    const foto = document.getElementById("fileUpload").files[0];
	   
		
		console.log(titulo);
		console.log(descricao);
		console.log(foto);
		
		 const formData = new FormData();
		formData.append("titulo", titulo);
		formData.append("descricao", descricao);
		
	    if(foto){
	        formData.append("urlImagem", foto);
	    }
		console.log(formData)
		
		    const response = await fetch(API_SALVAR, {
		        method: "POST",
		        body: formData
		    });
		if (response.status === 500) {
				alert('Foto maior que 1 MB');
		}

}