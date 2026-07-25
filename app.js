document.addEventListener("DOMContentLoaded", () => {
    // Dados simulados do painel
    const dashboard = {
        produtos: 12,        // Atualizado para bater com a imagem
        pecas: 186,          // Atualizado para bater com a imagem
        estoqueBaixo: 8,     // Atualizado para bater com a imagem
        valor: "R$ 4.862,50" // Atualizado para bater com a imagem
    };

    // Preenche os valores nos cartões de resumo
    document.getElementById("produtos").innerText = dashboard.produtos;
    document.getElementById("pecas").innerText = dashboard.pecas;
    document.getElementById("baixo").innerText = dashboard.estoqueBaixo;
    document.getElementById("valor").innerText = dashboard.valor;
});
