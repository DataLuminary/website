import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ptPairs = JSON.parse(readFileSync(join(__dirname, 'locale-pairs-pt.json'), 'utf8'))
const esPairs = JSON.parse(readFileSync(join(__dirname, 'locale-pairs-base.json'), 'utf8'))

/** @param {string} s */
function applyRules(s, rules) {
  let out = s
  for (const [re, rep] of rules) out = out.replace(re, rep)
  return out
}

const nlRules = [
  [/Plataforma/g, 'Platform'],
  [/Visualização/g, 'Visualisatie'],
  [/visualização/g, 'visualisatie'],
  [/dados/g, 'gegevens'],
  [/gráficos/g, 'grafieken'],
  [/relatórios/g, 'rapporten'],
  [/Implantação/g, 'Implementatie'],
  [/implantação/g, 'implementatie'],
  [/Desenvolvedores/g, 'Ontwikkelaars'],
  [/Documentação/g, 'Documentatie'],
  [/Comunidade/g, 'Community'],
  [/código aberto/g, 'open source'],
  [/Grátis/g, 'Gratis'],
  [/grátis/g, 'gratis'],
  [/Personalizado/g, 'Aangepast'],
  [/Explorar/g, 'Verken'],
  [/Contribuir/g, 'Draag bij'],
  [/Recursos/g, 'Functies'],
  [/Sobre/g, 'Over'],
  [/Entrar/g, 'Inloggen'],
  [/Experimente grátis/g, 'Gratis proberen'],
  [/Insights ao alcance/g, 'Inzichten binnen handbereik'],
  [/ nativa em IA/g, ' native AI'],
  [/ponta a ponta/g, 'end-to-end'],
  [/ com IA/g, ' met AI'],
  [/Painel/g, 'Dashboard'],
  [/Gráfico/g, 'Grafiek'],
  [/Antes/g, 'Voor'],
  [/Depois/g, 'Na'],
  [/Operações/g, 'Operaties'],
  [/Saúde/g, 'Gezondheidszorg'],
]

const itRules = [
  [/Plataforma/g, 'Piattaforma'],
  [/Visualización/g, 'Visualizzazione'],
  [/datos/g, 'dati'],
  [/gráficos/g, 'grafici'],
  [/informes/g, 'report'],
  [/Despliegue/g, 'Distribuzione'],
  [/Acerca de/g, 'Informazioni'],
  [/Iniciar sesión/g, 'Accedi'],
  [/Funciones/g, 'Funzionalità'],
  [/Probar gratis/g, 'Prova gratis'],
  [/Personalizado/g, 'Personalizzato'],
  [/Explorar/g, 'Esplora'],
  [/Contribuir/g, 'Contribuisci'],
  [/Insights al alcance/g, 'Insight a portata di mano'],
  [/ nativa en IA/g, ' nativa AI'],
  [/de extremo a extremo/g, 'end-to-end'],
  [/Panel/g, 'Dashboard'],
  [/Gráfico/g, 'Grafico'],
  [/Antes/g, 'Prima'],
  [/Después/g, 'Dopo'],
  [/Operaciones/g, 'Operazioni'],
  [/Sanidad/g, 'Sanità'],
]

/** @type {Record<string, string>} */
const nlOverrides = JSON.parse(
  readFileSync(join(__dirname, 'maps', 'nl-overrides.json'), 'utf8'),
)
/** @type {Record<string, string>} */
const itOverrides = JSON.parse(
  readFileSync(join(__dirname, 'maps', 'it-overrides.json'), 'utf8'),
)

/** @type {Record<string, string>} */
const nlMap = {}
/** @type {Record<string, string>} */
const itMap = {}

for (const [en, ptVal] of ptPairs) {
  nlMap[en] = nlOverrides[en] ?? applyRules(ptVal, nlRules)
}
for (const [en, esVal] of esPairs) {
  itMap[en] = itOverrides[en] ?? applyRules(esVal, itRules)
}

writeFileSync(
  join(__dirname, 'maps', 'nl-map.mjs'),
  `export const nlMap = ${JSON.stringify(nlMap, null, 2)}\n`,
)
writeFileSync(
  join(__dirname, 'maps', 'it-map.mjs'),
  `export const itMap = ${JSON.stringify(itMap, null, 2)}\n`,
)
console.log('Wrote nl-map.mjs and it-map.mjs')
