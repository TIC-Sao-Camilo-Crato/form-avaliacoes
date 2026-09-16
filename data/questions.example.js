// duplique o questions.example.js e renomeie para questions.js, editando as perguntas e opções de resposta conforme necessário.

const emoji_scale = [
    { value: "Péssimo", label: "Péssimo", icon: "😡" },
    { value: "Ruim", label: "Ruim", icon: "😠" },
    { value: "Regular", label: "Regular", icon: "😐" },
    { value: "Bom", label: "Bom", icon: "🙂" },
    { value: "Excelente", label: "Excelente", icon: "🤩" }
]; // o uso de emojis é opcional, mas pode tornar a avaliação mais visual e intuitiva

const text_scale = [
    { value: "Cliente antigo", label: "Cliente antigo" },
    { value: "Cliente novo", label: "Cliente novo" }
];

const questions = [
  {
    question: "Você é cliente antigo ou novo?",
    scale: text_scale
  },
  {
    question: "Como você avalia a qualidade do atendimento?",
    scale: emoji_scale
  },
  {
    question: "A estrutura do local atendeu às suas expectativas?",
    scale: emoji_scale
  },
  {
    question: "Você recomendaria nossos serviços para outras pessoas?",
    scale: emoji_scale
  },
  { 
    question: "Deixe aqui sua opinião!",
    open: true 
  }
];

export { questions };
