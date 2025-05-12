document.addEventListener("DOMContentLoaded", () => {
    const botoesCarrinho = document.querySelectorAll(".icon-add-carrinho");
    
    botoesCarrinho.forEach(botao => {
      botao.addEventListener("click", (e) => {
        e.preventDefault(); 
    
        const item = botao.closest(".item");
        const nome = item.querySelector(".nome-produto").textContent.trim();
        const preco = item.querySelector(".preco-produto").textContent.trim();
    
        const produto = { nome, preco };
    
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        carrinho.push(produto);

        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    
        alert("Produto adicionado ao carrinho!");
      });
    });
  });

