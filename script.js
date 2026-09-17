// Controle de Alto Contraste
function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

// Ajuste dinâmico de Fonte
let fontSize = 16;
function changeFontSize(delta) {
    fontSize += delta;
    if (fontSize < 12) fontSize = 12;
    if (fontSize > 22) fontSize = 22;
    document.documentElement.style.setProperty('--font-size', fontSize + 'px');
}

// Feedback do Formulário de Matrícula
function enviarMatricula(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    alert(`Obrigado, ${nome}! A pré-solicitação de matrícula foi recebida. A secretaria entrará em contato via WhatsApp/Telefone.`);
    event.target.reset();
}