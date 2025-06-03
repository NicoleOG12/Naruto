document.addEventListener("DOMContentLoaded", () => {
  // pega o nome do usuário logado da sessionStorage
  const usuario = sessionStorage.getItem("user");
  
  // pega o usuarios de usuários do localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios"));

  // pega os elementos da página que serão manipulados
  const usuarioLink = document.getElementById("usuario-link");
  const nomeUsuarioElement = document.getElementById("nome-usuario");
  const profileModal = document.getElementById("profileModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const deleteAccountBtn = document.getElementById("deleteAccountBtn");

  // se o usuário estiver logado
  if (usuario) {
    // procura o usuário no localStorage
    const usuarioLogado = usuarios.find(u => u.nome === usuario);

    // se o usuário for encontrado
    if (usuarioLogado) {
      // exibe o nome do usuário na página
      nomeUsuarioElement.textContent = usuario;

      // quando o link do usuário for clicado, exibe o modal com as informações do perfil
      usuarioLink.addEventListener("click", (e) => {
        e.preventDefault();  // evita o comportamento padrão do link
        if (usuarioLogado) {
          document.getElementById("usuario-nome").textContent = usuarioLogado.nome;
          document.getElementById("usuario-email").textContent = usuarioLogado.email;
          $(profileModal).modal('show');  // abre o modal
        }
      });
    } else {
      alert("usuário não encontrado no banco de dados.");
    }
  } else {
    // se não houver usuário logado, exibe "Login" e direciona o link para a página de login
    nomeUsuarioElement.textContent = "Login";
    usuarioLink.setAttribute("href", "login.html");
  }

  // fecha o modal do perfil
  closeModalBtn.addEventListener("click", () => {
    $(profileModal).modal('hide');
  });

  // evento para deslogar o usuário
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("user");  // remove o usuário da sessionStorage
    localStorage.removeItem("usuarioLogado");  // remove o usuário do localStorage

    alert("você foi desconectado.");
    nomeUsuarioElement.textContent = "Login";  // volta o nome do usuário para "Login"
    usuarioLink.setAttribute("href", "login.html");  // altera o link para a página de login

    window.location.href = "login.html";  // redireciona para a página de login
  });

  // evento para excluir a conta do usuário
  deleteAccountBtn.addEventListener("click", () => {
    const confirma = confirm("tem certeza que deseja excluir sua conta?");
    if (confirma) {
      sessionStorage.removeItem("user");  // remove o usuário da sessionStorage
      localStorage.removeItem("usuarioLogado");  // remove o usuário do localStorage

      // encontra o índice do usuário no usuarios de dados e o remove
      const usuarioIndex = usuarios.findIndex(u => u.nome === usuario);
      if (usuarioIndex !== -1) {
        usuarios.splice(usuarioIndex, 1);  // remove o usuário
        localStorage.setItem("usuarios", JSON.stringify(usuarios));  // atualiza o banco no localStorage
      }

      alert("conta excluída.");
      nomeUsuarioElement.textContent = "Login";  // volta o nome para "Login"
      usuarioLink.setAttribute("href", "login.html");  // altera o link para a página de login

      window.location.href = "login.html";  // redireciona para a página de login
    }
  });

  // cria uma chave única para o carrinho do usuário no localStorage
  const chaveCarrinho = `carrinho-${usuario}`;
  
  // pega todos os botões para adicionar produtos ao carrinho
  const botoesCarrinho = document.querySelectorAll(".icon-add-carrinho");

  // pega todos os botões de "comprar"
  const botoesComprar = document.querySelectorAll(".btn-comprar");

  // adiciona um produto ao carrinho quando o botão de adicionar for clicado
  botoesCarrinho.forEach(botao => {
    botao.addEventListener("click", (e) => {
      e.preventDefault(); 

      // verifica se o usuário está logado
      if (!usuario) {
        alert("você precisa estar logado para adicionar produtos ao carrinho.");
        return;
      }

      // pega as informações do produto 
      const item = botao.closest(".item");
      const nome = item.querySelector(".nome-produto").textContent.trim();
      const preco = item.querySelector(".preco-produto").textContent.trim();
      const produto = { nome, preco, usuario };

      // carrega o carrinho do usuário ou cria um novo carrinho
      let carrinho = JSON.parse(localStorage.getItem(chaveCarrinho)) || [];
      carrinho.push(produto);  // adiciona o novo produto ao carrinho

      // salva o carrinho atualizado no localStorage
      localStorage.setItem(chaveCarrinho, JSON.stringify(carrinho));

      alert("produto adicionado ao carrinho!");
    });
  });

  // adiciona um produto ao carrinho e redireciona para a página de carrinho quando o botão "comprar" for clicado
  botoesComprar.forEach(botao => {
    botao.addEventListener("click", (e) => {
      e.preventDefault(); 

      // verifica se o usuário está logado
      if (!usuario) {
        alert("você precisa estar logado para realizar a compra.");
        return;
      }

      // pega as informações do produto (nome e preço)
      const item = botao.closest(".item");
      const nome = item.querySelector(".nome-produto").textContent.trim();
      const preco = item.querySelector(".preco-produto").textContent.trim();
      const produto = { nome, preco, usuario };

      // carrega o carrinho de compras
      let comprar = JSON.parse(localStorage.getItem(chaveCarrinho)) || [];
      comprar.push(produto);  // adiciona o produto ao carrinho

      // salva o carrinho atualizado no localStorage
      localStorage.setItem(chaveCarrinho, JSON.stringify(comprar));

      window.location.href = 'carrinho.html';  // redireciona para a página de carrinho
      alert("aperte finalizar compra para concluir o pagamento!"); 
      return;
    });
  });
});
