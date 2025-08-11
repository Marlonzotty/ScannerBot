🧠 MemeBot Frontend – Visão Geral
Este é o frontend do MemeBot, um sistema que consome dados da API de análise de tokens da DEX Screener para exibir informações relevantes de forma simples e direta.

🚀 O que o frontend faz
Conecta-se à API FastAPI em http://127.0.0.1:8000/signals/
Realiza o fetch de dados com informações dos tokens mais recentes
Exibe blocos individuais para cada token com:
Ícone
Endereço (tokenAddress)
Descrição
Blockchain (chainId)
Links úteis (Twitter, Telegram, etc)
Utiliza TypeScript e React com estrutura moderna de componentes
Projeto visualmente simples, com layout básico (modelo clássico)
📦 Estrutura de diretórios principais
src/
├── App.tsx               # Componente principal
├── main.tsx              # Ponto de entrada
├── services/
│   └── api.ts            # Requisições HTTP para o backend
├── types/
│   └── token.ts          # Tipagem dos dados recebidos da API
├── components/
│   └── TokenCard.tsx     # Exibe os dados de cada token
🧩 Tecnologias usadas
Vite + React
TypeScript
TailwindCSS (ou CSS básico)
Integração com FastAPI (backend)
📡 API esperada
O frontend espera que o backend esteja rodando em:

http://127.0.0.1:8000/signals/
E que retorne uma lista de objetos Signal, como:

[
  {
    "tokenAddress": "0x123...",
    "url": "https://dexscreener.com/token/...",
    "icon": "https://img.url",
    "description": "Token de teste",
    "chainId": "ETH",
    "links": [
      {
        "type": "twitter",
        "label": "Twitter",
        "url": "https://twitter.com/token"
      }
    ]
  }
]
⚙️ Como rodar
npm install
npm run dev
Certifique-se de que o backend esteja rodando com CORS habilitado.