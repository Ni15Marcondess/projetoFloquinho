const input = document.getElementById('command-input');
const output = document.getElementById('output');
let estaProcessando = false; 

// Comandos atualizados para a versão coelhinho! 🐰
const comandos = {
    'couve': 'Comandos disponíveis: sobre, floquinho, brincar, alimentar, carinho, limpar',
    'sobre': 'Terminal seguro v1.0. Eu sou a desenvolvedora Nicole e o Floquinho é meu parceiro de código orelhudo e mascarado! No momento esse é nosso primeiro Easter Egg, parabéns por ter achado esse terminal! E já fica de spoiler... logo, logo teremos mais surpresas...',
    'floquinho': '*Sniff sniff* 🐰 (O Floquinho mexe o narizinho rapidamente e levanta as orelhas); Curiosidade: Sabia que a comida favorita do Floquinho não é cenoura mas sim uma folha de couve!',
    'brincar': 'Você brincou de esconde-esconde... Floquinho deu vários "binkies" (pulos de alegria) pelo terminal! 🐇',
    'alimentar': 'Você deu uma folha de couve fresquinha. 🥬 Floquinho mastiga rapidinho fazendo *crank crank*.',
    'carinho': 'Você fez carinho atrás das orelhas do Floquinho. Ele fechou os olhinhos e derreteu no chão! ❤️',
    'limpar': 'limpar_tela'
};

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !estaProcessando) {
        const comandoDigitado = input.value.trim().toLowerCase();
        
        if (comandoDigitado === '') return; 

        // Imprime o comando do usuário (branco)
        imprimirLinha(`visitante@perfil:~$ ${comandoDigitado}`, 'user');
        input.value = '';

        if (comandoDigitado === 'limpar') {
            output.innerHTML = '';
            return;
        }

        estaProcessando = true;
        input.disabled = true; 

        // Cria a linha do "loader"
        const linhaLoader = document.createElement('p');
        linhaLoader.className = 'loading';
        output.appendChild(linhaLoader);

        const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
        let frameAtual = 0;

        const intervaloLoader = setInterval(() => {
            linhaLoader.textContent = `${frames[frameAtual]} Processando...`;
            frameAtual = (frameAtual + 1) % frames.length;
        }, 100);

        setTimeout(() => {
            clearInterval(intervaloLoader); 
            linhaLoader.remove(); 

            // VERIFICAÇÃO CORRIGIDA AQUI 👇
            if (comandos[comandoDigitado]) {
                imprimirLinha(comandos[comandoDigitado], 'system');
            } else {
                imprimirLinha(`Erro: Comando '${comandoDigitado}' não reconhecido. Digite 'couve' para ver as opções.`, 'error');
            }

            estaProcessando = false;
            input.disabled = false;
            input.focus(); 
            window.scrollTo(0, document.body.scrollHeight); 

        }, 1500); 
    }
});

function imprimirLinha(texto, classe) {
    const novaLinha = document.createElement('p');
    novaLinha.textContent = texto;
    novaLinha.className = classe;
    output.appendChild(novaLinha);
    window.scrollTo(0, document.body.scrollHeight);
}