const API_BUSCAR_CHAMADO = 'http://192.168.10.22:8010/chamados/listartodos';
const API_BUSCAR_CHAMADO_ID = 'http://192.168.10.22:8010/chamados/listarPorID';

document.addEventListener("DOMContentLoaded", () => {
    listarChamados();
	usuarioEstaLogado();
});

function usuarioEstaLogado(){
	const usuarioLogado = localStorage.getItem('usuarioLogado');
		console.log(usuarioLogado)
	const usuario = JSON.parse(usuarioLogado);
	console.log(usuario)
	
	if (!usuarioLogado) {
	    window.location.href = 'http://localhost:8000/login.html';
	}else{
		if(usuario.admin == false) {
			document.getElementById('CadastrarUsuario').hidden = true;
		}else{
			document.getElementById('CadastrarUsuario').hidden = false;
		}
	}
}

async function listarChamados() {
	
    const response = await fetch(API_BUSCAR_CHAMADO);
    const listaChamados = await response.json();

    console.log('RESPOSTA', response);
    console.log('JSON', listaChamados);

    const corpoTabela = document.getElementById('listaChamadosContainer');
    corpoTabela.innerHTML = ''; 

    listaChamados.forEach(Chamados => {

        const dataFmt = Chamados.dataAbertura ? Chamados.dataAbertura.split('-').reverse().join('/') : '-';
        const tecnicoNome = Chamados.tecnico ? Chamados.tecnico.nome : 'Aguardando Atribuição';
        const equipamentoTexto = Chamados.equipamento ? `${Chamados.equipamento.fabricante} ${Chamados.equipamento.modelo}` : 'N/A';
        const statusTexto = Chamados.status ? Chamados.status.toUpperCase() : 'EM ANÁLISE';
        corpoTabela.innerHTML += `	
            <button type="button" onclick="exibirModelChamado(this)" class="list-group-item list-group-item-action border rounded-3 p-3 text-start mb-2" 
                    data-id="${Chamados.id}">
                <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <div>
                        <span class="badge text-bg-light border text-secondary mb-1">#CH-${Chamados.id}</span>
                        <h3 class="h6 mb-1 fw-semibold text-dark-blue chamado-titulo">${Chamados.titulo}</h3>
                    </div>
                    <span class="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">${statusTexto}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center text-muted small mt-2 pt-2 border-top border-light">
                    <span><i class="fa-solid fa-desktop me-1"></i> ${equipamentoTexto}</span>
                    <span>Técnico: <strong>${tecnicoNome}</strong></span>
                    <span>Atua. em: ${dataFmt}</span>
                </div>
            </button>`;
    });
    console.log(corpoTabela);
}

async function exibirModelChamado(button) {
    const id = button.getAttribute('data-id');
    console.log(id);
    
    const response = await fetch(`${API_BUSCAR_CHAMADO_ID}/${id}`);
    const tabela = await response.json();
    
    console.log(tabela);
    
    const dataFmt = tabela.dataAbertura ? tabela.dataAbertura.split('-').reverse().join('/') : '-';

    document.getElementById('descricao').innerText = tabela.descricao;
    
    document.getElementById('equipamento').innerText = tabela.equipamento ? 
        `${tabela.equipamento.tipo} ${tabela.equipamento.fabricante} ${tabela.equipamento.modelo}` : 'N/A';

    document.getElementById('Tecnico').innerText = tabela.tecnico ? tabela.tecnico.nome : 'Aguardando Atribuição';
    
    document.getElementById('Status').innerText = tabela.status ? tabela.status.toUpperCase() : 'EM ANÁLISE';
    document.getElementById('data').innerText = dataFmt;

    const imgElement = document.getElementById('Imagem');
    if (tabela.urlImagem) {
        imgElement.src = `http://localhost:8000/img/${tabela.urlImagem}`;
        imgElement.style.display = 'block';
    } else {
        imgElement.style.display = 'none';
    }

    abrirModal();
}

function abrirModal() {
    const modalElement = document.getElementById('ticketModal1');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function fecharModal() {
    const modalElement = document.getElementById("ticketModal1");
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) modal.hide();
}