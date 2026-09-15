# Formulário de Avaliações (PWA + Google Sheets)

Um sistema minimalista de avaliações projetado para rodar como PWA (totem em tablets ou computadores), enviando dados dinamicamente para uma planilha do Google Sheets via Google Apps Script. A estrutura foi pensada para facilitar a posterior ingestão desses dados por ferramentas de BI (Power BI, Looker, etc).

## Características
- **Front-end:** Vanilla JS empacotado com Vite (Leve, rápido e sem dependências complexas);
- **Back-end/Banco:** Google Apps Script + Google Sheets;
- **Dinâmico:** Perguntas e escalas (com ou sem emojis) configuráveis via arquivo de dados;
- **Design:** Sóbrio e simplista, prezando pela conversão e experiência rápida do usuário.

## Como utilizar e testar localmente

1. Faça o clone do projeto e instale as dependências:
   ```bash
   npm install
   ```

2. Configure as perguntas: duplique o arquivo `data/questions.example.js`, renomeie para `data/questions.js` e modifique conforme necessário. Para aplicar uma marca local, duplique também `data/brand.example.js` como `data/brand.js`. Esses dois arquivos são ignorados pelo Git, para que perguntas, identidade visual e logo de uma implantação não sejam publicados.

Crie um arquivo .env na raiz do projeto contendo a URL do seu Webhook gerado no Google Apps Script:
    ```bash
    VITE_GOOGLE_SCRIPT_URL=sua_url_do_google_script_aqui
    ```

3. Crie a automação no Google Apps Script (use o código de `script.example.gs` como base).

4. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
