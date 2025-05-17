document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!usuario) {
    alert("Você precisa estar logado para acessar o carrinho.");
    window.location.href = "login.html";
    return;
  }

  const nomeUsuarioElement = document.getElementById("nome-usuario");
  const usuarioLink = document.getElementById("usuario-link");
  const profileModal = document.getElementById("profileModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const deleteAccountBtn = document.getElementById("deleteAccountBtn");

  nomeUsuarioElement.textContent = usuario.nome;
  usuarioLink.setAttribute("href", "perfil.html");

  usuarioLink.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("usuario-nome").textContent = usuario.nome;
    document.getElementById("usuario-email").textContent = usuario.email;
    $(profileModal).modal('show');
  });

  closeModalBtn.addEventListener("click", () => {
    $(profileModal).modal('hide');
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    alert("Você foi desconectado.");
    window.location.href = "login.html";
  });

  deleteAccountBtn.addEventListener("click", () => {
    const confirma = confirm("Tem certeza que deseja excluir sua conta?");
    if (confirma) {
      localStorage.removeItem("usuarioLogado");
      alert("Conta excluída.");
      window.location.href = "login.html";
    }
  });

  const chaveCarrinho = `carrinho-${usuario.nome}`;
  const tbody = document.getElementById("carrinho-body");
  const totalElement = document.getElementById("total-geral");
  const finalizarCompraBtn = document.querySelector(".btn.btn-primary");

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
    const carrinho = JSON.parse(localStorage.getItem(chaveCarrinho)) || [];
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

  if (finalizarCompraBtn) {
    finalizarCompraBtn.addEventListener("click", () => {
      $('#modalPagamento').modal('show');
    });
  }

  tbody.addEventListener("input", (e) => {
    if (e.target.classList.contains("quantidade")) {
      atualizarTotal();
    }
  });

  tbody.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-remover")) {
      const index = parseInt(e.target.dataset.index);
      let carrinho = JSON.parse(localStorage.getItem(chaveCarrinho)) || [];
      carrinho.splice(index, 1);
      localStorage.setItem(chaveCarrinho, JSON.stringify(carrinho));
      carregarCarrinho();
    }
  });

  carregarCarrinho();

  const botaoPix = document.getElementById("pagamentoPix");
  const botaoCartao = document.getElementById("pagamentoCartao");
  const botaoBoleto = document.getElementById("pagamentoBoleto");
  const mensagemSucesso = document.getElementById("mensagem-sucesso");

  function exibirModalSucesso(metodo) {
    const nomeUsuario = usuario.nome || "Usuário"; 
    const totalTexto = totalElement.textContent;
    $('#modalPagamento').modal('hide');

    mensagemSucesso.innerHTML = `
      <p><strong>Nome:</strong> ${nomeUsuario}</p>
      <p><strong>Forma de Pagamento:</strong> ${metodo}</p>
      <p><strong>${totalTexto}</strong></p>
      <p class="mt-3">Obrigado pela sua compra! 🧡💛</p>
    `;

    $('#modalSucesso').modal('show');

    localStorage.removeItem(chaveCarrinho);
    setTimeout(() => {
      carregarCarrinho();
    }, 500);
  }

  botaoPix.addEventListener("click", () => exibirModalSucesso("Pix"));
  botaoCartao.addEventListener("click", () => exibirModalSucesso("Cartão de Crédito"));
  botaoBoleto.addEventListener("click", () => exibirModalSucesso("Boleto"));
});
