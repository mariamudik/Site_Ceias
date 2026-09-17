document.addEventListener('DOMContentLoaded', () => {
    // Menu Hambúrguer
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Chat Simulado e Integração WhatsApp
    const btnEnviar = document.getElementById('btnEnviar');
    const btnZap = document.getElementById('btnZap');
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');

    btnEnviar.addEventListener('click', () => {
        const texto = userInput.value.trim();
        if(texto !== "") {
            chatBox.innerHTML += `<p><strong>Você:</strong> ${texto}</p>`;
            chatBox.innerHTML += `<p><strong>Assistente:</strong> Recebi sua mensagem! Clique no botão ao lado para encaminhá-la diretamente ao nosso WhatsApp.</p>`;
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    });

    btnZap.addEventListener('click', () => {
        const texto = userInput.value.trim();
        const fone = "5500000000000"; // Substitua pelo número do WhatsApp da escola
        const url = `https://wa.me/${fone}?text=${encodeURIComponent(texto || "Olá! Gostaria de obter informações sobre o colégio.")}`;
        window.open(url, '_blank');
    });

    // Gráfico de Rendimento Escolar (Chart.js)
    const ctx = document.getElementById('rendimentoChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Fundamental II', 'Ensino Médio'],
            datasets: [
                { label: 'Aprovação (%)', data: [90, 85], backgroundColor: '#4bacf7' },
                { label: 'Reprovação (%)', data: [7, 10], backgroundColor: '#ff6b6b' },
                { label: 'Abandono (%)', data: [3, 5], backgroundColor: '#fca311' }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        }
    });
});