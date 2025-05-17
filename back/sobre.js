document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    const loginLink = document.querySelector("#usuario-link");

    if (usuario) {
        const nomeUsuario = usuario.nome || "Usuário";

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

        const logoutBtn = document.getElementById("logoutBtn");
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogado");
            alert("Você foi desconectado.");
            window.location.href = "login.html";
        });

        const deleteAccountBtn = document.getElementById("deleteAccountBtn");
        deleteAccountBtn.addEventListener("click", () => {
            const confirma = confirm("Tem certeza que deseja excluir sua conta?");
            if (confirma) {
                localStorage.removeItem("usuarioLogado");
                alert("Conta excluída.");
                window.location.href = "login.html";
            }
        });
    } else {
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
