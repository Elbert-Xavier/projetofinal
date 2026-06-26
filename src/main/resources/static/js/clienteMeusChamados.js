const API_BUSCAR_CHAMADO = '';
const API_BUSCAR_TECNICO_ID = '';
const API_BUSCAR_EQUIPAMENTO_ID = '';






































function abrirModal() {
	const modal = new bootstrap.Modal(document.getElementById('ticketModal1'));
	modal.show();
}
function fecharModal() {
	const modalElement = document.getElementById("ticketModal1");
	const modal = bootstrap.Modal.getInstance(modalElement);
	modal.hide();
}