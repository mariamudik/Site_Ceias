/**
 * C.E.I.A.S - Colégio do Campo Irmã Ambrósia Sabatovich
 * Script com Janela Modal Pop-up para Notícias (com dezenas de fotos),
 * Envio de Matrícula por E-mail e Alto Contraste em Azul Ciano Legível.
 */

let chatHistory = [];

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  initFormListeners();
});

/* ==========================================================================
   1. MENU HAMBÚRGUER
   ========================================================================== */
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

/* ==========================================================================
   2. SISTEMA DE NAVEGAÇÃO ENTRE ABAS
   ========================================================================== */
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

/* ==========================================================================
   3. JANELA MODAL POP-UP COM FOTOS DO EVENTO
   ========================================================================== */
const newsDatabase = {
  'festa-junina': {
    title: '🎉 Grande Festa Junina Tradicional do C.E.I.A.S (20 de Junho)',
    text: 'No dia 20 de junho realizamos a nossa inesquecível Festa Junina! O evento foi um sucesso maravilhoso, acolhendo centenas de pessoas, alunos, familiares e vizinhos de toda a Colônia Marcelino. Tivemos dança de quadrilha de todas as turmas, barracas de comidas típicas, brincadeiras tradicionais e um clima de união comunitária espetacular!',
    photoCount: 18,
    captions: [
      'Dança de Quadrilha do 3º Ano Médio',
      'Apresentação do 6º e 7º Ano Fundamental',
      'Barraca de Comidas Típicas e Milho Verde',
      'Pescaria e Brincadeiras das Crianças',
      'Decoração de Bandeirinhas do Pátio',
      'Mesa de Doces Típicos do Campo',
      'Quadrilha do Corpo Docente e Funcionários',
      'Premiação do Melhor Traje Junino',
      'Reunião das Famílias no Pátio Central',
      'Apresentação Musical dos Alunos',
      'Equipe da Cozinha preparando a Canjica',
      'Roda de Dança Comunitária ao Fim do Evento'
    ]
  },
  'feira-sustentavel': {
    title: '🌱 Feira do Conhecimento Sustentável do Campo (15 de Maio)',
    text: 'Apresentação dos trabalhos de agroecologia e ciências desenvolvidos pelos alunos do Ensino Fundamental II e Médio. Os estudantes apresentaram maquetes de irrigação sustentável, compostagem orgânica e amostragem do cultivo da horta do colégio.',
    photoCount: 12,
    captions: [
      'Estande de Irrigação Automatizada',
      'Exposição de Hortaliças Orgânicas da Escola',
      'Demonstração do Sistema de Compostagem',
      'Apresentação dos Alunos do Ensino Médio',
      'Avaliação dos Trabalhos pela Equipe Pedagógica',
      'Visita das Famílias à Feira de Ciências'
    ]
  },
  'reuniao-pais': {
    title: '📋 Reunião Geral de Pais e Entrega de Boletins (10 de Abril)',
    text: 'Encontro comunitário entre a equipe gestora, professores e os responsáveis pelos estudantes. Foram apresentadas as metas pedagógicas para o ano letivo, alinhamento sobre transporte escolar rural e entrega presencial dos boletins.',
    photoCount: 8,
    captions: [
      'Auditório do Colégio com Pais e Responsáveis',
      'Abertura com a Diretora Helena Maria',
      'Atendimento Individualizado com Professores',
      'Entrega e Assinatura dos Boletins Escolares'
    ]
  },
  'interclasses': {
    title: '⚽ Torneio Interclasses na Quadra Coberta (28 de Março)',
    text: 'Competição esportiva integrando turmas do 6º ano ao 3º ano do Ensino Médio. Modalidades de futsal, voleibol e atletismo promovendo respeito, saúde e trabalho em equipe.',
    photoCount: 10,
    captions: [
      'Partida de Futsal Masculino na Quadra Coberta',
      'Jogo de Voleibol Feminino do Ensino Médio',
      'Torcida das Turmas Animando os Jogos',
      'Entrega de Medalhas aos Campeões'
    ]
  }
};

window.openNewsModal = function(newsKey) {
  const data = newsDatabase[newsKey];
  if (!data) return;

  const modalOverlay = document.getElementById('newsModalOverlay');
  const modalBody = document.getElementById('modalNewsBody');

  let photosHTML = '';
  for (let i = 0; i < data.photoCount; i++) {
    const captionText = data.captions[i] || `Registro Fotográfico ${i + 1} do Evento`;
    photosHTML += `
      <div class="modal-photo-card">
        🖼️ [Foto ${i + 1}]: ${captionText}
      </div>
    `;
  }

  modalBody.innerHTML = `
    <h3 class="modal-news-title">${data.title}</h3>
    <p class="modal-news-text">${data.text}</p>
    <hr style="margin: 20px 0; border:0; border-top:1px solid var(--border-subtle);">
    <h4 style="color:var(--ceias-blue); margin-bottom:12px;">📸 Álbum Completo do Dia (${data.photoCount} Fotos do Evento):</h4>
    <div class="modal-album-grid">
      ${photosHTML}
    </div>
  `;

  modalOverlay.classList.add('open');
};

window.closeNewsModal = function(event) {
  if (event && event.target !== document.getElementById('newsModalOverlay')) return;
  const modalOverlay = document.getElementById('newsModalOverlay');
  modalOverlay.classList.remove('open');
};

/* ==========================================================================
   4. ACESSIBILIDADE
   ========================================================================== */
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

/* ==========================================================================
   5. ENVIO DE MATRÍCULA VIA E-MAIL (E OPÇÃO WHATSAPP)
   ========================================================================== */
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
    `👤 Nome do Aluno(a): ${studentName}\n` +
    `📚 Série Pretendida: ${grade}\n` +
    `👨‍👩‍👧 Responsável Legal: ${parentName}\n` +
    `📞 Telefone de Contato: ${phone}\n` +
    `✉️ E-mail do Responsável: ${parentEmail}\n\n` +
    `Enviado através do Portal Oficial do C.E.I.A.S.`
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
  const textMessage = `Olá! Gostaria de enviar a solicitação de pré-matrícula pública no *C.E.I.A.S*:\n\n` +
                      `👤 *Aluno(a):* ${studentName}\n` +
                      `📚 *Série Pretendida:* ${grade}\n` +
                      `👨‍👩‍👧 *Responsável:* ${parentName}\n` +
                      `📞 *Contato:* ${phone}`;

  window.open(`https://wa.me/${schoolPhone}?text=${encodeURIComponent(textMessage)}`, '_blank');
};

/* ==========================================================================
   6. INTELIGÊNCIA ARTIFICIAL E ATENDIMENTO POR E-MAIL
   ========================================================================== */
window.askMatriculaIA = function() {
  const input = document.getElementById('matChatInput');
  const question = input?.value.trim();
  if (!question) return;

  const chatLogs = document.getElementById('matChatLogs');
  appendMessage(chatLogs, 'user', question);
  input.value = '';

  setTimeout(() => {
    const qLower = question.toLowerCase();
    let reply = "Para fazer a matrícula pública no C.E.I.A.S, preencha o formulário ao lado que os dados serão enviados direto para o e-mail oficial da nossa secretaria!";

    if (qLower.includes('doc') || qLower.includes('documento') || qLower.includes('trazer')) {
      reply = "📄 Documentos Necessários: RG/Certidão de Nascimento do aluno, CPF dos responsáveis, Comprovante de Residência rural e Histórico Escolar.";
    } else if (qLower.includes('paga') || qLower.includes('valor') || qLower.includes('custo')) {
      reply = "🆓 O C.E.I.A.S é uma escola 100% pública e gratuita da Rede Estadual!";
    }

    appendMessage(chatLogs, 'bot', reply);
  }, 500);
};

window.sendMainChatMessage = function() {
  const input = document.getElementById('mainChatInput');
  const messageText = input?.value.trim();
  if (!messageText) return;

  const chatLogs = document.getElementById('mainChatLogs');
  appendMessage(chatLogs, 'user', messageText);
  chatHistory.push(`Usuário: ${messageText}`);
  input.value = '';

  setTimeout(() => {
    const text = messageText.toLowerCase();
    let botReply = "Anotado! Se quiser encaminhar estas dúvidas diretamente para o e-mail da secretaria escolar, clique no botão abaixo.";

    if (text.includes('horario') || text.includes('turnos')) {
      botReply = "⏰ Aulas no turno Matutino (07h30 às 11h50) e Vespertino (13h00 às 17h20).";
    } else if (text.includes('transporte') || text.includes('onibus') || text.includes('linha')) {
      botReply = "🚌 O C.E.I.A.S oferece linhas de transporte escolar rural gratuito cobrindo 100% das comunidades rurais da região.";
    } else if (text.includes('email') || text.includes('e-mail') || text.includes('contato')) {
      botReply = "✉️ O e-mail oficial da escola é: ceias.colegio.campo@gmail.com";
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
    (chatHistory.length > 0 ? chatHistory.join("\n") : "Gostaria de solicitar informações gerais da escola.")
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