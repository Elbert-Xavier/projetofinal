function abrirModal() {
	const modal = new bootstrap.Modal(document.getElementById('modalChamado'));
	modal.show();
}
function fecharModal() {
	const modalElement = document.getElementById("modalChamado");
	const modal = bootstrap.Modal.getInstance(modalElement);
	modal.hide();
}