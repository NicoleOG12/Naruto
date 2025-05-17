document.addEventListener("DOMContentLoaded", () => {
  const usuario = sessionStorage.getItem("user");
  const banco = JSON.parse(localStorage.getItem("banco"));

  const usuarioLink = document.getElementById("usuario-link");
  const nomeUsuarioElement = document.getElementById("nome-usuario");
  const profileModal = document.getElementById("profileModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const deleteAccountBtn = document.getElementById("deleteAccountBtn");

  if (usuario) {
    const usuarioLogado = banco.find(u => u.nome === usuario);

    if (usuarioLogado) {
      nomeUsuarioElement.textContent = usuario;

      usuarioLink.addEventListener("click", (e) => {
        e.preventDefault();
        if (usuarioLogado) {
          document.getElementById("usuario-nome").textContent = usuarioLogado.nome;
          document.getElementById("usuario-email").textContent = usuarioLogado.email;
          $(profileModal).modal('show');
        }
      });
    } else {
      alert("Usuário não encontrado no banco de dados.");
    }
  } else {
    nomeUsuarioElement.textContent = "Login";
    usuarioLink.setAttribute("href", "login.html");
  }

  closeModalBtn.addEventListener("click", () => {
    $(profileModal).modal('hide');
  });

  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("usuarioLogado");

    alert("Você foi desconectado.");
    nomeUsuarioElement.textContent = "Login";
    usuarioLink.setAttribute("href", "login.html");

    window.location.href = "login.html";
  });

  deleteAccountBtn.addEventListener("click", () => {
    const confirma = confirm("Tem certeza que deseja excluir sua conta?");
    if (confirma) {
      sessionStorage.removeItem("user");
      localStorage.removeItem("usuarioLogado");

      const usuarioIndex = banco.findIndex(u => u.nome === usuario);
      if (usuarioIndex !== -1) {
        banco.splice(usuarioIndex, 1);
        localStorage.setItem("banco", JSON.stringify(banco));
      }

      alert("Conta excluída.");
      nomeUsuarioElement.textContent = "Login";
      usuarioLink.setAttribute("href", "login.html");

      window.location.href = "login.html";
    }
  });

  const chaveCarrinho = `carrinho-${usuario}`;
  const botoesCarrinho = document.querySelectorAll(".icon-add-carrinho");
  const botoesComprar = document.querySelectorAll(".btn-comprar");

  botoesCarrinho.forEach(botao => {
    botao.addEventListener("click", (e) => {
      e.preventDefault();

      if (!usuario) {
        alert("Você precisa estar logado para adicionar produtos ao carrinho.");
        return;
      }

      const item = botao.closest(".item");
      const nome = item.querySelector(".nome-produto").textContent.trim();
      const preco = item.querySelector(".preco-produto").textContent.trim();
      const produto = { nome, preco, usuario };

      let carrinho = JSON.parse(localStorage.getItem(chaveCarrinho)) || [];
      carrinho.push(produto);

      localStorage.setItem(chaveCarrinho, JSON.stringify(carrinho));

      alert("Produto adicionado ao carrinho!");
    });
  });

  botoesComprar.forEach(botao => {
    botao.addEventListener("click", (e) => {
      e.preventDefault();

      if (!usuario) {
        alert("Você precisa estar logado para realizar a compra.");
        return;
      }

      const item = botao.closest(".item");
      const nome = item.querySelector(".nome-produto").textContent.trim();
      const preco = item.querySelector(".preco-produto").textContent.trim();
      const produto = { nome, preco, usuario };

      let comprar = JSON.parse(localStorage.getItem(chaveCarrinho)) || [];
      comprar.push(produto);

      localStorage.setItem(chaveCarrinho, JSON.stringify(comprar));

      window.location.href = 'carrinho.html';
      alert("Aperte finalizar compra para concluir o pagamento!");
      return;
    });
  });
});
