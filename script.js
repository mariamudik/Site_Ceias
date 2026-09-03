// Função para alternar o modo de alto contraste
function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

// Função para ajustar o tamanho da fonte
let currentFontSize = 16;

function changeFontSize(delta) {
    currentFontSize += delta;
    if (currentFontSize < 12) currentFontSize = 12;
    if (currentFontSize > 22) currentFontSize = 22;
    document.documentElement.style.setProperty('--font-size', currentFontSize + 'px');
}

// Função para gerenciar o envio do formulário de matrícula
function enviarMatricula(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    alert(`Obrigado, ${nome}! A pré-solicitação de matrícula foi recebida. A secretaria entrará em contato em breve pelo WhatsApp/Telefone informado.`);
    event.target.reset();
}