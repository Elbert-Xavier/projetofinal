const API_EQUIPAMENTOS_LISTAR = 'http://localhost:8000/equipamentos/listarTodos'; // Certifique-se de manter a rota de listagem que funciona
const API_CHAMADOS_SALVAR = 'http://localhost:8000/chamados/salvar';

document.addEventListener('DOMContentLoaded', function() {
    carregarEquipamentosCliente();
    configurarContadorCaracteres();

    // Ouvinte do botão Cancelar
    const btnCancel = document.querySelector('.btn-cancel');
    if (btnCancel) {
        btnCancel.addEventListener('click', function() {
            if (confirm("Deseja realmente cancelar? Os dados digitados serão perdidos.")) {
                window.location.href = "clienteMeusChamados.html";
            }
        });
    }

    // Ouvinte do botão Salvar
    const btnSave = document.querySelector('.btn-save');
    if (btnSave) {
        btnSave.addEventListener('click', salvarChamado);
    }
});

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
                    option.value = e.id; // Envia o ID numérico que o conversor do Spring Boot precisa para buscar o Equipamento
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
    const selectEquipment = document.getElementById('selectEquipment');
    const inputTitle = document.getElementById('ticketTitle');
    const textareaDescription = document.getElementById('ticketDescription');
    const fileInput = document.getElementById('fileUpload'); // Campo de arquivo do seu HTML

    // Validações básicas de segurança
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

    // Criamos o objeto FormData (Necessário para enviar MultipartFile)
    // ATENÇÃO: Os nomes no append devem ser EXATAMENTE iguais às variáveis com @RequestParam do Java
    const formData = new FormData();
    formData.append('titulo', inputTitle.value.trim());
    formData.append('descricao', textareaDescription.value.trim());
    formData.append('equipamento', selectEquipment.value); // O Spring Boot converte o ID enviado em string para a Entidade automaticamente
    formData.append('urlImagem', fileInput.files[0]); // Envia o arquivo binário selecionado

    // IMPORTANTE: Ao enviar FormData, NÃO se deve definir o 'Content-Type' no header. 
    // O próprio navegador cuida de gerar o boundary do multipart/form-data automaticamente.
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