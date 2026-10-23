
function simularCompra() {
    const precoTomate = 4.99;
    const precoCebola = 5.49;
    const precoLaranja = 4.99;

    let tomate = Number(prompt("Quantos kg de tomate deseja?"));
    let cebola = Number(prompt("Quantos kg de cebola deseja?"));
    let laranja = Number(prompt("Quantos kg de laranja deseja?"));

    if (
        !Number.isFinite(tomate) ||
        !Number.isFinite(cebola) ||
        !Number.isFinite(laranja) ||
        tomate < 0 || cebola < 0 || laranja < 0
    ) {
        alert("Digite quantidades válidas!");
        return;
    }

    if (tomate === 0 && cebola === 0 && laranja === 0) {
        alert("Nenhum produto foi selecionado.");
        return;
    }

    let totalTomate = tomate * precoTomate;
    let totalCebola = cebola * precoCebola;
    let totalLaranja = laranja * precoLaranja;

    let total = totalTomate + totalCebola + totalLaranja;

    alert(
        "REI DA CEBOLA - RESUMO DA COMPRA\n\n" +
        "Tomate: " + tomate + " kg - R$ " + totalTomate.toFixed(2) + "\n" +
        "Cebola: " + cebola + " kg - R$ " + totalCebola.toFixed(2) + "\n" +
        "Laranja: " + laranja + " kg - R$ " + totalLaranja.toFixed(2) + "\n\n" +
        "TOTAL: R$ " + total.toFixed(2)
    );
}



let carrinho = [];

function adicionarCarrinho(nome, preco) {
    let entrada = prompt("Quantos kg de " + nome + " deseja?");

    if (entrada === null) {
        return;
    }

    let quantidade = Number(entrada.replace(",", "."));

    if (!Number.isFinite(quantidade) || quantidade <= 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    carrinho.push({
        nome: nome,
        preco: preco,
        quantidade: quantidade
    });

    let total = carrinho.reduce((soma, item) => {
        return soma + item.preco * item.quantidade;
    }, 0);

    atualizarCarrinho();
}
function atualizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const totalElemento = document.getElementById("total-carrinho");

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach((item) => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        lista.innerHTML += `
    <p>
        ${item.nome} - ${item.quantidade} kg
        - R$ ${subtotal.toFixed(2)}

        <button onclick="removerProduto(${carrinho.indexOf(item)})">
            ❌ Remover
        </button>
    </p>
`;
    });

    totalElemento.textContent =
        "Total: R$ " + total.toFixed(2);
}



function removerProduto(indice) {
    carrinho.splice(indice, 1);
    atualizarCarrinho();
}


function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let resumo = "REI DA CEBOLA\n\n";
  resumo += "RESUMO DA COMPRA\n\n";

  let total = 0;

  carrinho.forEach((item) => {
    let subtotal = item.preco * item.quantidade;
    total += subtotal;

    resumo += `${item.nome} - ${item.quantidade} kg\n`;
    resumo += `R$ ${subtotal.toFixed(2)}\n\n`;
  });

  resumo += `TOTAL: R$ ${total.toFixed(2)}\n\n`;
  resumo += "Deseja confirmar a compra?";

  let confirmar = confirm(resumo);

  
if (confirmar) {
    imprimirComprovante();

    carrinho.length = 0;
    atualizarCarrinho();
}

}


function imprimirComprovante() {
  const data = new Date().toLocaleString("pt-BR");
  let total = 0;
  let produtos = "";

  carrinho.forEach((item) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    produtos += `
      <tr>
        <td>${item.nome}</td>
        <td>${item.quantidade} kg</td>
        <td>R$ ${subtotal.toFixed(2)}</td>
      </tr>
    `;
  });

  const janela = window.open("", "_blank");

  if (!janela) {
    alert("Permita pop-ups para abrir o comprovante.");
    return;
  }

  janela.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Comprovante Rei da Cebola</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 350px;
          margin: 30px auto;
          color: #222;
        }
        h2, p { text-align: center; }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 8px 4px;
          border-bottom: 1px dashed #aaa;
          text-align: left;
        }
        .total {
          font-size: 22px;
          font-weight: bold;
          text-align: center;
          margin: 20px 0;
        }
        @media print {
          button { display: none; }
        }
      </style>
    </head>
    <body>
     <div style="text-align: center;">
  <img src="${new URL('assets/Logo.jpg.jpg', window.location.href).href}"
       style="width: 140px; height: auto;">

  <p>Rua Beija Flor, esquina com Marabá</p>
  <p>Grajaú - MA</p>
</div>
    <h2>REI DA CEBOLA</h2>
      <p>Qualidade e economia para sua família!</p>
      <p>COMPROVANTE DE COMPRA</p>
      <p>${data}</p>
      <hr>
      <table>
        <tr>
          <th>Produto</th>
          <th>Qtd.</th>
          <th>Valor</th>
        </tr>
        ${produtos}
      </table>
      <div class="total">
        TOTAL: R$ ${total.toFixed(2)}
      </div>
      <p>Obrigado pela preferência!</p>
      <button onclick="window.print()">
        🖨️ Imprimir comprovante
      </button>
    </body>
    </html>
  `);
localStorage.setItem(
  "ultimoComprovante",
  janela.document.documentElement.outerHTML
);
  janela.document.close();
}




function pesquisarProdutos() {
  const pesquisa = document
    .getElementById("pesquisa")
    .value.toLowerCase();

  const produtos = document.querySelectorAll(".produto");

  produtos.forEach(produto => {
    const nome = produto.querySelector("h3")
      .textContent.toLowerCase();

    produto.style.display =
      nome.includes(pesquisa) ? "" : "none";
  });
}


function abrirUltimoComprovante() {
  const comprovante = localStorage.getItem("ultimoComprovante");

  if (!comprovante) {
    alert("Nenhum comprovante disponível.");
    return;
  }

  const janela = window.open("", "_blank");

  if (!janela) {
    alert("Permita pop-ups para abrir o comprovante.");
    return;
  }

  janela.document.write(comprovante);
  janela.document.close();
}


function abrirCarrinho() {
    const carrinho = document.getElementById("carrinho");

    carrinho.style.display = "block";

    carrinho.scrollIntoView({
        behavior: "smooth"
    });
}


