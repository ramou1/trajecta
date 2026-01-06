# Trajecta - MVP de Estimativa de Trajetos

Projeto MVP para estimativa de consumo de combustível em trajetos com carros e motos.

## 🚀 Funcionalidades

### MVP Inicial
- **Rotas Fixas**: Conjunto limitado de trajetos pré-definidos (SP-RJ, SP-Campinas, etc)
- **Base de Veículos**: Modelos essenciais de carros e motos com dados técnicos básicos
- **Comparação Simples**: Comparação direta de consumo entre veículos
- **Cálculo de Estimativa**: Sistema que cruza dados técnicos do veículo com informações da rota

### Sistema de Autenticação
- Cadastro de usuário (email e senha)
- Login/Logout
- Controle de sessão com localStorage

### Interface
- Página inicial explicativa com CTAs
- Página de consulta com filtros (tipo, marca)
- Página de resultado com estimativas detalhadas

## 📋 Estrutura do Projeto

```
trajecta/
├── app/                    # Páginas Next.js
│   ├── page.tsx           # Página inicial
│   ├── login/             # Página de login
│   ├── cadastro/          # Página de cadastro
│   ├── consulta/          # Página de consulta de trajetos
│   └── resultado/         # Página de resultado da estimativa
├── contexts/              # Contextos React
│   └── AuthContext.tsx    # Contexto de autenticação
├── data/                  # Dados mockados
│   ├── veiculos.ts        # Base de veículos (carros e motos)
│   └── rotas.ts           # Rotas fixas pré-definidas
├── types/                 # Tipos TypeScript
│   └── index.ts           # Interfaces e tipos
├── utils/                 # Utilitários
│   └── calculos.ts        # Lógica de cálculo de consumo
├── constants/             # Constantes
│   └── colors.ts          # Cores oficiais do projeto
└── public/                # Arquivos estáticos
    ├── images/
    │   └── logo-trajecta.png
    └── carros/            # Imagens dos carros
        ├── onix.jpg
        ├── uno.jpg
        ├── gol.jpg
        └── ... (outras imagens)
```

## 🚗 Veículos Cadastrados

### Carros
- Fiat Uno 1.0 Fire Flex
- Volkswagen Gol 1.0 200 Flex
- Chevrolet Onix 1.0 Turbo Flex
- Toyota Corolla 2.0 XEi Flex
- Honda Civic 2.0 EXL Flex
- Jeep Compass 2.0 4x4 Diesel
- Toyota Hilux 2.8 CD SRX Diesel

### Motos
- Honda CG 160 Titan
- Yamaha Fazer 250 ABS
- Honda CB 650R
- Kawasaki Ninja 650 ABS

## 🗺️ Rotas Disponíveis

1. São Paulo - SP → Rio de Janeiro - RJ (429 km)
2. São Paulo - SP → Campinas - SP (99 km)
3. São Paulo - SP → Belo Horizonte - MG (586 km)
4. Rio de Janeiro - RJ → Vitória - ES (524 km)
5. São Paulo - SP → Curitiba - PR (408 km)
6. São Paulo - SP → Santos - SP (72 km)

## 💻 Tecnologias

- **Next.js 16** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **React 19** - Biblioteca UI
- **Lucide React** - Ícones
- **Fonte Inter** - Tipografia

## 🏃 Como Executar

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse [http://localhost:3000](http://localhost:3000)

## 📱 Como Usar

1. **Cadastro/Login**: Crie uma conta ou faça login
2. **Selecione a Rota**: Escolha uma das rotas pré-definidas
3. **Informe o Horário**: Defina o horário de partida
4. **Escolha o Veículo**: Filtre e selecione o veículo desejado
5. **Veja o Resultado**: Consulte a estimativa de consumo, custos e tempo

## 🧮 Lógica de Cálculo

O sistema calcula:
- Consumo total baseado em distâncias urbana e rodoviária
- Ajuste para horários de pico (15% mais consumo)
- Custo de combustível baseado em preços médios (definidos em `utils/calculos.ts`):
  - Gasolina: R$ 5,80/L
  - Etanol: R$ 4,20/L
  - Flex: R$ 5,00/L (média ponderada)
  - Diesel: R$ 6,10/L
- Custo de pedágios
- Tempo estimado com ajuste para trânsito (20% mais tempo em horário de pico)
- Paradas necessárias para abastecimento

## 🎨 Design e Cores

### Cores Oficiais
- Verde: `#5dae44`
- Verde Água: `#00a8c6`
- Azul Claro: `#bddef0`
- Azul Médio: `#0099d3`
- Azul Escuro: `#00264b`

### Recursos Visuais
- Logo: `public/images/logo-trajecta.png`
- Imagens de carros: `public/carros/{nome-do-modelo}.jpg`
  - Exemplos: `onix.jpg`, `uno.jpg`, `gol.jpg`, `corolla.jpg`
  - Nome do arquivo deve ser o nome do modelo em minúsculas, sem espaços ou números

## 🎯 Próximos Passos (Futuro)

- Sistema de comparação premium (R$ 9,90/mês)
- Mais rotas personalizadas
- Integração com APIs de trânsito
- Histórico de consultas
- Exportação de relatórios