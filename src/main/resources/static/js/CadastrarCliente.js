const API_SALVA = 'http://localhost:8000/clientes/gravar';

let equipamentosCliente = [];
let fotoBase64Temporaria = ""; 

const modal = document.getElementById('modalEquipamento');
const fotoInput = document.getElementById('equipFotoInput');
const photoPreview = document.getElementById('photoPreview');

// ==========================================================================
// FUNÇÕES GLOBAIS DE CONTROLE DO MODAL
// ==========================================================================
window.abrirModalEquipamento = function(e) {
    if (e) e.preventDefault();
    limparCamposModal();
    const modalElement = document.getElementById('modalEquipamento');
    if (modalElement) modalElement.style.display = 'flex';
};

window.fecharModalEquipamento = function(e) {
    if (e) e.preventDefault();
    const modalElement = document.getElementById('modalEquipamento');
    if (modalElement) modalElement.style.display = 'none';
};

// Conversão da Imagem para Base64
if (fotoInput) {
    fotoInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                fotoBase64Temporaria = e.target.result;
                if (photoPreview) {
                    photoPreview.style.backgroundImage = `url('${fotoBase64Temporaria}')`;
                    photoPreview.innerHTML = ""; 
                }
            }
            reader.readAsDataURL(file);
        }
    });
}

// ==========================================================================
// ADICIONAR EQUIPAMENTO À LISTA
// ==========================================================================
window.salvarEquipamentoNaLista = function(e) {
    if (e) e.preventDefault(); 

    const tipo = document.getElementById('equipTipo').value.trim();
    const marca = document.getElementById('equipMarca').value.trim();
    const serie = document.getElementById('equipNumSerie').value.trim();
    const obs = document.getElementById('equipObs').value.trim();

    if (!tipo || !marca) {
        alert("Por favor, preencha pelo menos o Tipo e a Marca/Modelo.");
        return;
    }

    const novoEquip = {
        id: Date.now(),
        tipo: tipo,
        marca: marca,
        serie: serie || "Não informado",
        obs: obs || "",
        foto: fotoBase64Temporaria || "https://ui-avatars.com/api/?name=EQ&background=f1f3f9&color=64748b"
    };

    equipamentosCliente.push(novoEquip);
    atualizarListaEquipamentosVisual();
    window.fecharModalEquipamento();
};

function atualizarListaEquipamentosVisual() {
    const container = document.getElementById('equipamentosLista');
    if (!container) return;
    
    if (equipamentosCliente.length === 0) {
        container.innerHTML = `
            <div class="empty-state-equip">
                <i class="fa-regular fa-image"></i> Nenhum equipamento adicionado ainda.
            </div>`;
        return;
    }

    container.innerHTML = '';
    equipamentosCliente.forEach(equip => {
        container.innerHTML += `
            <div class="equipamento-item-card">
                <img src="${equip.foto}" class="equip-thumb" alt="Equipamento">
                <div class="equip-info">
                    <h5>${equip.tipo} — ${equip.marca}</h5>
                    <p><strong>Série:</strong> ${equip.serie} ${equip.obs ? `| <strong>Obs:</strong> ${equip.obs}` : ''}</p>
                </div>
                <button type="button" class="btn-remove-equip" onclick="window.removerEquipamento(${equip.id})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
    });
}

window.removerEquipamento = function(id) {
    equipamentosCliente = equipamentosCliente.filter(e => e.id !== id);
    atualizarListaEquipamentosVisual();
};

function limparCamposModal() {
    document.getElementById('equipTipo').value = "";
    document.getElementById('equipMarca').value = "";
    document.getElementById('equipNumSerie').value = "";
    document.getElementById('equipObs').value = "";
    if (fotoInput) fotoInput.value = "";
    fotoBase64Temporaria = "";
    if (photoPreview) {
        photoPreview.style.backgroundImage = "none";
        photoPreview.innerHTML = `<i class="fa-solid fa-camera"></i><span>Adicionar Foto</span>`;
    }
}

// ==========================================================================
// SUBMIT FINAL DO FORMULÁRIO
// ==========================================================================
const formCliente = document.getElementById('formCliente');
if (formCliente) {
    formCliente.addEventListener('submit', async (e) => {
        e.preventDefault();

        const clienteCompleto = {
            cnpj: document.getElementById('cnpj').value,
            razaoSocial: document.getElementById('razaoSocial').value,
            nomeFantasia: document.getElementById('nomeFantasia').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            nomeResponsavel: document.getElementById('nomeResponsavel').value,
            cep: document.getElementById('cep').value,
            logradouro: document.getElementById('logradouro').value,
            numero: document.getElementById('numero').value,
            bairro: document.getElementById('bairro').value,
            complemento: document.getElementById('complemento').value,
            equipamentos: equipamentosCliente
        };

        try {
            const response = await fetch(API_SALVA, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clienteCompleto)
            });

            if (response.ok) {
                alert("Cliente e equipamentos salvos com sucesso!");
                window.location.href = "GestorDashboard.html";
            } else {
                alert("Erro ao salvar o cliente. Verifique os dados.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Não foi possível conectar ao servidor.");
        }
    });
}