const API_CONTAR_CHAMADO = 'http://localhost:8010/chamados/contarChamados';
const API_CONTAR_CHAMADO_FINALIZADO = 'http://localhost:8010/chamados/contarChamadosFinalizados';



async function dadosDashboard() {

	const responseChamado = await fetch(API_CONTAR_CHAMADO)
	const valor1 = await responseChamado.text();
	document.getElementById('ChamadosAtivos').innerText = valor1;
		
}
document.addEventListener("DOMContentLoaded",() =>{
	dadosDashboard();
})