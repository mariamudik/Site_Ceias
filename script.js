/* ==========================================================================
   SISTEMA E INTERATIVIDADE (C.E.I.A.S - script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  initFormListeners();
});

/* ==========================================================================
   1. MENU HAMBÚRGUER & NAVEGAÇÃO MOBILE
   ========================================================================== */
function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
    });

    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
        navMenu.classList.remove('open');
      }
    });
  }
}

/* ==========================================================================
   2. SISTEMA DE ABAS (TAB SWITCHER)
   ========================================================================== */
window.switchTab = function(event, tabId) {
  if (event) event.preventDefault();

  const allPanes = document.querySelectorAll('.tab-pane');
  const allNavLinks = document.querySelectorAll('.nav-link');
  const targetPane = document.getElementById(tabId);

  if (!targetPane) return;

  allPanes.forEach(pane => pane.classList.remove('active'));
  allNavLinks.forEach(link => link.classList.remove('active'));

  targetPane.classList.add('active');

  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  } else {
    const matchingBtn = document.querySelector(`.nav-link[onclick*="${tabId}"]`);
    if (matchingBtn) matchingBtn.classList.add('active');
  }

  const navMenu = document.getElementById('navMenu');
  if (navMenu) navMenu.classList.remove('open');

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/* ==========================================================================
   3. JANELA MODAL DE NOTÍCIAS E EVENTOS
   ========================================================================== */
const newsDatabase = {
  'festa-junina': {
    title: '🎉 Grande Festa Junina Tradicional do C.E.I.A.S',
    text: 'No dia 20 de junho realizamos a nossa inesquecível Festa Junina! O evento foi um sucesso maravilhoso, acolhendo centenas de alunos, familiares e moradores de toda a Colônia Marcelino. Tivemos dança de quadrilha de todas as turmas, barracas de comidas típicas, brincadeiras tradicionais e um clima de união comunitária espetacular!',
    images: ['festa-junina.jpg']
  },
  'feira-sustentavel': {
    title: '🌱 Feira do Conhecimento Sustentável do Campo',
    text: 'Apresentação dos trabalhos de agroecologia e ciências desenvolvidos pelos alunos do Ensino Fundamental II e Médio. Os estudantes apresentaram maquetes de irrigação sustentável, compostagem orgânica e amostragem do cultivo da horta do colégio.',
    images: ['feira-sustentavel.jpg']
  },
  'reuniao-pais': {
    title: '📋 Reunião Geral de Pais e Entrega de Boletins',
    text: 'Encontro comunitário entre a equipe gestora, professores e os responsáveis pelos estudantes. Foram apresentadas as metas pedagógicas para o ano letivo, alinhamento sobre transporte escolar rural e entrega presencial dos boletins.',
    images: ['reuniao-pais.jpg']
  },
  'interclasses': {
    title: '⚽ Torneio Interclasses na Quadra Coberta',
    text: 'Competição esportiva integrando turmas do 6º ano ao 3º ano do Ensino Médio. Modalidades de futsal e voleibol promovendo respeito, saúde e trabalho em equipe.',
    images: ['interclasses.jpg']
  }
};

window.openNewsModal = function(newsKey) {
  const data = newsDatabase[newsKey];
  if (!data) return;

  const modal = document.getElementById('newsModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  if (!modal || !modalTitle || !modalBody) return;

  let photosHTML = '';
  data.images.forEach((imgUrl, index) => {
    photosHTML += `
      <div class="modal-photo-card">
        <img src="${imgUrl}" alt="Foto do evento ${index + 1}" onerror="this.parentElement.style.display='none';">
        <p style="font-size:0.8rem; margin-top:6px; font-weight:700; color:var(--ceias-blue);">📷 Registro ${index + 1}</p>
      </div>
    `;
  });

  modalTitle.textContent = data.title;
  modalBody.innerHTML = `
    <p class="modal-news-text">${data.text}</p>
    <hr style="margin: 20px 0; border:0; border-top:1px solid var(--border-subtle);">
    <h4 style="color:var(--ceias-blue); margin-bottom:12px;">📸 Galeria de Fotos do Evento</h4>
    <div class="modal-album-grid">
      ${photosHTML}
    </div>
  `;

  modal.classList.add('modal-overlay', 'open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeNewsModal = function() {
  const modal = document.getElementById('newsModal');
  if (modal) {
    modal.classList.remove('modal-overlay', 'open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
};

window.addEventListener('click', (event) => {
  const modal = document.getElementById('newsModal');
  if (event.target === modal) closeNewsModal();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeNewsModal();
});

/* ==========================================================================
   4. ACESSIBILIDADE (CONTRASTE E FONTE)
   ========================================================================== */
window.toggleContrast = function() {
  document.body.classList.toggle('high-contrast');
};

let fontScale = 100;
window.adjustFont = function(direction) {
  fontScale += direction * 5;
  if (fontScale < 85) fontScale = 85;
  if (fontScale > 125) fontScale = 125;

  document.documentElement.style.fontSize = `${fontScale}%`;
};

/* ==========================================================================
   5. FORMULÁRIOS DE MATRÍCULA E CONTATO
   ========================================================================== */
function initFormListeners() {
  const chatInput = document.getElementById('chatMessage');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const form = chatInput.closest('form');
        if (form) form.requestSubmit();
      }
    });
  }
}

window.processMatriculaEmail = function(event) {
  if (event) event.preventDefault();

  const studentName = document.getElementById('studentName')?.value.trim();
  const grade = document.getElementById('gradeSelect')?.value;
  const parentName = document.getElementById('parentName')?.value.trim();
  const phone = document.getElementById('phoneNum')?.value.trim();
  const parentEmail = document.getElementById('parentEmail')?.value.trim();
  const obs = document.getElementById('observation')?.value.trim() || 'Nenhuma';

  if (!studentName || !grade || !parentName || !phone || !parentEmail) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  const schoolEmail = "ceias@escola.pr.gov.br";
  const subject = encodeURIComponent(`[PRÉ-MATRÍCULA C.E.I.A.S] Aluno: ${studentName}`);
  const bodyText = encodeURIComponent(
    `Solicitação de Pré-Matrícula Escolar - C.E.I.A.S:\n\n` +
    `👤 Nome do Aluno(a): ${studentName}\n` +
    `📚 Série Pretendida: ${grade}\n` +
    `👨‍👩‍👧 Responsável Legal: ${parentName}\n` +
    `📞 Telefone de Contato: ${phone}\n` +
    `✉️ E-mail do Responsável: ${parentEmail}\n` +
    `📝 Observações: ${obs}\n\n` +
    `Enviado através do Portal Oficial do C.E.I.A.S.`
  );

  window.location.href = `mailto:${schoolEmail}?subject=${subject}&body=${bodyText}`;
  alert("Sua solicitação foi gravada! Seu aplicativo de e-mail será aberto para envio da mensagem para a secretaria.");
};

window.handleChatSubmit = function(event) {
  if (event) event.preventDefault();

  const name = document.getElementById('chatName')?.value.trim();
  const contact = document.getElementById('chatContact')?.value.trim();
  const message = document.getElementById('chatMessage')?.value.trim();

  if (!name || !contact || !message) {
    alert("Por favor, preencha todos os campos do formulário de contato.");
    return;
  }

  const schoolEmail = "ceias@escola.pr.gov.br";
  const subject = encodeURIComponent(`[DÚVIDA / ATENDIMENTO VIA SITE] De: ${name}`);
  const bodyText = encodeURIComponent(
    `Mensagem enviada pelo site oficial do C.E.I.A.S:\n\n` +
    `👤 Nome: ${name}\n` +
    `📞 Contato: ${contact}\n` +
    `💬 Mensagem: ${message}\n`
  );

  window.location.href = `mailto:${schoolEmail}?subject=${subject}&body=${bodyText}`;
  alert(`Obrigado pelo contato, ${name}! Seu e-mail padrão será aberto para confirmar a mensagem à secretaria.`);

  event.target.reset();
};