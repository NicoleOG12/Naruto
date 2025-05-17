document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (usuario) {
        const nomeUsuario = usuario.nome || "Usuário";
        const loginLink = document.querySelector("#usuario-link");

        loginLink.innerHTML = `
            <div class="user">
                <div class="userp">
                    <p>${nomeUsuario}</p>
                </div>
                <i class="fas fa-user"></i>
            </div>
        `;
    }
});
