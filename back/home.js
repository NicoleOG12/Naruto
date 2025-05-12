document.addEventListener("DOMContentLoaded", () => {
  const usuario = localStorage.getItem("usuarioLogado");

  if (!usuario) {
    alert("Você precisa estar logado para adicionar produtos ao carrinho.");
    return;
  }

  const chaveCarrinho = `carrinho-${usuario}`;
  const botoesCarrinho = document.querySelectorAll(".icon-add-carrinho");

  botoesCarrinho.forEach(botao => {
    botao.addEventListener("click", (e) => {
      e.preventDefault(); 

      const item = botao.closest(".item");
      const nome = item.querySelector(".nome-produto").textContent.trim();
      const preco = item.querySelector(".preco-produto").textContent.trim();

      const produto = { nome, preco };

      let carrinho = JSON.parse(localStorage.getItem(chaveCarrinho)) || [];

      carrinho.push(produto);

      localStorage.setItem(chaveCarrinho, JSON.stringify(carrinho));

      alert("Produto adicionado ao carrinho!");
    });
  });
});
