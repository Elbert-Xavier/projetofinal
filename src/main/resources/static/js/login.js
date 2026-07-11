const API_LOGIN = 'http://localhost:8010/usuarios/login';

let revelarValor = 1;

async function revelar() {
    const revela = document.getElementById('senha');
    console.log(revela);
    
    if (revelarValor == 1) {
        revela.type = "text";
        revelarValor = 2;
    } else if (revelarValor == 2) {
        revela.type = "password";
        revelarValor = 1;
    }
}

async function logar() {
    const emailInput = document.getElementById('email').value.trim();
    const senhaInput = document.getElementById('senha').value.trim();
    
    if (!emailInput || !senhaInput) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const Usuario = {
        email: emailInput,
        senha: senhaInput
    };

    const response = await fetch(API_LOGIN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Usuario)
    });

    if (response.ok) {
        const dadosUsuario = await response.json();
        
        localStorage.setItem("usuarioLogado", JSON.stringify(dadosUsuario));
        localStorage.setItem("usuario", "logado");
		localStorage.setItem("tema", "Claro");

        if (dadosUsuario.primeiroLogin === true || dadosUsuario.primeiroLogin === 1) {
            window.location.href = `html/concluirCadastro.html?id=${dadosUsuario.id}`;
        } else if (dadosUsuario.tipoUsuario === "GESTOR") {
            window.location.href = "html/GestorDashboard.html";
        } else if (dadosUsuario.tipoUsuario === "TECNICO") {
            window.location.href = "html/tecnicoDashboard.html";
        } else if (dadosUsuario.tipoUsuario === "CLIENTE") {
            window.location.href = "html/clienteMeusChamados.html";
        } else {
            alert("Perfil de usuário não reconhecido ou sem permissões.");
        }
    } else {
        alert("E-mail ou Senha inválidos!");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    localStorage.clear();
});