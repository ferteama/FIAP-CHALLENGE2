# 🚁 Drone Vision Watch — Motiva

**Disciplina:** Cross-Platform Application Development
**Curso:** Ciência da Computação — FIAP
**Entrega:** Challenge Motiva — Equipe 11

---

## Integrantes

| Nome | RM |
|------|----|
| Auro Vanetti | RM563761 |
| Enzo H. K. Nishida | RM565052 |
| Renan Mano Otero | RM554911 |
| Marco Antonio Ferreira Fonseca | RM566434 |
| Bruno Soares de Santanna | RM562235 |
| Enzo Yokokura Araujo | RM564177 |

---

## Sobre o Projeto

O **Drone Vision Watch** é um aplicativo mobile para operadores de campo da
**Motiva**, empresa responsável pela manutenção de faixas de domínio em
rodovias. O app simula o monitoramento de vegetação detectado por drones,
com uma etapa de análise por **visão computacional (OpenCV)** e previsão
de crescimento inspirada em **XGBoost**.

O fluxo completo é: foto tirada em campo (ou pelo drone) → análise da
imagem → altura estimada e classificação de risco → registro na lista de
ocorrências, com histórico e status persistidos entre sessões.

---

## Funcionalidades Implementadas

| Requisito | Implementado |
|-----------|-------------|
| Lista de ocorrências detectadas | ✅ `src/screens/ListaScreen.tsx` |
| Cadastro de nova ocorrência, com foto (câmera ou galeria) | ✅ `src/screens/CadastroScreen.tsx` |
| Detalhe completo de cada ocorrência | ✅ `src/screens/DetalheScreen.tsx` |
| Cálculo automático do risco a partir da altura da grama | ✅ `src/utils/formatadores.ts` |
| Persistência local entre sessões | ✅ `src/context/OcorrenciasContext.tsx` + AsyncStorage |
| Registrar corte realizado (remove a ocorrência ativa) | ✅ `src/screens/DetalheScreen.tsx` |
| Análise de foto por visão computacional (API própria) | ✅ `src/services/vegetationApi.ts` + `backend/main.py` |

---

## Estrutura de Pastas

```
drone-vision-watch/
├── App.tsx                        # Raiz — navegação condicional (useState)
├── index.js                       # Entry point (registerRootComponent)
├── app.json                       # Configuração Expo
├── package.json
├── tsconfig.json
├── .env.example                   # Modelo de variáveis de ambiente (URL da API)
│
├── assets/                        # Ícones e imagens estáticas
│
├── src/
│   ├── screens/                   # Telas do app
│   │   ├── ListaScreen.tsx        # Tela 1 — lista de ocorrências
│   │   ├── CadastroScreen.tsx     # Tela 2 — cadastro com foto
│   │   └── DetalheScreen.tsx      # Tela 3 — detalhe da ocorrência
│   │
│   ├── components/                # Componentes reutilizáveis
│   │   ├── OcorrenciaCard.tsx
│   │   ├── FilterChip.tsx
│   │   └── index.ts               # Barrel export
│   │
│   ├── interfaces/                # Contratos de dados (objetos)
│   │   └── ocorrencia.ts          # interface Ocorrencia
│   │
│   ├── types/                     # Union types simples
│   │   └── nivelRisco.ts          # "baixo" | "medio" | "alto"
│   │
│   ├── data/                      # Dados iniciais (mock)
│   │   └── ocorrencias.ts
│   │
│   ├── context/                   # Estado global
│   │   └── OcorrenciasContext.tsx # useState + AsyncStorage
│   │
│   ├── services/                  # Comunicação com APIs externas
│   │   └── vegetationApi.ts       # Envia foto → recebe altura/risco da API
│   │
│   └── utils/                     # Funções puras / design tokens
│       ├── tema.ts                # Cores, sombras (identidade Motiva)
│       └── formatadores.ts        # calcularRisco, dataHoje, etc.
│
├── backend/                       # API de análise de vegetação (Python)
│   ├── main.py                    # FastAPI + OpenCV — segmentação de cor
│   ├── requirements.txt
│   └── README.md                  # Como rodar e fazer deploy da API
│
└── docs/
    └── exemplo-integracao-api.tsx # Exemplo comentado de uso do vegetationApi
```

---

## Como Executar

### App (Expo)

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npx expo start
```

Depois, escaneie o QR code com o app **Expo Go** no celular, ou pressione
`w` no terminal para abrir no navegador.

> Se o `npx expo start` falhar, o motivo mais comum é rodar o comando fora
> da pasta raiz do projeto, ou não ter rodado `npm install` antes. Confira
> se `package.json` está na pasta onde você está executando o comando.

### API de análise de vegetação (opcional, para testar a integração real)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Depois, copie `.env.example` para `.env` na raiz do projeto e configure
`EXPO_PUBLIC_API_URL` com o IP da sua máquina na rede local. Detalhes em
[`backend/README.md`](./backend/README.md).

Sem a API rodando, o app não quebra — `vegetationApi.ts` tem um modo
simulado (`analisarFotoVegetacaoSimulado`) usado como fallback.

---

## Conceitos Aplicados

- **Context API** — estado das ocorrências compartilhado entre as 3 telas
- **AsyncStorage** — ocorrências persistem entre sessões do app
- **TypeScript** — interfaces, union types, tipagem de props e estado
- **Componentização** — `OcorrenciaCard` e `FilterChip` reutilizáveis
- **Integração com API externa** — captura de foto → upload multipart → resposta JSON
- **Visão computacional** — segmentação HSV com OpenCV no backend, para estimar cobertura de vegetação
- **Fallback resiliente** — modo simulado quando a API está indisponível

---

## Vídeo de Demonstração

> Link: _(adicionar após publicação no YouTube como "Não listado")_

Roteiro completo em [`Roteiro_Final_Equipe11.docx`](../Roteiro_Final_Equipe11.docx).
