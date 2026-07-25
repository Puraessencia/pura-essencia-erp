// --- CONFIGURAÇÃO DO SUPABASE ---
// Substitua pelas suas chaves reais do painel do Supabase se necessário
const SUPABASE_URL = 'https://SUA_URL_AQUI.supabase.co';
const SUPABASE_KEY = 'SUA_CHAVE_ANON_AQUI';

let supabaseClient = null;
if (typeof supabase !== 'undefined' && SUPABASE_URL !== 'https://SUA_URL_AQUI.supabase.co') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

// --- APLICAÇÃO DE TEMAS E CORES ---
function mudarCor(novaCor) {
    document.documentElement.style.setProperty('--sidebar-bg', novaCor);
    localStorage.setItem('temaCor', novaCor);
}

// Aplica a cor salva em todas as páginas ao carregar
document.addEventListener('DOMContentLoaded', () => {
    const corSalva = localStorage.getItem('temaCor');
    if (corSalva) {
        document.documentElement.style.setProperty('--sidebar-bg', corSalva);
    }
});

// --- LÓGICA DO MODAL DE NOVO PRODUTO (CATÁLOGO) ---
function abrirModalProduto() {
    const modal = document.getElementById('modal-produto');
    if (modal) {
        modal.style.display = 'flex';
        atualizarSkuPreview();
    }
}

function fecharModalProduto() {
    const modal = document.getElementById('modal-produto');
    if (modal) {
        modal.style.display = 'none';
    }
}

function atualizarSkuPreview() {
    const elemCat = document.getElementById('prod-categoria');
    const elemMod = document.getElementById('prod-modelo');
    const elemCor = document.getElementById('prod-cor');
    const elemTam = document.getElementById('prod-tamanho');

    if (elemCat && elemMod && elemCor && elemTam) {
        const cat = elemCat.value;
        const mod = elemMod.value.trim() || '000';
        const cor = elemCor.value;
        const tam = elemTam.value;

        const skuGerado = `${cat}-${mod}-${cor}-${tam}`;
        document.getElementById('sku-preview').innerText = skuGerado;
    }
}

// Salvar o produto no Supabase
async function salvarProduto(event) {
    event.preventDefault();

    const nome = document.getElementById('prod-nome').value;
    const cat = document.getElementById('prod-categoria').options[document.getElementById('prod-categoria').selectedIndex].text;
    const sku = document.getElementById('sku-preview').innerText;
    const preco = parseFloat(document.getElementById('prod-preco').value);
    const custo = parseFloat(document.getElementById('prod-custo').value) || 0;

    if (supabaseClient) {
        const { data, error } = await supabaseClient
            .from('produtos')
            .insert([{ sku: sku, nome: nome, categoria: cat, preco_venda: preco, preco_custo: custo }]);

        if (error) {
            alert('Erro ao salvar no Supabase: ' + error.message);
            return;
        }
    }

    alert(`Produto ${sku} cadastrado com sucesso!`);
    fecharModalProduto();
    document.getElementById('form-produto').reset();
    atualizarSkuPreview();
}
