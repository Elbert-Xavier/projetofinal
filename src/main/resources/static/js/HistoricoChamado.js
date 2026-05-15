const API_LISTAR_TODOS = '';

function validarLogin() {

	//usuário do localStorage veja como você criou essa variável lá no javascript de login
	let usuario = localStorage.getItem("usuarioLogado");

	if (!usuario || usuario === "null") {
		//veja aqui como chama sua página de login
			window.location.href = "login.html";

		return false;
	}

	return true;
}
document.addEventListener("DOMContentLoaded",() =>{
	validarLogin()
})
function abrirModal() {
	const modal = new bootstrap.Modal(document.getElementById('modalChamado'));
	modal.show();
}
function fecharModal() {
	const modalElement = document.getElementById("modalChamado");
	const modal = bootstrap.Modal.getInstance(modalElement);
	modal.hide();
}
async function ListarChamados() {
	
	
	
}