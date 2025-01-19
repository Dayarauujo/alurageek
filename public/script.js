const produtos = document.getElementById('produtos')
const formularioInputs = document.querySelectorAll("#formulario input")

async function buscarProdutos() {
  const resposta = await fetch("http://localhost:3000/produtos")
  const dados = await resposta.json()

  return dados;
}

async function criarProduto(produto) {
  await fetch("http://localhost:3000/produtos", {
    method: "POST",
    body: JSON.stringify(produto)
  })
}

async function deleteProduto(id) {
  await fetch(`http://localhost:3000/produtos/${id}`, {
    method: "DELETE",
  })
}

function montarProduto(produto) {
  return `
    <div class="produto">
      <img class="imagem-produto" src="${produto.imagem}" alt="">
      <h3>${produto.nome}</h3>
      <div>
        <span>R$${produto.preco}</span>
        <img class="delete-produto" src="./assets/trashIcon.svg" alt="lixo" onclick="deletarProduto('${produto.id}')">
      </div>
    </div>
  `
}

async function montagemTabela() {
  const dadosProdutos = await buscarProdutos()
  let innerProdutos = ""

  dadosProdutos.forEach(element => {
    innerProdutos += montarProduto(element)
  });

  produtos.innerHTML = innerProdutos
}

function limparFormulario() {
  formularioInputs[0].value = "";
  formularioInputs[1].value = "";
  formularioInputs[2].value = "";
}

async function adicionarProduto(event) {
  event.preventDefault()
  const nome = formularioInputs[0].value;
  const preco = formularioInputs[1].value;
  const imagem = formularioInputs[2].value;

  await criarProduto({ nome, preco, imagem })

  limparFormulario()
  await montagemTabela()
}

async function deletarProduto(id) {
  await deleteProduto(id)
  await montagemTabela();
}

montagemTabela()
