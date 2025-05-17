// espera o conteúdo da página ser totalmente carregado antes de executar a função
document.addEventListener("DOMContentLoaded", () => {
    // pega o usuário logado armazenado no localStorage
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    // seleciona o link que será usado para exibir as informações do usuário
    const loginLink = document.querySelector("#usuario-link");

    // se o usuário estiver logado 
    if (usuario) {
        // pega o nome do usuário, se houver, ou coloca "Usuário" como padrão
        const nomeUsuario = usuario.nome || "Usuário";

        // modifica o conteúdo HTML do link de login para exibir o nome do usuário e um ícone de usuário
        loginLink.innerHTML = `
            <div class="user">
                <div class="userp">
                    <p>${nomeUsuario}</p>
                </div>
                <i class="fas fa-user"></i>
            </div>
        `;

        // seleciona o modal de perfil 
        const profileModal = document.getElementById("profileModal");
        // seleciona o botão para fechar o modal de perfil
        const closeModalBtn = document.getElementById("closeModalBtn");

        // adiciona um evento de clique ao link de login
        loginLink.addEventListener("click", (e) => {
            e.preventDefault();  // previne o comportamento padrão do link
            // preenche os campos do modal com as informações do usuário
            document.getElementById("usuario-nome").textContent = usuario.nome;
            document.getElementById("usuario-email").textContent = usuario.email;
            // abre o modal de perfil
            $(profileModal).modal('show');
        });

        // adiciona um evento de clique ao botão de fechar do modal
        closeModalBtn.addEventListener("click", () => {
            // fecha o modal de perfil
            $(profileModal).modal('hide');
        });

        // seleciona o botão de logout
        const logoutBtn = document.getElementById("logoutBtn");
        // adiciona um evento de clique para desconectar o usuário
        logoutBtn.addEventListener("click", () => {
            // remove as informações do usuário logado do localStorage
            localStorage.removeItem("usuarioLogado");
            alert("Você foi desconectado.");
            window.location.href = "login.html";
        });

        // seleciona o botão de excluir conta
        const deleteAccountBtn = document.getElementById("deleteAccountBtn");
        // adiciona um evento de clique para excluir a conta do usuário
        deleteAccountBtn.addEventListener("click", () => {
            // confirma se o usuário realmente quer excluir a conta
            const confirma = confirm("Tem certeza que deseja excluir sua conta?");
            if (confirma) {
                // remove as informações do usuário logado do localStorage
                localStorage.removeItem("usuarioLogado");
                alert("Conta excluída.");
                window.location.href = "login.html";
            }
        });
    } else {
        // se não houver usuário logado, o conteúdo do link de login será "Login" e o link será direcionado para a página de login
        loginLink.innerHTML = `
            <div class="user">
                <div class="userp">
                    <p>Login</p>
                </div>
                <i class="fas fa-user"></i>
            </div>
        `;
        loginLink.setAttribute("href", "login.html"); 
    }
});
