/* ===================================================
   SISTEMA DE TROCA DE ABAS (TABS)
=================================================== */
function switchTab(tabId, element) {
  // Esconde todas as abas
  const allTabs = document.querySelectorAll('.tab-pane');
  allTabs.forEach(tab => tab.classList.remove('active'));

  // Remove a classe ativa de todos os botões
  const allButtons = document.querySelectorAll('.tab-btn');
  allButtons.forEach(btn => btn.classList.remove('active'));

  // Ativa a aba e o botão correspondente
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }

  if (element) {
    element.classList.add('active');
  }

  // Se o menu mobile estiver aberto, fecha
  const navMenu = document.getElementById('navMenu');
  if (navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
  }

  // Rola suavemente para o início do conteúdo
  window.scrollTo({ top: 100, behavior: 'smooth' });
}

/* ===================================================
   MENU HAMBÚRGUER MOBILE
=================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  // Renderiza Gráficos do Chart.js
  renderSchoolCharts();
});

/* ===================================================
   ACESSIBILIDADE: TAMANHO DE FONTE & CONTRASTE
=================================================== */
let baseFontSize = 16;

function changeFontSize(step) {
  baseFontSize += step;
  if (baseFontSize < 13) baseFontSize = 13;
  if (baseFontSize > 22) baseFontSize = 22;
  document.documentElement.style.fontSize = baseFontSize + 'px';
}

function toggleContrast() {
  document.body.classList.toggle('high-contrast');
}

/* ===================================================
   GRÁFICOS ESTATÍSTICOS COM CHART.JS
=================================================== */
function renderSchoolCharts() {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' }
    },
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  };

  // Ensino Fundamental
  const ctxFund = document.getElementById('chartFundCanvas').getContext('2d');
  new Chart(ctxFund, {
    type: 'bar',
    data: {
      labels: ['6º Ano', '7º Ano', '8º Ano', '9º Ano'],
      datasets: [
        { label: 'Aprovação (%)', data: [92, 94, 91, 96], backgroundColor: '#0284c7' },
        { label: 'Reprovação (%)', data: [5, 4, 6, 3], backgroundColor: '#d97706' },
        { label: 'Abandono (%)', data: [3, 2, 3, 1], backgroundColor: '#dc2626' }
      ]
    },
    options: chartOptions
  });

  // Ensino Médio
  const ctxMedio = document.getElementById('chartMedioCanvas').getContext('2d');
  new Chart(ctxMedio, {
    type: 'bar',
    data: {
      labels: ['1º Ano', '2º Ano', '3º Ano'],
      datasets: [
        { label: 'Aprovação (%)', data: [89, 93, 98], backgroundColor: '#0284c7' },
        { label: 'Reprovação (%)', data: [7, 5, 1], backgroundColor: '#d97706' },
        { label: 'Abandono (%)', data: [4, 2, 1], backgroundColor: '#dc2626' }
      ]
    },
    options: chartOptions
  });
}

/* ===================================================
   ASSISTENTE VIRTUAL DE IA DE MATRÍCULA
=================================================== */
let chatLog = [];

function handleAiSend() {
  const input = document.getElementById('aiUserInput');
  const userText = input.value.trim();
  if (!userText) return;

  // Adiciona mensagem do usuário
  appendBubble(userText, 'user');
  chatLog.push(`Usuário: ${userText}`);
  input.value = '';

  // Resposta simulada inteligente da IA
  setTimeout(() => {
    const aiResponse = generateAiResponse(userText);
    appendBubble(aiResponse, 'ai');
    chatLog.push(`IA C.E.I.A.S: ${aiResponse}`);
  }, 500);
}

function sendQuickQuestion(questionText) {
  document.getElementById('aiUserInput').value = questionText;
  handleAiSend();
}

function appendBubble(text, sender) {
  const chatBox = document.getElementById('aiChatBox');
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}`;
  bubble.innerHTML = text;
  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function generateAiResponse(text) {
  const lower = text.toLowerCase();
  
  if (lower.includes('documento') || lower.includes('documentos') || lower.includes('preciso')) {
    return 'Os documentos necessários para matrícula são: Certidão de Nascimento, RG e CPF do aluno e responsável, Comprovante de Residência recente (luz) e Histórico Escolar.';
  } else if (lower.includes('transporte') || lower.includes('ônibus') || lower.includes('bus')) {
    return 'O C.E.I.A.S conta com transporte escolar gratuito da Rede Estadual para atender todas as comunidades e localidades da zona rural entorno.';
  } else if (lower.includes('série') || lower.includes('vagas') || lower.includes('turmas')) {
    return 'Oferecemos Ensino Fundamental II (6º ao 9º ano) e Ensino Médio completo (1º ao 3º ano) no período diurno.';
  } else {
    return `Anotei sua dúvida: "${text}". Clique no botão abaixo para encaminhar esta conversa para a Secretaria pelo WhatsApp!`;
  }
}

// Exportar atendimento para o WhatsApp da Escola
function exportChatToWhatsApp() {
  const phone = '5541999998888'; // Número de exemplo da escola
  let message = 'Olá, Secretaria do C.E.I.A.S! Gostaria de prosseguir com meu atendimento via site:%0A%0A';

  if (chatLog.length === 0) {
    message += 'Desejo tirar dúvidas sobre novas matrículas e vagas.';
  } else {
    chatLog.forEach(line => {
      message += encodeURIComponent(line) + '%0A';
    });
  }

  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}