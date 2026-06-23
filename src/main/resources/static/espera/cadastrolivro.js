

// COMEÇANDO O METODO LISTAR TODOS DOS (LIVROS)

const API_BUSCAR_TODOS = "http://localhost:8000/livros/listartodos";
const API_BUSCAR_POR_ID = "http://localhost:8000/livros/listarid";
const API_SALVAR = "http://localhost:8000/livros/salvar";
const API_ATUALIZAR = "http://localhost:8000/livros/atualizar";

// SERÁ UM METODO LISTAR TODOS, LISTAR POR ID E DELETAR PARA:
//titulo
//autor
//editora
//anoPublicacao
//isbn (Codigo do livro)
//genero
//codigoAcervo

//Estado para controle de edição
let editandoId = null;

//Pegando dados do HTML do livro.html
//Utilitários
function limparFormulario(){
	
	document.getElementById("Título").value = "";
	document.getElementById("Autor").value = "";
	document.getElementById("Editora").value = "";
	document.getElementById("Ano de publicação").value = "";
	document.getElementById("ISBN").value = "";
	document.getElementById("Gênero").value = "";
	document.getElementById("Código do acervo").value = "";
	editandoId = null;
	
}


// SALVAR
async function salvar(){

	const titulo = document.getElementById("titulo").value;
	const autor = document.getElementById("autor").value;
	const editora = document.getElementById("editora").value;
	const anoPublicacao = document.getElementById("anoPublicacao").value;
	const isbn = document.getElementById("isbn").value;
	const genero = document.getElementById("genero").value;
	const codigoAcervo = document.getElementById("codigoAcervo").value;
	
	// Pegando o arquivo da foto selecionada pelo usuário
    const foto =
        document.getElementById("fileInput").files[0];

    const formData = new FormData();
	//
    formData.append("nome", nome);
    formData.append("endereco", endereco);
	formData.append("titulo", titulo);
	formData.append("autor", autor);
	formData.append("editora", editora);
	formData.append("anoPublicacao", anoPublicacao);
	formData.append("isbn", isbn);
	formData.append("genero", genero);
	formData.append("codigoAcervo", codigoAcervo);
	formData.append("id", editandoId); // Adicionando o ID ao FormData para atualização


	// Verificando se o usuário selecionou uma foto antes de adicionar ao FormData
    if(foto){
        formData.append("imagem", foto);
    }

    if(editandoId){

		await fetch(`${API_ATUALIZAR}/${id}`, {

		        method: "PUT",

		        body: formData

		    });
			
			window.Location.href="acervo.html";
		
    } else {

	    await fetch(API_SALVAR, {
	
	        method: "POST",
	
	        body: formData
	
	    });

	}


   //coloque aqui o seu método para listar
   
}


// Pegando o modal do HTML
