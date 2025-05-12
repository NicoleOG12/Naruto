document.addEventListener("DOMContentLoaded", () => {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const tbody = document.getElementById("carrinho-body");
  const totalElement = document.getElementById("total-geral");

  function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function atualizarTotal() {
    const linhas = document.querySelectorAll("#carrinho-body tr");
    let totalGeral = 0;

    linhas.forEach(linha => {
      const preco = parseFloat(linha.dataset.preco);
      const quantidade = parseInt(linha.querySelector(".quantidade").value);
      const total = preco * quantidade;
      linha.querySelector(".total-item").textContent = formatarPreco(total);
      totalGeral += total;
    });

    totalElement.textContent = `Total: ${formatarPreco(totalGeral)}`;
  }

  function carregarCarrinho() {
    tbody.innerHTML = "";

    carrinho.forEach((produto, index) => {
      const preco = parseFloat(produto.preco.replace("R$", "").replace(",", "."));
      const tr = document.createElement("tr");
      tr.dataset.preco = preco;

      tr.innerHTML = `
        <td>${produto.nome}</td>
        <td>${produto.preco}</td>
        <td>
          <input type="number" class="form-control quantidade" value="1" min="1" data-index="${index}">
        </td>
        <td class="total-item">${produto.preco}</td>
        <td>
          <button class="btn btn-danger btn-remover" data-index="${index}">Remover</button>
        </td>
      `;

      tbody.appendChild(tr);
    });

    atualizarTotal();
  }

  tbody.addEventListener("input", (e) => {
    if (e.target.classList.contains("quantidade")) {
      atualizarTotal();
    }
  });

  tbody.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-remover")) {
      const index = parseInt(e.target.dataset.index);
      carrinho.splice(index, 1);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      carregarCarrinho();
    }
  });

  carregarCarrinho();
});
