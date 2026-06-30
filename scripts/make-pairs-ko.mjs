import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
mkdirSync(join(__dirname, 'translations'), { recursive: true })

const base = JSON.parse(readFileSync(join(__dirname, 'locale-pairs-base.json'), 'utf8'))

/** @param {Record<string, string>} map */
function writeLocale(code, map) {
  const pairs = base.map(([enKey]) => {
    const val = map[enKey]
    if (!val) throw new Error(`Missing ${code}: ${enKey.slice(0, 60)}`)
    return [enKey, val]
  })
  writeFileSync(join(__dirname, `locale-pairs-${code}.json`), JSON.stringify(pairs, null, 2) + '\n')
  console.log(`Wrote locale-pairs-${code}.json (${pairs.length})`)
}

/** Korean */
writeLocale('ko', {
  'DataLuminary — Insights Within Reach | AI-Native Open-Source BI Platform':
    'DataLuminary — Insights ao alcance | Plataforma BI open source nativa em IA',
  'DataLuminary is an open-source, plugin-based, AI-native data visualization and BI platform built with full-stack TypeScript. End-to-end AI insights, microkernel plugin ecosystem, drag-and-drop NoCode configuration, and 5-minute Docker private deployment.':
    'DataLuminary é uma plataforma de visualização de dados e BI open source, baseada em plugins e nativa em IA, construída com TypeScript full-stack. Insights de IA ponta a ponta, ecossistema de plugins microkernel, configuração NoCode com arrastar e soltar e implantação privada com Docker em 5 minutos.',
  'BI Platform': 'Plataforma BI',
  'Data Visualization': 'Visualização de dados',
  'AI Insights': 'Insights de IA',
  'Open Source BI': 'BI open source',
  'Plugin Architecture': 'Arquitetura de plugins',
  'DataLuminary — Insights Within Reach': 'DataLuminary — Insights ao alcance',
  'AI-native, plugin-based, open-source data visualization BI platform':
    'Plataforma BI de visualização de dados open source, baseada em plugins e nativa em IA',
  Features: 'Recursos',
  Plugins: 'Plugins',
  AI: 'IA',
  Deploy: 'Implantação',
  About: 'Sobre',
  'Sign In': 'Entrar',
  'DataLuminary Home': 'Início DataLuminary',
  'Switch language': 'Alternar idioma',
  'Open menu': 'Abrir menu',
  'Close menu': 'Fechar menu',
  'LuminaryWorks AI Ecosystem · Open Source MIT License':
    'Ecossistema IA LuminaryWorks · Licença MIT open source',
  'Insights Within Reach': 'Insights ao alcance',
  'End-to-end AI — report generation, charting, data cleansing, and page layout, AI assists every step':
    'IA ponta a ponta — geração de relatórios, gráficos, limpeza de dados e layout de páginas; a IA auxilia em cada etapa',
  'Microkernel plugins — data sources, charts, and dashboard layouts, everything is extensible':
    'Plugins microkernel — fontes de dados, gráficos e layouts de painel; tudo é extensível',
  'Full-stack TypeScript — launch with Docker in 5 minutes, private deployment, zero barrier to customization':
    'TypeScript full-stack — inicie com Docker em 5 minutos, implantação privada, personalização sem barreiras',
  'Try for Free': 'Experimente grátis',
  'Open Source Community': 'Comunidade open source',
  'One-Click Docker Launch': 'Inicialização Docker com um clique',
  'Full-Stack TypeScript': 'TypeScript full-stack',
  'Private Deployment': 'Implantação privada',
  'AI is generating an analysis report': 'A IA está gerando um relatório de análise',
  'Total Sales': 'Vendas totais',
  'Anomaly Trends': 'Tendências anômalas',
  '3 anomaly trends detected · East China Q3 YoY ↓18%':
    '3 tendências anômalas detectadas · Leste da China T3 YoY ↓18%',
  'AI Cleansing': 'Limpeza com IA',
  'AI Charts/Reports': 'Gráficos/relatórios com IA',
  'Full Drag-and-Drop': 'Arrastar e soltar completo',
  'Plugin-Based': 'Baseado em plugins',
  'Four Core Differentiators': 'Quatro diferenciais principais',
  'Redefining Enterprise Data Visualization': 'Redefinindo a visualização de dados empresarial',
  'End-to-end AI · Microkernel Plugins · Drag-and-Drop NoCode · Full-Stack TypeScript':
    'IA ponta a ponta · Plugins microkernel · NoCode com arrastar e soltar · TypeScript full-stack',
  'AI-Native, End-to-End Intelligence': 'Nativo em IA, inteligência ponta a ponta',
  'Beyond visualization BI — DataLuminary embeds AI across every step from data to decisions. AI guides you through every stage of your reports.':
    'Além do BI de visualização — o DataLuminary integra IA em cada etapa, dos dados às decisões. A IA guia você em todas as fases dos seus relatórios.',
  'AI-Generated Analysis Reports': 'Relatórios de análise gerados por IA',
  'Describe your analysis goal; AI produces a complete report':
    'Descreva seu objetivo de análise; a IA produz um relatório completo',
  'AI-Assisted Charting': 'Gráficos assistidos por IA',
  'Smart chart recommendations with automatic field mapping':
    'Recomendações inteligentes de gráficos com mapeamento automático de campos',
  'AI Data Cleansing': 'Limpeza de dados com IA',
  'Detect nulls, anomalies, and format errors — fix with one click':
    'Detecte nulos, anomalias e erros de formato — corrija com um clique',
  'AI Page Layout': 'Layout de página com IA',
  'Analyze content hierarchy and auto-arrange dashboard layouts':
    'Analise a hierarquia do conteúdo e organize automaticamente os layouts do painel',
  'Microkernel Architecture, Infinitely Extensible': 'Arquitetura microkernel, infinitamente extensível',
  'Dashboard Plugins': 'Plugins de painel',
  'Free-form big screens / PC grid reports / mobile lists / card boards':
    'Telas grandes livres / relatórios em grade PC / listas móveis / quadros de cartões',
  'Chart Plugins': 'Plugins de gráficos',
  'ECharts · AntV · Highcharts — community contributions stack infinitely':
    'ECharts · AntV · Highcharts — contribuições da comunidade se acumulam infinitamente',
  'Data Source Plugins': 'Plugins de fontes de dados',
  'MySQL / PG / MongoDB / Excel / API — extend via custom SDK':
    'MySQL / PG / MongoDB / Excel / API — estenda via SDK personalizado',
  'Open SDK': 'SDK aberto',
  'JSON Schema constraints, interoperable with the Grafana ecosystem':
    'Restrições JSON Schema, interoperável com o ecossistema Grafana',
  'Drag-and-Drop Configuration, No Coding Required': 'Configuração com arrastar e soltar, sem codificação',
  'Product, operations, and BI analysts can independently handle data cleansing, charting, and dashboard building. Developers can dive into SQL and advanced config when needed.':
    'Produto, operações e analistas de BI podem gerenciar de forma independente limpeza de dados, gráficos e criação de painéis. Desenvolvedores podem aprofundar em SQL e configuração avançada quando necessário.',
  'Drag-and-Drop Datasets': 'Conjuntos de dados com arrastar e soltar',
  'Drag fields to configure metrics/dimensions, multi-table joins, calculated fields':
    'Arraste campos para configurar métricas/dimensões, joins multi-tabela, campos calculados',
  'NoCode Charting': 'Gráficos NoCode',
  'Pick chart type, drag fields to axes, live preview, zero code':
    'Escolha o tipo de gráfico, arraste campos para os eixos, visualização ao vivo, zero código',
  'Visual Layout': 'Layout visual',
  'Grid drag / free positioning, responsive adaptation':
    'Arraste em grade / posicionamento livre, adaptação responsiva',
  'Chart Linkage & Drill-Down': 'Vinculação e drill-down de gráficos',
  'Visually configure filters and linkage — no interaction code':
    'Configure filtros e vinculação visualmente — sem código de interação',
  'Full-Stack TS, Lightweight & Fast': 'TS full-stack, leve e rápido',
  'In the AI era, TypeScript is a first-class citizen. A unified full-stack means lower hiring barriers, faster AI-assisted development, and lighter maintenance.':
    'Na era da IA, TypeScript é cidadão de primeira classe. Um full-stack unificado significa menores barreiras de contratação, desenvolvimento assistido por IA mais rápido e manutenção mais leve.',
  'Live in 5 Minutes': 'No ar em 5 minutos',
  'One-click Docker Compose launch — deploy in 3 commands':
    'Inicialização Docker Compose com um clique — implante em 3 comandos',
  'Easier Hiring': 'Contratação mais fácil',
  'Thriving TS ecosystem — frontend and backend talent interchangeable':
    'Ecossistema TS próspero — talentos frontend e backend intercambiáveis',
  'AI-Assisted Development': 'Desenvolvimento assistido por IA',
  'TS type information is the language LLMs understand best':
    'Informações de tipos TS são a linguagem que LLMs entendem melhor',
  'Zero Customization Barrier': 'Personalização sem barreiras',
  'Type-safe, refactor-friendly, complete plugin SDK':
    'Seguro em tipos, amigável a refatoração, SDK de plugins completo',
  'End-to-End AI Insight Capabilities': 'Capacidades de insight de IA ponta a ponta',
  'AI-Powered — Data That Speaks': 'Impulsionado por IA — dados que falam',
  'From data cleansing to insight reports, AI spans every step':
    'Da limpeza de dados aos relatórios de insight, a IA abrange cada etapa',
  'Auto-extract key metrics · Detect anomaly trends · Output business recommendations':
    'Extração automática de métricas-chave · Detecção de tendências anômalas · Recomendações de negócio',
  'Analyze regional sales trends this quarter, focusing on the East China decline':
    'Analise as tendências de vendas regionais neste trimestre, focando na queda do Leste da China',
  'Analyzing Q3 sales dataset... Found 3 anomaly trends ↓\\nReport structure: Overview → Regional comparison → Root cause → Recommendations':
    'Analisando conjunto de vendas T3... Encontradas 3 tendências anômalas ↓\\nEstrutura do relatório: Visão geral → Comparação regional → Causa raiz → Recomendações',
  'Report Preview': 'Pré-visualização do relatório',
  Revenue: 'Receita',
  Orders: 'Pedidos',
  Conversion: 'Conversão',
  AOV: 'Ticket médio',
  'East China Q3 YoY ↓18%, mainly due to channel inventory backlog':
    'Leste da China T3 YoY ↓18%, principalmente por acúmulo de estoque no canal',
  'Understand business semantics · Recommend best charts · Auto-complete configuration':
    'Compreenda a semântica do negócio · Recomende os melhores gráficos · Complete a configuração automaticamente',
  'Compare monthly growth rates across product lines over the last 6 months':
    'Compare taxas de crescimento mensal entre linhas de produto nos últimos 6 meses',
  'Auto-selected multi-series line chart, X-axis=month / Y-axis=growth rate, recommended color scheme, suggested mean reference line':
    'Gráfico de linhas multissérie auto-selecionado, eixo X=mês / eixo Y=taxa de crescimento, esquema de cores recomendado, linha de referência média sugerida',
  Before: 'Antes',
  After: 'Depois',
  'Smart quality detection · Batch repair · Preserve processing history':
    'Detecção inteligente de qualidade · Reparo em lote · Preservar histórico de processamento',
  'AI One-Click Cleanse': 'Limpeza com IA em um clique',
  'Cleansing Complete': 'Limpeza concluída',
  'Filled 3 missing values (mean imputation)': 'Preenchidos 3 valores ausentes (imputação por média)',
  'Flagged 1 outlier (retained and annotated)': 'Marcado 1 outlier (retido e anotado)',
  'Standardized 8 date formats': 'Padronizados 8 formatos de data',
  'Analyze content weight · Auto-adjust size and position · Follow visual standards':
    'Analise o peso do conteúdo · Ajuste automaticamente tamanho e posição · Siga padrões visuais',
  'Before · Cluttered layout': 'Antes · Layout desorganizado',
  'After · Clear hierarchy': 'Depois · Hierarquia clara',
  'AI Optimize Layout': 'Otimizar layout com IA',
  'AI analyzed content weight of 6 components and auto-optimized layout hierarchy':
    'A IA analisou o peso do conteúdo de 6 componentes e otimizou automaticamente a hierarquia do layout',
  'Microkernel Plugin Architecture': 'Arquitetura de plugins microkernel',
  'Meet Every Visualization Need': 'Atende a todas as necessidades de visualização',
  'Unlike monolithic traditional BI tools, DataLuminary is a microkernel plugin platform — panel, chart, and data source plugin ecosystems make every visualization need achievable':
    'Diferente das ferramentas BI tradicionais monolíticas, o DataLuminary é uma plataforma de plugins microkernel — ecossistemas de plugins de painel, gráficos e fontes de dados tornam qualquer necessidade de visualização alcançável',
  Microkernel: 'Microkernel',
  'Explore Plugin Ecosystem': 'Explorar ecossistema de plugins',
  'Dashboard Layout Plugins': 'Plugins de layout de painel',
  Custom: 'Personalizado',
  'grid-panel grid layout — react-grid-layout, PC reports preferred, import Grafana panels':
    'grid-panel layout em grade — react-grid-layout, relatórios PC preferidos, importar painéis Grafana',
  'position-panel free-form big screen — TMagic-based, pixel-level positioning for command centers':
    'position-panel tela grande livre — baseado em TMagic, posicionamento em nível de pixel para centros de comando',
  'card-panel card view — reports, email, boards, and more':
    'card-panel visualização em cartões — relatórios, e-mail, quadros e mais',
  'list-panel list layout — mobile-first, vertical card scrolling':
    'list-panel layout em lista — mobile-first, rolagem vertical de cartões',
  '+ Custom layout plugins — integrate via development SDK':
    '+ Plugins de layout personalizado — integre via SDK de desenvolvimento',
  'Headless BI Design': 'Design Headless BI',
  'Chart plugins only render — data is uniformly supplied by the dataset layer, no direct data source connection':
    'Plugins de gráficos apenas renderizam — dados são fornecidos uniformemente pela camada de conjuntos de dados, sem conexão direta à fonte',
  'Built-in: line · bar · area · pie · ring · scatter · radar · funnel':
    'Integrados: linha · barra · área · pizza · anel · dispersão · radar · funil',
  'Map · word cloud · metric card · table · rich text · liquid · heatmap · sankey · candlestick · graph...':
    'Mapa · nuvem de palavras · cartão métrico · tabela · rich text · líquido · heatmap · sankey · candlestick · grafo...',
  'Switch chart libraries: ECharts / AntV / Highcharts — swap freely without affecting configuration':
    'Alterne bibliotecas de gráficos: ECharts / AntV / Highcharts — troque livremente sem afetar a configuração',
  'Three-Stage Plugin Protocol (Grafana-inspired)':
    'Protocolo de plugins em três estágios (inspirado no Grafana)',
  'ConfigPanel data source config · QueryPanel query config · VariablePanel variable query':
    'ConfigPanel config. de fonte · QueryPanel config. de consulta · VariablePanel consulta de variáveis',
  'Relational: MySQL · PostgreSQL · SQL Server · ClickHouse':
    'Relacionais: MySQL · PostgreSQL · SQL Server · ClickHouse',
  'Document: MongoDB · Elasticsearch | Files: Excel · CSV · JSON':
    'Documentais: MongoDB · Elasticsearch | Arquivos: Excel · CSV · JSON',
  'APIs: RESTful API · GraphQL | + Plugin SDK for any custom data source':
    'APIs: RESTful API · GraphQL | + Plugin SDK para qualquer fonte personalizada',
  'Core Pipeline': 'Pipeline principal',
  'From Data to Decisions': 'Dos dados às decisões',
  'Data Source → Dataset → Chart → Dashboard — data flows through the pipeline, every stage is plugin-extensible':
    'Fonte de dados → Conjunto de dados → Gráfico → Painel — dados fluem pelo pipeline, cada etapa é extensível por plugins',
  'Headless BI Design:': 'Design Headless BI:',
  'Data Source': 'Fonte de dados',
  'Multi-source ingestion, unified management': 'Ingestão multi-fonte, gestão unificada',
  'Data source plugin list': 'Lista de plugins de fontes de dados',
  'Connection test': 'Teste de conexão',
  'QueryPanel preview': 'Pré-visualização QueryPanel',
  Dataset: 'Conjunto de dados',
  'Dataset · Headless BI Core': 'Dataset · Núcleo Headless BI',
  'Metric/dimension modeling, data cleansing': 'Modelagem de métricas/dimensões, limpeza de dados',
  'Configure metric / dimension fields': 'Configurar campos de métrica / dimensão',
  'Multi-table Join': 'Join multi-tabela',
  'Calculated fields and data cleansing': 'Campos calculados e limpeza de dados',
  'AI-assisted cleansing (coming soon)': 'Limpeza assistida por IA (em breve)',
  Chart: 'Gráfico',
  'NoCode charting, drag and get results': 'Gráficos NoCode, arraste e obtenha resultados',
  'Select chart type (plugin-based)': 'Selecionar tipo de gráfico (baseado em plugins)',
  'Drag fields to X-axis/Y-axis/series': 'Arrastar campos para eixo X/eixo Y/séries',
  'AI recommends best chart type': 'A IA recomenda o melhor tipo de gráfico',
  'Live preview': 'Visualização ao vivo',
  Dashboard: 'Painel',
  'Multi-endpoint, multi-layout, flexible orchestration': 'Multi-endpoint, multi-layout, orquestração flexível',
  'Grid / Position / Card / List — four layouts': 'Grid / Position / Card / List — quatro layouts',
  'Chart linkage, filters': 'Vinculação de gráficos, filtros',
  'Version management, access control': 'Gestão de versões, controle de acesso',
  'AI one-click layout optimization': 'Otimização de layout com IA em um clique',
  'Veteran Team, Battle-Tested': 'Equipe veterana, comprovada em produção',
  'Core Team: Years of Enterprise Data Visualization Platform Experience':
    'Equipe principal: anos de experiência em plataformas de visualização de dados empresariais',
  'From Tencent to Ping An — deep expertise in enterprise BI and visualization platforms':
    'Da Tencent à Ping An — profunda expertise em BI empresarial e plataformas de visualização',
  'Having built enterprise BI platforms from 0 to 1 over many years, DataLuminary distills that experience into one product':
    'Tendo construído plataformas BI empresariais de 0 a 1 ao longo de muitos anos, o DataLuminary destila essa experiência em um produto',
  'Tencent Game Experience Management Platform': 'Plataforma de gestão de experiência de jogos Tencent',
  'Led Architecture Refactor': 'Liderou refatoração de arquitetura',
  'Covers data experience pipeline for all Tencent game products':
    'Cobre o pipeline de experiência de dados de todos os produtos de jogos Tencent',
  'Visualization Platform': 'Plataforma de visualização',
  'Architecture Refactor': 'Refatoração de arquitetura',
  'Large-Scale Data': 'Dados em larga escala',
  'BlueKing Universal Chart Platform': 'Plataforma universal de gráficos BlueKing',
  'Built from Scratch': 'Construído do zero',
  'Core visualization component of Tencent Cloud operations system':
    'Componente central de visualização do sistema de operações Tencent Cloud',
  'From Zero': 'Do zero',
  'Chart Platform': 'Plataforma de gráficos',
  'Tencent Cloud Ops': 'Operações Tencent Cloud',
  'Ping An Smart City MaxView': 'Ping An Smart City MaxView',
  'Financial-grade enterprise and government data visualization platform':
    'Plataforma de visualização de dados empresarial e governamental de nível financeiro',
  'Financial Grade': 'Nível financeiro',
  'Enterprise BI': 'BI empresarial',
  'Ping An Technology StarCanvas': 'Ping An Technology StarCanvas',
  'Years of Continuous Iteration': 'Anos de iteração contínua',
  'Commercial BI product with deep data visualization expertise':
    'Produto BI comercial com profunda expertise em visualização de dados',
  'Commercial Product': 'Produto comercial',
  'Long-Term Iteration': 'Iteração de longo prazo',
  'BI in Production': 'BI em produção',
  'Full-Stack TS, Lightweight Launch': 'TS full-stack, lançamento leve',
  'In the AI era, TypeScript is a first-class citizen — unified stack, faster development, lighter deployment':
    'Na era da IA, TypeScript é cidadão de primeira classe — stack unificado, desenvolvimento mais rápido, implantação mais leve',
  'Why Full-Stack TypeScript': 'Por que TypeScript full-stack',
  'The Top Choice for the AI Era': 'A melhor escolha para a era da IA',
  'TypeScript is the language Copilot, Claude, and other AI tools understand best. Full-stack TS multiplies AI-assisted development — more accurate completions, safer refactors.':
    'TypeScript é a linguagem que Copilot, Claude e outras ferramentas de IA entendem melhor. TS full-stack multiplica o desenvolvimento assistido por IA — autocompletar mais preciso, refatorações mais seguras.',
  'Lower Team Hiring Costs': 'Menores custos de contratação',
  'Unified frontend/backend stack — full-stack engineers can ship complete features independently. Rich TS talent pool dramatically lowers team expansion barriers.':
    'Stack frontend/backend unificado — engenheiros full-stack podem entregar recursos completos de forma independente. Amplo pool de talentos TS reduz drasticamente barreiras de expansão da equipe.',
  'Type Safety, Fearless Refactoring': 'Segurança de tipos, refatoração sem medo',
  'Strong typing spans frontend and backend — plugin interfaces and data contracts are type-guaranteed. Errors surface at compile time, not in production.':
    'Tipagem forte abrange frontend e backend — interfaces de plugins e contratos de dados são garantidos por tipos. Erros aparecem em tempo de compilação, não em produção.',
  'Lightweight Deployment, Simple Ops': 'Implantação leve, operações simples',
  'One-click Docker Compose launch, PostgreSQL only. Skip Docker and use local DB. Full support for Windows / macOS / Linux.':
    'Inicialização Docker Compose com um clique, apenas PostgreSQL. Pule o Docker e use BD local. Suporte completo para Windows / macOS / Linux.',
  'Traditional BI Platform Comparison': 'Comparação com plataformas BI tradicionais',
  'Complex installation, dozens of config items': 'Instalação complexa, dezenas de parâmetros',
  'Mixed languages, frontend/backend siloed': 'Linguagens mistas, frontend/backend isolados',
  'Dedicated ops team required': 'Equipe de operações dedicada necessária',
  'DataLuminary: 3 commands · unified TS · automated bootstrap':
    'DataLuminary: 3 comandos · TS unificado · bootstrap automatizado',
  'Infinite Entry Points, Ecosystem-Driven': 'Pontos de entrada infinitos, impulsionado por ecossistema',
  'More Than a BI Tool — An Ecosystem-Driven Data Insight Platform':
    'Mais que uma ferramenta BI — uma plataforma de insight de dados impulsionada por ecossistema',
  'Covers traditional BI scenarios while leveraging the LuminaryWorks ecosystem to expand into blockchain, AI tasks, IoT, remote monitoring, and other new physical-world scenarios':
    'Cobre cenários BI tradicionais e aproveita o ecossistema LuminaryWorks para expandir para blockchain, tarefas de IA, IoT, monitoramento remoto e outros cenários do mundo físico',
  'Covers All Traditional Data Analysis Scenarios': 'Cobre todos os cenários tradicionais de análise de dados',
  'Product, operations, and BI analysts can get started independently — from data ingestion to insight reports, full NoCode pipeline':
    'Produto, operações e analistas de BI podem começar de forma independente — da ingestão de dados aos relatórios de insight, pipeline NoCode completo',
  'Data Insights · See': 'Insights de dados · Ver',
  'Data Aggregation Hub': 'Hub de agregação de dados',
  'E-commerce Operations': 'Operações de e-commerce',
  'Gaming Analytics': 'Análise de jogos',
  'Financial Risk Control': 'Controle de risco financeiro',
  'Manufacturing Lines': 'Linhas de manufatura',
  'Retail Analytics': 'Análise de varejo',
  Healthcare: 'Saúde',
  'Education Assessment': 'Avaliação educacional',
  'Logistics Tracking': 'Rastreamento logístico',
  'Project Management': 'Gestão de projetos',
  Connect: 'Conectar',
  'Open-source IoT PaaS platform': 'Plataforma IoT PaaS open source',
  'Factory floor device status → real-time monitoring dashboard':
    'Status de dispositivos na fábrica → painel de monitoramento em tempo real',
  Control: 'Controlar',
  'WebRTC remote operations platform': 'Plataforma de operações remotas WebRTC',
  'Remote ops audit logs → security audit reports':
    'Logs de auditoria de ops remotas → relatórios de auditoria de segurança',
  Earn: 'Ganhar',
  'AI Agent on-chain marketplace': 'Marketplace on-chain de agentes de IA',
  'Blockchain Agent revenue → performance analytics dashboard':
    'Receita de agentes blockchain → painel de análise de desempenho',
  Learn: 'Aprender',
  'Visual programming + AI-assisted teaching': 'Programação visual + ensino assistido por IA',
  'Learning data → teaching quality dashboard · nurture ecosystem developers':
    'Dados de aprendizagem → painel de qualidade de ensino · cultivar desenvolvedores do ecossistema',
  'Ecosystem Entry · Developer Incubator': 'Entrada no ecossistema · Incubadora de desenvolvedores',
  'Traditional BI, Ready Out of the Box': 'BI tradicional, pronto para uso',
  'E-commerce · gaming · finance · manufacturing — mainstream BI scenarios fully covered, no ecosystem required, fully usable on standalone deployment':
    'E-commerce · jogos · finanças · manufatura — cenários BI principais totalmente cobertos, sem ecossistema necessário, totalmente utilizável em implantação independente',
  'New Physical Scenarios, Ecosystem Support': 'Novos cenários físicos, suporte do ecossistema',
  'IoT · AI tasks · blockchain · remote monitoring — sibling product data flows directly for cross-domain insights':
    'IoT · tarefas de IA · blockchain · monitoramento remoto — dados de produtos irmãos fluem diretamente para insights cross-domain',
  'Education Platform, Developer Ecosystem': 'Plataforma educacional, ecossistema de desenvolvedores',
  'VibeEdu visual programming + AI teaching assistance — more developers learn and contribute plugins, continuously expanding the ecosystem':
    'Programação visual VibeEdu + assistência de ensino com IA — mais desenvolvedores aprendem e contribuem plugins, expandindo continuamente o ecossistema',
  'LuminaryWorks/identity unified OIDC login · LuminaryWorks/shared component library · one account across all products':
    'Login OIDC unificado LuminaryWorks/identity · biblioteca de componentes LuminaryWorks/shared · uma conta em todos os produtos',
  'Why Choose DataLuminary': 'Por que escolher DataLuminary',
  'Full Comparison at a Glance': 'Comparação completa de relance',
  Feature: 'Recurso',
  'Traditional BI Tools': 'Ferramentas BI tradicionais',
  'Closed-Source SaaS': 'SaaS de código fechado',
  'End-to-End AI': 'IA ponta a ponta',
  'Charting/cleansing/layout/reports': 'Gráficos/limpeza/layout/relatórios',
  'None or very limited': 'Nenhuma ou muito limitada',
  'Paid unlock': 'Desbloqueio pago',
  'Microkernel, three-layer plugin ecosystem': 'Microkernel, ecossistema de plugins de três camadas',
  Monolithic: 'Monolítico',
  'Closed ecosystem': 'Ecossistema fechado',
  'Dashboard Layouts': 'Layouts de painel',
  'Big screen/report/mobile/board': 'Tela grande/relatório/móvel/quadro',
  '1-2 fixed types': '1-2 tipos fixos',
  Limited: 'Limitado',
  'LessCode / NoCode': 'LessCode / NoCode',
  'Full drag-and-drop pipeline': 'Pipeline completo com arrastar e soltar',
  'Partial support': 'Suporte parcial',
  Supported: 'Suportado',
  'Unified frontend/backend': 'Frontend/backend unificado',
  'Mixed languages': 'Linguagens mistas',
  'Not visible': 'Não visível',
  'Deployment Complexity': 'Complexidade de implantação',
  '3 commands, 5 minutes': '3 comandos, 5 minutos',
  'Complex install': 'Instalação complexa',
  'N/A cloud service': 'N/A serviço na nuvem',
  'Fully private': 'Totalmente privado',
  'Extra cost': 'Custo adicional',
  'Data Security': 'Segurança de dados',
  'Data stays on-premises': 'Dados permanecem on-premises',
  'Can be private': 'Pode ser privado',
  'Data in cloud': 'Dados na nuvem',
  Customization: 'Personalização',
  'Plugin SDK, type-safe': 'Plugin SDK, seguro em tipos',
  'Steep learning curve': 'Curva de aprendizado íngreme',
  'Not supported': 'Não suportado',
  'Open Source License': 'Licença open source',
  'MIT open source': 'Open source MIT',
  'Partially open': 'Parcialmente aberto',
  'Closed source': 'Código fechado',
  'Ecosystem Integration': 'Integração de ecossistema',
  'Five-product AI ecosystem': 'Ecossistema de IA de cinco produtos',
  'Standalone product': 'Produto independente',
  'Limited integration': 'Integração limitada',
  Cost: 'Custo',
  Free: 'Grátis',
  'Enterprise edition fees': 'Taxas de edição empresarial',
  'Usage-based billing': 'Cobrança por uso',
  'Use Cases': 'Casos de uso',
  'Data Insights for Every Industry': 'Insights de dados para cada setor',
  'Business Operations': 'Operações de negócio',
  'Sales dashboards, KPI boards, channel analysis reports':
    'Painéis de vendas, quadros KPI, relatórios de análise de canais',
  Operations: 'Operações',
  'Manufacturing Monitoring': 'Monitoramento de manufatura',
  'IoT device dashboards, production line analytics, energy monitoring':
    'Painéis de dispositivos IoT, análise de linhas de produção, monitoramento de energia',
  IT: 'TI',
  'Financial Compliance': 'Conformidade financeira',
  'Risk reports, transaction analysis, audit trail dashboards':
    'Relatórios de risco, análise de transações, painéis de trilha de auditoria',
  Product: 'Produto',
  'E-commerce & Retail': 'E-commerce e varejo',
  'User profiles, product analytics, logistics monitoring':
    'Perfis de usuário, análise de produtos, monitoramento logístico',
  'Patient data analytics, medical resource scheduling dashboards':
    'Análise de dados de pacientes, painéis de agendamento de recursos médicos',
  'Education & Training': 'Educação e treinamento',
  'Learning behavior analysis, teaching quality assessment reports':
    'Análise de comportamento de aprendizagem, relatórios de avaliação de qualidade de ensino',
  'Open Source Collaboration': 'Colaboração open source',
  'Building the AI Data Insight Ecosystem Together':
    'Construindo juntos o ecossistema de insight de dados com IA',
  'DataLuminary is plugin-based — the entire platform is fully open to the community. Data sources, chart libraries, layout engines — extend capabilities at any layer':
    'O DataLuminary é baseado em plugins — toda a plataforma está totalmente aberta à comunidade. Fontes de dados, bibliotecas de gráficos, motores de layout — estenda capacidades em qualquer camada',
  'Data Source Plugin Layer': 'Camada de plugins de fontes de dados',
  'Direct connection at small scale, ClickHouse integration for billion-row data':
    'Conexão direta em pequena escala, integração ClickHouse para dados com bilhões de linhas',
  'Core data capabilities: MySQL · PostgreSQL · MongoDB · Excel · CSV · API':
    'Capacidades de dados principais: MySQL · PostgreSQL · MongoDB · Excel · CSV · API',
  'Small scale (millions) → direct PostgreSQL, zero extra cost':
    'Pequena escala (milhões) → PostgreSQL direto, zero custo adicional',
  'Tens/hundreds of millions → ClickHouse integration, second-level aggregation, config unchanged':
    'Dezenas/centenas de milhões → integração ClickHouse, agregação em segundos, configuração inalterada',
  'Users choose their own foundation — no forced database binding':
    'Usuários escolhem sua própria base — sem vinculação forçada a banco de dados',
  'Three-stage plugin protocol, interoperable with Grafana data source ecosystem':
    'Protocolo de plugins em três estágios, interoperável com ecossistema de fontes Grafana',
  'Contribute Data Source Plugins': 'Contribuir com plugins de fontes de dados',
  'Chart Plugin Layer': 'Camada de plugins de gráficos',
  'No chart library limits, semantic smart recommendations':
    'Sem limites de biblioteca de gráficos, recomendações semânticas inteligentes',
  'Built-in (AntV G2): line · bar · pie · scatter · radar · sankey...':
    'Integrados (AntV G2): linha · barra · pizza · dispersão · radar · sankey...',
  'Semantic recommendations (Alibaba AVA): data decides the chart, not user guesswork':
    'Recomendações semânticas (Alibaba AVA): dados decidem o gráfico, não suposições do usuário',
  'Headless BI: switch ECharts / AntV / Highcharts freely without affecting config':
    'Headless BI: alterne ECharts / AntV / Highcharts livremente sem afetar a configuração',
  'Any third-party chart library can be wrapped as a chart plugin':
    'Qualquer biblioteca de gráficos de terceiros pode ser encapsulada como plugin de gráficos',
  'Contribute Chart Plugins': 'Contribuir com plugins de gráficos',
  'Panel Layout Plugin Layer': 'Camada de plugins de layout de painel',
  'Multi-scenario layouts for every display need':
    'Layouts multi-cenário para cada necessidade de exibição',
  'grid-panel → grid drag, PC analysis reports preferred, import Grafana panels':
    'grid-panel → arraste em grade, relatórios de análise PC preferidos, importar painéis Grafana',
  'position-panel → pixel-level free positioning (TMagic), big screens/command centers':
    'position-panel → posicionamento livre em nível de pixel (TMagic), telas grandes/centros de comando',
  'card-panel → card view for reports, email, info boards':
    'card-panel → visualização em cartões para relatórios, e-mail, quadros informativos',
  'list-panel → vertical list, mobile-first':
    'list-panel → lista vertical, mobile-first',
  'Layout engine itself is a plugin — build and integrate your own engine':
    'O motor de layout em si é um plugin — construa e integre seu próprio motor',
  'Contribute Layout Plugins': 'Contribuir com plugins de layout',
  'Import Packages On Demand': 'Importar pacotes sob demanda',
  'Serverless Data Processing': 'Processamento de dados Serverless',
  'Functional Business Logic': 'Lógica de negócio funcional',
  'Lerna Package Management': 'Gestão de pacotes Lerna',
  'All plugins, components, and functions managed by Lerna — independent versions, releases, and imports':
    'Todos os plugins, componentes e funções gerenciados por Lerna — versões, releases e importações independentes',
  'Functional Data Processing': 'Processamento de dados funcional',
  'Cleansing, transformation, and aggregation logic as pure functions — composable, testable, reusable':
    'Lógica de limpeza, transformação e agregação como funções puras — componível, testável, reutilizável',
  'Serverless-Ready Granularity': 'Granularidade pronta para Serverless',
  'Core processing logic is stateless — deploy directly as Serverless / Edge functions, compute on demand':
    'Lógica de processamento central é stateless — implante diretamente como funções Serverless / Edge, compute sob demanda',
  'User-Chosen Foundation': 'Base escolhida pelo usuário',
  'No forced database binding — direct PG at small scale, ClickHouse for billion-row data':
    'Sem vinculação forçada a banco de dados — PG direto em pequena escala, ClickHouse para dados com bilhões de linhas',
  'Star on GitHub': 'Star no GitHub',
  'Open source and free for commercial use': 'Open source e gratuito para uso comercial',
  'Complete Documentation': 'Documentação completa',
  'User guide · plugin development · API docs':
    'Guia do usuário · desenvolvimento de plugins · documentação API',
  'Active Community': 'Comunidade ativa',
  'GitHub Discussions · Discord': 'GitHub Discussions · Discord',
  'Contributor-Friendly': 'Amigável a contribuidores',
  'Detailed contribution guide, full CI/CD support':
    'Guia de contribuição detalhado, suporte CI/CD completo',
  'Every line of plugin code is a step forward in AI data insight, driven by the community.':
    'Cada linha de código de plugin é um passo adiante no insight de dados com IA, impulsionado pela comunidade.',
  'Deploy in 5 Minutes — Experience AI-Native Data Insights Now':
    'Implante em 5 minutos — experimente insights de dados nativos em IA agora',
  'Open source & free · No credit card · Private deployment · MIT License':
    'Open source e gratuito · Sem cartão de crédito · Implantação privada · Licença MIT',
  'Deploy Locally for Free': 'Implantar localmente grátis',
  'View Documentation': 'Ver documentação',
  'Enter email to subscribe to product updates':
    'Digite seu e-mail para assinar atualizações do produto',
  'Email address': 'Endereço de e-mail',
  Subscribe: 'Assinar',
  'No spam, unsubscribe anytime': 'Sem spam, cancele quando quiser',
  'Adopted by 500+ enterprises and developers':
    'Adotado por mais de 500 empresas e desenvolvedores',
  '4.9/5 community rating': 'Avaliação da comunidade 4,9/5',
  'Open-source, plugin-based, AI-native data visualization BI platform. Insights within reach.':
    'Plataforma BI de visualização de dados open source, baseada em plugins e nativa em IA. Insights ao alcance.',
  'Social links': 'Links sociais',
  'Plugin Marketplace': 'Marketplace de plugins',
  Changelog: 'Registro de alterações',
  Roadmap: 'Roteiro',
  Developers: 'Desenvolvedores',
  'Plugin Development Guide': 'Guia de desenvolvimento de plugins',
  'API Docs': 'Documentação API',
  'Contribution Guide': 'Guia de contribuição',
  Ecosystem: 'Ecossistema',
  Legal: 'Legal',
  'Privacy Policy': 'Política de privacidade',
  'Security Disclosure': 'Divulgação de segurança',
  '© 2024–2026 LuminaryWorks. Built with TypeScript.':
    '© 2024–2026 LuminaryWorks. Built with TypeScript.',
})

console.log('PT map done - run remaining locales in part 2')
