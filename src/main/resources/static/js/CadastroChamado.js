const API_EQUIPAMENTOS_CLIENTE = 'http://localhost:8000/equipamentos/pesquisar';
const API_SALVAR_CHAMADO = 'http://localhost:8000/chamados/salvar';
const CLIENTE_ID = localStorage.getItem('clienteId') || 1; 

document.addEventListener('DOMContentLoaded', function() {
    carregarEquipamentosDoCliente();
    configurarContadorCaracteres();
});

function carregarEquipamentosDoCliente() {
    const select = document.getElementById('selectEquipment');
    if (!select) return;

    fetch(`${API_EQUIPAMENTOS_CLIENTE}?clienteId=${CLIENTE_ID}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(equipamentos => {
            if (equipamentos && equipamentos.length > 0) {
                equipamentos.forEach(equip => {
                    const option = document.createElement('option');
                    option.value = equip.id;
                    option.textContent = `${equip.tipo} ${equip.modelo} - S/N: ${equip.numeroSerie}`;
                    select.appendChild(option);
                });
            } else {
                const option = select.querySelector('option');
                option.textContent = "Nenhum equipamento cadastrado para sua empresa.";
            }
        });
}

function configurarContadorCaracteres() {
    const textarea = document.getElementById('ticketDescription');
    const contador = document.querySelector('.contador');
    if (textarea && contador) {
        textarea.addEventListener('input', function() {
            contador.textContent = `${textarea.value.length}/200 caracteres`;
        });
    }
}

function salvarChamado() {
    const equipSelect = document.getElementById('selectEquipment');
    const tituloInput = document.getElementById('ticketTitle');
    const descTextarea = document.getElementById('ticketDescription');
    const fileInput = document.getElementById('fileUpload');

    if (!equipSelect.value || equipSelect.selectedIndex === 0) {
        alert("Por favor, selecione um equipamento.");
        return;
    }
    if (!tituloInput.value.trim() || !descTextarea.value.trim()) {
        alert("Por favor, preencha o título e a descrição.");
        return;
    }
    if (fileInput.files.length === 0) {
        alert("Por favor, envie uma evidência.");
        return;
    }

    const formData = new FormData();
    formData.append('titulo', tituloInput.value.trim());
    formData.append('descricao', descTextarea.value.trim());
    formData.append('equipamento', equipSelect.value);
    formData.append('urlImagem', fileInput.files[0]);

    fetch(API_SALVAR_CHAMADO, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok || response.status === 201) {
            alert("Chamado cadastrado com sucesso!");
            document.querySelector('form').reset();
            document.querySelector('.contador').textContent = "0/200 caracteres";
        } else {
            alert("Falha ao salvar chamado. Verifique os dados informados.");
        }
    });
}