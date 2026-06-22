const API_ENVIAR_GMAIL ='http://localhost:8000/email';
const API_BUSCAR_GMAIL ='http://localhost:8000/usuarios/BuscarPorEmail';


async function enviarCodigo() {
	
	let gmail = document.getElementById('emailRecuperacao').value;
	
	const response = await fetch(`${API_BUSCAR_GMAIL}/${gmail}`)
	const dados = await response.json();
	document.getElementById('buttonRecuperacao').disabled = true;
	
	if(dados){
		
		const enviargmail = await fetch(`${API_ENVIAR_GMAIL}/${gmail}`)
		
		alert('Email enviado com recuperação de senha enviado')
		
	}else{
		alert('Email não encontrado')
		document.getElementById('emailRecuperacao').value = "";
		
	}
	
	document.getElementById('buttonRecuperacao').disabled = false;
}