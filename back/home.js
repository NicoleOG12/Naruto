document.addEventListener("DOMContentLoaded", () => {
  const usuario = sessionStorage.getItem("user");

  if (!usuario) {
    alert("Você precisa estar logado para adicionar produtos ao carrinho.");
    return;
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
      const produto = {
        nome,
        preco,
        usuario: usuario 
      };

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
      const produto = {
        nome,
        preco,
        usuario: usuario 
      };

      let comprar = JSON.parse(localStorage.getItem(chaveCarrinho)) || [];
      comprar.push(produto);

      localStorage.setItem(chaveCarrinho, JSON.stringify(comprar));

      window.location.href = 'carrinho.html'; 
      alert("Aperte finalizar compra para concluir o pagamento!");
      return;
    });
  });
});
