# Guia de personalização de avaliações

Este guia explica como adaptar a solução para uma nova avaliação sem alterar o código reutilizável nem publicar dados da organização no repositório.

## Onde ficam as configurações específicas

| Necessidade | Arquivo local | Modelo versionado |
| --- | --- | --- |
| Perguntas e opções de resposta | `data/questions.js` | `data/questions.example.js` |
| Título, logo e cores | `data/brand.js` | `data/brand.example.js` |
| URL de envio ao Google Apps Script | `.env` | Não há; crie o arquivo localmente |
| Imagem do logo | `public/logo.png` | Não há; inclua seu próprio arquivo |

Os arquivos locais acima estão no `.gitignore`. Portanto, não são enviados ao repositório e preservam os dados e a identidade visual de cada implantação.

## 1. Configurar perguntas

1. Copie `data/questions.example.js` para `data/questions.js`.
2. Edite as escalas e o array `questions`.
3. Cada pergunta precisa de `question` e `scale`. Cada opção da escala precisa de `value` e `label`; `icon` é opcional.

Exemplo:

```js
const satisfactionScale = [
  { value: 'Ruim', label: 'Ruim', icon: '😠' },
  { value: 'Bom', label: 'Bom', icon: '🙂' },
  { value: 'Excelente', label: 'Excelente', icon: '🤩' }
];

const questions = [
  {
    question: 'Como você avalia o atendimento?',
    scale: satisfactionScale
  }
];

export { questions };
```

O texto de `question` é enviado junto com a resposta. Mantenha-o claro e estável para facilitar a análise posterior na planilha ou ferramenta de BI.

## 2. Aplicar marca e cores

1. Copie `data/brand.example.js` para `data/brand.js`.
2. Altere `title`, `logo`, `logoAlt` e as cores desejadas.
3. Coloque o arquivo do logo em `public/logo.png`, ou ajuste `logo` para outro caminho dentro de `public`.

Exemplo:

```js
const brand = {
  title: 'Avaliação da Clínica Exemplo',
  logo: '/logo.png',
  logoAlt: 'Logo da Clínica Exemplo',
  colors: {
    '--color-bg': '#f6f8fb',
    '--color-primary': '#1f5fa8',
    '--color-primary-light': '#c8ddf5',
    '--color-primary-hover-bg': '#f0f6fd',
    '--color-primary-active-bg': '#e0eefc'
  }
};

export { brand };
```

As chaves de `colors` são variáveis CSS. É possível omitir alguma delas: nesse caso, o valor genérico do aplicativo será usado.

## 3. Configurar o envio das respostas

Crie `.env` na raiz com a URL do Web App do Google Apps Script:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/SEU_ID/exec
```

Use `script.example.gs` como base para a automação no Google Apps Script. Não publique a URL de produção, planilhas ou credenciais no Git.

## 4. Testar e gerar a versão de produção

Após personalizar, execute:

```bash
npm run dev
```

Para validar a compilação de produção:

```bash
npm run build
```

O resultado é gerado em `dist/`, que também é ignorado pelo Git.

## O que pode ser versionado

Envie alterações reutilizáveis, como melhorias de interface, acessibilidade, correções de envio e atualizações dos arquivos `*.example.js`.

Não envie `data/questions.js`, `data/brand.js`, `public/logo.png`, `.env` ou `dist/`. Eles pertencem à implantação específica e já estão protegidos pelo `.gitignore`.
