const formulario = document.getElementById('formulario-produto');
const botoesCategorias = document.querySelectorAll('#botoes-categorias button');
const categorias = document.querySelectorAll('.categoria');

// Função para mostrar a categoria selecionada
function mostrarCategoria(categoria) {
    categorias.forEach(cat => {
        cat.classList.remove('ativa');
        if (cat.id === categoria + '-categoria') {
            cat.classList.add('ativa');
        }
    });
}

// Mostrar categoria "Masculino" por padrão
mostrarCategoria('masculino');

// Adiciona o evento de clique aos botões de categoria
botoesCategorias.forEach(botao => {
    botao.addEventListener('click', () => {
        mostrarCategoria(botao.getAttribute('data-categoria'));
    });
});

// Função para adicionar um novo produto
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evita o recarregamento da página ao submeter o formulário

    // Captura os valores dos campos do formulário
    const nome = document.getElementById('nome-produto').value;
    const descricao = document.getElementById('descricao-produto').value;
    const preco = document.getElementById('preco-produto').value;
    const quantidade = document.getElementById('quantidade-produto').value;
    const categoria = document.getElementById('categoria-produto').value.toLowerCase();

    // Cria um novo elemento de lista para o produto
    const novoProduto = document.createElement('li');
    novoProduto.classList.add('item-produto');
    novoProduto.innerHTML = `<strong>Nome:</strong> ${nome}<br>
                            <strong>Descrição:</strong> ${descricao}<br>
                            <strong>Preço:</strong> R$ ${parseFloat(preco).toFixed(2)}<br>
                            <strong>Quantidade em Estoque:</strong> ${quantidade}`;

    // Adiciona o novo produto à lista de produtos da categoria correspondente
    const listaProdutos = document.getElementById(`${categoria}-produtos`);
    if (listaProdutos) {
        listaProdutos.appendChild(novoProduto);
        console.log('Produto adicionado com sucesso.');
    } else {
        console.warn(`Categoria ${categoria} não encontrada na interface.`);
    }

    // Reseta o formulário após o cadastro do produto
    formulario.reset();
});

// Função para carregar produtos da API (se aplicável)
function carregarProdutosDaAPI() {
    const categoriasExistentes = ['masculino', 'feminino', 'infantil', 'cabelos', 'corpo'];

    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => {
            data.products.forEach(produto => {
                const categoria = produto.category.toLowerCase();

                // Verifica se a categoria do produto está entre as categorias configuradas na interface
                if (categoriasExistentes.includes(categoria)) {
                    const novoProduto = document.createElement('li');
                    novoProduto.classList.add('item-produto');
                    novoProduto.innerHTML = `<strong>Nome:</strong> ${produto.title}<br>
                                            <strong>Descrição:</strong> ${produto.description}<br>
                                            <strong>Preço:</strong> R$ ${produto.price.toFixed(2)}<br>
                                            <strong>Quantidade em Estoque:</strong> ${produto.stock}`;

                    const listaProdutos = document.getElementById(`${categoria}-produtos`);
                    listaProdutos.appendChild(novoProduto);
                }
            });
        })
        .catch(error => console.error('Erro ao carregar os produtos da API:', error));
}

// Carrega os produtos da API ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutosDaAPI(); // Carrega os produtos ao iniciar a página
});