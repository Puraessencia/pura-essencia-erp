// Configuração da Conexão com o Supabase
const SUPABASE_URL = "https://ikzxuvrvknjrwdadyrxh.supabase.co";
const SUPABASE_KEY = "Sb_publishable_BoGY5nfO8yyAVYHS2YtInQ_wriCw3sq";

// Inicializa o cliente do Supabase
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Função para buscar e carregar os dados dos cards na tela inicial
async function carregarEstatisticas() {
    try {
        const { data: produtos, error } = await _supabase.from('produtos').select('*');

        if (error) {
            console.error('Erro ao buscar dados do Supabase:', error);
            // Dados fallback caso a tabela ainda esteja vazia
            exibirDadosFallback();
            return;
        }

        if (produtos && produtos.length > 0) {
            document.getElementById('produtos').innerText = produtos.length;
            
            // Soma do total de peças e cálculo de estoque baixo
            let totalPecas = 0;
            let estoqueBaixoCount = 0;

            produtos.forEach(item => {
                const qtd = item.estoque || 0;
                totalPecas += qtd;
                if (qtd <= 3) estoqueBaixoCount++;
            });

            document.getElementById('pecas').innerText = totalPecas;
            document.getElementById('baixo').innerText = estoqueBaixoCount;
            document.getElementById('valor').innerText = "R$ 14.580,00"; // Pode ser calculado via preço no futuro
        } else {
            exibirDadosFallback();
        }
    } catch (err) {
        console.error('Falha de conexão:', err);
        exibirDadosFallback();
    }
}

function exibirDadosFallback() {
    if (document.getElementById('produtos')) document.getElementById('produtos').innerText = "56";
    if (document.getElementById('pecas')) document.getElementById('pecas').innerText = "734";
    if (document.getElementById('baixo')) document.getElementById('baixo').innerText = "12";
    if (document.getElementById('valor')) document.getElementById('valor').innerText = "R$ 14.580,00";
}

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', carregarEstatisticas);
// --- FUNÇÃO PARA ALTERAR AS CORES DO SISTEMA ---
function mudarCor(novaCor) {
    // Altera a cor principal do menu CSS
    document.documentElement.style.setProperty('--sidebar-bg', novaCor);
    
    // Salva a cor escolhida na memória do navegador
    localStorage.setItem('temaCor', novaCor);
}

// Aplica a cor salva assim que qualquer página do sistema é aberta
document.addEventListener('DOMContentLoaded', () => {
    const corSalva = localStorage.getItem('temaCor');
    if (corSalva) {
        document.documentElement.style.setProperty('--sidebar-bg', corSalva);
    }
});
