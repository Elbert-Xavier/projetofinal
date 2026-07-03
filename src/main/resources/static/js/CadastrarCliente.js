const API_SALVAR_CLIENTE = 'http://localhost:8000/clientes/salvar';
const API_SALVAR_EQUIPAMENTO = 'http://localhost:8000/equipamentos/salvar';
const API_BUSCAR_CEP = 'https://viacep.com.br/ws';

let listaEquipamentos = [];
let fotoTemporaria = "";

document.getElementById('cep').addEventListener('blur', async function() {
    let cep = this.value.replace(/\D/g, ''); 

    if (cep.length === 8) {
        document.getElementById('logradouro').value = "Buscando...";
        document.getElementById('bairro').value = "Buscando...";
        document.getElementById('cidade').value = "Buscando...";
        document.getElementById('uf').value = "...";

        const response = await fetch(`${API_BUSCAR_CEP}/${cep}/json/`);
        const dados = await response.json();

        if (dados && !dados.erro) {
            document.getElementById('logradouro').value = dados.logradouro;
            document.getElementById('bairro').value = dados.bairro;
            document.getElementById('cidade').value = dados.localidade;
            document.getElementById('uf').value = dados.uf;
            document.getElementById('numero').focus(); 
        } else {
            alert("CEP não encontrado! Digite o endereço manualmente.");
            limparCamposEndereco();
        }
    }
});

function limparCamposEndereco() {
    document.getElementById('logradouro').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('uf').value = "";
}

window.abrirModalEquipamento = function(e) {
    e.preventDefault();
    document.getElementById('modalEquipamento').style.display = 'flex';
};

window.fecharModalEquipamento = function(e) {
    if (e) e.preventDefault();
    document.getElementById('modalEquipamento').style.display = 'none';
    
    document.getElementById('equipTipo').value = '';
    document.getElementById('equipFabricante').value = '';
    document.getElementById('equipModelo').value = '';
    document.getElementById('equipNumSerie').value = '';
    document.getElementById('equipObs').value = '';
    
    fotoTemporaria = "";
    document.getElementById('photoPreview').innerHTML = '<i class="fa-solid fa-camera"></i><span>Adicionar Foto</span>';
    document.getElementById('equipFotoInput').value = '';
};

document.getElementById('equipFotoInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            fotoTemporaria = event.target.result;
            document.getElementById('photoPreview').innerHTML = `<img src="${fotoTemporaria}" style="width:100%; height:100%; object-fit:cover; border-radius:8px;">`;
        };
        reader.readAsDataURL(file);
    }
});

window.salvarEquipamentoNaLista = function(e) {
    e.preventDefault();

    const tipo = document.getElementById('equipTipo').value;
    const fabricante = document.getElementById('equipFabricante').value;
    const modelo = document.getElementById('equipModelo').value;
    const numeroSerie = document.getElementById('equipNumSerie').value;
    const observacao = document.getElementById('equipObs').value;

    if (!tipo || !fabricante || !modelo) {
        alert("Preencha Tipo, Fabricante e Modelo do equipamento!");
        return;
    }

    const novoEquipamento = { tipo, fabricante, modelo, numeroSerie, observacao, fotoBase64: fotoTemporaria };

    listaEquipamentos.push(novoEquipamento);
    atualizarListaNaTela();
    fecharModalEquipamento();
};

function atualizarListaNaTela() {
    const divLista = document.getElementById('equipamentosLista');
    
    if (listaEquipamentos.length === 0) {
        divLista.innerHTML = '<div class="empty-state-equip"><i class="fa-regular fa-image"></i> Nenhum equipamento adicionado ainda.</div>';
        return;
    }

    divLista.innerHTML = ''; 

    listaEquipamentos.forEach((equip, index) => {
        divLista.innerHTML += `
            <div style="background: #f8fafc; padding: 10px; border: 1px solid #e2e8f0; margin-bottom: 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>${equip.tipo} ${equip.fabricante} ${equip.modelo}</strong><br>
                    <small>Série: ${equip.numeroSerie || 'N/A'} - Local: ${equip.observacao || 'N/A'}</small>
                </div>
                <button type="button" onclick="removerEquipamento(${index})" style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });
}

window.removerEquipamento = function(index) {
    listaEquipamentos.splice(index, 1);
    atualizarListaNaTela();
};

document.getElementById('formCliente').addEventListener('submit', async function(e) {
    e.preventDefault();

    const clientePayload = {
        cnpj: document.getElementById('cnpj').value,
        razaoSocial: document.getElementById('razaoSocial').value,
        nomeFantasia: document.getElementById('nomeFantasia').value,
        emailResponsavel: document.getElementById('email').value,
        telefoneResponsavel: document.getElementById('telefone').value,
        nomeResponsavel: document.getElementById('nomeResponsavel').value,
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value, 
        uf: document.getElementById('uf').value 
    };

    const response = await fetch(API_SALVAR_CLIENTE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientePayload)
    });

    if (response.ok) {
        const clienteSalvo = await response.json();

        if (listaEquipamentos.length > 0) {
            if (clienteSalvo && clienteSalvo.id) {
                await salvarEquipamentos(clienteSalvo.id);
            } else {
                alert("Cliente salvo! O back-end não retornou o ID, então os equipamentos não puderam ser vinculados.");
                window.location.href = "cliente.html";
            }
        } else {
            alert("Cliente salvo com sucesso!");
            window.location.href = "cliente.html"; 
        }
    } else {
        alert("Erro ao salvar o cliente. Verifique se o CNPJ/E-mail já existem.");
    }
});

async function salvarEquipamentos(idCliente) {
    let erros = 0;

    for (let equip of listaEquipamentos) {
        equip.cliente = { id: idCliente };

        const response = await fetch(API_SALVAR_EQUIPAMENTO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(equip)
        });

        if (!response.ok) {
            erros++;
        }
    }

    if (erros === 0) {
        alert("Cliente e Equipamentos salvos com sucesso!");
    } else {
        alert(`Cliente salvo, mas houve erro ao salvar ${erros} equipamento(s).`);
    }
    
    window.location.href = "cliente.html";
}