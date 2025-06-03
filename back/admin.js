// espera o conteúdo da página ser totalmente carregado antes de executar a função
document.addEventListener("DOMContentLoaded", () => {
    // pega o usuário logado armazenado no localStorage
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    // seleciona o link que será usado para exibir as informações do usuário
    const loginLink = document.querySelector("#usuario-link");

    // se o usuário estiver logado 
    if (usuario) {
        // pega o nome do usuário, se houver, ou coloca "Usuário" como padrão
        const nomeUsuario = usuario.nome || "Usuário";

        // modifica o conteúdo HTML do link de login para exibir o nome do usuário e um ícone de usuário
        loginLink.innerHTML = `
            <div class="user">
                <div class="userp">
                    <p>${nomeUsuario}</p>
                </div>
                <i class="fas fa-user"></i>
            </div>
        `;

        // seleciona o modal de perfil 
        const profileModal = document.getElementById("profileModal");
        // seleciona o botão para fechar o modal de perfil
        const closeModalBtn = document.getElementById("closeModalBtn");

        // adiciona um evento de clique ao link de login
        loginLink.addEventListener("click", (e) => {
            e.preventDefault();  // previne o comportamento padrão do link
            // preenche os campos do modal com as informações do usuário
            document.getElementById("usuario-nome").textContent = usuario.nome;
            document.getElementById("usuario-email").textContent = usuario.email;
            // abre o modal de perfil
            $(profileModal).modal('show');
        });

        // adiciona um evento de clique ao botão de fechar do modal
        closeModalBtn.addEventListener("click", () => {
            // fecha o modal de perfil
            $(profileModal).modal('hide');
        });

        // seleciona o botão de logout
        const logoutBtn = document.getElementById("logoutBtn");
        // adiciona um evento de clique para desconectar o usuário
        logoutBtn.addEventListener("click", () => {
            // remove as informações do usuário logado do localStorage
            localStorage.removeItem("usuarioLogado");
            alert("Você foi desconectado.");
            window.location.href = "login.html";
        });

        // seleciona o botão de excluir conta
        const deleteAccountBtn = document.getElementById("deleteAccountBtn");
        // adiciona um evento de clique para excluir a conta do usuário
        deleteAccountBtn.addEventListener("click", () => {
            // confirma se o usuário realmente quer excluir a conta
            const confirma = confirm("Tem certeza que deseja excluir sua conta?");
            if (confirma) {
                // remove as informações do usuário logado do localStorage
                localStorage.removeItem("usuarioLogado");
                alert("Conta excluída.");
                window.location.href = "login.html";
            }
        });
    } else {
        // se não houver usuário logado, o conteúdo do link de login será "Login" e o link será direcionado para a página de login
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

// função que inicializa os dados de usuários no localStorage caso não existam
function produtos() {
    // Verifica se já existe um banco de dados no localStorage
    if (!localStorage.getItem('produtos')) {
        // Se não houver, cria um banco de dados padrão com alguns produtos
        const produtos = [
            {id: 1, nome: "Funko Pop Naruto as Nine Tails", preco: 330.00, imagem: "./img/funko-pop-naruto.jpg"},
            {id: 2, nome: "Funko Pop Tsunade", preco: 145.00, imagem: "img/tsunade.webp"},
            {id: 3, nome: "Funko Pop Deidara", preco: 114.00, imagem: "img/deidara.jpg"},
            {id: 4, nome: "Funko Pop Gaara", preco: 189.00, imagem: "img/gaara.webp"},
            {id: 5, nome: "Funko Pop Sakura", preco: 150.00, imagem: "img/sakura.webp"},
            {id: 6, nome: "Funko Pop Sasuke", preco: 206.00, imagem: "img/sasuke.webp"},
            {id: 7, nome: "Funko Pop Pain", preco: 152.00, imagem: "img/pain.webp"},
            {id: 8, nome: "Funko Pop Naruto Gamakichi", preco: 499.00, imagem: "img/naruto-on-gamakichi.webp"},
            {id: 9, nome: "Funko Pop Kakuzu", preco: 206.00, imagem: "./img/kakuzu.png"},
            {id: 10, nome: "Funko Pop Orochimaru Akatsuki", preco: 149.00, imagem: "img/orochimaru akatsuki.png"},
            {id: 11, nome: "Funko Pop Tobi", preco: 164.00, imagem: "img/tobi.png"},
            {id: 12, nome: "Funko Pop Zetsu", preco: 229.00, imagem: "img/zetsu.png"}
        ];

        // Salva produtos no localStorage
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }
}

function cadastrarProduto() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    // Coleta dados do formulário
    const imagem = document.querySelector('#imagemProduto').value;
    const nome = document.querySelector('#nomeProduto').value;
    const preco = parseFloat(document.querySelector('#precoProduto').value);

    // Validação simples
    if (!imagem || !nome || isNaN(preco)) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    // Gera novo ID com base no último ID existente
    const ultimoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) : 0;
    const novoProduto = {
        id: ultimoId + 1,
        nome: nome,
        preco: preco,
        imagem: imagem
    };

    // Adiciona e salva no localStorage
    produtos.push(novoProduto);
    localStorage.setItem('produtos', JSON.stringify(produtos));

    // Limpa campos
    document.querySelector('#imagemProduto').value = '';
    document.querySelector('#nomeProduto').value = '';
    document.querySelector('#precoProduto').value = '';

    alert("Produto cadastrado com sucesso!");
    listarProdutos();
}

function buscarProduto() {
    const termo = document.querySelector('#buscarProduto').value.toLowerCase();
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const resultados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termo)
    );

    const tabela = document.querySelector('#tb-produto');
    tabela.innerHTML = '';

    // Exibe resultados ou mensagem de nenhum produto encontrado
    if (resultados.length > 0) {
        resultados.forEach(produto => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${produto.id}</td>
                <td><img src="${produto.imagem}" width="50"></td>
                <td>${produto.nome}</td>
                <td>R$ ${produto.preco.toFixed(2)}</td>
                <td>
                    <button onclick="editarProduto(${produto.id})">Editar</button>
                    <button onclick="excluirProduto(${produto.id})">Excluir</button>
                </td>
            `;
            tabela.appendChild(linha);
        });
    } else {
        const linha = document.createElement('tr');
        linha.innerHTML = `<td colspan="5">Nenhum produto encontrado.</td>`;
        tabela.appendChild(linha);
    }
}

function listarProdutos() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const tabela = document.querySelector('#tb-produto');
    tabela.innerHTML = '';

    produtos.forEach(produto => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${produto.id}</td>
            <td><img src="${produto.imagem}" width="50"></td>
            <td>${produto.nome}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>
                <button onclick="editarProduto(${produto.id})">Editar</button>
                <button onclick="excluirProduto(${produto.id})">Excluir</button>
            </td>
        `;
        tabela.appendChild(linha);
    });
}

function editarProduto(id) {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const tabela = document.querySelector('#tb-produto');
    tabela.innerHTML = '';

    // Renderiza todos os produtos, mas insere campos editáveis apenas no produto selecionado
    produtos.forEach(p => {
        const linha = document.createElement('tr');

        if (p.id === id) {
            linha.innerHTML = `
                <td>${p.id}</td>
                <td><input type="text" id="editImagem" value="${p.imagem}" style="width:80px;"></td>
                <td><input type="text" id="editNome" value="${p.nome}"></td>
                <td><input type="number" id="editPreco" value="${p.preco}" step="0.01"></td>
                <td>
                    <button onclick="salvarEdicao(${p.id})">Salvar</button>
                    <button onclick="listarProdutos()">Cancelar</button>
                </td>
            `;
        } else {
            linha.innerHTML = `
                <td>${p.id}</td>
                <td><img src="${p.imagem}" width="50"></td>
                <td>${p.nome}</td>
                <td>R$ ${p.preco.toFixed(2)}</td>
                <td>
                    <button onclick="editarProduto(${p.id})">Editar</button>
                    <button onclick="excluirProduto(${p.id})">Excluir</button>
                </td>
            `;
        }

        tabela.appendChild(linha);
    });
}

function salvarEdicao(id) {
    const imagem = document.querySelector('#editImagem').value;
    const nome = document.querySelector('#editNome').value;
    const preco = parseFloat(document.querySelector('#editPreco').value);

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const index = produtos.findIndex(p => p.id === id);

    if (index !== -1) {
        // Atualiza os dados do produto
        produtos[index] = { id, imagem, nome, preco };
        localStorage.setItem('produtos', JSON.stringify(produtos));
        alert('Produto editado com sucesso!');
        listarProdutos();
    }
}

function excluirProduto(id) {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos = produtos.filter(p => p.id !== id);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    listarProdutos();
}

// Inicializa ao carregar a página
window.onload = function() {
    produtos();
    listarProdutos();
};
