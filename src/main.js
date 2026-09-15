import './style.css';
import submitReview from './api.js';
import { questions } from '../data/questions.example.js'; // comente esta linha e descomente a seguinte para usar suas próprias perguntas
// import { questions } from '../data/questions.js';

const userResponses = {};
let currentQuestionIndex = 0; 

function renderScreen(direcao = 'next') {
  const app = document.querySelector('#app');
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const jaRespondida = userResponses[currentQuestion.question];

  let html = /*html*/`
    <main class="container">
      <h1>Pesquisa de Satisfação</h1>
      <p class="contador">Pergunta ${currentQuestionIndex + 1} de ${questions.length}</p>
      
      <div id="lista-perguntas">
        <div class="bloco-pergunta anima-${direcao}">
          <p class="titulo-pergunta">${currentQuestion.question}</p>
          <div class="opcoes">
  `;
  if (currentQuestion.open) {
    html += /*html*/`
      <textarea
        id="resposta-aberta"
        class="resposta-aberta"
        placeholder="Digite..."
      >${jaRespondida || ''}</textarea>
    `;
  } else {
    currentQuestion.scale.forEach(opcao => {
      const temEmoji = opcao.icon ? true : false;
      const ativoClass = jaRespondida === opcao.value ? 'ativo' : ''; 

      html += /*html*/`
        <button class="btn-opcao ${ativoClass}" data-pergunta="${currentQuestion.question}" data-valor="${opcao.value}">
          ${temEmoji ? `<span class="emoji">${opcao.icon}</span>` : ''}
          <span class="texto-opcao">${opcao.label}</span>
        </button>
      `;
    });
  }

  html += /*html*/`
          </div>
        </div>
      </div>
      
      <div class="botoes-acao">
        ${currentQuestionIndex > 0 ? `<button id="btn-voltar" class="btn-secundario">Voltar</button>` : '<div></div>'}
        
        <button id="btn-avancar" class="btn-enviar" ${!jaRespondida ? 'disabled' : ''}>
          ${isLastQuestion ? 'Finalizar' : 'Próxima'}
        </button>
      </div>
    </main>
  `;

  app.innerHTML = html;
  configurarCliques(isLastQuestion);
}

function configurarCliques(isLastQuestion) {
  const botoesOpcao = document.querySelectorAll('.btn-opcao');
  const actionButton = document.getElementById('btn-avancar');
  const backButton = document.getElementById('btn-voltar');
  const currentQuestion = questions[currentQuestionIndex];

  const avancarPergunta = async () => {
    if (!isLastQuestion) {
      currentQuestionIndex++;
      renderScreen('next');
    } else {
      const respostasFormatadas = Object.keys(userResponses).map(pergunta => ({
        question: pergunta,
        review: userResponses[pergunta]
      }));

      mostrarCarregamento();

      const tentarEnviar = async () => {
        const result = await submitReview(respostasFormatadas);

        if (result.status === 'success') {
          for (let key in userResponses) delete userResponses[key];
          currentQuestionIndex = 0; 
          renderScreen('next');
        } else {
          mostrarErroTravado(result.message, tentarEnviar);
        }
      };

      await tentarEnviar();
    }
  };

  botoesOpcao.forEach(button => {
    button.addEventListener('click', () => {
      const pergunta = button.getAttribute('data-pergunta');
      const valor = button.getAttribute('data-valor');

      const irmaos = button.parentElement.querySelectorAll('.btn-opcao');
      irmaos.forEach(b => b.classList.remove('ativo'));

      button.classList.add('ativo');
      userResponses[pergunta] = valor;
      
      if (actionButton) actionButton.disabled = false; 

      if (isLastQuestion) {
        botoesOpcao.forEach(btn => btn.disabled = true);
      }

      setTimeout(() => {
        avancarPergunta();
      }, 400);
    });
  });

const respostaAberta = document.getElementById('resposta-aberta');

if (respostaAberta) {
  respostaAberta.addEventListener('input', () => {
    const valor = respostaAberta.value.trim();

    if (valor) {
      userResponses[currentQuestion.question] = valor;
      actionButton.disabled = false;
    } else {
      delete userResponses[currentQuestion.question];
      actionButton.disabled = true;
    }
  });
}

  if (backButton) {
    backButton.addEventListener('click', () => {
      currentQuestionIndex--;
      renderScreen('prev'); 
    });
  }

  if (actionButton) {
      actionButton.addEventListener('click', avancarPergunta);
  }
}

function mostrarCarregamento() {
  const app = document.querySelector('#app');
  
  app.innerHTML = /*html*/`
    <main class="container anima-entrada feedback-container">
      <span class="feedback-icon sucesso">✅</span>
      <h2>Muito Obrigado!</h2>
      <p class="feedback-mensagem">Agradecemos por responder nossa pesquisa.</p>
      
      <div class="loader-container">
        <div class="spinner"></div>
        <p class="enviando-texto">Salvando dados...</p>
      </div>
    </main>
  `;
}

function mostrarErroTravado(mensagem, callbackReenvio) {
  const app = document.querySelector('#app');
  
  app.innerHTML = /*html*/`
    <main class="container anima-entrada feedback-container">
      <div class="feedback-icon erro">❌</div>
      <h2>Sistema Pausado</h2>
      <p class="feedback-mensagem">Não foi possível enviar a última avaliação.</p>
      <p class="feedback-mensagem" style="font-size: 0.95rem; margin-top: 10px; color: #d9534f;">
        Detalhe: ${mensagem}<br><br>
        <strong>Por favor, verifique a conexão de internet do tablet.</strong> A coleta de novas respostas está travada para evitar perda de dados.
      </p>
      
      <button id="btn-tentar-novamente" class="btn-enviar" style="margin-top: 30px; background-color: #d9534f;">
        Tentar Enviar Novamente
      </button>
    </main>
  `;
  
  document.getElementById('btn-tentar-novamente').addEventListener('click', () => {
      mostrarCarregamento();
      callbackReenvio(); 
  });
}

renderScreen('next');