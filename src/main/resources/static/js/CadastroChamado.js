const API_SALVAR ='http://localhost:8000/chamados/salvar';
const API_BUSCAR_TODOS_EQUIPAMENTO = 'http://localhost:8000/equipamentos/listarTodos';

async function selectEquipamento() {
		
		const response = await fetch(API_BUSCAR_TODOS_EQUIPAMENTO);
		const dados = await response.json();
		
		let select = document.getElementById("selectEquipment");
			
			dados.forEach(dado =>{
				let option = document.createElement("option")
				option.value = dado.id;
				option.text = dado.nome+"(Série:"+dado.numeroSerie+")";
				
				select.appendChild(option)
			})
}
document.addEventListener("DOMContentLoaded",() =>{
						selectEquipamento();
})
async function salvarChamado(){

	const titulo = document.getElementById("ticketTitle").value;
	const equipamento = document.getElementById("selectEquipment").value;
	const descricao = document.getElementById("ticketDescription").value;
	    const foto = document.getElementById("fileUpload").files[0];
	   
		
		console.log(titulo);
		console.log(equipamento);
		console.log(descricao);
		console.log(foto);
		
		 const formData = new FormData();
		formData.append("titulo", titulo);
		formData.append("equipamento", equipamento);
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