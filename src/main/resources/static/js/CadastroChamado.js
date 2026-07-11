const API_EQUIPAMENTOS_LISTAR = 'http://localhost:8010/equipamentos/listarTodos';
const API_CHAMADOS_SALVAR = 'http://localhost:8010/chamados/salvar';

document.addEventListener('DOMContentLoaded', function() {
	usuarioEstaLogado();
	 carregarEquipamentosCliente();
    configurarContadorCaracteres();

    const btnCancel = document.querySelector('.btn-cancel');
    if (btnCancel) {
        btnCancel.addEventListener('click', function() {
            if (confirm("Deseja realmente cancelar? Os dados digitados serão perdidos.")) {
                window.location.href = "clienteMeusChamados.html";
            }
        });
    }

    const btnSave = document.querySelector('.btn-save');
    if (btnSave) {
        btnSave.addEventListener('click', salvarChamado);
    }
});

function usuarioEstaLogado(){
	const usuarioLogado = localStorage.getItem('usuarioLogado');
		console.log(usuarioLogado)
	const usuario = JSON.parse(usuarioLogado);
	console.log(usuario)
	
	if (!usuarioLogado) {
	    window.location.href = 'http://localhost:8000/login.html';
	}
}

function carregarEquipamentosCliente() {
    const select = document.getElementById('selectEquipment');
    if (!select) return;

    fetch(API_EQUIPAMENTOS_LISTAR)
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Erro ao buscar equipamentos da API.');
        })
        .then(equipamentos => {
            if (equipamentos && equipamentos.length > 0) {
                select.innerHTML = '<option disabled selected hidden>Selecione um equipamento</option>';
                equipamentos.forEach(e => {
                    const option = document.createElement('option');
                    option.value = e.id;
                    option.textContent = `${e.tipo} - ${e.fabricante} ${e.modelo} (S/N: ${e.numeroSerie})`;
                    select.appendChild(option);
                });
            } else {
                select.innerHTML = '<option disabled selected>Nenhum equipamento localizado</option>';
            }
        })
        .catch(err => {
            console.error(err);
            select.innerHTML = '<option disabled selected>Erro ao carregar lista de equipamentos</option>';
        });
}

function configurarContadorCaracteres() {
    const textarea = document.getElementById('ticketDescription');
    const contador = document.querySelector('.contador');
    if (!textarea || !contador) return;

    textarea.addEventListener('input', function() {
        const comprimento = textarea.value.length;
        contador.textContent = `${comprimento}/200 caracteres`;
    });
}

function salvarChamado() {
	
	const dados = localStorage.getItem("usuarioLogado")
	const dadosJson = JSON.parse(dados);
	console.log(dadosJson.id)
	
	const Cliente =  dadosJson.id;
    const selectEquipment = document.getElementById('selectEquipment');
    const inputTitle = document.getElementById('ticketTitle');
    const textareaDescription = document.getElementById('ticketDescription');
    const fileInput = document.getElementById('fileUpload'); // Campo de arquivo do seu HTML

	console.log(Cliente)
	console.log(selectEquipment.value)
	console.log(inputTitle.value)
	console.log(textareaDescription.value)
	console.log(fileInput.value)
	
    if (!selectEquipment.value || selectEquipment.selectedIndex === 0) {
        alert("Por favor, selecione um equipamento da lista.");
        selectEquipment.focus();
        return;
    }

    if (!inputTitle.value.trim()) {
        alert("O título do chamado é obrigatório.");
        inputTitle.focus();
        return;
    }

    if (!textareaDescription.value.trim()) {
        alert("A descrição do problema é obrigatória.");
        textareaDescription.focus();
        return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
        alert("Por favor, anexe uma imagem ou evidência do problema.");
        return;
    }

    const formData = new FormData();
	formData.append('cliente', dadosJson.id);
    formData.append('titulo', inputTitle.value.trim());
    formData.append('descricao', textareaDescription.value.trim());
    formData.append('equipamento', selectEquipment.value); 
    formData.append('urlImagem', fileInput.files[0]);

	console.log(formData)
	
	fetch(API_CHAMADOS_SALVAR, {
	       method: 'POST',
	       body: formData
	   })
	   .then(response => {
	       if (response.ok || response.status === 21) { 
	           alert("Chamado registrado com sucesso! Ele foi encaminhado para a mesa de triagem.");
	           window.location.href = "clienteMeusChamados.html";
	       } else {
	           response.text().then(text => console.error("Rejeição da API:", text));
	           alert("Não foi possível salvar o chamado. Verifique o console do navegador para detalhes.");
	       }
	   })
	   .catch(error => {
	       console.error("Erro na comunicação:", error);
	       alert("Erro de conexão com o servidor.");
	   });
}