import { useState, useMemo } from "react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');`;

const BLOCKS = [
  { id: "fx", label: "Fracturas" },
  { id: "cadera", label: "Cadera y pelvis" },
  { id: "columna", label: "Columna vertebral" },
  { id: "ms", label: "Miembro superior" },
];

const QUESTIONS = [
  {
    id: 1,
    block: "fx",
    code: "31-A1",
    image: null, // ejemplo: "/images/fx-31a1.jpg" — deja null si la pregunta no lleva imagen
    prompt:
      "Fractura pertrocantérea simple, con trazo único, sin conminución de la cortical medial. Según la clasificación AO/OTA, ¿a qué tipo corresponde?",
    options: [
      "31-A3",
      "31-A1",
      "31-B1",
      "31-A2",
    ],
    correct: 1,
    explanation:
      "El grupo 31-A1 corresponde a fracturas pertrocantéreas simples con dos fragmentos, sin conminución de la cortical medial.",
  },
  {
    id: 2,
    block: "fx",
    code: "23-C2",
    image: null,
    prompt:
      "Fractura de radio distal intraarticular, con conminución metafisaria pero epífisis simple. ¿Qué tipo AO describe mejor esta lesión?",
    options: [
      "23-A3",
      "23-C1",
      "23-C2",
      "23-B2",
    ],
    correct: 2,
    explanation:
      "El tipo C indica afectación articular y metafisaria simultánea; C2 implica conminución metafisaria con fractura articular simple.",
  },
  {
    id: 3,
    block: "fx",
    code: "41-B3",
    image: null,
    prompt:
      "En la clasificación AO de fracturas de meseta tibial, una fractura articular parcial con hundimiento y fragmento en cuña se clasifica como:",
    options: [
      "41-A2",
      "41-C1",
      "41-B2",
      "41-B3",
    ],
    correct: 3,
    explanation:
      "41-B3 corresponde a fracturas parciales articulares con hundimiento asociado a fragmento en cuña.",
  },
  {
    id: 4,
    block: "fx",
    code: "44-B",
    image: null,
    prompt:
      "En la clasificación de Danis-Weber para fracturas del tobillo, una fractura del peroné a nivel de la sindesmosis se denomina:",
    options: [
      "Weber A",
      "Weber B",
      "Weber C",
      "Weber D",
    ],
    correct: 1,
    explanation:
      "Weber B: trazo a nivel de la sindesmosis tibioperonea, con afectación variable de la estabilidad sindesmal.",
  },
  {
    id: 5,
    block: "cadera",
    code: "Garden",
    image: null,
    prompt:
      "Una fractura subcapital de fémur con desplazamiento completo pero contacto entre fragmentos corresponde a Garden tipo:",
    options: [
      "Garden III",
      "Garden II",
      "Garden IV",
      "Garden I",
    ],
    correct: 0,
    explanation:
      "Garden III: desplazamiento completo con angulación en varo de la cabeza, pero manteniendo cierto contacto trabecular.",
  },
  {
    id: 6,
    block: "cadera",
    code: "Pauwels",
    image: null,
    prompt:
      "¿Qué ángulo respecto a la horizontal define una fractura de cuello femoral Pauwels III?",
    options: [
      "30°–50°",
      "< 30°",
      "> 50°",
      "90° exactos",
    ],
    correct: 2,
    explanation:
      "Pauwels III implica un trazo de más de 50° respecto a la horizontal, con mayor componente de cizallamiento y peor pronóstico.",
  },
  {
    id: 7,
    block: "cadera",
    code: "Letournel",
    image: null,
    prompt:
      "En la clasificación de Letournel-Judet para fracturas acetabulares, una fractura que afecta ambas columnas se considera:",
    options: [
      "Un patrón elemental simple",
      "Un patrón asociado complejo",
      "Equivalente a fractura de pared posterior aislada",
      "No contemplada en la clasificación",
    ],
    correct: 1,
    explanation:
      "Las fracturas de ambas columnas forman parte de los patrones asociados, más complejos que los diez tipos elementales.",
  },
  {
    id: 8,
    block: "cadera",
    code: "Tile",
    image: null,
    prompt:
      "Una fractura de pelvis con rotura completa del complejo ligamentoso posterior e inestabilidad rotacional y vertical se clasifica, según Tile, como tipo:",
    options: [
      "Tile B",
      "Tile C",
      "Tile A",
      "Tile 0",
    ],
    correct: 1,
    explanation:
      "Tile C implica inestabilidad rotacional y vertical, con lesión completa del anillo posterior.",
  },
  {
    id: 9,
    block: "columna",
    code: "AO Spine",
    image: null,
    prompt:
      "En la clasificación AO Spine toracolumbar, una fractura con estallido del cuerpo vertebral sin lesión del complejo ligamentoso posterior corresponde al tipo:",
    options: [
      "Tipo A",
      "Tipo D",
      "Tipo C",
      "Tipo B",
    ],
    correct: 0,
    explanation:
      "El tipo A agrupa las lesiones por compresión, incluyendo el estallido vertebral, sin fallo del complejo posterior tensor.",
  },
  {
    id: 10,
    block: "columna",
    code: "Denis",
    image: null,
    prompt:
      "Según la teoría de las tres columnas de Denis, ¿qué estructuras conforman la columna media?",
    options: [
      "Ligamento longitudinal anterior y mitad anterior del cuerpo vertebral",
      "Pedículos, láminas y ligamento amarillo",
      "Pared posterior del cuerpo vertebral y ligamento longitudinal posterior",
      "Apófisis espinosas y ligamentos interespinosos",
    ],
    correct: 2,
    explanation:
      "La columna media incluye la pared posterior del cuerpo vertebral, el anillo fibroso posterior y el ligamento longitudinal posterior; su integridad es clave para la estabilidad.",
  },
  {
    id: 11,
    block: "columna",
    code: "Frankel",
    image: null,
    prompt:
      "En la escala de Frankel para lesión medular, un paciente con función motora útil preservada pero alteración sensitiva se clasifica como:",
    options: [
      "Frankel C o D",
      "Frankel B",
      "Frankel E",
      "Frankel A",
    ],
    correct: 0,
    explanation:
      "Frankel C indica función motora no útil y D función motora útil preservada, ambos con déficit sensitivo variable; E es normalidad completa.",
  },
  {
    id: 12,
    block: "columna",
    code: "ASIA",
    image: null,
    prompt:
      "En la escala ASIA de lesión medular, ¿qué define a un paciente ASIA A?",
    options: [
      "Preservación motora y sensitiva completa por debajo de la lesión",
      "Función motora útil en más de la mitad de los músculos clave",
      "Alteración sensitiva aislada sin afectación motora",
      "Ausencia completa de función motora y sensitiva en los segmentos sacros S4-S5",
    ],
    correct: 3,
    explanation:
      "ASIA A define una lesión completa: no hay preservación motora ni sensitiva en los segmentos sacros S4-S5.",
  },
  {
    id: 13,
    block: "ms",
    code: "Neer",
    image: null,
    prompt:
      "Según la clasificación de Neer para fracturas de húmero proximal, ¿qué desplazamiento define un fragmento como \"parte\" independiente?",
    options: [
      "Más de 2 cm de desplazamiento sin angulación asociada",
      "Cualquier trazo de fractura visible en la radiografía",
      "Más de 1 cm de desplazamiento o más de 45° de angulación",
      "Más de 45° de angulación, sin importar el desplazamiento",
    ],
    correct: 2,
    explanation:
      "Neer considera un fragmento como \"parte\" cuando presenta más de 1 cm de desplazamiento o más de 45° de angulación respecto al resto.",
  },
  {
    id: 14,
    block: "ms",
    code: "11-B1",
    image: null,
    prompt:
      "En la clasificación AO/OTA de húmero proximal, una fractura extraarticular bifocal con impactación metafisaria corresponde al tipo:",
    options: [
      "11-A1",
      "11-B1",
      "11-A3",
      "11-C1",
    ],
    correct: 1,
    explanation:
      "El grupo 11-B agrupa las fracturas extraarticulares bifocales; B1 implica impactación metafisaria sin gran desplazamiento.",
  },
  {
    id: 15,
    block: "ms",
    code: "Mason",
    image: null,
    prompt:
      "Una fractura de cabeza radial desplazada más de 2 mm, sin conminución significativa, se clasifica según Mason como tipo:",
    options: [
      "Mason I",
      "Mason IV",
      "Mason III",
      "Mason II",
    ],
    correct: 3,
    explanation:
      "Mason II corresponde a fracturas con desplazamiento superior a 2 mm sin conminución relevante; Mason III implica conminución severa.",
  },
  {
    id: 16,
    block: "ms",
    code: "13-C",
    image: null,
    prompt:
      "En la clasificación AO/OTA de húmero distal, una fractura articular completa con afectación tanto de la columna medial como de la lateral corresponde al grupo:",
    options: [
      "13-A",
      "13-D",
      "13-C",
      "13-B",
    ],
    correct: 2,
    explanation:
      "El grupo 13-C describe fracturas articulares completas, con separación de ambas columnas y del componente articular respecto a la diáfisis.",
  },
  {
    id: 17,
    block: "ms",
    code: "Monteggia",
    prompt:
      "Una fractura de cúbito proximal asociada a luxación de la cabeza radial se conoce como:",
    image: null,
    options: [
      "Fractura de Monteggia",
      "Fractura de Colles",
      "Fractura de Smith",
      "Fractura de Galeazzi",
    ],
    correct: 0,
    explanation:
      "La lesión de Monteggia combina fractura de la diáfisis cubital con luxación de la cabeza del radio.",
  },
  {
    id: 18,
    block: "ms",
    code: "Galeazzi",
    image: null,
    prompt:
      "Una fractura de la diáfisis radial asociada a luxación de la articulación radiocubital distal se denomina:",
    options: [
      "Fractura de Galeazzi",
      "Fractura de Chauffeur",
      "Fractura de Barton",
      "Fractura de Monteggia",
    ],
    correct: 0,
    explanation:
      "La lesión de Galeazzi asocia fractura diafisaria del radio con luxación de la articulación radiocubital distal.",
  },
  {
    id: 19,
    block: "ms",
    code: "23-A2",
    image: null,
    prompt:
      "Una fractura de radio distal extraarticular con desplazamiento dorsal (fractura de Colles clásica) corresponde, en la clasificación AO/OTA, al grupo:",
    options: [
      "23-C1",
      "23-A2",
      "23-C3",
      "23-B1",
    ],
    correct: 1,
    explanation:
      "Las fracturas extraarticulares simples o con cuña dorsal, como la de Colles, se agrupan dentro de 23-A.",
  },
  {
    id: 20,
    block: "ms",
    code: "Herbert",
    image: null,
    prompt:
      "En la clasificación de Herbert para fracturas del escafoides, una fractura estable del tercio medio (cintura) sin desplazamiento corresponde al tipo:",
    options: [
      "Herbert C",
      "Herbert A1",
      "Herbert A2",
      "Herbert B2",
    ],
    correct: 2,
    explanation:
      "Herbert A2 corresponde a fracturas estables de la cintura del escafoides, sin desplazamiento significativo.",
  },
  {
    id: 21,
    block: "ms",
    code: "Manguito rotador",
    image: null,
    prompt:
      "¿Cuál es el tendón que con mayor frecuencia se ve afectado en las roturas del manguito rotador?",
    options: [
      "Supraespinoso",
      "Redondo menor",
      "Infraespinoso",
      "Subescapular",
    ],
    correct: 0,
    explanation:
      "El supraespinoso es el tendón más frecuentemente afectado, debido a su localización en la zona de menor vascularización (zona crítica de Codman) y al conflicto subacromial.",
  },
  {
    id: 22,
    block: "ms",
    code: "Epicondilitis",
    image: null,
    prompt:
      "La epicondilitis lateral (\"codo de tenista\") afecta principalmente al origen de qué músculo:",
    options: [
      "Flexor radial del carpo",
      "Flexor cubital del carpo",
      "Pronador redondo",
      "Extensor radial corto del carpo",
    ],
    correct: 3,
    explanation:
      "La epicondilitis lateral afecta sobre todo al origen tendinoso del extensor radial corto del carpo (ECRB), por sobrecarga repetitiva.",
  },
  {
    id: 23,
    block: "ms",
    code: "Anatomía",
    image: null,
    prompt:
      "¿Cuántas articulaciones forman el complejo articular del hombro?",
    options: [
      "4",
      "5",
      "2",
      "3",
    ],
    correct: 0,
    explanation:
      "El complejo del hombro está formado por cuatro articulaciones: escapulohumeral, acromioclavicular, escapulotorácica y esternoclavicular.",
  },
  {
    id: 24,
    block: "ms",
    code: "Manguito rotador",
    image: null,
    prompt:
      "La inervación motora del supraespinoso y del infraespinoso proviene del nervio:",
    options: [
      "Axilar",
      "Musculocutáneo",
      "Supraescapular",
      "Torácico largo",
    ],
    correct: 2,
    explanation:
      "El nervio supraescapular, rama del tronco primario superior del plexo braquial, inerva tanto al supraespinoso como al infraespinoso.",
  },
  {
    id: 25,
    block: "ms",
    code: "SLAP",
    image: null,
    prompt:
      "Una lesión SLAP tipo III del labrum superior del hombro se caracteriza por:",
    options: [
      "Desprendimiento del labrum superior con el anclaje del bíceps",
      "Rotura del labrum extendida hacia el tendón del bíceps",
      "Desfibrilación simple del labrum superior",
      "Rotura en asa de cubo del labrum superior sin afectación del tendón del bíceps",
    ],
    correct: 3,
    explanation:
      "El tipo III SLAP es una rotura en asa de cubo del labrum superior, sin afectación asociada del tendón de la porción larga del bíceps.",
  },
  {
    id: 26,
    block: "ms",
    code: "Estabilidad",
    image: null,
    prompt:
      "Entre los estabilizadores estáticos capsulares del hombro, ¿cuál se considera el más importante para la estabilidad glenohumeral?",
    options: [
      "Ligamento glenohumeral inferior",
      "Ligamento coracohumeral",
      "Ligamento glenohumeral medio",
      "Ligamento glenohumeral superior",
    ],
    correct: 0,
    explanation:
      "El ligamento glenohumeral inferior, especialmente su fascículo anterior, se considera el estabilizador capsular más relevante del hombro.",
  },
  {
    id: 27,
    block: "ms",
    code: "Nervio axilar",
    image: null,
    prompt:
      "En un abordaje lateral del hombro, ¿a partir de qué distancia desde el borde lateral del acromion hacia distal existe riesgo de lesionar el nervio axilar?",
    options: [
      "8 cm",
      "5 cm",
      "10 cm",
      "2 cm",
    ],
    correct: 1,
    explanation:
      "Clásicamente se recomienda no sobrepasar los 5 cm desde el borde lateral del acromion en los abordajes laterales, por el riesgo de lesión del nervio axilar.",
  },
  {
    id: 28,
    block: "ms",
    code: "Proyecciones Rx",
    image: null,
    prompt:
      "La proyección radiológica de Zanca del hombro se utiliza principalmente para valorar:",
    options: [
      "La articulación glenohumeral",
      "El espacio subacromial",
      "La articulación esternoclavicular",
      "La articulación acromioclavicular",
    ],
    correct: 3,
    explanation:
      "La proyección de Zanca, con 10-15º de inclinación cefálica del tubo, está indicada para visualizar la articulación acromioclavicular.",
  },
  {
    id: 29,
    block: "ms",
    code: "Plexo braquial",
    image: null,
    prompt:
      "La parálisis braquial obstétrica de Erb-Duchenne afecta característicamente a las raíces:",
    options: [
      "C5-C6",
      "C7 aislada",
      "Todo el plexo (C5-T1)",
      "C8-T1",
    ],
    correct: 0,
    explanation:
      "La parálisis de Erb-Duchenne es el tipo más frecuente de parálisis braquial obstétrica y afecta a las raíces C5-C6, con la clásica postura en \"propina de camarero\".",
  },
  {
    id: 30,
    block: "ms",
    code: "Plexo braquial",
    image: null,
    prompt:
      "En la parálisis braquial obstétrica, ¿qué signo clínico sugiere una avulsión de las raíces C8-T1 (lesión preganglionar)?",
    options: [
      "Signo de Horner",
      "Reflejo de Moro conservado",
      "Mano en garra",
      "Ausencia del reflejo de prensión",
    ],
    correct: 0,
    explanation:
      "La presencia de un síndrome de Horner (enoftalmos, miosis, ptosis) sugiere una avulsión de las raíces C8-T1, lo que implica una lesión preganglionar de peor pronóstico.",
  },
  {
    id: 31,
    block: "ms",
    code: "Malformaciones",
    image: null,
    prompt:
      "¿Cuál es la malformación congénita del hombro más frecuente?",
    options: [
      "Luxación congénita de hombro",
      "Deformidad de Sprengel",
      "Síndrome de Poland",
      "Disostosis cleidocraneal",
    ],
    correct: 1,
    explanation:
      "La deformidad de Sprengel, producida por la falta de descenso del omóplato durante el periodo embrionario, es la malformación congénita del hombro más frecuente.",
  },
  {
    id: 32,
    block: "ms",
    code: "Clavícula",
    image: null,
    prompt:
      "¿Qué característica permite diferenciar la pseudoartrosis congénita de clavícula de una fractura obstétrica de clavícula?",
    options: [
      "La pseudoartrosis congénita está presente desde el nacimiento, sin fractura previa ni dolor",
      "La pseudoartrosis congénita presenta callo hipertrófico en la radiografía",
      "La fractura obstétrica suele asociar hipermovilidad generalizada",
      "La pseudoartrosis congénita cursa con dolor intenso",
    ],
    correct: 0,
    explanation:
      "En la pseudoartrosis congénita de clavícula no existió una fractura previa: la tumoración está presente desde el nacimiento y es indolora, a diferencia de la fractura obstétrica.",
  },
  {
    id: 33,
    block: "ms",
    code: "Síndrome de Poland",
    image: null,
    prompt:
      "El síndrome de Poland se caracteriza fundamentalmente por:",
    options: [
      "Hipoplasia bilateral de la cavidad glenoidea",
      "Fusión congénita de vértebras cervicales",
      "Aplasia unilateral de la porción costoesternal del pectoral mayor con alteraciones ipsilaterales en la mano",
      "Ausencia del tercio externo de la clavícula",
    ],
    correct: 2,
    explanation:
      "El síndrome de Poland se define por la aplasia unilateral de la porción costoesternal del pectoral mayor, asociada con frecuencia a alteraciones en la mano o extremidad superior del mismo lado.",
  },
  {
    id: 34,
    block: "ms",
    code: "Tortícolis",
    image: null,
    prompt:
      "¿Cuál es el tipo de tortícolis congénita más frecuente?",
    options: [
      "Tortícolis postural congénita",
      "Tortícolis muscular congénita",
      "Síndrome de Klippel-Feil",
      "Desplazamiento rotatorio atlo-axoideo",
    ],
    correct: 0,
    explanation:
      "La tortícolis postural congénita, causada por la posición mantenida intraútero, es la forma más frecuente de tortícolis en el recién nacido.",
  },
  {
    id: 35,
    block: "ms",
    code: "Hombro doloroso",
    image: null,
    prompt:
      "Varón de 58 años, fumador, con dolor de hombro insidioso de meses de evolución, sin antecedente traumático. En la exploración presenta arco doloroso entre 60º y 120º de abducción. ¿Qué se comprime característicamente en este síndrome?",
    options: [
      "El nervio axilar contra el cuello quirúrgico del húmero",
      "El tendón del bíceps contra el surco bicipital",
      "El nervio supraescapular contra la escotadura espinoglenoidea",
      "Un elemento del manguito rotador contra el borde anteroinferior del acromion, la articulación acromioclavicular o el ligamento coracoacromial",
    ],
    correct: 3,
    explanation:
      "Es la definición del síndrome doloroso subacromial: compresión de un elemento del manguito contra estructuras próximas (acromion, AC, ligamento coracoacromial) al elevar el brazo, típicamente entre 60º-120º.",
  },
  {
    id: 36,
    block: "ms",
    code: "Estadios de Neer",
    image: null,
    prompt:
      "Según los estadios evolutivos de Neer, ¿qué estadio se corresponde con fibrosis y tendinitis, de curso crónico, dolor recurrente con la actividad y tratamiento inicialmente conservador?",
    options: [
      "Estadio III",
      "Estadio IV",
      "Estadio II",
      "Estadio I",
    ],
    correct: 2,
    explanation:
      "Estadio I: edema y hemorragia (reversible). Estadio II: fibrosis y tendinitis, crónico. Estadio III: rotura tendinosa parcial o completa.",
  },
  {
    id: 37,
    block: "ms",
    code: "Ángulo crítico del hombro",
    image: null,
    prompt:
      "El ángulo crítico del hombro se mide en una Rx AP en plano escapular. Un ángulo por encima de 35º se asocia principalmente a mayor riesgo de:",
    options: [
      "Degeneración articular glenohumeral",
      "Rotura del manguito de los rotadores",
      "Inestabilidad anterior glenohumeral",
      "Os acromiale sintomático",
    ],
    correct: 1,
    explanation:
      "Lo normal es 32-33º. A mayor ángulo (>35º), mayor riesgo de rotura del manguito; con <30º hay mayor riesgo de degeneración articular.",
  },
  {
    id: 38,
    block: "ms",
    code: "Escala de Goutallier",
    image: null,
    prompt:
      "En una RM de hombro se describe el supraespinoso con 'igual cantidad de músculo que grasa'. Según la escala de Goutallier, ¿qué estadio es?",
    options: [
      "Estadio 1",
      "Estadio 3",
      "Estadio 4",
      "Estadio 2",
    ],
    correct: 1,
    explanation:
      "Goutallier: 0 sin grasa, 1 algunas manchas, 2 más músculo que grasa, 3 igual cantidad, 4 más grasa que músculo. A mayor grado, peor capacidad de cicatrización tras la reparación.",
  },
  {
    id: 39,
    block: "ms",
    code: "Clasificación de Burkhart",
    image: null,
    prompt:
      "Deportista de lanzamiento con rotura del manguito con longitud anteroposterior <2 cm y longitud medial-lateral >2 cm, con excelente movilidad en el plano AP. Según Davidson y Burkhart, ¿qué patrón presenta y cómo se repara?",
    options: [
      "Masiva, contraída e inmóvil; deslizamiento de intervalos",
      "PASTA; reanclaje transtendinoso",
      "Media luna; reparación directa a hueso",
      "En forma de U o L; convergencia de márgenes y reparación a hueso",
    ],
    correct: 3,
    explanation:
      "AP <2cm y medial-lateral >2cm con excelente movilidad AP corresponde al patrón en U o L, tratado con convergencia de márgenes y reparación directa a la tuberosidad.",
  },
  {
    id: 40,
    block: "ms",
    code: "Rotura irreparable",
    image: null,
    prompt:
      "¿Cuándo se considera 'irreparable' un desgarro del manguito de los rotadores?",
    options: [
      "Si ocurre cualquiera de los siguientes: retracción hasta glena o más allá, infiltración grasa muscular severa, o ascenso de la cabeza humeral con distancia acromiohumeral <7 mm",
      "Únicamente si afecta a más de 2 tendones completos",
      "Solo si hay degeneración grasa severa en los 4 tendones simultáneamente",
      "Únicamente cuando coexiste con artrosis glenohumeral franca",
    ],
    correct: 0,
    explanation:
      "Basta con que se cumpla cualquiera de esos criterios (no todos a la vez) para considerar la rotura irreparable.",
  },
  {
    id: 41,
    block: "ms",
    code: "External lag test",
    image: null,
    prompt:
      "Paciente con rotura masiva del manguito. Al colocar el brazo en rotación externa máxima con el codo pegado al tronco, el paciente no puede mantener la posición y el brazo cae bruscamente hacia rotación interna. ¿Qué prueba es y qué indica?",
    options: [
      "Belly press test; lesión del subescapular superior",
      "Drop-arm test; lesión aislada del subescapular",
      "Internal lag test; lesión aislada del infraespinoso",
      "External lag test; rotura posterosuperior masiva con afectación de infraespinoso y redondo menor",
    ],
    correct: 3,
    explanation:
      "El External lag test positivo (el brazo cae en rotación interna al no poder mantener la RE) es indicativo de desgarro posterosuperior masivo con afectación de infraespinoso y redondo menor.",
  },
  {
    id: 42,
    block: "ms",
    code: "Hamada-Fukuda",
    image: null,
    prompt:
      "Mujer de 76 años con hombro doloroso crónico y pseudoparálisis. En la Rx: distancia acromiohumeral <6 mm, acetabulización del acromion y artrosis glenohumeral evidente, sin colapso de la cabeza humeral. Según Hamada-Fukuda, ¿qué grado corresponde?",
    options: [
      "Grado V",
      "Grado IV",
      "Grado III",
      "Grado II",
    ],
    correct: 1,
    explanation:
      "Grado IV = grado III (acetabulización) + evidencia de artrosis glenohumeral. El grado V añadiría colapso de la cabeza humeral, ausente en este caso.",
  },
  {
    id: 43,
    block: "ms",
    code: "Artroplastia inversa",
    image: null,
    prompt:
      "¿Cuál de las siguientes es una CONTRAINDICACIÓN para la artroplastia inversa de hombro (RSA) en la artropatía del manguito rotador?",
    options: [
      "Disfunción del deltoides o del nervio axilar",
      "Escape anterosuperior de la cabeza humeral",
      "Edad avanzada con bajas demandas funcionales",
      "Rotura masiva e irreparable del MR con elevación activa <90º",
    ],
    correct: 0,
    explanation:
      "La RSA depende biomecánicamente de un deltoides funcional; su disfunción (o la del nervio axilar) es una contraindicación. El resto son indicaciones clásicas.",
  },
  {
    id: 44,
    block: "ms",
    code: "Rotura parcial",
    image: null,
    prompt:
      "Trabajador manual de 45 años con rotura de espesor parcial del supraespinoso (cara articular) que afecta al 40% del grosor del tendón, sin antecedente traumático agudo ni gran debilidad. ¿Cuál es la actitud terapéutica inicial más adecuada?",
    options: [
      "Tratamiento conservador inicial (no todo MR roto debe intervenirse)",
      "Tenotomía del bíceps de forma sistemática",
      "Reparación quirúrgica urgente por vía artroscópica",
      "Artroplastia inversa de entrada",
    ],
    correct: 0,
    explanation:
      "Las roturas parciales de espesor <50% sin traumatismo agudo ni gran debilidad se tratan inicialmente de forma conservadora. Cirugía precoz solo si hay trauma agudo con gran debilidad o tamaño >3 cm.",
  },
  {
    id: 45,
    block: "ms",
    code: "Luxación medial de la PLB",
    image: null,
    prompt:
      "Paciente con luxación medial del tendón de la porción larga del bíceps confirmada por ecografía. ¿Qué lesión asociada debemos sospechar de forma prioritaria?",
    options: [
      "Rotura del tendón del supraespinoso",
      "Rotura del ligamento coracoacromial",
      "Lesión SLAP tipo I",
      "Rotura del tendón del subescapular",
    ],
    correct: 3,
    explanation:
      "La luxación medial de la PLB se debe a la lesión de la porción superior del tendón subescapular, que forma parte de la polea bicipital. La luxación medial se asocia de forma característica a rotura del subescapular.",
  },
  {
    id: 46,
    block: "ms",
    code: "Rotura PLB — tratamiento",
    image: null,
    prompt:
      "Culturista de 45 años sufre dolor agudo, chasquido y equimosis en el brazo tras un esfuerzo, con signo de Popeye positivo. La RMN confirma rotura completa de la porción larga del bíceps. Es joven y activo. ¿Cuál es la actitud más adecuada?",
    options: [
      "Observación sin ningún tratamiento, ya que el dolor cede en días",
      "Desbridamiento artroscópico simple sin gesto sobre el tendón",
      "Tratamiento conservador con crioterapia y reposo 3 semanas",
      "Tenotomía o tenodesis quirúrgica",
    ],
    correct: 3,
    explanation:
      "En pacientes jóvenes y activos con roturas completas agudas de la PLB está indicado el tratamiento quirúrgico (tenotomía o tenodesis); el conservador se reserva sobre todo para pacientes mayores.",
  },
  {
    id: 47,
    block: "ms",
    code: "Tenotomía vs tenodesis PLB",
    image: null,
    prompt:
      "Respecto a la tenotomía y la tenodesis del bíceps como tratamiento de la patología de la porción larga del bíceps, señale la afirmación correcta:",
    options: [
      "No se han encontrado diferencias clínicas significativas en la reducción del dolor entre ambas técnicas realizadas correctamente",
      "La tenodesis se asocia de forma característica a mayor tasa de calambres y deformidad de Popeye",
      "La tenotomía aislada no es eficaz para aliviar el dolor",
      "La tenotomía se prefiere en pacientes jóvenes y activos por su mejor resultado estético",
    ],
    correct: 0,
    explanation:
      "Comparando tenotomía y tenodesis, no se han encontrado diferencias clínicas significativas en la reducción del dolor cuando se realizan correctamente; la tenodesis ofrece mejor estética y más fuerza, pero mayor morbilidad técnica.",
  },
  {
    id: 48,
    block: "ms",
    code: "Lesión SLAP tipo II",
    image: null,
    prompt:
      "Lanzador de béisbol de 24 años con dolor de hombro y sensación de 'brazo muerto' tras el lanzamiento. La artroRM muestra separación patológica del labrum superior y de la inserción del bíceps del margen glenoideo, con movilidad anormal del anclaje bicipital, sin extensión adicional. Según la clasificación de Snyder, ¿qué tipo de lesión SLAP es y cuál es su tratamiento habitual?",
    options: [
      "Tipo I; desbridamiento artroscópico",
      "Tipo IV; tenodesis o tenotomía del bíceps",
      "Tipo II; reparación/estabilización con anclajes de sutura",
      "Tipo III; resección tipo asa de cubo",
    ],
    correct: 2,
    explanation:
      "La descripción corresponde a una lesión SLAP tipo II (la más común clínicamente significativa, 55%), tratada mediante reparación/estabilización con anclajes de sutura.",
  },
  {
    id: 49,
    block: "ms",
    code: "Pinzamiento interno vs coracoideo",
    image: null,
    prompt:
      "Un lanzador de béisbol presenta dolor posterior de hombro durante la fase de aceleración del lanzamiento, con disminución de la rotación interna pasiva en abducción. Otro paciente, oficinista, presenta dolor sordo anterior de hombro que aumenta con la flexión, aducción y rotación interna, y signo de Hawkins modificado positivo. ¿Qué entidades presentan respectivamente?",
    options: [
      "Ambos presentan pinzamiento coracoideo, con distinta localización del dolor",
      "El primero pinzamiento coracoideo; el segundo pinzamiento interno",
      "Ambos presentan síndrome subacromial clásico",
      "El primero pinzamiento interno (posterosuperior); el segundo pinzamiento coracoideo (subcoracoideo)",
    ],
    correct: 3,
    explanation:
      "El pinzamiento interno (deportistas de lanzamiento, dolor posterior, ABD-RE) atrapa el manguito entre la glenoides posterosuperior y el troquíter. El pinzamiento coracoideo (dolor anterior con flexión-aducción-RI, Hawkins modificado +) es el choque de la cabeza humeral con la coracoides.",
  },
  {
    id: 50,
    block: "ms",
    code: "Tendinitis calcificante",
    image: null,
    prompt:
      "Mujer de 45 años con dolor muy intenso y agudo de hombro derecho de inicio súbito, sin traumatismo. La Rx muestra una calcificación irregular tipo 'nube' cerca de la inserción del supraespinoso. ¿En qué fase de la tendinitis calcificante se encuentra y cuál es la mejor actitud terapéutica inicial?",
    options: [
      "Fase formativa; artroscopia urgente para limpieza del depósito",
      "Fase de reabsorción (postcalcificación); punción-lavado del depósito e infiltración anestésica",
      "Fase de precalcificación; observación sin tratamiento",
      "Fase de reposo; tratamiento quirúrgico con reparación del manguito",
    ],
    correct: 1,
    explanation:
      "El dolor intenso y agudo con calcificación en 'nube' es típico de la fase de reabsorción/postcalcificación (aumento de presión al reabsorberse el depósito). El tratamiento de elección es la punción del depósito e infiltración anestésica, dentro del manejo conservador inicial.",
  },
  {
    id: 51,
    block: "ms",
    code: "Capsulitis adhesiva",
    image: null,
    prompt:
      "Paciente de 52 años, diabética, con capsulitis adhesiva primaria del hombro no dominante, que tras 5 meses de rehabilitación supervisada mantiene una flexión activa de 70º muy dolorosa (fase inflamatoria). ¿Cuál es la actitud más adecuada?",
    options: [
      "Continuar tratamiento conservador (fisioterapia, control del dolor); la manipulación no está indicada en fase inflamatoria",
      "Artrolisis artroscópica inmediata, ya que es la técnica más utilizada actualmente",
      "Manipulación bajo anestesia de forma aislada",
      "Hidrodilatación aislada sin rehabilitación posterior",
    ],
    correct: 0,
    explanation:
      "La manipulación bajo anestesia no se recomienda en fases inflamatorias de la enfermedad y no debe plantearse como procedimiento aislado, sino acompañada de rehabilitación posterior; en fase de dolor intenso se prioriza el control conservador.",
  },
  {
    id: 52,
    block: "ms",
    code: "Resección clavícula distal",
    image: null,
    prompt:
      "Levantador de pesas con artrosis acromioclavicular sintomática, dolor al hacer aducción horizontal cruzada, refractario a 6 meses de tratamiento conservador. Se decide resección de la clavícula distal (Mumford). ¿Cuál es la complicación característica de una resección excesiva (>1-1,5 cm)?",
    options: [
      "Parálisis del nervio axilar",
      "Rotura del manguito de los rotadores",
      "Osteonecrosis de la cabeza humeral",
      "Inestabilidad de la articulación acromioclavicular por lesión de los ligamentos coracoclaviculares",
    ],
    correct: 3,
    explanation:
      "Una resección excesiva de clavícula distal (>1-1,5 cm) puede alterar los ligamentos coracoclaviculares y producir inestabilidad superoinferior de la AAC. La resección debe limitarse a 5-10 mm.",
  },
  {
    id: 53,
    block: "ms",
    code: "Rotura del subescapular",
    image: null,
    prompt:
      "Paciente con antecedente de luxación anterior de hombro presenta dolor anterior y aumento de la rotación externa pasiva respecto al lado contralateral, con pruebas de despegue (lift-off) y de prensa abdominal (belly press) positivas. En la artroscopia se objetiva el 'signo de la coma'. ¿A qué corresponde este hallazgo?",
    options: [
      "Rotura del supraespinoso con retracción hasta la glenoides",
      "Rotura de la porción larga del bíceps con tendón retraído",
      "Ligamento glenohumeral superior avulsionado, indicativo de rotura crónica del subescapular",
      "Lesión SLAP tipo IV con extensión al bíceps",
    ],
    correct: 2,
    explanation:
      "El signo de la coma en la artroscopia representa el ligamento glenohumeral superior avulsionado, y es un hallazgo característico que ayuda a identificar una rotura crónica del subescapular retraído.",
  },
  {
    id: 54,
    block: "ms",
    code: "Quiste espinoglenoideo",
    image: null,
    prompt:
      "Voleibolista con debilidad progresiva y atrofia visible del músculo infraespinoso en la exploración, con dolor sordo leve y sin rotura tendinosa objetivada. La RMN muestra una lesión SLAP con una lesión quística en la escotadura espinoglenoidea. ¿Cuál es el hallazgo clínico clave que debe hacer sospechar esta entidad?",
    options: [
      "Tumefacción visible y fluctuante en la región posterior del hombro",
      "Debilidad del infraespinoso desproporcionada respecto al dolor",
      "Dolor intenso desproporcionado respecto a la debilidad",
      "Debilidad simultánea e igual de supraespinoso e infraespinoso",
    ],
    correct: 1,
    explanation:
      "El síntoma clave es la debilidad del infraespinoso (por compresión del nervio supraescapular en la escotadura espinoglenoidea por el quiste) claramente desproporcionada respecto al dolor, que suele ser leve. Si también se afecta el supraespinoso, la compresión estaría más proximal (escotadura supraescapular).",
  },
  {
    id: 55,
    block: "ms",
    code: "Craig / clavícula",
    image: null,
    prompt:
      "Varón de 28 años sufre una caída en bicicleta a alta velocidad. Presenta dolor y deformidad en tercio medio de clavícula derecha, con acortamiento clínico medido de 2,3 cm y desplazamiento completo sin contacto entre fragmentos. No hay lesión cutánea ni compromiso neurovascular. ¿Cuál es la actitud MÁS adecuada según la evidencia actual?",
    options: [
      "Fijación con agujas de Kirschner de entrada",
      "Tratamiento conservador con cabestrillo, sin más consideraciones",
      "Iniciar tratamiento conservador con vigilancia estrecha; considerar cirugía si a las 4-6 semanas persiste dolor o movilidad anormal",
      "Cirugía urgente, ya que el acortamiento >2 cm es indicación absoluta",
    ],
    correct: 2,
    explanation:
      "El acortamiento >20 mm y el desplazamiento completo son indicaciones RELATIVAS (no absolutas) de cirugía. La tendencia actual es iniciar tratamiento conservador con vigilancia estrecha y pasar a cirugía precoz si a las 4-6 semanas no hay signos de consolidación clínica.",
  },
  {
    id: 56,
    block: "ms",
    code: "Neer II clavícula",
    image: null,
    prompt:
      "Respecto a las fracturas del tercio lateral de clavícula tipo II de Neer, señale la afirmación correcta:",
    options: [
      "Corresponden a fracturas intraarticulares acromioclaviculares",
      "Se tratan de forma conservadora, dado su bajo riesgo de pseudoartrosis",
      "Presentan una elevada tasa de pseudoartrosis (30-45%), por lo que en general se prefiere la fijación quirúrgica",
      "El fragmento medial queda unido a los ligamentos coracoclaviculares, por lo que son estables",
    ],
    correct: 2,
    explanation:
      "En el tipo II de Neer la fractura queda medial a los ligamentos coracoclaviculares, lo que favorece el desplazamiento y una alta tasa de pseudoartrosis (30-45%), por lo que en general se prefiere el tratamiento quirúrgico.",
  },
  {
    id: 57,
    block: "ms",
    code: "Disociación escapulotorácica",
    image: null,
    prompt:
      "Paciente politraumatizado tras accidente de tráfico de alta energía. En la radiografía de tórax se objetiva desplazamiento lateral de la escápula izquierda de 1,5 cm respecto al lado contralateral, junto con fractura clavicular ipsilateral y déficit neurológico en el miembro superior. ¿Cuál es el diagnóstico más probable y qué mortalidad se asocia?",
    options: [
      "Hombro flotante; mortalidad prácticamente nula",
      "Luxación acromioclavicular tipo V; mortalidad del 25%",
      "Fractura de cuello de escápula aislada; sin mortalidad asociada",
      "Disociación escapulotorácica; mortalidad en torno al 10%",
    ],
    correct: 3,
    explanation:
      "El desplazamiento lateral de la escápula >1 cm en la Rx de tórax, junto con déficit neurovascular y lesiones asociadas (clavícula, AC, esternoclavicular), es característico de la disociación escapulotorácica, entidad grave con mortalidad en torno al 10%.",
  },
  {
    id: 58,
    block: "ms",
    code: "Luxación esternoclavicular",
    image: null,
    prompt:
      "En cuanto a las luxaciones esternoclaviculares, ¿cuál es la afirmación correcta?",
    options: [
      "Las luxaciones posteriores pueden asociar compresión mediastínica y requieren valorar cirugía torácica/vascular",
      "La TAC ha quedado en desuso frente a la radiografía simple para su estudio",
      "Las posteriores son más frecuentes que las anteriores",
      "El ligamento capsular posterior es el estabilizador más débil de la articulación",
    ],
    correct: 0,
    explanation:
      "Las luxaciones posteriores pueden comprimir estructuras mediastínicas (vasos, tráquea, esófago), por lo que se recomienda contar con un cirujano cardiotorácico o vascular en su tratamiento quirúrgico. Son menos frecuentes que las anteriores, y el ligamento capsular posterior es el estabilizador MÁS fuerte, no el más débil. La TAC es hoy la prueba de elección.",
  },
  {
    id: 59,
    block: "ms",
    code: "Rockwood V",
    image: null,
    prompt:
      "Jugador de rugby de 22 años sufre una caída sobre el hombro. Presenta signo de la 'tecla de piano' positivo. En la Rx de Zanca con estrés se objetiva un espacio coracoclavicular un 150% mayor que el contralateral, con desinserción parcial del trapecio. ¿Qué tipo de luxación acromioclavicular es y cuál sería una opción terapéutica razonable en este paciente joven y activo?",
    options: [
      "Tipo IV; tratamiento con Mumford aislado",
      "Tipo II; el tratamiento de elección es conservador",
      "Tipo V; se recomienda tratamiento quirúrgico, habitualmente con refuerzo coracoclavicular tipo suspensión (Dog-bone/Tight-rope)",
      "Tipo III; el tratamiento conservador es la opción más habitual",
    ],
    correct: 2,
    explanation:
      "Una distancia coracoclavicular >100% respecto al lado contralateral con desprendimiento del trapecio corresponde al tipo V de Rockwood y Matsen, en el que se recomienda tratamiento quirúrgico; la técnica más usada actualmente es el refuerzo coracoclavicular con sistemas de suspensión.",
  },
  {
    id: 60,
    block: "ms",
    code: "Ideberg I",
    image: null,
    prompt:
      "Sobre la clasificación de Ideberg de las fracturas de la cavidad glenoidea, ¿cuál de las siguientes indica tratamiento quirúrgico en el tipo I?",
    options: [
      "El tratamiento del tipo I es fundamentalmente artroscópico de entrada",
      "Fragmento mayor de 5 mm o afectación de más del 20% de la superficie glenoidea, o escalón articular ≥4 mm",
      "Solo si hay luxación glenohumeral asociada, sin considerar el tamaño del fragmento",
      "Cualquier fragmento, independientemente del tamaño",
    ],
    correct: 1,
    explanation:
      "En el tipo I de Ideberg (avulsión del margen glenoideo) el tratamiento quirúrgico está indicado cuando el fragmento es inestable: mayor de 5 mm, con afectación >20% de la superficie glenoidea, o con escalón/desplazamiento articular de 4 mm o más.",
  },
  {
    id: 61,
    block: "ms",
    code: "Hombro flotante",
    image: null,
    prompt:
      "Paciente con fractura de clavícula tercio medio y fractura ipsilateral de cuello quirúrgico de escápula, con ligamentos coracoclaviculares y acromioclaviculares intactos, mínimamente desplazada. ¿Cómo se clasifica esta lesión desde el punto de vista de la estabilidad y cuál sería el tratamiento más razonable?",
    options: [
      "Disociación escapulotorácica; requiere angiografía urgente",
      "Lesión estable, ya que el complejo suspensorio superior del hombro solo está interrumpido en un punto; puede valorarse tratamiento conservador si no hay desplazamiento significativo",
      "Luxación acromioclavicular tipo IV; tratamiento quirúrgico obligado",
      "Hombro flotante inestable; requiere fijación quirúrgica de ambos focos",
    ],
    correct: 1,
    explanation:
      "Cuando la fractura de cuello quirúrgico de escápula se asocia a una clavícula con ligamentos acromioclaviculares y coracoclaviculares intactos, el complejo suspensorio superior del hombro mantiene un punto de anclaje estable, por lo que la lesión se considera estable y puede tratarse de forma conservadora si no hay desplazamiento relevante.",
  },
  {
    id: 62,
    block: "ms",
    code: "N. musculocutáneo",
    image: null,
    prompt:
      "¿Qué estructura neurológica está en mayor riesgo en las fracturas desplazadas de la apófisis coracoides?",
    options: [
      "Nervio torácico largo",
      "Nervio axilar",
      "Nervio musculocutáneo",
      "Nervio supraescapular",
    ],
    correct: 2,
    explanation:
      "El nervio musculocutáneo entra en el tendón conjunto (porción corta del bíceps y coracobraquial), que se origina en la coracoides, por lo que puede lesionarse en fracturas desplazadas de esta apófisis.",
  },
  {
    id: 63,
    block: "ms",
    code: "Mumford",
    image: null,
    prompt:
      "Mujer de 65 años con luxación acromioclavicular tipo III diagnosticada hace 5 meses, actualmente con dolor moderado en la articulación acromioclavicular pero estable clínicamente, sin inestabilidad relevante. ¿Cuál sería la opción quirúrgica más adecuada si fracasa el tratamiento conservador?",
    options: [
      "Tornillo de Bosworth",
      "Reconstrucción del ligamento coracoclavicular con tendón autólogo más refuerzo tipo suspensión",
      "Técnica de Mumford (resección del extremo distal de clavícula) aislada, al ser una lesión crónica con articulación sintomática pero estable",
      "Transposición de Dewar-Barrington",
    ],
    correct: 2,
    explanation:
      "En luxaciones acromioclaviculares crónicas (>6 semanas) tipo I-II degenerativas o en tipo III con articulación sintomática pero estable, no tiene sentido reparar ligamentos no funcionales; la técnica de Mumford aislada (resección de 0,5-1 cm de clavícula distal) es una opción razonable.",
  },
  {
    id: 64,
    block: "ms",
    code: "Clavícula obstétrica",
    image: null,
    prompt:
      "Respecto a las fracturas de clavícula en el recién nacido, señale la afirmación correcta:",
    options: [
      "Son más frecuentes en la clavícula derecha (salvo dextrocardia) por ser la presentación OAI la más habitual en el parto",
      "Son más frecuentes en la clavícula izquierda por la presentación fetal habitual",
      "Se diagnostican mediante ecografía prenatal de rutina antes del parto",
      "Suelen requerir vendaje en 8 durante 6 semanas",
    ],
    correct: 0,
    explanation:
      "Debido a que la presentación más frecuente en el parto es la occípito-anterior izquierda (OAI), la fractura clavicular obstétrica es más frecuente en el lado derecho (salvo en casos de dextrocardia). El tratamiento habitual es mínimo o abstención terapéutica.",
  },
  {
    id: 65,
    block: "ms",
    code: "Luxación esternoclavicular posterior",
    image: null,
    prompt:
      "Paciente con luxación esternoclavicular posterior aguda tras accidente deportivo, con disfagia leve y congestión venosa del cuello. Tras reducción cerrada fallida en quirófano, ¿cuál es la actitud más adecuada?",
    options: [
      "Tratamiento conservador con cabestrillo indefinido",
      "Artrodesis esternoclavicular de entrada",
      "Colocación de agujas de Kirschner para fijación temporal",
      "Reducción abierta, evitando el uso de pines o agujas de Kirschner por riesgo de migración a estructuras mediastínicas, idealmente con interconsulta a cirugía cardiotorácica o vascular",
    ],
    correct: 3,
    explanation:
      "Ante el fracaso de la reducción cerrada en una luxación esternoclavicular posterior, está indicada la reducción abierta. Está formalmente contraindicado el uso de agujas o pines de Kirschner por el riesgo de rotura y migración a estructuras vitales del mediastino, y se recomienda contar con cirugía cardiotorácica o vascular dado el riesgo de complicaciones potencialmente mortales.",
  },
  {
    id: 66,
    block: "ms",
    code: "Fractura cuerpo escápula",
    image: null,
    prompt:
      "En las fracturas de cuerpo y espina de escápula, ¿cuál de los siguientes NO es un criterio habitualmente propuesto para valorar tratamiento quirúrgico?",
    options: [
      "Cualquier grado de conminución, independientemente del desplazamiento",
      "Angulación en visión axial de escápula de al menos 45º",
      "Ángulo glenopolar ≤22º",
      "Medialización del borde lateral de la escápula mayor de 2 cm",
    ],
    correct: 0,
    explanation:
      "La mera presencia de conminución no es, por sí sola, criterio de cirugía si no se acompaña de desplazamiento o angulación significativos. Los criterios clásicamente propuestos incluyen medialización >2 cm, angulación axial ≥45º, ángulo glenopolar ≤22º y disrupción bipolar del complejo suspensorio ≥1 cm.",
  },
  {
    id: 67,
    block: "ms",
    code: "Clavícula adolescente",
    image: null,
    prompt:
      "Adolescente de 15 años, deportista, sufre traumatismo directo sobre el hombro durante un partido de balonmano. Se diagnostica fractura de tercio medio de clavícula desplazada con acortamiento de 22 mm, sin lesión cutánea ni neurovascular. Los padres preguntan por el tratamiento más adecuado. ¿Cuál es la respuesta más ajustada a la evidencia actual?",
    options: [
      "Tratamiento mínimo o abstención terapéutica, igual que en fracturas obstétricas",
      "Cirugía de entrada, dado que se trata de una fractura desplazada con acortamiento >20 mm",
      "En general el tratamiento sigue siendo conservador con resultados similares al quirúrgico; en adolescentes mayores atletas puede plantearse una decisión compartida con la familia",
      "Fijación sistemática con agujas de Kirschner percutáneas",
    ],
    correct: 2,
    explanation:
      "En niños y adolescentes el tratamiento quirúrgico no ha demostrado mejores resultados que el conservador de forma generalizada; sin embargo, en adolescentes mayores atletas con fracturas muy desplazadas se puede plantear una decisión compartida con la familia. El acortamiento >20 mm es una indicación relativa, no absoluta.",
  },
  {
    id: 68,
    block: "ms",
    code: "Complicación clavícula",
    image: null,
    prompt:
      "¿Cuál de las siguientes es la complicación MÁS FRECUENTE de las fracturas de clavícula a medio-largo plazo?",
    options: [
      "Pseudoartrosis",
      "Compresión del plexo braquial",
      "Artrosis acromioclavicular postraumática",
      "Consolidación viciosa",
    ],
    correct: 3,
    explanation:
      "La consolidación viciosa es la complicación tardía más frecuente de las fracturas de clavícula, sobre todo cuando el acortamiento supera los 2 cm; suele ser bien tolerada funcionalmente aunque puede producir fatiga, dolor y defecto estético.",
  },
  {
    id: 69,
    block: "ms",
    code: "Luxación anterior >40 años",
    image: null,
    prompt:
      "Mujer de 62 años sufre una caída con el brazo en abducción y rotación externa, produciéndose una luxación anterior de hombro que se reduce en Urgencias. Tras la reducción persiste debilidad marcada para la rotación externa y la abducción activa, con recuperación lenta. ¿Cuál es la actitud más adecuada?",
    options: [
      "Es esperable tras cualquier luxación y no requiere estudio adicional",
      "Repetir la radiografía simple es suficiente para descartar cualquier lesión asociada",
      "Iniciar directamente fisioterapia intensiva sin pruebas de imagen",
      "Solicitar ecografía o RM para descartar rotura del manguito rotador, dado que en mayores de 40 años con recuperación lenta esto es más probable que una lesión del nervio axilar",
    ],
    correct: 3,
    explanation:
      "En pacientes mayores de 40 años, tras luxación anterior con desplazamiento apreciable o recuperación funcional lenta, está indicada ecografía o RM para descartar rotura del manguito rotador, que es más frecuente que la lesión del nervio axilar en este grupo de edad, aunque ambas pueden coexistir y se recomienda descartar el manguito ante cualquier sospecha de lesión nerviosa.",
  },
  {
    id: 70,
    block: "ms",
    code: "On-track / off-track",
    image: null,
    prompt:
      "En un paciente con inestabilidad anterior recidivante de hombro, la TC-3D muestra que el intervalo de Hill-Sachs es mayor que la superficie glenoidea disponible. ¿Qué implica este hallazgo?",
    options: [
      "Indica ausencia de defecto óseo relevante",
      "La lesión de Hill-Sachs es 'on-track' y no requiere ningún gesto sobre la cabeza humeral",
      "La lesión es 'off-track': la cabeza humeral se enganchará en el reborde glenoideo durante el arco de movimiento, lo que favorece la recidiva si no se trata adecuadamente",
      "Contraindica cualquier tratamiento quirúrgico",
    ],
    correct: 2,
    explanation:
      "Cuando el intervalo de Hill-Sachs supera la superficie glenoidea disponible, la lesión se clasifica como 'off-track': la cabeza humeral se engancha en el reborde glenoideo anterior durante el movimiento, lo que predispone a la recidiva si no se aborda (por ejemplo, mediante remplissage o técnicas de tope óseo).",
  },
  {
    id: 71,
    block: "ms",
    code: "Lesión HAGL",
    image: null,
    prompt:
      "Paciente con inestabilidad anterior de hombro en el que, durante la artroscopia, se identifica una desinserción de los ligamentos glenohumerales a nivel del cuello humeral, con la inserción glenoidea de los mismos íntegra. ¿De qué lesión se trata y qué la caracteriza?",
    options: [
      "Lesión ALPSA; el periostio anterior queda desprendido pero intacto",
      "Lesión de Perthes; labrum no desplazado con manguito perióstico normal",
      "Lesión de Bankart; avulsión labral anteroinferior glenoidea",
      "Lesión HAGL; desinserción de los ligamentos glenohumerales en su origen humeral, no en la glenoides, de difícil identificación y tratamiento",
    ],
    correct: 3,
    explanation:
      "La lesión HAGL (Humeral Avulsion of the Glenohumeral Ligament) consiste en la desinserción de los ligamentos glenohumerales en su inserción humeral (no en la glenoidea), a diferencia de las lesiones de Bankart, ALPSA o Perthes, que afectan al complejo labral glenoideo. Es una lesión de difícil identificación y tratamiento.",
  },
  {
    id: 72,
    block: "ms",
    code: "Convulsión y luxación posterior",
    image: null,
    prompt:
      "Varón de 45 años con antecedente de epilepsia sufre una crisis convulsiva. A su llegada a Urgencias presenta dolor bilateral en hombros, con limitación marcada de la rotación externa pasiva en ambos lados y elevación restringida por debajo de 90º. ¿Cuál es la sospecha diagnóstica principal y qué se debe evitar al intentar la reducción?",
    options: [
      "Rotura bilateral del manguito rotador; tratamiento conservador de entrada",
      "Luxación anterior bilateral; se debe reducir mediante rotación externa forzada",
      "Luxación posterior bilateral; debe evitarse la rotación externa forzada durante la reducción, ya que puede producir fracturas",
      "Fractura de troquíter bilateral; no requiere maniobra de reducción",
    ],
    correct: 2,
    explanation:
      "La limitación de la rotación externa pasiva tras una crisis convulsiva es el signo diagnóstico fundamental de luxación posterior de hombro (a menudo bilateral). Para reducirla se emplea rotación interna con tracción, evitando forzar la rotación externa, ya que puede producir fracturas.",
  },
  {
    id: 73,
    block: "ms",
    code: "Indicación quirúrgica 1ª luxación",
    image: null,
    prompt:
      "Jugador de balonmano de 22 años, deportista de contacto de alto nivel, sufre su primera luxación anterior traumática de hombro, sin fractura asociada ni rotura del manguito. Según los criterios actuales, ¿cuál es la actitud más adecuada?",
    options: [
      "Puede plantearse estabilización quirúrgica de entrada, ya que la edad <25 años y la práctica de deporte de contacto de alto nivel son criterios aceptados para indicar cirugía tras una primera luxación",
      "Cirugía diferida hasta que aparezca una segunda luxación, con independencia del perfil deportivo",
      "Inmovilización en rotación externa durante 6 semanas como única medida",
      "Tratamiento conservador de entrada en toda primera luxación, con independencia del perfil del paciente",
    ],
    correct: 0,
    explanation:
      "Las indicaciones de tratamiento quirúrgico tras una primera luxación traumática más aceptadas actualmente incluyen: paciente menor de 25 años deportista de contacto de alto nivel, existencia de fractura de Bankart ósea, o rotura del manguito rotador.",
  },
  {
    id: 74,
    block: "ms",
    code: "Defecto glenoideo subcrítico",
    image: null,
    prompt:
      "Deportista de contacto de 24 años con inestabilidad anterior recidivante presenta en la TC-3D un defecto óseo glenoideo del 16% con lesión de Hill-Sachs 'off-track'. ¿Cuál es la actitud más razonable según el algoritmo actual de decisión quirúrgica?",
    options: [
      "Se trata de un defecto 'subcrítico' (13,5-20%) con Hill-Sachs off-track; dado el perfil de riesgo (deportista de contacto), suele optarse por reparación de Bankart + Remplissage o Latarjet, en lugar de reparación de partes blandas aislada",
      "Debe realizarse un aloinjerto de tibia distal como primera opción de entrada",
      "La cirugía no está indicada por debajo del 20% de defecto",
      "Reparación de Bankart aislada, sin más consideraciones",
    ],
    correct: 0,
    explanation:
      "El defecto glenoideo 'subcrítico' (entre 13,5-20%) obliga a valorar factores pronósticos como la localización on/off-track del Hill-Sachs y el perfil de riesgo del paciente. En deportistas de contacto con Hill-Sachs off-track, se prefiere una técnica de tope óseo (Latarjet) o Bankart + Remplissage frente a la reparación aislada de partes blandas.",
  },
  {
    id: 75,
    block: "ms",
    code: "Triada terrible del hombro",
    image: null,
    prompt:
      "Paciente de 58 años sufre una luxación anterior de hombro de alta energía. Tras la reducción presenta impotencia funcional del deltoides con lenta recuperación, y en la RM se objetiva además una rotura del manguito rotador. ¿Qué entidad se debe sospechar y qué prueba confirma la afectación nerviosa?",
    options: [
      "Hombro flotante; se confirma con TC",
      "Triada terrible del hombro (luxación anterior + rotura del manguito rotador + lesión del plexo braquial); se confirma la afectación nerviosa mediante electromiograma a las 3-4 semanas",
      "Lesión de Hill-Sachs invertida; se confirma con radiografía simple",
      "Disociación escapulotorácica; se confirma con angiografía",
    ],
    correct: 1,
    explanation:
      "La coexistencia de luxación anterior de hombro, rotura del manguito rotador y lesión del plexo braquial (cualquiera de sus ramas o troncos, típicamente el nervio axilar) constituye la 'triada terrible del hombro'. La afectación nerviosa se confirma con electromiograma a las 3-4 semanas, dado que la mayoría son neuroapraxias que se recuperan en unas 10 semanas.",
  },
  {
    id: 76,
    block: "ms",
    code: "Lesión de Kim",
    image: null,
    prompt:
      "Jugador de rugby con dolor posterior de hombro recurrente ante posiciones de flexión, aducción y rotación interna, sin luxaciones francas documentadas. En la exploración, el test de Kim es positivo. ¿Qué lesión sugiere este cuadro y cómo se caracteriza?",
    options: [
      "Lesión de Bankart invertido; avulsión completa y desplazada del labrum posteroinferior",
      "Lesión de Perthes invertida; asociada de forma característica a luxación posterior franca",
      "Lesión HAGL inversa; desinserción de los ligamentos glenohumerales posteriores en su origen glenoideo",
      "Lesión de Kim; avulsión oculta e incompleta de la zona posteroinferior del labrum, típica de inestabilidad posterior recidivante por microtraumatismos repetidos",
    ],
    correct: 3,
    explanation:
      "La lesión de Kim es una avulsión oculta e incompleta del labrum posteroinferior, característica de la inestabilidad posterior recidivante por microtraumatismos repetidos (típica en rugby y culturismo), sin llegar a producir luxaciones francas.",
  },
  {
    id: 77,
    block: "ms",
    code: "Inestabilidad multidireccional",
    image: null,
    prompt:
      "Nadadora de 19 años con dolor e inestabilidad bilateral de hombros, de aparición insidiosa, sin antecedente traumático claro. En la exploración presenta signo del surco positivo bilateral y test de hiperabducción de Gagey patológico. ¿Cuál es la orientación terapéutica inicial más adecuada?",
    options: [
      "Procedimiento de Latarjet bilateral, por tratarse de una inestabilidad de alto riesgo",
      "Tratamiento no quirúrgico durante al menos 3-6 meses, centrado en fortalecimiento de estabilizadores dinámicos y control escapular, reservando la cirugía para los casos sin respuesta",
      "Estabilización quirúrgica bilateral de entrada, dado el carácter bilateral",
      "Reparación artroscópica de Bankart bilateral inmediata",
    ],
    correct: 1,
    explanation:
      "La inestabilidad multidireccional, típicamente no traumática, bilateral y asociada a laxitud e hiperlaxitud (signo del surco, test de Gagey patológico), se trata inicialmente de forma no quirúrgica mediante fortalecimiento de los estabilizadores dinámicos y control de la cinemática escapular, durante al menos 3-6 meses antes de plantear cirugía.",
  },
  {
    id: 78,
    block: "ms",
    code: "Fractura de troquíter",
    image: null,
    prompt:
      "Paciente de 55 años sufre una luxación anterior de hombro asociada a una fractura de la tuberosidad mayor (troquíter). Tras la reducción cerrada, la fractura permanece significativamente desplazada. ¿Cuál es la actitud más adecuada?",
    options: [
      "Amputación funcional del miembro",
      "Tratamiento conservador, dado que las fracturas de troquíter suelen consolidar bien",
      "No requiere ningún seguimiento adicional",
      "Está indicada la estabilización quirúrgica, ya que una fractura de troquíter que sigue desplazada tras la reducción es una indicación reconocida de tratamiento quirúrgico",
    ],
    correct: 3,
    explanation:
      "Entre las indicaciones de tratamiento quirúrgico de la inestabilidad de hombro se incluye la fractura de troquíter asociada que permanece desplazada tras la reducción, además de la fractura de glenoides y las lesiones del manguito asociadas.",
  },
  {
    id: 79,
    block: "ms",
    code: "Luxatio erecta",
    image: null,
    prompt:
      "Paciente acude con el brazo fijo en posición de hiperabducción completa por encima de la cabeza, sin poder bajarlo, tras un mecanismo de hiperabducción forzada. ¿Qué tipo de luxación glenohumeral es la más probable y qué lesiones asociadas hay que descartar activamente?",
    options: [
      "Luxación superior; descartar rotura del tendón de Aquiles",
      "Luxación inferior o 'luxatio erecta'; descartar lesiones de la arteria axilar y del plexo braquial, así como fracturas proximales de húmero",
      "Luxación posterior; descartar lesión del nervio supraescapular como principal riesgo asociado",
      "Subluxación fisiológica sin relevancia clínica",
    ],
    correct: 1,
    explanation:
      "La luxación inferior o 'luxatio erecta' se produce por hiperabducción, con choque del cuello humeral contra el acromion que hace de palanca luxando la cabeza en sentido inferior. Se asocia con frecuencia a lesiones de partes blandas, fracturas proximales de húmero y lesiones de la arteria axilar y del plexo braquial, que deben descartarse activamente.",
  },
  {
    id: 80,
    block: "ms",
    code: "Inestabilidad glenohumeral infantil",
    image: null,
    prompt:
      "Adolescente de 13 años con fisis humeral proximal abierta presenta una segunda luxación glenohumeral recidivante tras un episodio traumático inicial. ¿Cuál es la actitud más adecuada según el manejo habitual en este grupo de edad?",
    options: [
      "Amputación funcional del miembro superior",
      "Cirugía inmediata igual que en el adulto, independientemente del estado fisario",
      "Tratamiento conservador hasta el cierre fisario, con independencia de la clínica de recurrencia",
      "En general se opta por tratamiento conservador si la fisis está abierta, salvo que las recurrencias sugieran la existencia de una lesión de Bankart, en cuyo caso puede valorarse cirugía; el manejo es controvertido",
    ],
    correct: 3,
    explanation:
      "En niños con fisis abierta (<14 años) se suele optar por tratamiento conservador de la inestabilidad glenohumeral, salvo que existan recurrencias que sugieran una lesión de Bankart, donde el manejo se individualiza y es controvertido. En niños con fisis cerrada (>14 años) el tratamiento sigue las pautas del adulto joven.",
  },
  {
    id: 81,
    block: "ms",
    code: "Complicación vascular luxación",
    image: null,
    prompt:
      "Paciente anciana sufre una luxación anterior de hombro. Tras la reducción presenta un miembro frío, pálido y sin pulso radial palpable. ¿Cuál es la actitud inmediata?",
    options: [
      "Observación domiciliaria y revisión en una semana",
      "Cirugía urgente con restablecimiento de la circulación del brazo (sutura, injerto o prótesis vascular), dado que se trata de una probable lesión de la arteria axilar",
      "Aplicar frío local y analgesia oral, difiriendo la valoración vascular",
      "Repetir la reducción cerrada de forma más enérgica",
    ],
    correct: 1,
    explanation:
      "La lesión de la arteria axilar (más frecuente en ancianos, sobre todo a nivel del tercer segmento) es una urgencia que requiere cirugía inmediata con restablecimiento de la circulación del brazo mediante sutura, injerto o prótesis vascular.",
  },
  {
    id: 82,
    block: "ms",
    code: "Latarjet vs Bankart",
    image: null,
    prompt:
      "Respecto al procedimiento de Latarjet en el tratamiento de la inestabilidad anterior de hombro, señale la afirmación correcta:",
    options: [
      "Está indicado cuando existen múltiples factores de riesgo de recidiva, pero no ante un defecto óseo significativo aislado",
      "Consiste en el reanclaje artroscópico del labrum a la cavidad glenoidea sin transferencia ósea",
      "Ha caído en desuso frente a otras técnicas en la práctica actual",
      "Está indicado tanto si existe un defecto óseo significativo como si hay múltiples factores de riesgo de recidiva, incluso en ausencia de defecto óseo mayor",
    ],
    correct: 3,
    explanation:
      "El procedimiento de Latarjet (transferencia de la apófisis coracoides con el tendón conjunto a la glenoides anteroinferior) está indicado tanto ante un defecto óseo glenoideo significativo como ante la presencia de múltiples factores de riesgo de recidiva, incluso si el defecto óseo no es muy grande, por el efecto de 'hamaca' estabilizadora adicional que aporta el tendón conjunto.",
  },
  {
    id: 83,
    block: "ms",
    code: "PROFHER",
    image: null,
    prompt:
      "Mujer de 68 años sufre una caída casual con fractura desplazada del cuello quirúrgico de húmero proximal en 2 fragmentos. Según los resultados del ensayo clínico PROFHER y la evidencia posterior, ¿cuál es la actitud más ajustada?",
    options: [
      "El tratamiento conservador es una opción razonable, ya que no se han demostrado diferencias clínicas significativas frente al tratamiento quirúrgico a 2 y 5 años, con menos complicaciones",
      "Amputación funcional del miembro, dada la mala evolución esperable",
      "Cirugía sistemática con placa bloqueada, ya que ha demostrado ser claramente superior al tratamiento conservador",
      "Prótesis inversa de entrada en toda fractura desplazada en mayores de 65 años",
    ],
    correct: 0,
    explanation:
      "El ensayo PROFHER (y su seguimiento a 5 años) no demostró diferencias clínicas ni estadísticamente significativas entre tratamiento conservador y quirúrgico en fracturas desplazadas de húmero proximal, con más complicaciones en el grupo quirúrgico. La tendencia actual es aplicar tratamiento conservador en pacientes ancianos, independientemente del tipo de fractura.",
  },
  {
    id: 84,
    block: "ms",
    code: "Índice tuberosidad deltoidea",
    image: null,
    prompt:
      "En un paciente candidato a osteosíntesis con placa LCP por una fractura en 3 fragmentos de húmero proximal, se calcula el Índice de la Tuberosidad Deltoidea (DTI) obteniendo un valor de 1,2. ¿Qué implica este resultado?",
    options: [
      "Buena calidad ósea, bajo riesgo de fallo de la osteosíntesis",
      "Densidad mineral ósea baja de la cabeza humeral, con mayor riesgo de fallo de la osteosíntesis, por lo que podría reconsiderarse la indicación hacia una prótesis",
      "Indica ausencia de fractura asociada del troquíter",
      "El valor no tiene relación con la calidad ósea, solo con el tamaño de la placa",
    ],
    correct: 1,
    explanation:
      "Un DTI inferior a 1,4 predice una densidad mineral ósea baja de la cabeza humeral y aumenta el riesgo de fallo de la osteosíntesis, lo que debe tenerse en cuenta al planificar el tratamiento quirúrgico, especialmente en pacientes con hueso osteoporótico.",
  },
  {
    id: 85,
    block: "ms",
    code: "Fractura-luxación húmero proximal",
    image: null,
    prompt:
      "Paciente de 78 años con fractura-luxación anterior de húmero proximal en 4 fragmentos. ¿Cuál es el tratamiento de elección?",
    options: [
      "Prótesis (habitualmente inversa en el anciano)",
      "Reducción cerrada aislada sin fijación",
      "Osteosíntesis con placa LCP, con independencia de la edad del paciente",
      "Tratamiento conservador con Velpeau como primera opción",
    ],
    correct: 0,
    explanation:
      "Las fracturas-luxaciones en 4 fragmentos de húmero proximal se tratan mediante prótesis, dado el alto riesgo de necrosis avascular y la dificultad de conseguir una reducción estable; en el paciente anciano con buena función del deltoides, la prótesis inversa suele ser la opción preferida.",
  },
  {
    id: 86,
    block: "ms",
    code: "Prótesis inversa indicación",
    image: null,
    prompt:
      "Paciente anciano con fractura en 4 fragmentos de húmero proximal, con conminución importante de las tuberosidades que hace inviable su osteosíntesis, pero con función normal del músculo deltoides. ¿Cuál es la opción más adecuada según los criterios actuales?",
    options: [
      "Osteosíntesis con clavo intramedular, forzando la fijación de las tuberosidades conminutas",
      "Prótesis inversa, dado que existen tuberosidades no reconstruibles y buena función deltoidea",
      "Tratamiento conservador, reservando la cirugía para un segundo tiempo",
      "Hemiartroplastia cementada de entrada, por ser la técnica más sencilla",
    ],
    correct: 1,
    explanation:
      "La prótesis inversa está indicada en el anciano con relativamente alta demanda funcional cuando existe conminución importante de las tuberosidades no susceptible de osteosíntesis, y cuando existe funcionalidad del músculo deltoides; si no la hay, no debe implantarse.",
  },
  {
    id: 87,
    block: "ms",
    code: "Fractura troquíter desplazada",
    image: null,
    prompt:
      "Trabajador manual de 45 años con actividad repetida por encima de la cabeza sufre una fractura aislada del troquíter con 4 mm de desplazamiento. ¿Cuál es la actitud más adecuada según las particularidades de su perfil?",
    options: [
      "Tratamiento conservador sin reservas, ya que el desplazamiento es menor de 5 mm",
      "Prótesis inversa de entrada",
      "Amputación funcional del miembro superior",
      "Dado que es trabajador manual con actividad repetida por encima de la cabeza, el umbral de desplazamiento aceptable para tratamiento conservador se reduce a 3 mm, por lo que debería valorarse tratamiento quirúrgico",
    ],
    correct: 3,
    explanation:
      "Aunque el umbral general para tratamiento quirúrgico de la fractura de troquíter es un desplazamiento >5 mm, en pacientes deportistas o trabajadores manuales con actividad repetida por encima de la cabeza este umbral se reduce a 3 mm, dado el mayor riesgo funcional del desplazamiento en este grupo.",
  },
  {
    id: 88,
    block: "ms",
    code: "Pseudoartrosis húmero proximal",
    image: null,
    prompt:
      "Paciente con fractura de cuello quirúrgico de húmero proximal tratada de forma conservadora, que a los 7 meses presenta dolor, rigidez e impotencia funcional, con evidencia radiológica de ausencia de consolidación. ¿Cuál es la actitud más adecuada?",
    options: [
      "Está indicado el tratamiento quirúrgico, ya que se trata de una pseudoartrosis sintomática con más de 6 meses de evolución desde la fractura inicial",
      "Continuar con fisioterapia, sin plantear ninguna otra medida",
      "Amputación del miembro superior",
      "Esperar hasta el año antes de plantear cualquier tratamiento adicional",
    ],
    correct: 0,
    explanation:
      "El tratamiento quirúrgico de la pseudoartrosis de húmero proximal se recomienda cuando existe evidencia radiológica de pseudoartrosis transcurridos 6 meses desde la fractura, acompañada de dolor e impotencia funcional; suele consistir en osteosíntesis con aporte de injerto.",
  },
  {
    id: 89,
    block: "ms",
    code: "Little League Shoulder",
    image: null,
    prompt:
      "Adolescente de 13 años, lanzador de béisbol, presenta dolor progresivo en el hombro dominante relacionado con la actividad deportiva. En la radiografía se objetiva un ensanchamiento de la fisis proximal del húmero, sin fractura franca. ¿Cuál es el diagnóstico y el tratamiento más adecuado?",
    options: [
      "Osteomielitis del húmero proximal; requiere antibioterapia intravenosa urgente",
      "Tumor óseo primario; requiere biopsia inmediata",
      "Fractura-luxación de húmero proximal; requiere reducción abierta urgente",
      "'Little League Shoulder' (epifisiolisis humeral tipo I por sobreuso); el tratamiento consiste en descanso y modificación de la actividad física",
    ],
    correct: 3,
    explanation:
      "El 'Little League Shoulder' es una epifisiolisis humeral tipo I por uso excesivo del hombro durante la maduración esquelética, típica de deportistas de lanzamiento de 11-14 años, que se manifiesta radiológicamente como un ensanchamiento de la fisis proximal. El tratamiento es conservador: descanso y modificación de la actividad física.",
  },
  {
    id: 90,
    block: "ms",
    code: "Fractura neonatal húmero",
    image: null,
    prompt:
      "Recién nacido presenta pseudoparálisis del brazo tras un parto distócico con distocia de hombro. La radiografía muestra alterada la relación diáfisis-escápula sin visualizarse claramente la fractura. ¿Cuál es la prueba diagnóstica de elección y por qué?",
    options: [
      "Ecografía, porque en el neonato la epífisis proximal del húmero es cartilaginosa y la fractura no se visualiza en la radiografía simple",
      "TAC, porque ofrece mejor resolución ósea",
      "Ninguna prueba es necesaria; el diagnóstico se basa solo en la clínica",
      "RM bajo sedación, como primera prueba de imagen en el neonato",
    ],
    correct: 0,
    explanation:
      "En el neonato, la epífisis proximal del húmero es cartilaginosa (el núcleo de osificación de la cabeza aparece a los 6 meses), por lo que la fractura o epifisiolisis puede pasar desapercibida en la radiografía simple (a veces llamada 'pseudoluxación'). La ecografía es la prueba diagnóstica de elección en este contexto.",
  },
  {
    id: 91,
    block: "ms",
    code: "Fractura infantil desplazada",
    image: null,
    prompt:
      "Niño de 9 años sufre una fractura de cuello quirúrgico de húmero proximal con una angulación total (AP + axial) de 65º. Según la guía de indicación de tratamiento por edad y desviación, ¿cuál es la actitud más adecuada?",
    options: [
      "Prótesis, igual que en el adulto",
      "Tratamiento conservador, ya que en niños menores de 10-11 años se acepta hasta 60º de angulación",
      "Tratamiento quirúrgico, ya que en niños menores de 10-11 años el límite aceptado para tratamiento conservador es 60º de angulación, y este paciente lo supera",
      "Amputación funcional del miembro",
    ],
    correct: 2,
    explanation:
      "Según la guía de indicación de tratamiento por edad y desviación, en niños menores de 10-11 años se acepta tratamiento conservador hasta 60º de angulación; con 65º de angulación total (suma de las angulaciones en AP y axial) estaría superado ese límite, indicándose tratamiento quirúrgico.",
  },
  {
    id: 92,
    block: "ms",
    code: "Hematoma de Hennequin",
    image: null,
    prompt:
      "Paciente con fractura de húmero proximal que, 48 horas después del traumatismo, presenta un hematoma extenso en la cara interna del brazo y la cara lateral del tórax. ¿Cómo se denomina este hallazgo y qué significado tiene?",
    options: [
      "Signo de la charretera; indica luxación glenohumeral asociada",
      "Signo de Hill-Sachs; indica lesión osteocondral asociada",
      "Signo de Popeye; indica rotura del tendón del bíceps",
      "Hematoma de Hennequin (o 'en herradura'); es un hallazgo característico y esperable de las fracturas de la extremidad proximal del húmero, no indica por sí solo una complicación grave",
    ],
    correct: 3,
    explanation:
      "El hematoma de Hennequin (o 'en herradura') aparece típicamente a las 48 horas en la cara interna del brazo y la cara lateral del tórax, y es un hallazgo característico y esperable de las fracturas de la extremidad proximal del húmero.",
  },
  {
    id: 93,
    block: "ms",
    code: "Fractura cuello anatómico",
    image: null,
    prompt:
      "Paciente de 72 años con alta demanda funcional sufre una fractura en 2 fragmentos del cuello anatómico de húmero proximal. ¿Cuál es la actitud más adecuada dado el riesgo específico de este tipo de fractura?",
    options: [
      "Tratamiento conservador de entrada, difiriendo la valoración quirúrgica",
      "Amputación funcional del miembro",
      "Osteosíntesis con agujas percutáneas, técnica de elección habitual en este tipo de fractura",
      "Dado el alto riesgo de necrosis avascular de la cabeza humeral en el paciente mayor con este tipo de fractura, se prefiere el tratamiento protésico frente a la osteosíntesis",
    ],
    correct: 3,
    explanation:
      "Las fracturas de cuello anatómico en 2 fragmentos tienen un riesgo elevado de necrosis avascular de la cabeza humeral, especialmente en el paciente mayor; por ello, en personas mayores con alta demanda funcional o fracaso del tratamiento conservador se prefiere la prótesis frente a la reducción abierta y fijación interna, que se reserva para pacientes jóvenes.",
  },
  {
    id: 94,
    block: "ms",
    code: "Fractura impactada en valgo",
    image: null,
    prompt:
      "Paciente joven con buena calidad ósea presenta una fractura reciente en 4 fragmentos de húmero proximal, impactada en valgo. ¿Cuál es la técnica quirúrgica más adecuada en este perfil de paciente?",
    options: [
      "Amputación funcional del miembro",
      "Agujas percutáneas, con o sin sutura o injerto óseo asociado, dado que se trata de una fractura reciente, con buen hueso y en paciente joven",
      "Prótesis inversa de entrada, dada la complejidad de la fractura",
      "Tratamiento conservador de entrada, sin plantear ninguna intervención",
    ],
    correct: 1,
    explanation:
      "En fracturas en 4 fragmentos impactadas en valgo, recientes, con buena calidad ósea y en pacientes jóvenes, la técnica de elección son las agujas percutáneas, con o sin sutura o aporte de injerto óseo asociado, reservando la artroplastia para los casos crónicos, con mal hueso o en pacientes mayores.",
  },
  {
    id: 95,
    block: "ms",
    code: "Vascularización húmero proximal",
    image: null,
    prompt:
      "Respecto a la vascularización de la cabeza humeral, señale la afirmación correcta según la evidencia actual:",
    options: [
      "Depende sobre todo de la arteria circunfleja humeral anterior, sin aporte relevante de otras ramas",
      "Tradicionalmente se atribuía el papel principal a la arteria circunfleja humeral anterior, pero estudios recientes demuestran que la arteria circunfleja humeral posterior aporta hasta el 64% de la vascularización cefálica",
      "Depende sobre todo de ramas directas de la arteria subclavia, sin aporte relevante de la circunfleja",
      "No existe ninguna relación entre la vascularización cefálica y el riesgo de necrosis avascular",
    ],
    correct: 1,
    explanation:
      "Tradicionalmente se consideraba que la vascularización cefálica provenía sobre todo de las arterias anterolaterales ascendentes (ramas de la circunfleja humeral anterior), pero estudios recientes han demostrado que la arteria circunfleja humeral posterior desempeña un papel muy importante, aportando hasta el 64% de la vascularización del húmero proximal.",
  },
  {
    id: 96,
    block: "ms",
    code: "Codo flotante húmero proximal",
    image: null,
    prompt:
      "Paciente politraumatizado joven presenta una fractura de cuello quirúrgico de húmero proximal desplazada más de un 50%, asociada a una fractura ipsilateral distal del mismo miembro superior ('codo flotante'). ¿Cuál es la actitud más adecuada respecto al tratamiento de la fractura proximal?",
    options: [
      "Amputación funcional del miembro superior",
      "Prótesis inversa, con independencia de la edad del paciente",
      "El tratamiento quirúrgico está indicado, ya que las fracturas asociadas ipsilaterales del miembro superior (codo flotante) constituyen una de las indicaciones reconocidas de tratamiento quirúrgico en las fracturas de cuello quirúrgico",
      "Tratamiento conservador de entrada, dado que las fracturas asociadas ipsilaterales no modifican la indicación",
    ],
    correct: 2,
    explanation:
      "El tratamiento quirúrgico de las fracturas del cuello quirúrgico de húmero proximal está indicado en pacientes jóvenes y activos con desplazamiento significativo (>50%), politraumatizados, con fracturas asociadas ipsilaterales del miembro superior (codo flotante), daño vascular, fracturas abiertas, fracturas metastásicas o fracaso del tratamiento conservador.",
  },
  {
    id: 97,
    block: "ms",
    code: "Parálisis radial primaria",
    image: null,
    prompt:
      "Varón de 28 años sufre traumatismo directo en cara lateral del brazo tras accidente de moto. La Rx muestra fractura transversa de tercio medio de húmero con desplazamiento del fragmento distal hacia lateral. En la exploración presenta imposibilidad para la extensión de la muñeca y los dedos, con sensibilidad conservada. ¿Cuál es la actitud más adecuada respecto al nervio radial?",
    options: [
      "Solicitar arteriografía inmediata, asumiendo que la parálisis radial implica lesión vascular asociada",
      "Tratar la fractura según los criterios habituales (ortopédico o quirúrgico) y monitorizar la función radial, dada la alta probabilidad de recuperación espontánea de estas parálisis",
      "Iniciar tratamiento con corticoides sistémicos para acelerar la recuperación nerviosa",
      "Indicar cirugía urgente para exploración del nervio radial, dado el desplazamiento lateral del fragmento distal",
    ],
    correct: 1,
    explanation:
      "La parálisis radial primaria asociada a fractura cerrada de diáfisis humeral (más frecuente en fracturas del tercio distal con desplazamiento radial del fragmento distal) tiene alta probabilidad de recuperación espontánea (en torno al 77%). Por sí sola no es indicación de exploración quirúrgica temprana; se recomienda esta cuando no mejora en 4-6 meses.",
  },
  {
    id: 98,
    block: "ms",
    code: "Placa LCP en osteoporosis",
    image: null,
    prompt:
      "Mujer de 72 años, con antecedente de osteoporosis, presenta fractura diafisaria de húmero con gran conminución tras caída casual. Se decide tratamiento quirúrgico con placa. ¿Qué tipo de implante resulta más adecuado en este contexto?",
    options: [
      "Clavo elástico intramedular tipo Ender",
      "Placa de reconstrucción de 3,5 mm sin bloqueo",
      "Placa LCP con tornillos roscados a la placa",
      "Placa DCP convencional de 4,5 mm sin tornillos bloqueados",
    ],
    correct: 2,
    explanation:
      "En pacientes osteoporóticos y en fracturas con gran conminución, las placas LCP (con tornillos roscados a la placa) han demostrado ser superiores a las placas DCP convencionales, ya que reducen el riesgo de fracaso del implante por aflojamiento de los tornillos.",
  },
  {
    id: 99,
    block: "ms",
    code: "Pronóstico fractura diáfisis humeral",
    image: null,
    prompt:
      "¿Cuál de las siguientes fracturas diafisarias de húmero presenta, en términos generales, peor pronóstico de consolidación con tratamiento conservador?",
    options: [
      "Fractura transversa de tercio medio con buen contacto óseo",
      "Fractura de tercio proximal en paciente mayor de 55 años",
      "Fractura conminuta de tercio medio",
      "Fractura oblicua larga de tercio medio",
    ],
    correct: 1,
    explanation:
      "Las fracturas de tercio proximal, especialmente en pacientes mayores de 55 años, presentan peor pronóstico con tratamiento conservador, consolidando en torno al 76% de los casos, frente a las fracturas oblicuas o conminutas, que consolidan mejor por su mayor superficie de contacto.",
  },
  {
    id: 100,
    block: "ms",
    code: "Fijación en politraumatizado",
    image: null,
    prompt:
      "Paciente politraumatizado con fractura diafisaria de húmero de tercio medio y extensa lesión de partes blandas en el brazo. ¿Cuál sería la opción de fijación quirúrgica de elección en este contexto?",
    options: [
      "Enclavado intramedular bloqueado",
      "Osteosíntesis MIPO con placa larga",
      "Placa DCP mediante abordaje anterior clásico",
      "Ortesis funcional de Sarmiento tras reducción cerrada",
    ],
    correct: 0,
    explanation:
      "El enclavado intramedular bloqueado es la técnica de elección en fracturas patológicas, pacientes con obesidad mórbida, extensa lesión de partes blandas o pacientes politraumatizados, situaciones en las que colocar una placa resulta poco recomendable.",
  },
  {
    id: 101,
    block: "ms",
    code: "Abordaje anterolateral húmero",
    image: null,
    prompt:
      "Durante un abordaje lateral directo (anterolateral) de la diáfisis humeral para exposición del tercio distal, el cirujano debe tener especial precaución porque este abordaje:",
    options: [
      "No puede extenderse ni proximal ni distalmente",
      "Es de los que conlleva menor riesgo de lesión del nervio radial entre los abordajes del húmero",
      "Discurre a través del músculo tríceps en toda su longitud",
      "Es el abordaje que con mayor frecuencia produce parálisis iatrogénica del nervio radial",
    ],
    correct: 3,
    explanation:
      "Aunque el abordaje lateral directo (anterolateral) tiene la ventaja de poder extenderse tanto proximal como distalmente, es el abordaje que mayor tasa de parálisis iatrogénica del nervio radial produce, por lo que requiere una disección cuidadosa.",
  },
  {
    id: 102,
    block: "ms",
    code: "Parálisis radial postquirúrgica",
    image: null,
    prompt:
      "Un paciente tratado con osteosíntesis con placa por fractura diafisaria de húmero presenta, en el postoperatorio inmediato, imposibilidad para la extensión activa de la muñeca que no estaba presente antes de la cirugía. Durante la intervención no se documentó la integridad del nervio radial. ¿Cuál es la actitud más adecuada?",
    options: [
      "Retirar el material de osteosíntesis de forma urgente",
      "Reintervenir de forma inmediata para explorar el nervio radial",
      "Considerar la parálisis como definitiva y plantear transferencias tendinosas en el mismo ingreso",
      "Solicitar electromiografía y pruebas de conducción nerviosa a partir de las 3-4 semanas, y valorar exploración quirúrgica si no mejora en 4-6 meses",
    ],
    correct: 3,
    explanation:
      "En las parálisis radiales postquirúrgicas en las que no se ha comprobado la indemnidad del nervio durante la cirugía, se recomienda seguimiento con electromiografía y pruebas de conducción nerviosa, reservando la exploración quirúrgica para los casos que no mejoran en el plazo de 4-6 meses, dado que la mayoría se recuperan.",
  },
  {
    id: 103,
    block: "ms",
    code: "Clasificación AO tipo B",
    image: null,
    prompt:
      "En la clasificación AO de las fracturas diafisarias de húmero, una fractura tipo B se caracteriza por:",
    options: [
      "Presentar un trazo simple, ya sea espiroideo, oblicuo largo u oblicuo corto",
      "Afectar de forma habitual a la articulación del codo",
      "Presentar un tercer fragmento, en cuña o de flexión",
      "Corresponder a fracturas segmentarias con gran conminución",
    ],
    correct: 2,
    explanation:
      "Las fracturas tipo B en la clasificación AO son aquellas que presentan un tercer fragmento (en cuña o ala de mariposa, con tercer fragmento pequeño de flexión, o con tercer fragmento fracturado), a diferencia del tipo A (fractura simple) y el tipo C (fractura compleja).",
  },
  {
    id: 104,
    block: "ms",
    code: "Fractura humeral en niño pequeño",
    image: null,
    prompt:
      "Niño de 4 años sufre fractura diafisaria de húmero tras caída de un columpio, con 45º de angulación en la radiografía. No se objetivan alteraciones neurovasculares. ¿Cuál es la actitud terapéutica más apropiada?",
    options: [
      "Enclavado intramedular flexible de entrada, por tratarse de un paciente pediátrico",
      "Fijador externo, dado el riesgo de lesión fisaria con otras técnicas",
      "Reducción abierta y osteosíntesis con placa de forma urgente",
      "Tratamiento conservador, dado que esta angulación resulta aceptable a su edad y remodelará con el crecimiento",
    ],
    correct: 3,
    explanation:
      "En niños menores de 5 años se aceptan angulaciones de hasta 70º y desplazamiento completo, ya que remodelarán con el crecimiento. El tratamiento quirúrgico en niños es infrecuente y se reserva para casos concretos; lo habitual es el manejo conservador.",
  },
  {
    id: 105,
    block: "ms",
    code: "Movilidad del foco a las 6 semanas",
    image: null,
    prompt:
      "Paciente con fractura diafisaria de húmero de tercio medio tratada de forma conservadora con ortesis funcional de Sarmiento. A las 6 semanas de evolución, la exploración clínica del foco de fractura demuestra movilidad grosera al manipularlo. ¿Qué implica este hallazgo?",
    options: [
      "Obliga a sustituir la ortesis por un yeso colgante de Caldwell",
      "Es un hallazgo esperable a las 6 semanas y no requiere ninguna actuación adicional",
      "Debe considerarse indicación de tratamiento quirúrgico, dado que la mayoría de estos casos no llegarán a consolidar con tratamiento conservador",
      "Indica que la fractura ya ha consolidado y puede retirarse la ortesis",
    ],
    correct: 2,
    explanation:
      "La exploración física a las 6 semanas es esencial: si existe movilidad franca del foco en ese momento, se recomienda intervención quirúrgica, ya que más del 90% de estos casos no llegarán a consolidar con tratamiento conservador.",
  },
  {
    id: 106,
    block: "ms",
    code: "Pseudoartrosis atrófica tercio superior",
    image: null,
    prompt:
      "En una pseudoartrosis atrófica de tercio superior de diáfisis humeral, tras la extirpación del foco y la osteosíntesis con placa LCP, ¿qué medida adicional resulta más adecuada?",
    options: [
      "Sustituir la placa por un clavo intramedular fresado en el mismo tiempo quirúrgico",
      "Añadir injerto óseo autólogo en el foco",
      "Asociar campos electromagnéticos pulsátiles como tratamiento principal",
      "Aceptar acortamientos superiores a 5 cm para facilitar el contacto óseo",
    ],
    correct: 1,
    explanation:
      "En las pseudoartrosis de tipo atrófico, el tratamiento de elección combina la extirpación del foco, la osteosíntesis con placa LCP y la aportación de injerto óseo autólogo (o sustitutivos osteoinductores tipo BMP), aceptando acortamientos menores de 3 cm para lograr contacto óseo.",
  },
  {
    id: 107,
    block: "ms",
    code: "Estabilidad en valgo tras resección radial",
    image: null,
    prompt:
      "Paciente de 34 años sufre una fractura conminuta de cabeza radial no reconstruible. Durante la cirugía se comprueba que el ligamento colateral cubital (LCC) está íntegro, por lo que se decide resecar la cabeza radial sin sustituirla por prótesis. ¿Qué cabe esperar respecto a la estabilidad en valgo del codo?",
    options: [
      "Debe reconstruirse el LCC de rutina en toda resección de cabeza radial para evitar inestabilidad",
      "Con el LCC íntegro, la cabeza radial actúa como estabilizador secundario del valgo, por lo que no cabe esperar una inestabilidad relevante",
      "La resección aislada de la cabeza radial provoca inestabilidad en valgo con independencia del estado del LCC",
      "La estabilidad en valgo depende sobre todo del ligamento anular, por lo que la resección radial es irrelevante",
    ],
    correct: 1,
    explanation:
      "La cabeza radial es un estabilizador secundario del estrés en valgo cuando el LCC está íntegro; en ese contexto, su resección no suele causar inestabilidad en valgo. Si existiera lesión del LCC, la cabeza radial pasaría a actuar como estabilizador primario y su resección sí se acompañaría de inestabilidad franca.",
  },
  {
    id: 108,
    block: "ms",
    code: "Estabilidad en varo tras resección radial",
    image: null,
    prompt:
      "Varón de 29 años, tratado meses atrás mediante resección aislada de cabeza radial por fractura conminuta, refiere sensación de inestabilidad leve en varo durante actividades de carga axial del brazo. ¿Qué estructura es la principal responsable de la estabilidad en varo del codo y cuya insuficiencia relativa podría explicar este cuadro?",
    options: [
      "El ligamento anular del radio",
      "La banda anterior del ligamento colateral cubital",
      "La congruencia de la articulación cúbito-humeral, junto con las fibras del ligamento colateral cubital lateral",
      "La cápsula anterior del codo",
    ],
    correct: 2,
    explanation:
      "La estabilidad en varo depende sobre todo de la congruencia de la articulación cúbito-humeral (coronoides y olécranon), junto con las fibras del ligamento colateral cubital lateral (componente del LCL insertado en la cresta supinadora del cúbito), que son las más importantes para la restricción de la inestabilidad en varo.",
  },
  {
    id: 109,
    block: "ms",
    code: "Luxación congénita cabeza radial",
    image: null,
    prompt:
      "Niño de 8 años acude tras un traumatismo leve de codo. La exploración muestra una discreta prominencia posterolateral con mínimo déficit de extensión, sin otra limitación funcional relevante. La radiografía muestra una cabeza radial con forma de cúpula (convexa) y un cóndilo humeral hipoplásico. ¿Cuál es el diagnóstico más probable y la actitud más adecuada?",
    options: [
      "Fractura-luxación de Monteggia aguda; requiere reducción urgente y fijación del cúbito",
      "Fractura de cuello radial reciente; requiere inmovilización con yeso 4 semanas",
      "Luxación congénita de cabeza radial; dado que es prácticamente asintomática, se recomienda una actitud expectante sin tratamiento activo",
      "Sinostosis radiocubital congénita; requiere osteotomía desrotadora percutánea",
    ],
    correct: 2,
    explanation:
      "La deformidad de la cabeza radial (forma de cúpula) junto con la agenesia o hipoplasia del cóndilo humeral son signos radiográficos fiables de que la luxación de cabeza radial es congénita. Al ser prácticamente asintomática, si la clínica es mínima no se recomienda ningún tratamiento activo.",
  },
  {
    id: 110,
    block: "ms",
    code: "Sinostosis radiocubital congénita",
    image: null,
    prompt:
      "Adolescente con sinostosis radiocubital congénita bilateral presenta el antebrazo fijo en hiperpronación marcada, con gran dificultad para tareas que requieren supinación (comer con cuchara, recibir objetos). ¿Cuál es la actitud terapéutica más adecuada?",
    options: [
      "Separación quirúrgica de cúbito y radio para restaurar la pronosupinación activa",
      "Observación sin ninguna intervención, dada la naturaleza congénita del cuadro",
      "Fusión radiocarpiana bilateral precoz",
      "Osteotomía desrotadora con fijación percutánea con agujas para mejorar la posición funcional del antebrazo",
    ],
    correct: 3,
    explanation:
      "La separación quirúrgica de la sinostosis radiocubital congénita no se recomienda por sus malos resultados. Cuando la posición es muy invalidante, la opción más adecuada es la osteotomía desrotadora con fijación percutánea, dejando el antebrazo en una posición más funcional.",
  },
  {
    id: 111,
    block: "ms",
    code: "Etiopatogenia deformidad de Madelung",
    image: null,
    prompt:
      "Niña de 10 años presenta desviación cubital progresiva de ambas muñecas con prominencia de la cabeza cubital y limitación de la extensión dorsal. En la exploración radiológica se objetiva desviación de la epífisis radial distal. ¿Qué estructura anatómica se ha implicado clásicamente en la etiopatogenia de esta entidad?",
    options: [
      "El ligamento de Vickers, banda palmar anómala que fija el semilunar al radio distal",
      "El ligamento colateral cubital del codo",
      "El retináculo extensor de la muñeca",
      "El ligamento escafolunar",
    ],
    correct: 0,
    explanation:
      "Vickers y Nielsen describieron un ligamento palmar anómalo (ligamento de Vickers) que fija el semilunar al radio distal y que se ha implicado en la etiopatogenia de la deformidad de Madelung, contribuyendo a la desviación radial progresiva.",
  },
  {
    id: 112,
    block: "ms",
    code: "Tratamiento quirúrgico Madelung en niña",
    image: null,
    prompt:
      "Niña de 9 años con deformidad de Madelung típica progresiva, con desviación cubital marcada de la muñeca. Se decide tratamiento quirúrgico dada su edad. ¿Cuál es el objetivo principal de la cirugía en este grupo de edad?",
    options: [
      "Acortamiento del cúbito mediante técnica de Darrach como primer gesto quirúrgico",
      "Fusión radiocarpiana precoz para prevenir la progresión",
      "Corregir el crecimiento anómalo de la fisis radial distal, mediante técnicas como la interposición de grasa (Langenskiöld) o la resección del ligamento de Vickers con epifisiodesis temporal",
      "Osteotomía en cuña cerrada del radio como único gesto quirúrgico",
    ],
    correct: 2,
    explanation:
      "En niños menores de 10-12 años, el objetivo quirúrgico es corregir el crecimiento anómalo de la fisis, mediante la técnica de Langenskiöld (interposición de una bola de grasa) o la resección del ligamento de Vickers con epifisiodesis temporal con grapas en la zona no afecta del radio.",
  },
  {
    id: 113,
    block: "ms",
    code: "Anatomía patológica epicondilitis",
    image: null,
    prompt:
      "Paciente de 42 años, trabajador manual, presenta dolor en epicóndilo lateral que aumenta al extender la muñeca contra resistencia con el codo en extensión (signo de Cozen positivo). Si se realizara un estudio histológico del tendón afectado, ¿qué hallazgo sería característico de esta entidad?",
    options: [
      "Infiltrado inflamatorio agudo con predominio de neutrófilos",
      "Depósitos de cristales de pirofosfato cálcico",
      "Granulomas caseificantes con necrosis central",
      "Hiperplasia angiofibroblástica del origen de los tendones extensores de muñeca y dedos",
    ],
    correct: 3,
    explanation:
      "La epicondilitis lateral se caracteriza histológicamente por hiperplasia angiofibroblástica del origen de los tendones extensores (término acuñado por Nirschl), con infiltración de mucopolisacáridos, formación ósea y proliferación vascular, sin un componente inflamatorio agudo clásico.",
  },
  {
    id: 114,
    block: "ms",
    code: "Epicondilitis y PRP",
    image: null,
    prompt:
      "Paciente con epicondilitis lateral de 4 meses de evolución pregunta por la infiltración de plasma rico en plaquetas (PRP) como tratamiento. Según la evidencia disponible, ¿cuál es la respuesta más ajustada?",
    options: [
      "El PRP ha demostrado ser claramente superior a la modificación de actividad en todos los estudios disponibles",
      "Una revisión Cochrane no ha encontrado evidencia de beneficio del PRP frente a otras opciones, existiendo además riesgo de infección y un coste añadido",
      "El PRP es el tratamiento de elección en la fase aguda de la epicondilitis, previo a cualquier otra medida",
      "El PRP sustituye a la cirugía en los casos que no responden a 6-12 meses de tratamiento conservador",
    ],
    correct: 1,
    explanation:
      "Una revisión Cochrane de 2021 no apoya el uso de PRP o sangre autóloga en la epicondilitis, dado que no existe evidencia de beneficio claro, además de suponer un potencial riesgo de infección y un gasto añadido.",
  },
  {
    id: 115,
    block: "ms",
    code: "Epitrocleitis y neuritis cubital",
    image: null,
    prompt:
      "Paciente con epitrocleitis (codo del golfista) y neuritis cubital concomitante no tratada no mejora tras varios meses de tratamiento conservador dirigido de forma aislada a la epitrocleitis. ¿Cuál es la explicación más probable de este fracaso terapéutico?",
    options: [
      "El diagnóstico inicial era incorrecto y debe replantearse una artrosis de codo",
      "La epitrocleitis, a diferencia de la epicondilitis, no responde de forma habitual al tratamiento conservador",
      "Es necesario asociar toxina botulínica de entrada en todo caso de epitrocleitis",
      "La existencia de patología concomitante como la neuritis cubital, si no se trata, empeora el pronóstico del tratamiento de la epitrocleitis",
    ],
    correct: 3,
    explanation:
      "En la epitrocleitis se encuentra patología concomitante hasta en el 84% de los casos (síndrome del túnel carpiano, tendinitis del manguito rotador o neuritis cubital). Se ha comprobado que, si estas patologías asociadas no se tratan, el tratamiento de la epitrocleitis fracasará.",
  },
  {
    id: 116,
    block: "ms",
    code: "Rotura bíceps distal — tratamiento",
    image: null,
    prompt:
      "Varón de 45 años, culturista, sufre dolor agudo y un chasquido audible en la cara anterior del codo tras un levantamiento de peso, con equimosis, tumoración proximal y debilidad marcada a la supinación. El Hook test es positivo. Dado su perfil (paciente joven y activo), ¿cuál es la actitud más adecuada?",
    options: [
      "Tratamiento conservador con inmovilización, dado el buen pronóstico funcional esperado en este perfil de paciente",
      "Reparación quirúrgica precoz, idealmente antes de 7-10 días desde la lesión",
      "Cirugía diferida a las 8 semanas para permitir que ceda la inflamación local",
      "Tenodesis directa al músculo braquial anterior, sin intentar la reinserción anatómica del tendón",
    ],
    correct: 1,
    explanation:
      "En pacientes activos con rotura completa del tendón distal del bíceps, se recomienda la reparación quirúrgica precoz (antes de 7-10 días), reinsertando el tendón de forma anatómica en la tuberosidad bicipital; a mayor demora, mayor tasa de complicaciones y peor resultado funcional.",
  },
  {
    id: 117,
    block: "ms",
    code: "Técnica de doble incisión — complicaciones",
    image: null,
    prompt:
      "Cirujano opta por la técnica clásica de doble incisión (Boyd y Anderson) para la reparación de una rotura del tendón distal del bíceps, en lugar del miniabordaje anterior. ¿Qué complicación es más característica de esta técnica en comparación con el abordaje anterior único?",
    options: [
      "Lesión del nervio cutáneo lateral del antebrazo",
      "Mayor pérdida de fuerza en supinación por reparación no anatómica",
      "Lesión del nervio mediano",
      "Sinostosis radiocubital y osificación heterotópica",
    ],
    correct: 3,
    explanation:
      "La técnica de doble incisión (Boyd y Anderson) presenta menos riesgo de lesión del nervio cutáneo lateral del antebrazo que el miniabordaje anterior, pero conlleva mayor riesgo de sinostosis radiocubital y osificación heterotópica, por lo que se recomienda profilaxis con indometacina.",
  },
  {
    id: 118,
    block: "ms",
    code: "OCD capitellum vs enfermedad de Panner",
    image: null,
    prompt:
      "Gimnasta de 13 años con esqueleto inmaduro presenta dolor de codo de repetición en actividades de carga en valgo, con tumefacción, crepitación y bloqueos articulares ocasionales. ¿Cuál es el diagnóstico más probable y con qué entidad debe diferenciarse en niños de menor edad?",
    options: [
      "Enfermedad de Panner, que a diferencia de este caso es típica de niños mayores de 10 años",
      "Osteocondritis disecante del capitellum humeral, que debe diferenciarse de la enfermedad de Panner (osteocondrosis del capitellum típica en niños menores de 10 años)",
      "Epicondilitis lateral típica del adulto deportista",
      "Artrosis primaria de codo de inicio precoz",
    ],
    correct: 1,
    explanation:
      "La osteocondritis disecante del capitellum es más frecuente en deportistas con esqueleto inmaduro que realizan actividades de repetición en valgo (gimnastas, lanzadores). Debe diferenciarse de la enfermedad de Panner, una osteocondrosis del capitellum propia de niños menores de 10 años.",
  },
  {
    id: 119,
    block: "ms",
    code: "OCD capitellum — tratamiento por grado",
    image: null,
    prompt:
      "Adolescente con osteocondritis disecante del capitellum humeral es intervenido mediante artroscopia, objetivándose un fragmento osteocondral suelto pero no desplazado (grado IV). ¿Cuál es el tratamiento más adecuado según la clasificación artroscópica de esta entidad?",
    options: [
      "Tratamiento conservador con modificación de la actividad deportiva, dado que se trata de una lesión estable",
      "Retirada del fragmento con perforaciones, valorando mosaicoplastia si el defecto es amplio",
      "Artrodesis del codo como tratamiento definitivo",
      "Prótesis radiocapitelar de entrada, sin intento de preservación articular",
    ],
    correct: 1,
    explanation:
      "El tratamiento conservador se reserva para las lesiones estables (grados I-II, cartílago blando o fisurado). Las lesiones inestables (grados III-V, incluido el fragmento suelto no desplazado grado IV) se tratan retirando el fragmento y realizando perforaciones, valorando mosaicoplastia si el defecto es grande.",
  },
  {
    id: 120,
    block: "ms",
    code: "Artrosis de codo vs artritis reumatoide",
    image: null,
    prompt:
      "Varón de 52 años, trabajador manual, presenta dolor mecánico de codo en los últimos grados de flexoextensión, con chasquidos y bloqueos ocasionales. La radiografía muestra osteofitos en coronoides, cabeza radial y olécranon, con preservación relativa del espacio articular cubitohumeral. ¿Qué diagnóstico es más probable y qué hallazgo ayuda a diferenciarlo de una artropatía inflamatoria?",
    options: [
      "Artritis reumatoide; en ella se afecta de forma precoz sobre todo la articulación radiocapitelar",
      "Sinovitis vellonodular pigmentada; cursa característicamente con un derrame articular masivo desde el inicio",
      "Artrosis primaria de codo; a diferencia de la artritis reumatoide, en fases iniciales predomina la afectación radiocapitelar con relativa preservación de la cubitohumeral",
      "Osteocondromatosis sinovial; se caracteriza por múltiples cuerpos libres cartilaginosos de tamaño similar entre sí",
    ],
    correct: 2,
    explanation:
      "En la artrosis de codo, la articulación radiocapitelar es la que preferentemente se afecta, con relativa preservación de la cubitohumeral, especialmente al inicio de la enfermedad. Esto contrasta con la artritis reumatoide, en la que se ve afectada precozmente la articulación cubitohumeral propiamente dicha.",
  },
  {
    id: 121,
    block: "ms",
    code: "Artritis reumatoide de codo — Larsen 4",
    image: null,
    prompt:
      "Paciente con artritis reumatoide de larga evolución presenta dolor de codo refractario al tratamiento médico. La radiografía muestra erosiones progresivas que penetran en la zona subcondral, compatible con un estadio 4 de la clasificación de Larsen. ¿Cuál es la opción quirúrgica más adecuada en este estadio?",
    options: [
      "Sinovectomía aislada con resección de la cabeza radial",
      "Desbridamiento artroscópico simple sin ningún otro gesto añadido",
      "Artrodesis de codo como primera opción quirúrgica",
      "Artroplastia total de codo",
    ],
    correct: 3,
    explanation:
      "En pacientes con artritis reumatoide en estadios de Larsen 1-2, en los que no se controla el dolor con tratamiento médico, se recomienda la sinovectomía (± resección de cabeza radial). En estadios de Larsen 3 a 5, como el descrito, debe considerarse la artroplastia total de codo.",
  },
  {
    id: 122,
    block: "ms",
    code: "Rigidez de codo — pérdida de movilidad activa",
    image: null,
    prompt:
      "Paciente presenta pérdida de la extensión activa del codo, con la extensión pasiva conservada en la exploración. ¿Qué proceso debe sospecharse preferentemente ante este patrón?",
    options: [
      "Un proceso degenerativo intraarticular, como la artrosis",
      "Una lesión neurológica o tendinosa",
      "Una anquilosis ósea intraarticular franca",
      "Una osificación heterotópica ya madura",
    ],
    correct: 1,
    explanation:
      "Cuando se produce una pérdida de movilidad activa con conservación de la movilidad pasiva, debe sospecharse una lesión neurológica o tendinosa. Si, por el contrario, se pierde también la movilidad pasiva, debe sospecharse una lesión traumática o un proceso degenerativo intraarticular como la artrosis.",
  },
  {
    id: 123,
    block: "ms",
    code: "Rotura del tríceps — fleck sign",
    image: null,
    prompt:
      "Culturista con antecedente de uso de anabolizantes sufre una caída con la mano en extensión. Presenta dolor, tumefacción y una palpación en 'hachazo' en la zona posterior del codo, con debilidad parcial para la extensión activa contra resistencia. En la radiografía lateral se observa una pequeña cascarilla ósea separada de la punta del olécranon. ¿Qué significado tiene este hallazgo radiográfico?",
    options: [
      "Es un hallazgo casual sin relevancia clínica en este contexto",
      "Sugiere una fractura de estrés crónica del olécranon no relacionada con el episodio agudo",
      "El 'fleck sign' es patognomónico de una avulsión del tendón del tríceps",
      "Corresponde a un osteofito degenerativo típico de la artrosis de codo",
    ],
    correct: 2,
    explanation:
      "El 'fleck sign' (cascarilla ósea separada de la punta del olécranon en la radiografía lateral) es patognomónico de una avulsión del tendón del tríceps. La rotura del tríceps es poco frecuente y se asocia a culturismo, uso de anabolizantes, infiltraciones previas de corticoides y determinadas enfermedades óseas metabólicas.",
  },
  {
    id: 124,
    block: "ms",
    code: "Elección de implante en ATC",
    image: null,
    prompt:
      "Paciente anciana con artrosis postraumática de codo, mal stock óseo y ligamentos colaterales insuficientes, va a ser intervenida mediante artroplastia total de codo. ¿Qué tipo de implante resulta más adecuado dado este perfil de inestabilidad y déficit óseo?",
    options: [
      "Implante no abisagrado (unlinked), dado que ofrece mejores resultados en codos inestables",
      "Implante abisagrado (linked/constreñido), que permite cierta laxitud en varo-valgo y no depende tanto de la integridad de los tejidos blandos",
      "Prótesis radiocapitelar aislada, preservando la articulación cubitohumeral nativa",
      "Hemiartroplastia de codo, como alternativa de primera línea en este contexto",
    ],
    correct: 1,
    explanation:
      "Los implantes no abisagrados dependen de la integridad de los tejidos blandos y del buen stock óseo, por lo que solo deberían usarse en codos estables. En pacientes con mal stock óseo o insuficiencia ligamentosa, el implante abisagrado (constreñido, tipo 'loose/sloppy hinge') es la opción más adecuada, siendo además el más utilizado actualmente.",
  },
];

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function OposicotTest() {
  const [stage, setStage] = useState("setup"); // setup | quiz | summary
  const [selectedBlocks, setSelectedBlocks] = useState(
    BLOCKS.map((b) => b.id)
  );
  const [pool, setPool] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]); // {q, chosen, correct}

  const toggleBlock = (id) => {
    setSelectedBlocks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const startQuiz = () => {
    const filtered = QUESTIONS.filter((q) => selectedBlocks.includes(q.block));
    setPool(shuffle(filtered));
    setIdx(0);
    setSelected(null);
    setAnswers([]);
    setStage("quiz");
  };

  const currentQ = pool[idx];

  const choose = (optionIdx) => {
    if (selected !== null) return;
    setSelected(optionIdx);
    setAnswers((prev) => [
      ...prev,
      {
        q: currentQ,
        chosen: optionIdx,
        correct: optionIdx === currentQ.correct,
      },
    ]);
  };

  const next = () => {
    if (idx + 1 >= pool.length) {
      setStage("summary");
    } else {
      setIdx(idx + 1);
      setSelected(null);
    }
  };

  const stats = useMemo(() => {
    const byBlock = {};
    BLOCKS.forEach((b) => (byBlock[b.id] = { total: 0, correct: 0 }));
    answers.forEach((a) => {
      byBlock[a.q.block].total += 1;
      if (a.correct) byBlock[a.q.block].correct += 1;
    });
    const totalCorrect = answers.filter((a) => a.correct).length;
    return { byBlock, totalCorrect, total: answers.length };
  }, [answers]);

  return (
    <div
      style={{
        minHeight: "600px",
        background: "#0F1417",
        color: "#E7EDEF",
        fontFamily: "'Inter', sans-serif",
        padding: "0",
      }}
    >
      <style>{`
        ${FONT_IMPORT}
        .osc-mono { font-family: 'IBM Plex Mono', monospace; }
        .osc-display { font-family: 'Inter', sans-serif; }
        .osc-option {
          transition: border-color 0.15s ease, background 0.15s ease, transform 0.1s ease;
        }
        .osc-option:hover:not(.locked) {
          border-color: #A9CBDA !important;
          background: #1D262C !important;
        }
        .osc-block-chip {
          transition: all 0.15s ease;
        }
        .osc-btn {
          transition: opacity 0.15s ease, transform 0.1s ease;
        }
        .osc-btn:hover {
          opacity: 0.88;
        }
        .osc-btn:active {
          transform: scale(0.98);
        }
        @media (prefers-reduced-motion: reduce) {
          .osc-option, .osc-btn, .osc-block-chip { transition: none !important; }
        }
      `}</style>

      {/* Report-style header */}
      <div
        style={{
          borderBottom: "1px solid #2A343B",
          padding: "18px 28px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div />
        <div style={{ textAlign: "center" }}>
          <div
            className="osc-display"
            style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "0.01em" }}
          >
            OposiCOT
          </div>
          <div
            className="osc-mono"
            style={{ fontSize: "10.5px", letterSpacing: "0.08em", color: "#5C7A88", marginTop: "3px" }}
          >
            BANCO DE PREGUNTAS · CIRUGÍA ORTOPÉDICA Y TRAUMATOLOGÍA
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "14px", flexWrap: "wrap" }}>
          {stage === "quiz" && (
            <div className="osc-mono" style={{ fontSize: "13px", color: "#8FA0A8", textAlign: "right" }}>
              PREGUNTA {String(idx + 1).padStart(2, "0")} / {String(pool.length).padStart(2, "0")}
              <br />
              <span style={{ color: "#A9CBDA" }}>
                ACIERTOS {stats.totalCorrect}/{stats.total}
              </span>
            </div>
          )}
          <a
            href="https://ko-fi.com/med2792"
            target="_blank"
            rel="noopener noreferrer"
            className="osc-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "6px",
              border: "1px solid #5C7A88",
              color: "#A9CBDA",
              fontSize: "13px",
              fontWeight: 500,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            ☕ Invítame a un café
          </a>
        </div>
      </div>

      <div style={{ padding: "28px", maxWidth: "720px", margin: "0 auto" }}>
        {stage === "setup" && (
              <div>
                <p
              className="osc-display"
              style={{ fontSize: "16px", fontWeight: 600, lineHeight: 1.5, marginBottom: "10px", textAlign: "justify" }}
            >
              Prepárate para el examen como un profesional, con preguntas de
              los distintos exámenes de oposición de España
            </p>
            <p style={{ color: "#8FA0A8", fontSize: "14px", lineHeight: 1.6, marginBottom: "22px", textAlign: "justify" }}>
              Selecciona los bloques del temario que quieres incluir en esta
              sesión de test
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "26px" }}>
              {BLOCKS.map((b) => {
                const active = selectedBlocks.includes(b.id);
                const count = QUESTIONS.filter((q) => q.block === b.id).length;
                return (
                  <button
                    key={b.id}
                    className="osc-btn"
                    onClick={() => toggleBlock(b.id)}
                    style={{
                      textAlign: "left",
                      padding: "14px 16px",
                      borderRadius: "6px",
                      border: `1px solid ${active ? "#A9CBDA" : "#2A343B"}`,
                      background: active ? "#1D262C" : "#171E23",
                      color: "#E7EDEF",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "15px", fontWeight: 500 }}>{b.label}</span>
                    <span className="osc-mono" style={{ fontSize: "12px", color: "#5C7A88" }}>
                      {count} preguntas
                    </span>
                  </button>
                );
              })}
            </div>
            <button
              className="osc-btn"
              disabled={selectedBlocks.length === 0}
              onClick={startQuiz}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "6px",
                border: "none",
                background: selectedBlocks.length === 0 ? "#2A343B" : "#A9CBDA",
                color: selectedBlocks.length === 0 ? "#5C7A88" : "#0F1417",
                fontWeight: 600,
                fontSize: "15px",
                cursor: selectedBlocks.length === 0 ? "not-allowed" : "pointer",
              }}
            >
              Comenzar test ({QUESTIONS.filter((q) => selectedBlocks.includes(q.block)).length} preguntas)
            </button>
          </div>
        )}

        {stage === "quiz" && currentQ && (
          <div>
            <div
              style={{
                width: "100%",
                height: "3px",
                background: "#2A343B",
                borderRadius: "2px",
                marginBottom: "22px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${((idx + (selected !== null ? 1 : 0)) / pool.length) * 100}%`,
                  height: "100%",
                  background: "#A9CBDA",
                  transition: "width 0.25s ease",
                }}
              />
            </div>

            <div
              className="osc-block-chip osc-mono"
              style={{
                display: "inline-block",
                fontSize: "12px",
                padding: "4px 10px",
                borderRadius: "4px",
                border: "1px solid #5C7A88",
                color: "#A9CBDA",
                marginBottom: "14px",
              }}
            >
              {currentQ.code}
            </div>

            <div
              className="osc-display"
              style={{ fontSize: "18px", fontWeight: 600, lineHeight: 1.5, marginBottom: "20px" }}
            >
              {currentQ.prompt}
            </div>

            {currentQ.image && (
              <div
                style={{
                  marginBottom: "20px",
                  borderRadius: "6px",
                  overflow: "hidden",
                  border: "1px solid #2A343B",
                  background: "#000",
                }}
              >
                <img
                  src={currentQ.image}
                  alt={`Imagen clínica — ${currentQ.code}`}
                  style={{ width: "100%", display: "block" }}
                />
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {currentQ.options.map((opt, i) => {
                const isChosen = selected === i;
                const isCorrect = i === currentQ.correct;
                let borderColor = "#2A343B";
                let bg = "#171E23";
                if (selected !== null) {
                  if (isCorrect) {
                    borderColor = "#7FA88F";
                    bg = "#17201C";
                  } else if (isChosen && !isCorrect) {
                    borderColor = "#B56B5C";
                    bg = "#221A19";
                  }
                }
                return (
                  <button
                    key={i}
                    className={`osc-option ${selected !== null ? "locked" : ""}`}
                    onClick={() => choose(i)}
                    style={{
                      textAlign: "left",
                      padding: "13px 15px",
                      borderRadius: "6px",
                      border: `1px solid ${borderColor}`,
                      background: bg,
                      color: "#E7EDEF",
                      cursor: selected !== null ? "default" : "pointer",
                      fontSize: "14.5px",
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div
                style={{
                  marginTop: "18px",
                  padding: "14px 16px",
                  borderRadius: "6px",
                  background: "#171E23",
                  border: "1px solid #2A343B",
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: "#8FA0A8",
                }}
              >
                <span
                  style={{
                    color: currentQ.options[selected] === currentQ.options[currentQ.correct] ? "#7FA88F" : "#B56B5C",
                    fontWeight: 600,
                  }}
                >
                  {currentQ.options[selected] === currentQ.options[currentQ.correct] ? "Correcto. " : "Incorrecto. "}
                </span>
                {currentQ.explanation}
              </div>
            )}

            {selected !== null && (
              <button
                className="osc-btn"
                onClick={next}
                style={{
                  marginTop: "18px",
                  width: "100%",
                  padding: "13px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#A9CBDA",
                  color: "#0F1417",
                  fontWeight: 600,
                  fontSize: "14.5px",
                  cursor: "pointer",
                }}
              >
                {idx + 1 >= pool.length ? "Ver resultados" : "Siguiente pregunta →"}
              </button>
            )}
          </div>
        )}

        {stage === "summary" && (
          <div>
            <div className="osc-display" style={{ fontSize: "40px", fontWeight: 700, marginBottom: "4px" }}>
              {stats.totalCorrect}/{stats.total}
            </div>
            <div style={{ color: "#8FA0A8", marginBottom: "26px" }}>
              {Math.round((stats.totalCorrect / stats.total) * 100)}% de aciertos en esta sesión
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "26px" }}>
              {BLOCKS.filter((b) => stats.byBlock[b.id].total > 0).map((b) => {
                const s = stats.byBlock[b.id
];
                const pct = Math.round((s.correct / s.total) * 100);
                return (
                  <div
                    key={b.id}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "6px",
                      border: "1px solid #2A343B",
                      background: "#171E23",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "14px" }}>{b.label}</span>
                      <span className="osc-mono" style={{ fontSize: "13px", color: "#A9CBDA" }}>
                        {s.correct}/{s.total}
                      </span>
                    </div>
                    <div style={{ height: "4px", background: "#2A343B", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: "#A9CBDA" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className="osc-btn"
              onClick={() => setStage("setup")}
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: "6px",
                border: "1px solid #A9CBDA",
                background: "transparent",
                color: "#A9CBDA",
                fontWeight: 600,
                fontSize: "14.5px",
                cursor: "pointer",
              }}
            >
              Nueva sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
