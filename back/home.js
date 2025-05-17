document.addEventListener("DOMContentLoaded", () => {
  const usuario = sessionStorage.getItem("user");

  if (!usuario) {
    alert("Você precisa estar logado para adicionar produtos ao carrinho.");
    return;
  }

  const usuarioLink = document.getElementById("usuario-link");
  const nomeUsuarioElement = document.getElementById("nome-usuario");

  if (usuario) {
    nomeUsuarioElement.textContent = usuario; 
    usuarioLink.setAttribute("href", "./perfil.html"); 
  } else {
    nomeUsuarioElement.textContent = "Login";
    usuarioLink.setAttribute("href", "./login.html");
  }

  const chaveCarrinho = `carrinho-${usuario}`;
  const botoesCarrinho = document.querySelectorAll(".icon-add-carrinho");
  const botoesComprar = document.querySelectorAll(".btn-comprar");

  botoesCarrinho.forEach(botao => {
    botao.addEventListener("click", (e) => {
      e.preventDefault();

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
