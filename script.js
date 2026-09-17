document.addEventListener('DOMContentLoaded', () => {
    // Menu Hambúrguer Toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Fechar o menu ao clicar em qualquer link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Chat Simulado e Encaminhamento para WhatsApp
    const btnEnviar = document.getElementById('btnEnviar');
    const btnZap = document.getElementById('btnZap');
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');

    btnEnviar.addEventListener('click', () => {
        const texto = userInput.value.trim();
        if(texto !== "") {
            chatBox.innerHTML += `<p><strong>Você:</strong> ${texto}</p>`;
            chatBox.innerHTML += `<p><strong>Assistente:</strong> Sua mensagem foi registrada! Para falar direto com a secretaria no celular da escola, clique no botão do WhatsApp.</p>`;
            chatBox.scrollTop = chatBox.scrollHeight;
            userInput.value = '';
        }
    });

    btnZap.addEventListener('click', () => {
        const texto = userInput.value.trim();
        const fone = "5500000000000"; // Substitua pelo número real da escola com DDD
        const url = `https://wa.me/${fone}?text=${encodeURIComponent(texto || "Olá! Gostaria de tirar dúvidas sobre o Colégio Estadual Irmã Ambrosia.")}`;
        window.open(url, '_blank');
    });

    // Gráfico de Rendimento Escolar (Chart.js)
    const ctx = document.getElementById('rendimentoChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Ensino Fundamental II', 'Ensino Médio'],
            datasets: [
                { label: 'Aprovação (%)', data: [91, 86], backgroundColor: '#7cc0ef' },
                { label: 'Reprovação (%)', data: [6, 9], backgroundColor: '#ff7b7b' },
                { label: 'Abandono (%)', data: [3, 5], backgroundColor: '#ffc107' }
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