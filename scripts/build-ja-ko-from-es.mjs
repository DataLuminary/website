import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const messagesDir = join(__dirname, '..', 'messages')
const es = JSON.parse(readFileSync(join(messagesDir, 'es.json'), 'utf8'))

/** @param {string} s @param {Array<[RegExp, string]>} rules */
function applyRules(s, rules) {
  let out = s
  for (const [re, rep] of rules) out = out.replace(re, rep)
  return out
}

const jaRules = [
  [/Plataforma/g, 'プラットフォーム'],
  [/plataforma/g, 'プラットフォーム'],
  [/Despliegue/g, 'デプロイ'],
  [/despliegue/g, 'デプロイ'],
  [/Informes/g, 'レポート'],
  [/informes/g, 'レポート'],
  [/Gráficos/g, 'グラフ'],
  [/gráficos/g, 'グラフ'],
  [/Datos/g, 'データ'],
  [/datos/g, 'データ'],
  [/Comunidad/g, 'コミュニティ'],
  [/comunidad/g, 'コミュニティ'],
  [/Código abierto/g, 'オープンソース'],
  [/código abierto/g, 'オープンソース'],
  [/Open source/g, 'オープンソース'],
  [/Gratis/g, '無料'],
  [/gratis/g, '無料'],
  [/Gratuito/g, '無料'],
  [/Desarrolladores/g, '開発者'],
  [/desarrolladores/g, '開発者'],
  [/Documentación/g, 'ドキュメント'],
  [/documentación/g, 'ドキュメント'],
  [/Funciones/g, '機能'],
  [/Función/g, '機能'],
  [/Acerca de/g, '概要'],
  [/Iniciar sesión/g, 'ログイン'],
  [/Probar gratis/g, '無料で試す'],
  [/Abrir menú/g, 'メニューを開く'],
  [/Cerrar menú/g, 'メニューを閉じar'],
  [/Cambiar idioma/g, '言語を切り替え'],
  [/Insights al alcance/g, 'インサイトを手の届くところに'],
  [/Personalizado/g, 'カスタム'],
  [/Explorar/g, '探索'],
  [/Contribuir/g, '貢献'],
  [/Operaciones/g, 'オペレーション'],
  [/Producto/g, 'プロダクト'],
  [/Sanidad/g, 'ヘルスケア'],
  [/Educación/g, '教育'],
  [/Antes/g, '前'],
  [/Después/g, '後'],
  [/Ingresos/g, '売上'],
  [/Pedidos/g, '注文'],
  [/Conversión/g, 'コンバージョン'],
  [/Gráfico/g, 'グラフ'],
  [/Panel/g, 'ダッシュボード'],
  [/Conectar/g, '接続'],
  [/Controlar/g, '制御'],
  [/Ganar/g, '収益'],
  [/Aprender/g, '学習'],
  [/Suscribirse/g, '購読'],
  [/Legal/g, '法的情報'],
  [/Coste/g, 'コスト'],
  [/Monolítico/g, 'モノリシック'],
  [/Limitado/g, '限定'],
  [/Compatible/g, '対応'],
  [/Soporte parcial/g, '部分対応'],
  [/Despliegue privado/g, 'プライベートデプロイ'],
  [/Comunidad de código abierto/g, 'オープンソースコミュニティ'],
  [/Inicio con Docker en un clic/g, 'Docker ワンクリック起動'],
  [/TypeScript full-stack/g, 'フルスタック TypeScript'],
  [/IA de extremo a extremo/g, 'エンドツーエンド AI'],
  [/Plugins de microkernel/g, 'マイクロカーネルプラグイン'],
  [/NoCode/g, 'NoCode'],
  [/Arrastrar y soltar/g, 'ドラッグ＆ドロップ'],
  [/Limpieza/g, 'クレンジング'],
  [/limpieza/g, 'クレンジング'],
  [/Configuración/g, '設定'],
  [/configuración/g, '設定'],
  [/Análisis/g, '分析'],
  [/análisis/g, '分析'],
  [/Visualización/g, '可視化'],
  [/visualización/g, '可視化'],
  [/Ecosistema/g, 'エコシステム'],
  [/ecosistema/g, 'エコシステム'],
  [/Casos de uso/g, 'ユースケース'],
  [/Ver documentación/g, 'ドキュメントを見る'],
  [/Star en GitHub/g, 'GitHub で Star'],
  [/Política de privacidad/g, 'プライバシーポリシー'],
  [/Divulgación de seguridad/g, 'セキュリティ開示'],
  [/Registro de cambios/g, '変更履歴'],
  [/Hoja de ruta/g, 'ロードマップ'],
  [/Marketplace de plugins/g, 'プラグインマーケットプレイス'],
  [/Enlaces sociales/g, 'ソーシャルリンク'],
  [/Dirección de correo electrónico/g, 'メールアドレス'],
  [/Sin spam, cancélelo cuando quiera/g, 'スパムなし、いつでも配信停止'],
  [/Adoptado por más de/g, '採用実績'],
  [/empresas y desarrolladores/g, '社以上の企業と開発者'],
  [/Valoración comunitaria/g, 'コミュニティ評価'],
]

const koRules = [
  [/Plataforma/g, '플랫폼'],
  [/plataforma/g, '플랫폼'],
  [/Despliegue/g, '배포'],
  [/despliegue/g, '배포'],
  [/Informes/g, '리포트'],
  [/informes/g, '리포트'],
  [/Gráficos/g, '차트'],
  [/gráficos/g, '차트'],
  [/Datos/g, '데이터'],
  [/datos/g, '데이터'],
  [/Comunidad/g, '커뮤니티'],
  [/comunidad/g, '커뮤니티'],
  [/Código abierto/g, '오픈소스'],
  [/código abierto/g, '오픈소스'],
  [/Open source/g, '오픈소스'],
  [/Gratis/g, '무료'],
  [/gratis/g, '무료'],
  [/Gratuito/g, '무료'],
  [/Desarrolladores/g, '개발자'],
  [/desarrolladores/g, '개발자'],
  [/Documentación/g, '문서'],
  [/documentación/g, '문서'],
  [/Funciones/g, '기능'],
  [/Función/g, '기능'],
  [/Acerca de/g, '소개'],
  [/Iniciar sesión/g, '로그인'],
  [/Probar gratis/g, '무료 체험'],
  [/Abrir menú/g, '메뉴 열기'],
  [/Cerrar menú/g, '메뉴 닫기'],
  [/Cambiar idioma/g, '언어 전환'],
  [/Insights al alcance/g, '손끝의 인사이트'],
  [/Personalizado/g, '사용자 정의'],
  [/Explorar/g, '탐색'],
  [/Contribuir/g, '기여'],
  [/Operaciones/g, '운영'],
  [/Producto/g, '제품'],
  [/Sanidad/g, '헬스케어'],
  [/Educación/g, '교육'],
  [/Antes/g, '이전'],
  [/Después/g, '이후'],
  [/Ingresos/g, '매출'],
  [/Pedidos/g, '주문'],
  [/Conversión/g, '전환'],
  [/Gráfico/g, '차트'],
  [/Panel/g, '대시보드'],
  [/Conectar/g, '연결'],
  [/Controlar/g, '제어'],
  [/Ganar/g, '수익'],
  [/Aprender/g, '학습'],
  [/Suscribirse/g, '구독'],
  [/Legal/g, '법률'],
  [/Coste/g, '비용'],
  [/Monolítico/g, '모놀리식'],
  [/Limitado/g, '제한적'],
  [/Compatible/g, '지원'],
  [/Soporte parcial/g, '부분 지원'],
  [/Despliegue privado/g, '프라이빗 배포'],
  [/Comunidad de código abierto/g, '오픈소스 커뮤니티'],
  [/Inicio con Docker en un clic/g, 'Docker 원클릭 시작'],
  [/TypeScript full-stack/g, '풀스택 TypeScript'],
  [/IA de extremo a extremo/g, '엔드투엔드 AI'],
  [/Plugins de microkernel/g, '마이크로커널 플러그인'],
  [/NoCode/g, 'NoCode'],
  [/Arrastrar y soltar/g, '드래그 앤 드롭'],
  [/Limpieza/g, '클렌징'],
  [/limpieza/g, '클렌징'],
  [/Configuración/g, '구성'],
  [/configuración/g, '구성'],
  [/Análisis/g, '분석'],
  [/análisis/g, '분석'],
  [/Visualización/g, '시각화'],
  [/visualización/g, '시각화'],
  [/Ecosistema/g, '생태계'],
  [/ecosistema/g, '생태계'],
  [/Casos de uso/g, '사용 사례'],
  [/Ver documentación/g, '문서 보기'],
  [/Star en GitHub/g, 'GitHub Star'],
  [/Política de privacidad/g, '개인정보 처리방침'],
  [/Divulgación de seguridad/g, '보안 공개'],
  [/Registro de cambios/g, '변경 이력'],
  [/Hoja de ruta/g, '로드맵'],
  [/Marketplace de plugins/g, '플러그인 마켓플레이스'],
  [/Enlaces sociales/g, '소셜 링크'],
  [/Dirección de correo electrónico/g, '이메일 주소'],
  [/Sin spam, cancélelo cuando quiera/g, '스팸 없음, 언제든 구독 취소'],
  [/Adoptado por más de/g, '도입'],
  [/empresas y desarrolladores/g, '개 이상의 기업과 개발자'],
  [/Valoración comunitaria/g, '커뮤니티 평점'],
]

/** @type {Record<string, string>} */
const jaOverrides = {
  'DataLuminary — Insights al alcance | Plataforma BI de código abierto nativa de IA':
    'DataLuminary — インサイトを手の届くところに | AIネイティブ オープンソース BI プラットフォーム',
  'DataLuminary es una plataforma de visualización de datos y BI de código abierto, basada en plugins y nativa de IA, construida con TypeScript full-stack. Insights de IA de extremo a extremo, ecosistema de plugins de microkernel, configuración NoCode de arrastrar y soltar y despliegue privado con Docker en 5 minutos.':
    'DataLuminary は、フルスタック TypeScript で構築されたオープンソース・プラグインベース・AIネイティブのデータ可視化・BI プラットフォームです。エンドツーエンドの AI インサイト、マイクロカーネルプラグインエコシステム、ドラッグ＆ドロップ NoCode 設定、5 分の Docker プライベートデプロイに対応。',
  'DataLuminary — Insights al alcance': 'DataLuminary — インサイトを手の届くところに',
  'Insights al alcance': 'インサイトを手の届くところに',
  'Iluminar insights para todos': 'Illuminate insights for all',
  'Analizando conjunto de datos de ventas Q3... Se encontraron 3 tendencias anómalas ↓\nEstructura del informe: Resumen → Comparación regional → Causa raíz → Recomendaciones':
    'Q3 売上データセットを分析中... 3 件の異常トレンドを検出 ↓\nレポート構成：概要 → 地域比較 → 根本原因 → 提言',
}

/** @type {Record<string, string>} */
const koOverrides = {
  'DataLuminary — Insights al alcance | Plataforma BI de código abierto nativa de IA':
    'DataLuminary — 손끝의 인사이트 | AI 네이티브 오픈소스 BI 플랫폼',
  'DataLuminary es una plataforma de visualización de datos y BI de código abierto, basada en plugins y nativa de IA, construida con TypeScript full-stack. Insights de IA de extremo a extremo, ecosistema de plugins de microkernel, configuración NoCode de arrastrar y soltar y despliegue privado con Docker en 5 minutos.':
    'DataLuminary는 풀스택 TypeScript로 구축된 오픈소스, 플러그인 기반, AI 네이티브 데이터 시각화 및 BI 플랫폼입니다. 엔드투엔드 AI 인사이트, 마이크로커널 플러그인 생태계, 드래그 앤 드롭 NoCode 구성, 5분 Docker 프라이빗 배포를 지원합니다.',
  'DataLuminary — Insights al alcance': 'DataLuminary — 손끝의 인사이트',
  'Insights al alcance': '손끝의 인사이트',
  'Iluminar insights para todos': 'Illuminate insights for all',
  'Analizando conjunto de datos de ventas Q3... Se encontraron 3 tendencias anómalas ↓\nEstructura del informe: Resumen → Comparación regional → Causa raíz → Recomendaciones':
    'Q3 매출 데이터셋 분석 중... 3개의 이상 트렌드 감지 ↓\n리포트 구조: 개요 → 지역 비교 → 근본 원인 → 제언',
}

function translateTree(obj, rules, overrides) {
  if (Array.isArray(obj)) return obj.map((item) => translateTree(item, rules, overrides))
  if (obj !== null && typeof obj === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(obj)) out[k] = translateTree(v, rules, overrides)
    return out
  }
  if (typeof obj === 'string') {
    if (overrides[obj]) return overrides[obj]
    return applyRules(obj, rules)
  }
  return obj
}

const ja = translateTree(es, jaRules, jaOverrides)
const ko = translateTree(es, koRules, koOverrides)

for (const orbit of ja.pluginArchitecture.orbits) orbit.nodes[orbit.nodes.length - 1] = 'カスタム'
for (const orbit of ko.pluginArchitecture.orbits) orbit.nodes[orbit.nodes.length - 1] = '사용자 정의'

writeFileSync(join(messagesDir, 'ja.json'), JSON.stringify(ja, null, 2) + '\n')
writeFileSync(join(messagesDir, 'ko.json'), JSON.stringify(ko, null, 2) + '\n')
console.log('Wrote ja.json and ko.json from es base with JA/KO rules')
