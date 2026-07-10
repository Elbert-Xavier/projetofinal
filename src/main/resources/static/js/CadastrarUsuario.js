const API_SALVAR_USUARIO = 'http://192.168.10.22:8010/usuarios/salvarCliente';
const API_LISTAR_USUARIO = 'http://192.168.10.22:8010/usuarios/listarTodos';
const API_ATUALIZAR_USUARIO = 'http://192.168.10.22:8010/usuarios/atualizar';
const API_BUSCAR_USUARIO_POR_ID = 'http://192.168.10.22:8010/usuarios/listarPorID';
const API_DELETAR_USUARIO = 'http://192.168.10.22:8010/usuarios/deletar';
let EeditandoId = null




function usuarioEstaLogado(){
	const usuarioLogado = localStorage.getItem('usuarioLogado');
		console.log(usuarioLogado)
	const usuario = JSON.parse(usuarioLogado);
	console.log(usuario)
	if (!usuarioLogado) {
	    window.location.href = 'http://localhost:8000/login.html';
	}else{
		if(usuario.admin == false) {
			window.location.href = 'http://localhost:8000/html/clienteMeusChamados.html';
		}else{
		}
	}
}
document.addEventListener("DOMContentLoaded", () => {
    usuarioEstaLogado();
	ListarUsuario()
	LimparFormulario();
});
async function salvarUsuario() {
	
	const Usuario = {
		nome: document.getElementById('nomeCompleto').value,
		cargo: document.getElementById('cargo').value,
		telefone: document.getElementById('telefone').value,
		email: document.getElementById('email').value,
		isAdmin: false
	}
	
	alert("salvando Usuario")
	document.getElementById('buttonSalvar').disabled = true
	
	if(EeditandoId){
		
		await fetch(`${API_ATUALIZAR_USUARIO}/${EeditandoId}`,{
				method : 'PUT',
				headers : {
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify(Usuario)
			})
		
		
	}else{

	await fetch(API_SALVAR_USUARIO,{
		method : 'POST',
		headers : {
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify(Usuario)
	})
	
	alert("salvo Com Sucesso")
	document.getElementById('buttonSalvar').disabled = false
}
}
async function ListarUsuario() {
	
	const response = await fetch(API_LISTAR_USUARIO);
	const dados = await response.json();
	
	const tbody = document.querySelector("tbody")
	tbody.innerHTML = "";

	dados.forEach(dado => {
		const tr = document.createElement("tr")
		tr.innerHTML = `
		    <td class="ps-3">
		        <div class="d-flex align-items-center gap-3">
		            <img src="https://ui-avatars.com/api/?name=${dado.nome}&background=random&color=fff" class="rounded-circle" style="width: 38px; height: 38px; object-fit: cover;" alt="${dado.nome}">
		            <div>
		                <div class="fw-semibold text-dark-blue">${dado.nome}</div>
		                <div class="text-muted small" style="font-size: 12px;">${dado.email}</div>
		            </div>
		        </div>
		    </td>
		    <td><span class="text-secondary fw-medium">${dado.cargo}</span></td>
		    <td class="text-center">
		        <button class="btn btn-link text-primary p-1 me-2" title="Editar" onclick="editar(${dado.id})"><i class="fa-regular fa-pen-to-square"></i></button>
		        <button class="btn btn-link text-danger p-1" title="Excluir" onclick="deletar(${dado.id})"><i class="fa-regular fa-trash-can"></i></button>
		    </td>
		`
		tbody.appendChild(tr);
	})
}
function LimparFormulario() {
	document.getElementById('nomeCompleto').value = "";
	document.getElementById('email').value = "";
	document.getElementById('cargo').value = "";
	document.getElementById('telefone').value = "";
}
async function editar(id) {
	
	
	const response =await fetch(`${API_BUSCAR_USUARIO_POR_ID}/${id}`);
	const dados = await response.json();
	
	console.log(dados)
	
	EeditandoId = id;
	document.getElementById('nomeCompleto').value = dados.nome;
	document.getElementById('email').value = dados.email;
	document.getElementById('cargo').value = dados.cargo;
	document.getElementById('telefone').value = dados.telefone;
	
	abrirModal();
}
function abrirModal() {
	const modal = new bootstrap.Modal(document.getElementById('modalNovoUsuario'));
	modal.show();
}
function fecharModal() {
	const modalElement = document.getElementById("modalNovoUsuario");
	const modal = bootstrap.Modal.getInstance(modalElement);
	modal.hide();
}