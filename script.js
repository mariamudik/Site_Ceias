/* ===================================================
   SISTEMA DE SISTEMA DE ABAS E NAVEGAÇÃO
=================================================== */
function openTab(evt, tabName) {
  // Oculta todo o conteúdo de abas
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("active");
  }

  // Remove a classe "active" de todos os botões de aba
  const tabLinks = document.getElementsByClassName("tab-link");
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove("active");
  }

  // Mostra a aba selecionada e adiciona classe ativa
  document.getElementById(tabName).classList.add("active");
  if (evt) evt.currentTarget.classList.add("active");

  // Fecha o menu hamburguer se estiver no mobile
  const navMenu = document.getElementById("navMenu");
  if (navMenu.classList.contains("mobile-open")) {
    navMenu.classList.remove("mobile-open");
  }

  // Rola suavemente até o topo da área de conteúdo
  window.scrollTo({ top: 120, behavior: 'smooth' });
}

/* ===================================================
   MENU HAMBÚRGUER (MOBILE)
=================================================== */
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");

  hamburgerBtn.addEventListener("click", function () {
    navMenu.classList.toggle("mobile-open");
  });

  // Inicializa Gráficos do Chart.js
  initCharts();
});

/* ===================================================
   ACESSIBILIDADE: FONTE E CONTRASTE
=================================================== */
let currentFontSize = 16;

function changeFontSize(delta) {
  currentFontSize += delta * 1;
  if (currentFontSize < 12) currentFontSize = 12;
  if (currentFontSize > 22) currentFontSize = 22;
  document.documentElement.style.fontSize = currentFontSize + "px";
}

function toggleContrast() {
  document.body.classList.toggle("high-contrast");
}

/* ===================================================
   GRÁFICOS DE DESEMPEHO (Aprovação, Reprovação, Abandono)
=================================================== */
function initCharts() {
  // Gráfico do Ensino Fundamental
  const ctxFund = document.getElementById('chartFundamental').getContext('2d');
  new Chart(ctxFund, {
    type: 'bar',
    data: {
      labels: ['6º Ano', '7º Ano', '8º Ano', '9º Ano'],
      datasets: [
        { label: 'Aprovação (%)', data: [92, 94, 91, 96], backgroundColor: '#0284c7' },
        { label: 'Reprovação (%)', data: [5, 4, 6, 3], backgroundColor: '#f97316' },
        { label: 'Abandono (%)', data: [3, 2, 3, 1], backgroundColor: '#ef4444' }
      ]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true, max: 100 } }
    }
  });

  // Gráfico do Ensino Médio
  const ctxMedio = document.getElementById('chartMedio').getContext('2d');
  new Chart(ctxMedio, {
    type: 'bar',
    data: {
      labels: ['1º Ano', '2º Ano', '3º Ano'],
      datasets: [
        { label: 'Aprovação (%)', data: [88, 92, 97], backgroundColor: '#0284c7' },
        { label: 'Reprovação (%)', data: [8, 6, 2], backgroundColor: '#f97316' },
        { label: 'Abandono (%)', data: [4, 2, 1], backgroundColor: '#ef4444' }
      ]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true, max: 100 } }
    }
  });
}

/* ===================================================
   ASSISTENTE VIRTUAL / IA DE MATRÍCULA E WHATSAPP
=================================================== */
let chatHistory = [];

function sendAiMessage() {
  const input = document.getElementById("aiInput");
  const text = input.value.trim();
  if (!text) return;

  addMessageToWindow("enrollmentChatWindow", text, "user-msg");
  chatHistory.push("Usuário: " + text);
  input.value = "";

  // Simulação de resposta da IA
  setTimeout(() => {
    let reply = generateAiReply(text);
    addMessageToWindow("enrollmentChatWindow", reply, "ai-msg");
    chatHistory.push("IA C.E.I.A.S: " + reply);
  }, 600);
}

function quickAsk(questionText) {
  document.getElementById("aiInput").value = questionText;
  sendAiMessage();
}

function generateAiReply(userText) {
  const lower = userText.toLowerCase();
  if (lower.includes("documento") || lower.includes("documentos")) {
    return "Para realizar a matrícula é necessário: Certidão de Nascimento, RG/CPF do aluno e responsável, Comprovante de Residência (luz) e Histórico Escolar.";
  } else if (lower.includes("série") || lower.includes("vaga") || lower.includes("ano")) {
    return "Temos vagas abertas para o Ensino Fundamental II (6º ao 9º ano) e Ensino Médio (1º ao 3º ano). Todas 100% gratuitas!";
  } else if (lower.includes("horário") || lower.includes("turno")) {
    return "O horário das aulas é no turno matutino das 07h30 às 12h00 e vespertino das 13h00 às 17h30.";
  } else {
    return "Entendido! Registrei sua mensagem: '" + userText + "'. Você pode clicar no botão abaixo para enviar essas informações diretamente para a secretaria da escola pelo WhatsApp!";
  }
}

function addMessageToWindow(windowId, msgText, className) {
  const chatWin = document.getElementById(windowId);
  const div = document.createElement("div");
  div.className = "msg " + className;
  div.innerText = msgText;
  chatWin.appendChild(div);
  chatWin.scrollTop = chatWin.scrollHeight;
}

// Enviar conversa da IA diretamente para o WhatsApp da escola
function sendToSchoolWhatsApp() {
  const schoolPhone = "5541999998888"; // Número simulado da escola
  let summary = "Olá, estou entrando em contato através do site do C.E.I.A.S.%0A%0A*Histórico de Dúvidas/Matrícula:*%0A";

  if (chatHistory.length === 0) {
    summary += "Gostaria de obter informações sobre matrícula e vagas.";
  } else {
    chatHistory.forEach(item => {
      summary += encodeURIComponent(item) + "%0A";
    });
  }

  window.open(`https://wa.me/${schoolPhone}?text=${summary}`, '_blank');
}

/* ===================================================
   WIDGET FLUTUANTE DE IA CHAT
=================================================== */
function toggleFloatingChat() {
  const chatBox = document.getElementById("floatingChatBox");
  chatBox.style.display = (chatBox.style.display === "flex") ? "none" : "flex";
}

function sendFloatingMsg() {
  const input = document.getElementById("floatingChatInput");
  const text = input.value.trim();
  if (!text) return;

  addMessageToWindow("floatingChatBody", text, "user-msg");
  input.value = "";

  setTimeout(() => {
    let reply = generateAiReply(text);
    addMessageToWindow("floatingChatBody", reply, "ai-msg");
  }, 500);
}