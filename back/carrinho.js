document.addEventListener("DOMContentLoaded", () => {
  //recupera o usuário logado do localStorage
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  // se não encontrar um usuário logado, exibe um alerta e interrompe o processo
  if (!usuario) {
    alert("você precisa estar logado para acessar o carrinho.");
    return;
  }

  // pega os elementos do DOM para manipulação
  const nomeUsuarioElement = document.getElementById("nome-usuario");
  const usuarioLink = document.getElementById("usuario-link");
  const profileModal = document.getElementById("profileModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const deleteAccountBtn = document.getElementById("deleteAccountBtn");

  // exibe o nome do usuário no cabeçalho e altera o link para o perfil
  nomeUsuarioElement.textContent = usuario.nome;
  usuarioLink.setAttribute("href", "perfil.html");

  // abre o modal do perfil quando o link do usuário for clicado
  usuarioLink.addEventListener("click", (e) => {
    e.preventDefault();
    if (usuario) {
      document.getElementById("usuario-nome").textContent = usuario.nome;
      document.getElementById("usuario-email").textContent = usuario.email;
      $(profileModal).modal('show');  // exibe o modal com as informações
    }
  });

  // fecha o modal do perfil
  closeModalBtn.addEventListener("click", () => {
    $(profileModal).modal('hide');
  });

  // evento para deslogar o usuário
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    sessionStorage.removeItem("usuarioLogado");

    alert("você foi desconectado.");
    nomeUsuarioElement.textContent = "Login";  // volta o texto do nome para "Login"
    usuarioLink.setAttribute("href", "login.html");  // altera o link para a página de login
    window.location.href = "login.html";  // redireciona para a página de login
  });

  // evento para excluir a conta do usuário
  deleteAccountBtn.addEventListener("click", () => {
    const confirma = confirm("tem certeza que deseja excluir sua conta?");
    if (confirma) {
      localStorage.removeItem("usuarioLogado");
      sessionStorage.removeItem("usuarioLogado");

      alert("conta excluída.");
      nomeUsuarioElement.textContent = "Login";  // volta o texto do nome para "Login"
      usuarioLink.setAttribute("href", "login.html");  // altera o link para a página de login
      window.location.href = "login.html";  // redireciona para a página de login
    }
  });

  // cria a chave única para o carrinho do usuário
  const chaveCarrinho = `carrinho-${usuario.nome}`;
  const tbody = document.getElementById("carrinho-body");
  const totalElement = document.getElementById("total-geral");
  const finalizarCompraBtn = document.querySelector(".btn.btn-primary");

  // formata o preço 
  function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  // atualiza o total do carrinho
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

    totalElement.textContent = `total: ${formatarPreco(totalGeral)}`;
  }

  // carrega os itens do carrinho do localStorage
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
          <button class="btn btn-danger btn-remover" data-index="${index}">remover</button>
        </td>
      `;

      tbody.appendChild(tr);
    });

    atualizarTotal();
  }

  // exibe o modal de pagamento quando clicar no botão "finalizar compra"
  if (finalizarCompraBtn) {
    finalizarCompraBtn.addEventListener("click", () => {
      $('#modalPagamento').modal('show');
    });
  }

  // atualiza o total do carrinho quando a quantidade de um item é alterada
  tbody.addEventListener("input", (e) => {
    if (e.target.classList.contains("quantidade")) {
      atualizarTotal();
    }
  });

  // remove um item do carrinho quando o botão "remover" for clicado
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

  // botões de pagamento
  const botaoPix = document.getElementById("pagamentoPix");
  const botaoCartao = document.getElementById("pagamentoCartao");
  const botaoBoleto = document.getElementById("pagamentoBoleto");
  const mensagemSucesso = document.getElementById("mensagem-sucesso");

  // exibe uma mensagem de sucesso após o pagamento
  function exibirModalSucesso(metodo) {
    const nomeUsuario = usuario.nome || "usuário";
    const totalTexto = totalElement.textContent;
    $('#modalPagamento').modal('hide');

    mensagemSucesso.innerHTML = `
      <p><strong>nome:</strong> ${nomeUsuario}</p>
      <p><strong>forma de pagamento:</strong> ${metodo}</p>
      <p><strong>${totalTexto}</strong></p>
      <p class="mt-3">obrigado pela sua compra! 🧡💛</p>
    `;

    $('#modalSucesso').modal('show');

    // limpa o carrinho após a compra
    localStorage.removeItem(chaveCarrinho);
    setTimeout(() => {
      carregarCarrinho();
    }, 500);
  }

  // eventos para os botões de pagamento
  botaoPix.addEventListener("click", () => exibirModalSucesso("Pix"));
  botaoCartao.addEventListener("click", () => exibirModalSucesso("Cartão de Crédito"));
  botaoBoleto.addEventListener("click", () => exibirModalSucesso("Boleto"));
});
