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

        const profileModal = document.getElementById("profileModal");
        const closeModalBtn = document.getElementById("closeModalBtn");

        loginLink.addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("usuario-nome").textContent = usuario.nome;
            document.getElementById("usuario-email").textContent = usuario.email;
            $(profileModal).modal('show');
        });

        closeModalBtn.addEventListener("click", () => {
            $(profileModal).modal('hide');
        });
    } else {
        const loginLink = document.querySelector("#usuario-link");
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
