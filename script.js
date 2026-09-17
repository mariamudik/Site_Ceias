function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

let fontStep = 16;
function changeFontSize(delta) {
    fontStep += delta;
    if (fontStep < 13) fontStep = 13;
    if (fontStep > 22) fontStep = 22;
    document.documentElement.style.setProperty('--font-size', fontStep + 'px');
}

function enviarMatricula(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    alert(`Pré-matrícula recebida para ${nome}! A equipe entrará em contato.`);
    event.target.reset();
}