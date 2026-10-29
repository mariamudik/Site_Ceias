let chatHistory = [];

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  initFormListeners();
  loadSavedTestimonials(); // Carrega os depoimentos salvos permanentemente no navegador
});

function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
        navMenu.classList.remove('open');
      }
    });
  }
}

window.switchTab = function(event, tabId) {
  const allPanes = document.querySelectorAll('.tab-pane');
  const allNavLinks = document.querySelectorAll('.nav-link');
  const targetPane = document.getElementById(tabId);

  if (!targetPane) return;

  allPanes.forEach(pane => pane.classList.remove('active'));
  allNavLinks.forEach(link => link.classList.remove('active'));

  targetPane.classList.add('active');

  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }

  const navMenu = document.getElementById('navMenu');
  if (navMenu) navMenu.classList.remove('open');

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const newsDatabase = {
  'festa-junina': {
    title: '🎉 Grande Festa Junina Tradicional do C.E.I.A.S (20 de Junho)',
    text: 'No dia 20 de junho realizamos a nossa inesquecível Festa Junina! O evento foi um sucesso maravilhoso, acolhendo centenas de pessoas, alunos, familiares e vizinhos de toda a Colônia Marcelino.',
    images: ['festa-junina.jpg', 'colegio.jpg']
  },
  'feira-sustentavel': {
    title: '🌱 Feira do Conhecimento Sustentável do Campo (15 de Maio)',
    text: 'Apresentação dos trabalhos de agroecologia e ciências desenvolvidos pelos alunos do Ensino Fundamental II e Médio.',
    images: ['feira-sustentavel.jpg']
  },
  'reuniao-pais': {
    title: '📋 Reunião Geral de Pais e Entrega de Boletins (10 de Abril)',
    text: 'Encontro comunitário entre a equipe gestora, professores e os responsáveis pelos estudantes.',
    images: ['reuniao-pais.jpg']
  },
  'interclasses': {
    title: '⚽ Torneio Interclasses na Quadra Coberta (28 de Março)',
    text: 'Competição esportiva integrando turmas do 6º ano ao 3º ano do Ensino Médio.',
    images: ['interclasses.jpg']
  }
};

window.openNewsModal = function(newsKey) {
  const data = newsDatabase[newsKey];
  if (!data) return;

  const modalOverlay = document.getElementById('newsModalOverlay');
  const modalBody = document.getElementById('modalNewsBody');

  let photosHTML = '';
  data.images.forEach((imgUrl, index) => {
    photosHTML += `
      <div class="modal-photo-card">
        <img src="${imgUrl}" alt="Foto ${index + 1}" onerror="this.parentElement.style.display='none';">
        <span style="font-size:0.75rem; font-weight:700; color:var(--ceias-blue);">🖼️ Registro ${index + 1}</span>
      </div>
    `;
  });

  modalBody.innerHTML = `
    <h3 class="modal-news-title">${data.title}</h3>
    <p class="modal-news-text">${data.text}</p>
    <hr style="margin: 20px 0; border:0; border-top:1px solid var(--border-subtle);">
    <h4 style="color:var(--ceias-blue); margin-bottom:12px;">📸 Álbum de Fotos do Evento:</h4>
    <div class="modal-album-grid">
      ${photosHTML}
    </div>
  `;

  modalOverlay.classList.add('open');
};

window.closeNewsModal = function(event) {
  if (event && event.target !== document.getElementById('newsModalOverlay')) return;
  const modalOverlay = document.getElementById('newsModalOverlay');
  if (modalOverlay) modalOverlay.classList.remove('open');
};

window.toggleContrast = function() {
  document.body.classList.toggle('high-contrast');
};

let fontScale = 100;
window.adjustFont = function(direction) {
  fontScale += direction * 5;
  if (fontScale < 85) fontScale = 85;
  if (fontScale > 125) fontScale = 125;
  document.body.style.fontSize = `${fontScale}%`;
};

function initFormListeners() {
  const matInput = document.getElementById('matChatInput');
  if (matInput) {
    matInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') window.askMatriculaIA();
    });
  }

  const mainInput = document.getElementById('mainChatInput');
  if (mainInput) {
    mainInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') window.sendMainChatMessage();
    });
  }
}

/* === LÓGICA DE SALVAMENTO PERMANENTE DOS DEPOIMENTOS NO LOCALSTORAGE === */

function loadSavedTestimonials() {
  const testimonialsList = document.getElementById('testimonialsList');
  const emptyNotice = document.getElementById('emptyTestimonialsNotice');
  
  if (!testimonialsList) return;

  const savedData = localStorage.getItem('ceias_testimonials');
  
  if (savedData) {
    const testimonials = JSON.parse(savedData);
    
    if (testimonials.length > 0) {
      if (emptyNotice) emptyNotice.style.display = 'none';
      
      testimonialsList.innerHTML = '';
      
      testimonials.forEach(item => {
        const card = document.createElement('blockquote');
        card.className = 'testimonial-card';
        card.innerHTML = `
          <p>"${item.text}"</p>
          <cite>— ${item.name} (${item.role})</cite>
        `;
        testimonialsList.appendChild(card);
      });
    }
  }
}

window.addNewTestimonial = function(event) {
  if (event) event.preventDefault();

  const name = document.getElementById('testimonialName')?.value.trim();
  const role = document.getElementById('testimonialRole')?.value;
  const text = document.getElementById('testimonialText')?.value.trim();

  if (!name || !role || !text) return;

  const savedData = localStorage.getItem('ceias_testimonials');
  let testimonials = savedData ? JSON.parse(savedData) : [];

  const newEntry = { name, role, text };
  testimonials.unshift(newEntry);

  localStorage.setItem('ceias_testimonials', JSON.stringify(testimonials));

  loadSavedTestimonials();

  event.target.reset();
  alert('Obrigado por publicar seu depoimento! Ele foi salvo no mural do C.E.I.A.S.');
};

/* === OUTRAS FUNÇÕES DO SITE === */

window.processMatriculaEmail = function(event) {
  if (event) event.preventDefault();

  const studentName = document.getElementById('studentName')?.value.trim();
  const grade = document.getElementById('gradeSelect')?.value;
  const parentName = document.getElementById('parentName')?.value.trim();
  const phone = document.getElementById('phoneNum')?.value.trim();
  const parentEmail = document.getElementById('parentEmail')?.value.trim();

  if (!studentName || !grade || !parentName || !phone || !parentEmail) return;

  const schoolEmail = "ceias.colegio.campo@gmail.com";
  const subject = encodeURIComponent(`[PRÉ-MATRÍCULA C.E.I.A.S] Aluno: ${studentName}`);
  const bodyText = encodeURIComponent(
    `Solicitação de Pré-Matrícula Escolar - C.E.I.A.S:\n\n` +
    `- Aluno(a): ${studentName}\n` +
    `- Série: ${grade}\n` +
    `- Responsável: ${parentName}\n` +
    `- Telefone: ${phone}\n` +
    `- E-mail: ${parentEmail}`
  );

  window.location.href = `mailto:${schoolEmail}?subject=${subject}&body=${bodyText}`;
};

window.processMatriculaWhatsApp = function(event) {
  if (event) event.preventDefault();

  const studentName = document.getElementById('studentName')?.value.trim();
  const grade = document.getElementById('gradeSelect')?.value;
  const parentName = document.getElementById('parentName')?.value.trim();
  const phone = document.getElementById('phoneNum')?.value.trim();

  if (!studentName || !grade || !parentName || !phone) {
    alert("Por favor, preencha os campos do formulário primeiro.");
    return;
  }

  const schoolPhone = "554133330000";
  const textMessage = `Olá! Gostaria de enviar a solicitação de pré-matrícula no *C.E.I.A.S*:\n\n` +
                      `👤 *Aluno(a):* ${studentName}\n` +
                      `📚 *Série:* ${grade}\n` +
                      `👨‍👩‍👧 *Responsável:* ${parentName}\n` +
                      `📞 *Contato:* ${phone}`;

  window.open(`https://wa.me/${schoolPhone}?text=${encodeURIComponent(textMessage)}`, '_blank');
};

window.askMatriculaIA = function() {
  const input = document.getElementById('matChatInput');
  const question = input?.value.trim();
  if (!question) return;

  const chatLogs = document.getElementById('matChatLogs');
  appendMessage(chatLogs, 'user', question);
  input.value = '';

  setTimeout(() => {
    let reply = "Para fazer a matrícula pública no C.E.I.A.S, preencha o formulário ao lado!";
    const qLower = question.toLowerCase();
    if (qLower.includes('doc') || qLower.includes('documento')) {
      reply = "📄 Documentos: RG/Certidão do aluno, CPF dos responsáveis, Comprovante de residência e Histórico Escolar.";
    } else if (qLower.includes('paga') || qLower.includes('valor')) {
      reply = "🆓 O C.E.I.A.S é uma escola 100% pública e gratuita da Rede Estadual!";
    }
    appendMessage(chatLogs, 'bot', reply);
  }, 500);
};

window.sendMainChatMessage = function(event) {
  if (event) event.preventDefault();
  const input = document.getElementById('mainChatInput');
  const messageText = input?.value.trim();
  if (!messageText) return;

  const chatLogs = document.getElementById('mainChatLogs');
  appendMessage(chatLogs, 'user', messageText);
  chatHistory.push(`Usuário: ${messageText}`);
  input.value = '';

  setTimeout(() => {
    let botReply = "Anotado! Se quiser encaminhar dúvidas à secretaria, utilize o botão abaixo.";
    const text = messageText.toLowerCase();
    if (text.includes('horario') || text.includes('turnos')) {
      botReply = "⏰ Aulas no turno Matutino (07h30 às 11h50) e Vespertino (13h00 às 17h20).";
    } else if (text.includes('transporte') || text.includes('onibus')) {
      botReply = "🚌 O C.E.I.A.S oferece transporte escolar rural gratuito cobrindo 100% da região.";
    }
    appendMessage(chatLogs, 'bot', botReply);
    chatHistory.push(`IA C.E.I.A.S: ${botReply}`);
  }, 500);
};

window.exportChatToEmail = function() {
  const schoolEmail = "ceias.colegio.campo@gmail.com";
  const subject = encodeURIComponent("Dúvida / Atendimento via Site C.E.I.A.S");
  const bodyText = encodeURIComponent(
    `Histórico de Atendimento pelo Site C.E.I.A.S:\n\n` +
    (chatHistory.length > 0 ? chatHistory.join("\n") : "Gostaria de solicitar informações gerais.")
  );
  window.location.href = `mailto:${schoolEmail}?subject=${subject}&body=${bodyText}`;
};

function appendMessage(container, sender, text) {
  if (!container) return;
  const msgDiv = document.createElement('div');
  msgDiv.className = `msg ${sender}`;
  msgDiv.innerText = text;
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}