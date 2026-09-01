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
  {
    id: 125,
    block: "ms",
    code: "Codo - Estabilidad tras resección de cabeza radial",
    image: null,
    prompt:
      "Un paciente presenta una fractura conminuta e irreconstruible de la cabeza del radio, sin lesión asociada del ligamento colateral medial. Respecto a la resección de la cabeza radial en este contexto, ¿qué es correcto afirmar?",
    options: [
      "Puede realizarse sin alterar de forma relevante la estabilidad del codo, porque el ligamento colateral medial está intacto",
      "Está contraindicada de forma sistemática por el riesgo de inestabilidad en valgo",
      "Obliga a colocar una ortesis articulada durante al menos 6 meses",
      "Debe acompañarse de sustitución protésica inmediata en el mismo acto quirúrgico",
    ],
    correct: 0,
    explanation:
      "La resección de la cabeza radial puede realizarse sin alterar la estabilidad normal del codo si el ligamento colateral medial está intacto, ya que este ligamento es el principal estabilizador frente al valgo.",
  },
  {
    id: 126,
    block: "ms",
    code: "Codo - Mecanismo de luxación posterior",
    image: null,
    prompt:
      "Un joven de 22 años sufre una caída sobre la mano con el codo en valgo, el antebrazo en supinación y rotación externa del cúbito, con carga axial. En urgencias se objetiva una luxación posterior de codo sin fracturas asociadas. ¿Qué mecanismo corresponde a este patrón?",
    options: [
      "El mecanismo por pronación, que suele asociar fracturas de coronoides y cabeza radial",
      "El mecanismo por supinación, descrito clásicamente y el más frecuente",
      "Un tercer mecanismo en varo, propio de las caídas hacia atrás",
      "Una luxación divergente por pronación forzada del antebrazo",
    ],
    correct: 1,
    explanation:
      "La supinación del antebrazo con rotación externa del cúbito y carga axial provoca primero una lesión del ligamento lateral con luxación posterior, habitualmente sin fracturas asociadas; es el mecanismo clásico y el más frecuente.",
  },
  {
    id: 127,
    block: "ms",
    code: "Codo - Algoritmo de la tríada terrible",
    image: null,
    prompt:
      "En el manejo quirúrgico de una tríada terrible de codo con fractura de cabeza radial reparable y fractura de coronoides fijable por vía lateral, tras reparar la cabeza radial, la coronoides y el ligamento colateral lateral, se comprueba que el codo sigue siendo inestable. ¿Cuál es el siguiente paso del algoritmo?",
    options: [
      "Colocar directamente un fijador externo articulado",
      "Reparar el ligamento colateral medial",
      "Realizar una osteotomía de la cabeza radial",
      "Sustituir la coronoides por un injerto óseo estructural",
    ],
    correct: 1,
    explanation:
      "Según el algoritmo de manejo de la tríada terrible, si tras fijar la coronoides, la cabeza radial y reparar el ligamento colateral lateral el codo continúa inestable, el siguiente paso es reparar el ligamento colateral medial.",
  },
  {
    id: 128,
    block: "ms",
    code: "Codo - Inestabilidad posterolateral rotatoria",
    image: null,
    prompt:
      "Una mujer de 45 años, intervenida hace un año mediante abordaje de Kocher para una epicondilitis, refiere desde entonces chasquidos y sensación de fallo del codo al incorporarse de una silla, con dolor en el lado radial al extender el codo con el antebrazo en supinación. ¿Qué maniobra exploratoria es más útil para confirmar la sospecha diagnóstica?",
    options: [
      "La maniobra de ordeñamiento",
      "La maniobra de pivot-shift del codo",
      "La prueba de aprensión con el codo en flexión máxima",
      "La compresión axial con el antebrazo en pronación",
    ],
    correct: 1,
    explanation:
      "El cuadro sugiere una inestabilidad posterolateral rotatoria, probablemente iatrogénica tras el abordaje de Kocher. La maniobra de pivot-shift, aplicando supinación y valgo mientras se extiende el codo, es la exploración característica de este patrón.",
  },
  {
    id: 129,
    block: "ms",
    code: "Codo - Inestabilidad medial del lanzador",
    image: null,
    prompt:
      "Un lanzador de balonmano de 28 años presenta dolor medial de codo en la fase de aceleración del lanzamiento, con parestesias cubitales intermitentes. Tras 4 meses de reposo, fisioterapia y programa de rehabilitación del lanzamiento sin mejoría, ¿cuál es la opción terapéutica más adecuada?",
    options: [
      "Prolongar el tratamiento conservador otros 6 meses antes de valorar cirugía",
      "Reconstrucción del ligamento colateral medial con injerto tendinoso del palmar menor",
      "Reparación aislada del ligamento colateral cubital lateral",
      "Neurólisis simple del nervio cubital sin actuar sobre el ligamento",
    ],
    correct: 1,
    explanation:
      "El tratamiento quirúrgico está indicado cuando persiste una inestabilidad medial sintomática tras 3 a 6 meses de tratamiento conservador. La técnica más aceptada es la descrita por Jobe, con injerto tendinoso del palmar menor.",
  },
  {
    id: 130,
    block: "ms",
    code: "Codo - Inestabilidad posteromedial rotatoria",
    image: null,
    prompt:
      "Un paciente sufre una caída hacia atrás apoyando la mano por detrás del cuerpo, con el codo en varo. Se objetiva una fractura de la faceta anteromedial de la coronoides que afecta a más del 50% de la misma, junto con lesión del complejo ligamentoso lateral. ¿A qué patrón corresponde este cuadro?",
    options: [
      "Inestabilidad posterolateral rotatoria",
      "Inestabilidad medial por sobrecarga en valgo",
      "Inestabilidad posteromedial rotatoria",
      "Fractura-luxación transolecraniana tipo Monteggia",
    ],
    correct: 2,
    explanation:
      "La inestabilidad posteromedial rotatoria es secundaria a una luxación del codo en varo con lesión del ligamento colateral lateral y de la apófisis coronoides, sobre todo cuando afecta a más del 50% de esta, y suele producirse tras una caída hacia atrás con la mano por detrás del cuerpo.",
  },
  {
    id: 131,
    block: "ms",
    code: "Codo - Luxación pediátrica y fractura asociada",
    image: null,
    prompt:
      "Un niño de 11 años sufre una luxación posterior de codo tras una caída con el brazo en abducción y extensión forzadas. ¿Cuál es la fractura asociada más frecuente en este contexto?",
    options: [
      "Olécranon",
      "Epitróclea",
      "Apófisis coronoides",
      "Cabeza del radio",
    ],
    correct: 1,
    explanation:
      "En niños, las luxaciones de codo se asocian generalmente a fracturas, siendo la de epitróclea la más frecuente, seguida de la cabeza del radio, la apófisis coronoides y el olécranon.",
  },
  {
    id: 132,
    block: "ms",
    code: "Codo - Pronación dolorosa recidivante",
    image: null,
    prompt:
      "Una niña de 3 años acude a urgencias tras un tirón brusco del brazo, con el codo en extensión y pronación. Descartada la fractura, se intenta la maniobra de hiperpronación sin éxito en un primer intento. ¿Cuál es la actitud más adecuada en este momento?",
    options: [
      "Indicar reducción abierta de forma inmediata",
      "Solicitar una resonancia magnética antes de continuar",
      "Colocar una férula en flexión y algo de supinación, esperar y repetir la maniobra si persisten los síntomas",
      "Descartar definitivamente el diagnóstico de pronación dolorosa",
    ],
    correct: 2,
    explanation:
      "Si la sintomatología no desaparece tras el primer intento de reducción, se puede colocar una férula en flexión y algo de supinación y esperar un par de días; con esto habitualmente se reduce sola o baja la inflamación y se puede repetir la maniobra con éxito.",
  },
  {
    id: 133,
    block: "ms",
    code: "Codo - Fractura de olécranon Mayo tipo 2",
    image: null,
    prompt:
      "Un paciente de 55 años presenta una fractura de olécranon desplazada más de 3 mm, con articulación estable y sin extensión activa del codo. Según la clasificación de Mayo, este patrón corresponde a un tipo 2. ¿Cuál es su tratamiento habitual?",
    options: [
      "Inmovilización con cabestrillo y movilización progresiva",
      "Reducción abierta y osteosíntesis con agujas y cerclaje, o placa y tornillos",
      "Escisión sistemática del fragmento proximal con avance del tríceps",
      "Fijador externo articulado de entrada",
    ],
    correct: 1,
    explanation:
      "Las fracturas tipo 2 de Mayo (desplazadas, articulación estable, sin extensión activa) se tratan con reducción abierta y osteosíntesis, con agujas y cerclaje o con placa y tornillos según las características de la fractura.",
  },
  {
    id: 134,
    block: "ms",
    code: "Codo - Fractura de coronoides de O'Driscoll",
    image: null,
    prompt:
      "Tras una caída en varo con carga axial y lesión del ligamento colateral lateral, se objetiva una fractura de la apófisis coronoides que afecta al borde anteromedial, con trazo de fractura convexo. ¿Cómo denomina la clasificación de O'Driscoll a este patrón?",
    options: [
      "Fractura transversa",
      "Fractura de la faceta anteromedial",
      "Fractura basilar transolecraniana",
      "Fractura de la punta de la coronoides tipo I de Regan y Morrey",
    ],
    correct: 1,
    explanation:
      "La clasificación de O'Driscoll reconoce las fracturas de la faceta anteromedial, causadas por una fuerza posteromedial rotatoria en varo, con un trazo de fractura característicamente convexo.",
  },
  {
    id: 135,
    block: "ms",
    code: "Codo - Lesión de Essex-Lopresti",
    image: null,
    prompt:
      "Un paciente sufre una fractura de la cabeza del radio tras una caída, y además refiere dolor en la muñeca del mismo lado, con inestabilidad de la articulación radiocubital distal en la exploración. Ante la sospecha de una lesión de Essex-Lopresti, ¿cuál es el aspecto más importante del tratamiento de la cabeza radial?",
    options: [
      "Resecarla si existe conminución, para facilitar la rehabilitación",
      "Preservarla mediante osteosíntesis o prótesis, evitando su resección",
      "Tratarla de forma conservadora con cabestrillo, independientemente del desplazamiento",
      "Diferir cualquier actuación sobre la cabeza radial hasta resolver la muñeca",
    ],
    correct: 1,
    explanation:
      "En la lesión de Essex-Lopresti (fractura de cabeza radial con rotura de la membrana interósea y luxación radiocubital distal) es fundamental preservar la cabeza radial mediante osteosíntesis, o prótesis si no es sintetizable, para evitar la migración proximal del radio.",
  },
  {
    id: 136,
    block: "ms",
    code: "Codo - Fractura de cuello radial infantil (Judet)",
    image: null,
    prompt:
      "Un niño de 9 años presenta una fractura del cuello radial con traslocación del 70% de la diáfisis radial y angulación de 45º. Según la clasificación de Judet, este patrón corresponde a un tipo III. ¿Cuál es el manejo inicial más adecuado?",
    options: [
      "Tratamiento conservador con inmovilización según tolerancia al dolor",
      "Reducción cerrada, valorando técnicas percutáneas si la pronosupinación queda limitada",
      "Reducción abierta con fijación con agujas de entrada",
      "Prótesis de cabeza radial",
    ],
    correct: 1,
    explanation:
      "Las fracturas tipo III de Judet (traslocación 50-100%, angulación 30-60º) se tratan inicialmente con reducción cerrada; si esta fracasa o la pronosupinación queda por debajo de 60º tras la reducción, se recurre a técnicas percutáneas.",
  },
  {
    id: 137,
    block: "ms",
    code: "Codo - Clasificación de Hotchkiss",
    image: null,
    prompt:
      "Un paciente de 30 años presenta una fractura de cabeza radial con desplazamiento de 4 mm. En la exploración bajo anestesia articular se objetiva bloqueo mecánico a la pronosupinación, sin gran conminución del fragmento. Según la clasificación de Hotchkiss, ¿cuál es el manejo más adecuado?",
    options: [
      "Movilización precoz sin inmovilización, por tratarse de un tipo I",
      "Controles radiológicos semanales sin cirugía",
      "Reducción abierta y osteosíntesis",
      "Resección de la cabeza radial sin valorar prótesis",
    ],
    correct: 2,
    explanation:
      "En la clasificación de Hotchkiss, las fracturas tipo II con bloqueo mecánico o inestabilidad asociada, sin gran conminución, se tratan en pacientes jóvenes mediante reducción abierta y osteosíntesis.",
  },
  {
    id: 138,
    block: "ms",
    code: "Codo - Factores de riesgo de osificación heterotópica",
    image: null,
    prompt:
      "Un paciente politraumatizado con fractura-luxación compleja de codo y traumatismo torácico asociado presenta, tres meses después de la cirugía, una pérdida progresiva de movilidad en flexoextensión. Dados sus factores de riesgo, ¿qué complicación hay que sospechar en primer lugar?",
    options: [
      "Osteonecrosis de la cabeza radial",
      "Osificación heterotópica",
      "Pseudoartrosis de coronoides",
      "Lesión tardía del nervio interóseo posterior",
    ],
    correct: 1,
    explanation:
      "La osificación heterotópica es más frecuente en casos de fracturas-luxaciones complejas, politraumatismo con trauma torácico asociado y demora quirúrgica, y se manifiesta como pérdida progresiva de la movilidad tras la cirugía.",
  },
  {
    id: 139,
    block: "ms",
    code: "Codo - Protección del LCL en el abordaje de Kocher",
    image: null,
    prompt:
      "Durante un abordaje de Kocher para el tratamiento de una fractura de cabeza radial, ¿qué estructura hay que proteger de forma prioritaria para evitar generar una inestabilidad iatrogénica?",
    options: [
      "El ligamento colateral medial",
      "El nervio interóseo posterior",
      "El ligamento colateral lateral",
      "El nervio cubital",
    ],
    correct: 2,
    explanation:
      "El intervalo de Kocher discurre entre el ancóneo y el extensor cubital del carpo; hay que proteger el ligamento colateral lateral, evitando despegar el ancóneo, para no generar una inestabilidad iatrogénica.",
  },
  {
    id: 140,
    block: "ms",
    code: "Codo - Prótesis de cabeza radial, aspecto técnico",
    image: null,
    prompt:
      "En un paciente joven con fractura conminuta de cabeza radial en más de 3 fragmentos, asociada a lesiones ligamentosas, se decide colocar una prótesis de cabeza radial. ¿Qué aspecto técnico es importante para evitar complicaciones?",
    options: [
      "Sobredimensionar ligeramente el implante para aumentar la estabilidad en valgo",
      "Dejar el implante 1-2 mm distal a la punta de la apófisis coronoides, evitando un tamaño excesivo",
      "Colocar el implante sin comprobar el rango de pronosupinación",
      "Evitar cualquier reparación ligamentosa asociada para no interferir con la prótesis",
    ],
    correct: 1,
    explanation:
      "Al colocar una prótesis de cabeza radial hay que evitar sobredimensionar el implante; debe quedar aproximadamente 1-2 mm distal a la punta de la apófisis coronoides para no generar sobrepresión articular.",
  },
  {
    id: 141,
    block: "ms",
    code: "Codo - Fractura-luxación transolecraniana",
    image: null,
    prompt:
      "En una fractura-luxación de codo se comprueba que la articulación radiocubital proximal no está afectada, con los ligamentos colaterales anclados al fragmento distal del cúbito. Esta lesión, a menudo confundida con una fractura-luxación de Monteggia, ¿a qué corresponde?",
    options: [
      "Una tríada terrible de codo",
      "Una fractura-luxación transolecraniana",
      "Una luxación divergente anteroposterior",
      "Una inestabilidad posterolateral rotatoria crónica",
    ],
    correct: 1,
    explanation:
      "La fractura-luxación transolecraniana se confunde a menudo con una Monteggia Bado I, pero en realidad no afecta a la articulación radiocubital proximal; tiene mayor componente óseo que ligamentoso y requiere lograr una adecuada estabilidad ósea del olécranon.",
  },
  {
    id: 142,
    block: "ms",
    code: "Codo - Cerclaje vs placa preconformada en olécranon",
    image: null,
    prompt:
      "Comparando el cerclaje con agujas y alambre frente a la placa preconformada en el tratamiento de fracturas transversas de olécranon, ¿qué indica la evidencia disponible?",
    options: [
      "El cerclaje presenta menos complicaciones que la placa en la mayoría de las series",
      "La placa presenta una tasa de infección claramente inferior al cerclaje",
      "El cerclaje presenta más complicaciones, como migración de agujas, aunque la tasa de infección es algo mayor con placas",
      "Ambas técnicas son equivalentes en todos los aspectos, incluida la necesidad de retirada de material",
    ],
    correct: 2,
    explanation:
      "Las complicaciones son mayores con el cerclaje en la mayoría de las series (migración de agujas, pérdida de reducción), aunque la tasa de infección es algo mayor con placas; el coste-eficiencia favorece al cerclaje pese a la mayor tasa de retirada de material.",
  },
  {
    id: 143,
    block: "ms",
    code: "Codo - Fractura de olécranon en el anciano",
    image: null,
    prompt:
      "Una paciente de 78 años, con buen estado funcional previo, presenta una fractura de olécranon tipo 2B de Mayo (desplazada, conminuta). Según la evidencia reciente, ¿qué opción suele dar mejores resultados funcionales en este grupo de edad?",
    options: [
      "Reducción abierta y osteosíntesis con placa y tornillos de entrada",
      "Tratamiento conservador con cabestrillo 1-2 semanas y movilización precoz",
      "Escisión del fragmento proximal con avance del tríceps de entrada",
      "Fijador externo articulado",
    ],
    correct: 1,
    explanation:
      "En pacientes mayores de 70 años, varios estudios recientes describen mejores resultados funcionales con tratamiento conservador (cabestrillo 1-2 semanas y movilización precoz) que con cirugía, incluso en fracturas desplazadas.",
  },
  {
    id: 144,
    block: "ms",
    code: "Codo - Causa principal de fracaso en coronoides",
    image: null,
    prompt:
      "Tras la fijación quirúrgica de una fractura de apófisis coronoides asociada a luxación de codo, un paciente evoluciona con inestabilidad crónica y rigidez. ¿Cuál es la causa más importante de fracaso en el tratamiento de estas fracturas?",
    options: [
      "Utilizar tornillos canulados en lugar de sutura transósea",
      "No identificar ni reparar las lesiones ligamentosas asociadas y la inestabilidad subyacente del codo",
      "Iniciar la movilización antes de las 3 semanas de la cirugía",
      "Emplear un abordaje medial en lugar de posterior",
    ],
    correct: 1,
    explanation:
      "La causa más importante de fracaso en el tratamiento de las fracturas de coronoides es no identificar ni reparar las lesiones asociadas y la inestabilidad subyacente del codo, ya que los ligamentos colaterales tienen un papel clave en la estabilidad.",
  },
  {
    id: 145,
    block: "ms",
    code: "Antebrazo - Ángulo PUDA",
    image: null,
    prompt:
      "Al planificar la reducción de una fractura diafisaria de cúbito, se hace referencia al ángulo PUDA. ¿Qué representa este ángulo?",
    options: [
      "La angulación dorsal de la zona proximal del cúbito, de unos 5º de media",
      "La curva pronadora del radio a nivel de la inserción del pronador redondo",
      "El ángulo de torsión del radio respecto al eje humeral",
      "La angulación palmar del tercio distal del cúbito",
    ],
    correct: 0,
    explanation:
      "El cúbito es prácticamente recto, salvo por una cierta angulación dorsal en su zona proximal conocida como ángulo PUDA (proximal ulnar dorsal angulation), de alrededor de 5º, con un rango de 0-14º.",
  },
  {
    id: 146,
    block: "ms",
    code: "Antebrazo - Mecanismo de fractura aislada de cúbito",
    image: null,
    prompt:
      "Un hombre de 35 años acude a urgencias tras recibir un golpe directo con un objeto contundente en el antebrazo mientras se protegía de una agresión. Se objetiva una fractura aislada de la diáfisis cubital. ¿Qué mecanismo lesional es característico de este patrón?",
    options: [
      "La caída desde una altura con el brazo en hiperextensión",
      "El traumatismo directo tipo bastonazo",
      "La torsión forzada del antebrazo en pronación",
      "El impacto axial con el codo en flexión",
    ],
    correct: 1,
    explanation:
      "El traumatismo directo tipo bastonazo (nightstick fracture) es el mecanismo más típico de la fractura aislada del cúbito, al recibir el antebrazo un golpe directo mientras protege la cara o el cuerpo.",
  },
  {
    id: 147,
    block: "ms",
    code: "Antebrazo - Concepto de anillo cúbito-radial",
    image: null,
    prompt:
      "Un paciente presenta una fractura aparentemente aislada de la diáfisis radial, sin otra lesión evidente en la radiografía inicial. Teniendo en cuenta la anatomía funcional del antebrazo, ¿qué debe sospecharse ante este hallazgo?",
    options: [
      "Que se trata de una fractura de baja energía sin más implicaciones",
      "Una lesión asociada de la articulación radiocubital proximal o distal",
      "Una rotura aislada del ligamento anular sin relevancia clínica",
      "Que no es necesario valorar las articulaciones radiocubitales",
    ],
    correct: 1,
    explanation:
      "El cúbito, el radio y las articulaciones radiocubitales proximal y distal forman un anillo; para que exista desplazamiento hay que romper el anillo por dos puntos, por lo que ante una fractura aislada de la diáfisis radial o cubital hay que sospechar una lesión asociada de alguna de las dos articulaciones radiocubitales.",
  },
  {
    id: 148,
    block: "ms",
    code: "Antebrazo - Signo del radio cruzado",
    image: null,
    prompt:
      "Un niño de 8 años presenta una fractura en tallo verde de la diáfisis radial. Tras la reducción, en una radiografía AP verdadera se observa que el cúbito y el radio se cruzan sin que el antebrazo esté en pronación completa. ¿Qué indica este hallazgo?",
    options: [
      "Una consolidación adecuada de la fractura",
      "Una mala rotación de los fragmentos",
      "Una lesión asociada de la membrana interósea",
      "Que la reducción es correcta y no requiere más valoración",
    ],
    correct: 1,
    explanation:
      "El 'signo del radio cruzado' es indicativo de una deformidad angular y torsional en las fracturas en tallo verde de la diáfisis radial. Si tras reducir, en una Rx AP verdadera, el cúbito y el radio se cruzan sin que el antebrazo esté en pronación completa, existe una mala rotación de los fragmentos.",
  },
  {
    id: 149,
    block: "ms",
    code: "Antebrazo - Tratamiento estándar en adultos",
    image: null,
    prompt:
      "Un paciente adulto presenta una fractura diafisaria desplazada de cúbito y radio, sin lesión extensa de partes blandas. ¿Cuál es el tratamiento estándar recomendado para este tipo de fracturas?",
    options: [
      "Reducción abierta y osteosíntesis estable con placas, con compresión interfragmentaria",
      "Enclavado intramedular con clavos triangulares de Sage",
      "Inmovilización con yeso braquial moldeado en la membrana interósea",
      "Fijación externa no transfixiante de entrada",
    ],
    correct: 0,
    explanation:
      "El tratamiento estándar de las fracturas diafisarias de antebrazo en adultos consiste en la reducción abierta y osteosíntesis estable con placas, siguiendo los principios de la compresión interfragmentaria; los dispositivos endomedulares se reservan para cuando esto no es posible o en niños.",
  },
  {
    id: 150,
    block: "ms",
    code: "Antebrazo - Vías de abordaje y sinostosis",
    image: null,
    prompt:
      "Durante la osteosíntesis con placas de una fractura diafisaria de cúbito y radio, ¿por qué se recomienda utilizar dos vías de abordaje independientes para cada hueso?",
    options: [
      "Porque reduce el tiempo quirúrgico respecto a una incisión única",
      "Porque disminuye el riesgo de sinostosis postoperatoria entre ambos huesos",
      "Porque facilita la colocación de un único implante para ambos huesos",
      "Porque evita la necesidad de proteger el nervio interóseo posterior",
    ],
    correct: 1,
    explanation:
      "Se recomiendan dos vías de acceso independientes al cúbito y al radio para evitar la sinostosis postoperatoria, ya que las placas colocadas por una incisión única tienden a aproximarse, con mayor riesgo de interferencia en la rotación del antebrazo.",
  },
  {
    id: 151,
    block: "ms",
    code: "Antebrazo - Fractura aislada de cúbito estable",
    image: null,
    prompt:
      "Una mujer de 40 años sufre un traumatismo directo en el antebrazo y presenta una fractura aislada de la diáfisis cubital, no desplazada y con menos de 10º de angulación. ¿Cuál es el tratamiento más adecuado?",
    options: [
      "Yeso braquial 10-15 días seguido de ortesis funcional durante 12 semanas",
      "Reducción abierta y osteosíntesis con placa DCP de entrada",
      "Enclavado intramedular con clavo de Sage",
      "Fijación con dos placas de tercio de tubo en configuración ortogonal",
    ],
    correct: 0,
    explanation:
      "Las fracturas aisladas de cúbito no desplazadas y con menos de 10º de angulación se tratan de forma funcional, con un yeso braquial durante 10-15 días sustituido después por una ortesis que permite la flexoextensión y pronosupinación, manteniéndose unas 12 semanas.",
  },
  {
    id: 152,
    block: "ms",
    code: "Antebrazo - Fractura de Monteggia tipo Bado I",
    image: null,
    prompt:
      "Un paciente sufre una caída sobre la mano con el codo en extensión y el antebrazo en pronación máxima. En la radiografía se observa una fractura de cúbito con angulación anterior, junto con luxación anterior de la cabeza radial. ¿A qué tipo de la clasificación de Bado corresponde este patrón?",
    options: [
      "Tipo I",
      "Tipo II",
      "Tipo III",
      "Tipo IV",
    ],
    correct: 0,
    explanation:
      "El tipo I de Bado (el más frecuente, 60% de los casos) se caracteriza por una fractura de cúbito con angulación anterior y luxación anterior de la cabeza radial, y puede producirse por trauma directo o por una caída sobre la mano con el codo en extensión y el antebrazo en pronación máxima.",
  },
  {
    id: 153,
    block: "ms",
    code: "Antebrazo - Equivalente de Monteggia tipo I",
    image: null,
    prompt:
      "Una niña de 3 años presenta una luxación anterior aislada de la cabeza del radio tras un tirón brusco del brazo, sin fractura cubital asociada. Este cuadro se considera un equivalente de Monteggia. ¿A qué tipo corresponde?",
    options: [
      "Tipo I",
      "Tipo II",
      "Tipo III",
      "Tipo IV",
    ],
    correct: 0,
    explanation:
      "La luxación anterior aislada de la cabeza del radio, como ocurre en la pronación dolorosa, se considera un equivalente del tipo I de Monteggia, aunque no exista una fractura cubital asociada.",
  },
  {
    id: 154,
    block: "ms",
    code: "Antebrazo - Tratamiento de la fractura de Monteggia en adultos",
    image: null,
    prompt:
      "Un adulto presenta una fractura-luxación de Monteggia. ¿Cuál es el planteamiento terapéutico habitual en este grupo de edad?",
    options: [
      "Osteosíntesis con placa de la diáfisis cubital junto con reducción cerrada de la cabeza radial",
      "Tratamiento ortopédico con yeso braquial en supinación completa",
      "Resección primaria de la cabeza radial junto con osteosíntesis del cúbito",
      "Fijación externa articulada como primera opción quirúrgica",
    ],
    correct: 0,
    explanation:
      "El tratamiento de la fractura de Monteggia en adultos consiste en la reducción abierta y osteosíntesis del cúbito con placa DCP, junto con la reducción cerrada de la cabeza radial; el tratamiento ortopédico se reserva sobre todo para los niños.",
  },
  {
    id: 155,
    block: "ms",
    code: "Antebrazo - Causa de no reducción de la cabeza radial en Monteggia",
    image: null,
    prompt:
      "Tras la osteosíntesis del cúbito en una fractura de Monteggia, la cabeza radial no se reduce de forma espontánea. ¿Cuál es la causa más frecuente de este hallazgo?",
    options: [
      "Una mala reducción de la fractura cubital",
      "Una rotura del complejo fibrocartílago triangular",
      "Una lesión irreparable del nervio interóseo posterior",
      "Una fractura asociada de la apófisis coronoides",
    ],
    correct: 0,
    explanation:
      "La causa más frecuente de que la cabeza radial no se reduzca tras la osteosíntesis del cúbito es una mala reducción cubital; otras causas menos frecuentes son la interposición de la cápsula anterior y del ligamento anular.",
  },
  {
    id: 156,
    block: "ms",
    code: "Antebrazo - Concepto de fractura de Galeazzi",
    image: null,
    prompt:
      "¿Cómo se define una fractura-luxación de Galeazzi?",
    options: [
      "Una fractura del tercio proximal del cúbito con luxación de la cabeza radial",
      "Una fractura del tercio mediodistal del radio asociada a luxación de la articulación radiocubital distal",
      "Una fractura conminuta de ambos huesos del antebrazo sin afectación articular",
      "Una fractura de la epífisis distal del radio con luxación carpiana asociada",
    ],
    correct: 1,
    explanation:
      "La fractura-luxación de Galeazzi es una fractura del tercio mediodistal del radio asociada a luxación de la articulación radiocubital distal, que puede o no incluir una fractura de la estiloides cubital; cuanto más distal sea la fractura, mayor es la probabilidad de inestabilidad de esta articulación.",
  },
  {
    id: 157,
    block: "ms",
    code: "Antebrazo - Epidemiología comparada de Galeazzi y Monteggia",
    image: null,
    prompt:
      "Respecto a la frecuencia relativa de las fracturas-luxaciones de Galeazzi y Monteggia, es correcto afirmar que:",
    options: [
      "Ambas lesiones tienen una incidencia similar en la población adulta",
      "La fractura de Galeazzi es unas tres veces más frecuente que la de Monteggia",
      "La fractura de Monteggia es claramente más frecuente que la de Galeazzi",
      "Ambas son excepcionales y representan menos del 1% de las fracturas de antebrazo",
    ],
    correct: 1,
    explanation:
      "La fractura-luxación de Galeazzi es aproximadamente tres veces más frecuente que la fractura de Monteggia, representando el 3-6% de las fracturas del antebrazo, principalmente en varones de 2ª-3ª década de la vida.",
  },
  {
    id: 158,
    block: "ms",
    code: "Antebrazo - Signos de inestabilidad de la ARCD en Galeazzi",
    image: null,
    prompt:
      "En un paciente con una fractura diafisaria distal de radio, ¿qué hallazgo radiográfico sugiere de forma más directa una inestabilidad asociada de la articulación radiocubital distal?",
    options: [
      "Una angulación proximal del cúbito de 5º",
      "Un acortamiento radial superior a 5 mm con ensanchamiento articular en la proyección AP",
      "Una fractura transversa aislada de la diáfisis radial sin otros hallazgos",
      "Una fractura no desplazada del tercio proximal del radio",
    ],
    correct: 1,
    explanation:
      "Entre los signos de posible inestabilidad radiocubital distal se encuentran la fractura de la base de la estiloides cubital, el ensanchamiento articular en la proyección AP, el acortamiento del radio superior a 5 mm y la incongruencia persistente del cúbito distal en la radiografía lateral.",
  },
  {
    id: 159,
    block: "ms",
    code: "Antebrazo - Deformidad tolerable en niños",
    image: null,
    prompt:
      "Un niño de 7 años presenta una fractura diafisaria completa de cúbito y radio tras la reducción cerrada. Respecto a los límites de deformidad tolerable, ¿qué componente NO tiene capacidad de remodelación con el crecimiento?",
    options: [
      "La angulación en el plano volar-dorsal",
      "El acortamiento menor de 1 cm",
      "El defecto de rotación",
      "El acabalgamiento de los fragmentos",
    ],
    correct: 2,
    explanation:
      "Las angulaciones tienen capacidad de remodelación con el crecimiento, pero los defectos de rotación no remodelan, por lo que no se debe tolerar ningún defecto rotacional, ni en los dedos de la mano ni en el antebrazo.",
  },
  {
    id: 160,
    block: "ms",
    code: "Antebrazo - Tratamiento habitual en niños",
    image: null,
    prompt:
      "¿Cuál es el método de tratamiento más habitual de las fracturas diafisarias de cúbito y radio en la población pediátrica?",
    options: [
      "Reducción cerrada e inmovilización con yeso",
      "Reducción abierta y osteosíntesis con placas LCP",
      "Enclavado intramedular con clavos flexibles de entrada",
      "Fijación con agujas de Kirschner percutáneas de entrada",
    ],
    correct: 0,
    explanation:
      "La mayoría de las fracturas de antebrazo en niños se tratan de forma ortopédica, mediante reducción cerrada e inmovilización con yeso, dado el menor desplazamiento inicial y la capacidad de remodelación, reservándose la cirugía para casos concretos como fracturas inestables tras la reducción o equivalentes de Monteggia o Galeazzi.",
  },
  {
    id: 161,
    block: "ms",
    code: "Antebrazo - Abordaje de Kocher y riesgo nervioso",
    image: null,
    prompt:
      "Durante un abordaje posterolateral de Kocher para el tratamiento de una fractura de cabeza radial, ¿qué medida ayuda a proteger el nervio interóseo posterior si se necesita una disección más distal?",
    options: [
      "Mantener el antebrazo en supinación durante toda la disección",
      "Pronar el antebrazo para alejar la rama nerviosa del campo quirúrgico",
      "Extender el abordaje proximalmente hacia el húmero",
      "Realizar la disección exclusivamente por el plano medial",
    ],
    correct: 1,
    explanation:
      "En el abordaje de Kocher, si se precisa una disección más distal al ligamento anular y se quiere alejar el nervio interóseo posterior del campo quirúrgico, se debe pronar el antebrazo.",
  },
  {
    id: 162,
    block: "ms",
    code: "Antebrazo - Plano internervioso del abordaje de Henry",
    image: null,
    prompt:
      "En el abordaje anterior de Henry para la diáfisis radial, ¿qué plano internervioso se utiliza en la disección superficial?",
    options: [
      "Entre el extensor común de los dedos y el segundo radial",
      "Entre el braquiorradial y el pronador redondo/palmar mayor",
      "Entre el ancóneo y el extensor cubital del carpo",
      "Entre el tríceps y el ancóneo",
    ],
    correct: 1,
    explanation:
      "El abordaje de Henry utiliza el plano internervioso entre el braquiorradial (inervado por el nervio radial) y el pronador redondo/palmar mayor (inervado por el nervio mediano).",
  },
  {
    id: 163,
    block: "ms",
    code: "Antebrazo - Abordaje de Bryan-Morrey",
    image: null,
    prompt:
      "Un paciente va a ser intervenido mediante artroplastia total de codo. ¿Qué abordaje posterior está especialmente indicado para este procedimiento?",
    options: [
      "El abordaje bilaterotricipital o vía de Alonso Llames",
      "El abordaje de Bryan-Morrey, que preserva el olécranon",
      "La vía transtricipital longitudinal de Campbell",
      "El abordaje TRAP con desinserción del tríceps y el ancóneo",
    ],
    correct: 1,
    explanation:
      "El abordaje de Bryan-Morrey despega el tríceps del olécranon de medial a lateral, preservando su continuidad con el periostio del cúbito; se diseñó para preservar el olécranon y es el abordaje indicado para la realización de una prótesis de codo.",
  },
  {
    id: 164,
    block: "ms",
    code: "Antebrazo - Abordaje de Boyd en Monteggia",
    image: null,
    prompt:
      "En una fractura de Monteggia en la que no se consigue reducir de forma cerrada la cabeza radial, se opta por un abordaje subcutáneo proximal del cúbito que se prolonga hacia la cabeza radial evitando el nervio radial. ¿A qué abordaje corresponde esta descripción?",
    options: [
      "Abordaje de Thompson",
      "Abordaje de Boyd",
      "Abordaje de Kaplan",
      "Abordaje anterior a la fosa cubital",
    ],
    correct: 1,
    explanation:
      "El abordaje de Boyd está especialmente diseñado para las fracturas de Monteggia cuando no se puede reducir de forma cerrada la cabeza radial. Es un abordaje subcutáneo proximal del cúbito que se avanza posteriormente por el lado radial hasta alcanzar la cabeza radial, evitando el nervio radial.",
  },
  {
    id: 165,
    block: "ms",
    code: "STC en el embarazo",
    image: null,
    prompt:
      "Mujer de 30 años, gestante de 30 semanas, refiere desde hace tres semanas parestesias nocturnas en los tres primeros dedos de ambas manos. La exploración muestra Phalen y Durkan positivos de forma bilateral, sin atrofia tenar. ¿Cuál es la actitud terapéutica inicial más adecuada?",
    options: [
      "Férula de muñeca en posición neutra nocturna, AINEs y reevaluación tras el parto",
      "Cirugía de liberación del túnel carpiano bilateral de forma programada antes del parto",
      "Electromiografía urgente para decidir si se opera antes del tercer trimestre",
      "Infiltración con corticoides en ambas muñecas como tratamiento inicial",
    ],
    correct: 0,
    explanation:
      "En el síndrome del túnel carpiano asociado al embarazo, el tratamiento inicial es conservador (cambio de hábitos, férula nocturna y AINEs), ya que los síntomas suelen mejorar tras el parto; solo un porcentaje reducido de casos requiere cirugía.",
  },
  {
    id: 166,
    block: "ms",
    code: "Kienböck estadio IIIB",
    image: null,
    prompt:
      "Varón de 35 años con enfermedad de Kienböck en estadio IIIB de Lichtman (colapso del semilunar con flexión del escafoides), sin alteración degenerativa mediocarpiana. ¿Cuál de las siguientes es una opción terapéutica adecuada en este estadio?",
    options: [
      "Osteotomía de acortamiento radial aislada sin ningún otro gesto asociado",
      "Carpectomía proximal o artrodesis STT/escafo-grande",
      "Inmovilización prolongada como tratamiento definitivo",
      "Prótesis total de muñeca de entrada",
    ],
    correct: 1,
    explanation:
      "En el estadio IIIB de Kienböck, con escafoides flexionado, están indicadas la carpectomía proximal o las artrodesis parciales (STT o escafo-grande) para descargar el semilunar y corregir la deformidad del escafoides.",
  },
  {
    id: 167,
    block: "ms",
    code: "Prueba de Finkelstein",
    image: null,
    prompt:
      "Mujer de 42 años, en el posparto, refiere dolor en la cara radial de la muñeca que aumenta al coger en brazos a su hijo. En la exploración, la flexión pasiva del pulgar con la muñeca en desviación cubital reproduce el dolor. ¿Qué maniobra exploratoria se ha realizado y qué patología sugiere?",
    options: [
      "Maniobra de Brunelli; sugiere síndrome del túnel carpiano",
      "Test de Durkan; sugiere síndrome de Guyon",
      "Prueba de Finkelstein; sugiere tenosinovitis de De Quervain",
      "Signo de Tinel; sugiere síndrome de Wartenberg",
    ],
    correct: 2,
    explanation:
      "La prueba de Finkelstein reproduce el dolor en el primer compartimento extensor al forzar la flexión pasiva del pulgar con la muñeca en desviación cubital, siendo característica de la tenosinovitis de De Quervain.",
  },
  {
    id: 168,
    block: "ms",
    code: "Ganglión volar de muñeca",
    image: null,
    prompt:
      "¿Entre qué dos estructuras tendinosas se localiza típicamente el ganglión volar de la muñeca?",
    options: [
      "Flexor cubital del carpo y palmar menor",
      "Extensor largo y extensor corto del pulgar",
      "Flexor superficial y flexor profundo de los dedos",
      "Flexor radial del carpo (palmar mayor) y abductor largo del pulgar",
    ],
    correct: 3,
    explanation:
      "El ganglión volar de la muñeca se sitúa típicamente entre el tendón del flexor radial del carpo (palmar mayor) y el abductor largo del pulgar, y con frecuencia se relaciona con la rama palmar de la arteria radial.",
  },
  {
    id: 169,
    block: "ms",
    code: "Canal de Guyon — zonas",
    image: null,
    prompt:
      "Paciente con antecedente de fractura del gancho del ganchoso presenta debilidad de la musculatura interósea y del aductor del pulgar, con conservación de la sensibilidad en el borde cubital de la mano. ¿En qué zona del canal de Guyon se localiza la lesión?",
    options: [
      "Zona II",
      "Zona I",
      "Zona III",
      "Proximal al canal de Guyon, en el antebrazo",
    ],
    correct: 0,
    explanation:
      "La zona II del canal de Guyon contiene la rama motora del nervio cubital, que rodea la apófisis unciforme del ganchoso; su lesión provoca debilidad de la musculatura cubital intrínseca sin afectar a la sensibilidad, ya que la rama sensitiva discurre por otra zona.",
  },
  {
    id: 170,
    block: "ms",
    code: "Complicaciones cirugía STC",
    image: null,
    prompt:
      "¿Cuál es la causa más común de persistencia de la clínica tras la cirugía del síndrome del túnel carpiano, que constituye además su complicación más frecuente?",
    options: [
      "Lesión del nervio cubital en el canal de Guyon",
      "Liberación incompleta del ligamento anular del carpo",
      "Síndrome de dolor regional complejo",
      "Lesión de la rama motora recurrente del nervio mediano",
    ],
    correct: 1,
    explanation:
      "La persistencia de la clínica es la complicación más frecuente tras la cirugía del túnel carpiano, y su causa más habitual es la liberación incompleta del ligamento anular del carpo.",
  },
  {
    id: 171,
    block: "ms",
    code: "Signo vs. síndrome de Wartenberg",
    image: null,
    prompt:
      "En un paciente con parálisis del nervio cubital se observa abducción permanente del quinto dedo. ¿Cómo se denomina este hallazgo y con qué otra entidad no debe confundirse?",
    options: [
      "Signo de Froment; no debe confundirse con la enfermedad de Kienböck",
      "Signo de Tinel; no debe confundirse con la tenosinovitis de De Quervain",
      "Signo de Wartenberg; no debe confundirse con el síndrome de Wartenberg del nervio radial",
      "Signo de Finsterer; no debe confundirse con la enfermedad de Preiser",
    ],
    correct: 2,
    explanation:
      "El signo de Wartenberg (abducción permanente del 5º dedo) aparece en la afectación motora del nervio cubital y no debe confundirse con el síndrome de Wartenberg, que es la compresión de la rama sensitiva del nervio radial en el antebrazo.",
  },
  {
    id: 172,
    block: "ms",
    code: "Impactación cubitocarpiana",
    image: null,
    prompt:
      "Paciente con antecedente de fractura de radio distal consolidada con acortamiento presenta dolor en la zona cubital del carpo que aumenta con la desviación cubital de la muñeca. La radiografía muestra una varianza cubital positiva. ¿Cuál es el diagnóstico más probable y un procedimiento empleado en su tratamiento quirúrgico?",
    options: [
      "Enfermedad de Kienböck; tratamiento mediante carpectomía proximal",
      "Síndrome del túnel carpiano; liberación del ligamento anular del carpo",
      "Artrosis escafo-trapecio-trapezoidea; trapecectomía con interposición",
      "Síndrome de impactación cubitocarpiana; procedimiento de la oblea (wafer)",
    ],
    correct: 3,
    explanation:
      "El síndrome de impactación cubitocarpiana se produce por cúbito plus, con frecuencia tras fracturas de radio consolidadas con acortamiento; uno de los procedimientos quirúrgicos empleados es el acortamiento del cúbito mediante el procedimiento de la oblea (wafer).",
  },
  {
    id: 173,
    block: "ms",
    code: "Preiser vs. Kienböck",
    image: null,
    prompt:
      "¿Qué característica diferencia a la enfermedad de Preiser de la enfermedad de Kienböck?",
    options: [
      "En la enfermedad de Preiser la necrosis afecta al escafoides, mientras que en la de Kienböck afecta al semilunar",
      "La enfermedad de Preiser es más frecuente que la de Kienböck",
      "La enfermedad de Preiser aparece de forma característica en niños",
      "La enfermedad de Preiser se diagnostica en presencia de una fractura previa del escafoides",
    ],
    correct: 0,
    explanation:
      "La enfermedad de Preiser es la necrosis avascular idiopática del escafoides, mientras que la enfermedad de Kienböck afecta al semilunar; en ambas, para su diagnóstico, no debe existir una fractura previa del hueso implicado.",
  },
  {
    id: 174,
    block: "ms",
    code: "Segunda causa de artrosis de muñeca",
    image: null,
    prompt:
      "¿Cuál es la segunda localización más frecuente de artrosis en la muñeca, con frecuencia infradiagnosticada?",
    options: [
      "Articulación radiocubital distal",
      "Articulación escafo-trapecio-trapezoidea (STT)",
      "Articulación pisopiramidal",
      "Articulación radiocarpiana",
    ],
    correct: 1,
    explanation:
      "La artrosis escafo-trapecio-trapezoidea (STT) es la segunda causa más frecuente de artrosis de muñeca, por detrás de las secuelas de fracturas del radio distal y el carpo, y con frecuencia pasa infradiagnosticada.",
  },
  {
    id: 175,
    block: "ms",
    code: "Traslación cubital en muñeca reumatoide",
    image: null,
    prompt:
      "En la muñeca reumatoide, ¿qué mecanismo favorece la traslación cubital del carpo en el plano frontal?",
    options: [
      "La contractura del ligamento escafolunar",
      "La rotura aislada del tendón extensor largo del pulgar",
      "La inclinación cubital fisiológica del radio junto con la acción de la musculatura radial (ECRB y ECRL) cuando fallan los ligamentos",
      "La subluxación volar del tendón extensor cubital del carpo",
    ],
    correct: 2,
    explanation:
      "La inclinación cubital fisiológica del radio favorece el desplazamiento cubital del carpo; cuando fracasan las estructuras ligamentosas en la artritis reumatoide, la acción de la musculatura radial (ECRB y ECRL) potencia esta traslación cubital.",
  },
  {
    id: 176,
    block: "ms",
    code: "Rotura de EPL en artritis reumatoide",
    image: null,
    prompt:
      "Paciente con artritis reumatoide de larga evolución presenta una pérdida brusca e indolora de la extensión activa del pulgar tras una actividad cotidiana, confirmándose una rotura del tendón extensor largo del pulgar con repercusión funcional importante. ¿Cuál es la transferencia tendinosa de elección?",
    options: [
      "Transferencia del flexor superficial del cuarto dedo",
      "Sutura término-terminal directa del tendón roto",
      "Transferencia del extensor cubital del carpo",
      "Transferencia del extensor propio del índice al extensor largo del pulgar",
    ],
    correct: 3,
    explanation:
      "Ante la rotura del extensor largo del pulgar en la artritis reumatoide con pérdida funcional relevante, la transferencia del extensor propio del índice es la opción preferida, ya que no interfiere con la función del segundo dedo ni debilita la extensión radial de la muñeca.",
  },
  {
    id: 177,
    block: "ms",
    code: "Cirugía de la rizartrosis",
    image: null,
    prompt:
      "¿Cuál es la técnica quirúrgica más empleada en la actualidad para tratar la artrosis trapeciometacarpiana (rizartrosis) que no responde a tratamiento conservador?",
    options: [
      "Artroplastia de resección con interposición tendinosa",
      "Artrodesis trapeciometacarpiana",
      "Artroplastia con implante protésico",
      "Osteotomía de sustracción en valgo del primer metacarpiano",
    ],
    correct: 0,
    explanation:
      "La artroplastia de resección con interposición tendinosa, habitualmente con el flexor radial del carpo, es la técnica quirúrgica más utilizada en la actualidad para la rizartrosis que no responde a tratamiento conservador.",
  },
  {
    id: 178,
    block: "ms",
    code: "Fusión de 4 vs. 3 esquinas",
    image: null,
    prompt:
      "En relación con la artrodesis de las cuatro esquinas frente a la de tres esquinas (excluyendo el piramidal) en la muñeca SLAC/SNAC, ¿qué se ha observado en algunos estudios?",
    options: [
      "La fusión de cuatro esquinas presenta menor incidencia de dolor que la de tres esquinas",
      "La fusión de tres esquinas puede lograr menos dolor y mayor fuerza de prensión y movilidad",
      "La fusión de tres esquinas obtiene peores resultados de movilidad y fuerza de prensión",
      "No existe ninguna diferencia descrita entre ambas técnicas en la literatura",
    ],
    correct: 1,
    explanation:
      "Algunos estudios muestran mejores resultados con la fusión de tres esquinas frente a la de cuatro, con menos dolor y mayor fuerza de prensión y movilidad, aunque actualmente no se ha demostrado una ventaja clara de una técnica sobre la otra.",
  },
  {
    id: 179,
    block: "ms",
    code: "Contraindicaciones de la carpectomía proximal",
    image: null,
    prompt:
      "¿En cuál de las siguientes situaciones estaría contraindicada la carpectomía proximal de la muñeca?",
    options: [
      "Muñeca SLAC o SNAC sin afectación mediocarpiana",
      "Enfermedad de Kienböck en estadio IIIB",
      "Traslación cubital del carpo",
      "Enfermedad de Preiser",
    ],
    correct: 2,
    explanation:
      "La carpectomía proximal está contraindicada cuando existe traslación cubital del carpo, ya que esta técnica no corrige dicha inestabilidad y precisa integridad de la fosa semilunar y de la cabeza del hueso grande.",
  },
  {
    id: 180,
    block: "ms",
    code: "Denervación de la muñeca",
    image: null,
    prompt:
      "¿En qué consiste la técnica de denervación de la muñeca como tratamiento de la artrosis radiocarpiana con dolor?",
    options: [
      "En la resección completa de la primera hilera del carpo",
      "En la fusión de la articulación radiocarpiana mediante placa dorsal",
      "En la sustitución protésica de la articulación radiocarpiana",
      "En la sección de los nervios sensitivos y propioceptivos de la muñeca para interrumpir la transmisión del dolor",
    ],
    correct: 3,
    explanation:
      "La denervación de la muñeca consiste en la sección de los nervios sensitivos y propioceptivos para interrumpir la transmisión del dolor, sin corregir el proceso degenerativo subyacente, que puede seguir progresando.",
  },
  {
    id: 181,
    block: "ms",
    code: "STC dinámico en trabajador joven",
    image: null,
    prompt:
      "Trabajador joven de una cadena de montaje refiere parestesias en los primeros dedos de la mano que aparecen durante las tareas manuales repetitivas de flexo-extensión de la muñeca y ceden con el reposo. La exploración en consulta es normal. ¿Qué forma de presentación del síndrome del túnel carpiano es más compatible?",
    options: [
      "STC dinámico",
      "STC irritativo",
      "STC agudo",
      "STC crónico en fase avanzada",
    ],
    correct: 0,
    explanation:
      "El síndrome del túnel carpiano dinámico aparece en trabajadores jóvenes con actividades manuales repetitivas de flexo-extensión, cede con el reposo y la exploración en consulta puede ser normal, por lo que requiere un alto grado de sospecha clínica.",
  },
  {
    id: 182,
    block: "ms",
    code: "Compresión del nervio interóseo anterior",
    image: null,
    prompt:
      "Paciente refiere dolor antebraquial y dificultad para pinzar un papel entre el pulgar y el índice, siendo incapaz de formar el signo de 'OK' con la mano. No refiere alteraciones de la sensibilidad. ¿Qué estructura está afectada?",
    options: [
      "Nervio interóseo posterior",
      "Nervio interóseo anterior",
      "Nervio cubital en el canal de Guyon",
      "Nervio mediano en el túnel carpiano",
    ],
    correct: 1,
    explanation:
      "La rama interósea anterior del nervio mediano inerva el flexor largo del pulgar, el flexor profundo de 2º y 3º dedos y el pronador cuadrado; su compresión provoca debilidad para la pinza y la incapacidad de formar el signo de 'OK', sin alteración sensitiva asociada.",
  },
  {
    id: 183,
    block: "ms",
    code: "Estiloiditis radial",
    image: null,
    prompt:
      "Mujer de 55 años presenta dolor a la palpación selectiva en la estiloides radial, con tumefacción leve, sin antecedente traumático. El dolor aumenta con la supinación forzada de la muñeca. ¿Cómo se denomina este signo exploratorio y a qué entidad corresponde el cuadro?",
    options: [
      "Signo de Finsterer; enfermedad de Kienböck",
      "Prueba de Eichhoff; tenosinovitis de De Quervain",
      "Signo de Veyrassat; estiloiditis radial",
      "Signo de Wartenberg; cheiralgia parestésica",
    ],
    correct: 2,
    explanation:
      "El signo de Veyrassat (dolor con la supinación forzada) es característico de la estiloiditis radial, un cuadro rebelde al tratamiento que asocia tumefacción de partes blandas y engrosamiento óseo sobre la estiloides radial.",
  },
  {
    id: 184,
    block: "ms",
    code: "Cheiralgia parestésica",
    image: null,
    prompt:
      "Paciente refiere disestesias en el dorso radial de la mano que empeoran al llevar un reloj ajustado en la muñeca, con signo de Tinel positivo unos 9 cm proximal a la estiloides radial. ¿Qué cuadro es compatible con esta presentación?",
    options: [
      "Síndrome del túnel carpiano",
      "Síndrome de intersección tendinosa",
      "Síndrome de compresión del nervio cubital en el canal de Guyon",
      "Compresión de la rama sensitiva del nervio radial (síndrome de Wartenberg o cheiralgia parestésica)",
    ],
    correct: 3,
    explanation:
      "La cheiralgia parestésica o síndrome de Wartenberg del nervio radial se produce por compresión externa de su rama sensitiva, por ejemplo por relojes o pulseras, y se asemeja en su mecanismo a la meralgia parestésica del nervio femorocutáneo.",
  },
  {
    id: 185,
    block: "ms",
    code: "STC - test de Durkan",
    image: null,
    prompt:
      "Mujer de 52 años refiere hormigueo y dolor nocturno en los tres primeros dedos de la mano derecha, que la despierta y mejora al sacudir la mano. En la exploración, la compresión bimanual sobre el túnel carpiano reproduce los síntomas en menos de 30 segundos. ¿Qué maniobra exploratoria se ha realizado?",
    options: [
      "Prueba de compresión carpiana (Durkan)",
      "Maniobra de Phalen",
      "Signo de Tinel",
      "Diagrama de la mano de Brigham",
    ],
    correct: 0,
    explanation:
      "La prueba de compresión carpiana o test de Durkan, que consiste en presionar con ambos pulgares sobre el túnel carpiano, es la maniobra exploratoria más sensible y específica para el diagnóstico del síndrome del túnel carpiano.",
  },
  {
    id: 186,
    block: "ms",
    code: "STC en el embarazo",
    image: null,
    prompt:
      "Gestante de 30 semanas presenta parestesias nocturnas en los dedos de la mano compatibles con síndrome del túnel carpiano de intensidad leve. ¿Cuál es la actitud terapéutica más adecuada en este momento?",
    options: [
      "Sección endoscópica del ligamento anular del carpo",
      "Férula nocturna en posición neutra junto con antiinflamatorios",
      "Neurolisis del nervio mediano",
      "Transferencia tendinosa de oposición según Camitz",
    ],
    correct: 1,
    explanation:
      "En el síndrome del túnel carpiano asociado al embarazo, el tratamiento conservador con férula nocturna en posición neutra y AINEs es la opción inicial, ya que buena parte de los casos mejoran o se resuelven tras el parto.",
  },
  {
    id: 187,
    block: "ms",
    code: "Fenómeno de doble compresión",
    image: null,
    prompt:
      "Paciente joven con actividad laboral repetitiva en pronación presenta clínica sugestiva de síndrome del túnel carpiano, con estudios de conducción nerviosa negativos y dolor añadido en la cara anterior del antebrazo. ¿Qué entidad asociada debe sospecharse?",
    options: [
      "Síndrome de compresión del nervio interóseo posterior",
      "Compresión del nervio cubital en el canal de Guyon",
      "Síndrome del pronador (fenómeno de doble compresión)",
      "Síndrome de intersección tendinosa",
    ],
    correct: 2,
    explanation:
      "La coexistencia de síndrome del túnel carpiano con compresión del nervio mediano en el antebrazo proximal (síndrome del pronador) se conoce como fenómeno de doble compresión o 'double-crash syndrome', y debe sospecharse en jóvenes con actividades repetitivas en pronación y EMG negativa.",
  },
  {
    id: 188,
    block: "ms",
    code: "STC - complicación tras cirugía",
    image: null,
    prompt:
      "Tras una liberación quirúrgica del túnel carpiano, la complicación más frecuente en el postoperatorio es la persistencia de la clínica. ¿Cuál es su causa más habitual?",
    options: [
      "Lesión de la rama motora tenar del nervio mediano",
      "Síndrome de dolor regional complejo",
      "Apertura accidental del canal de Guyon",
      "Liberación incompleta del ligamento anular del carpo",
    ],
    correct: 3,
    explanation:
      "La liberación incompleta del ligamento anular del carpo es la causa más común de persistencia de la clínica tras la cirugía del túnel carpiano, siendo esta la complicación quirúrgica más frecuente.",
  },
  {
    id: 189,
    block: "ms",
    code: "Canal de Guyon - etiología",
    image: null,
    prompt:
      "Un paciente presenta entumecimiento del 4º y 5º dedos sin afectación del dorso de la mano, junto con debilidad para la abducción de los dedos. ¿Cuál es la causa más frecuente de este cuadro?",
    options: [
      "Ganglión en el canal de Guyon",
      "Fractura del gancho del ganchoso",
      "Microtraumatismos repetidos (síndrome del martillo hipotenar)",
      "Trombosis de la arteria cubital",
    ],
    correct: 0,
    explanation:
      "El ganglión es la causa más frecuente de compresión del nervio cubital en el canal de Guyon, presente en aproximadamente el 80% de los casos de origen no traumático.",
  },
  {
    id: 190,
    block: "ms",
    code: "Canal de Guyon - zona II",
    image: null,
    prompt:
      "Paciente presenta debilidad de la musculatura hipotenar, los interóseos y el aductor del pulgar, sin alteración de la sensibilidad en ningún territorio de la mano. ¿En qué zona del canal de Guyon se localiza la lesión?",
    options: [
      "Zona I",
      "Zona II",
      "Zona III",
      "Proximal al canal de Guyon",
    ],
    correct: 1,
    explanation:
      "La zona II del canal de Guyon contiene la rama motora del nervio cubital, que rodea la apófisis unciforme del ganchoso; su compresión aislada provoca debilidad motora sin déficit sensitivo asociado.",
  },
  {
    id: 191,
    block: "ms",
    code: "Ganglión volar de muñeca",
    image: null,
    prompt:
      "Se palpa una tumoración de consistencia elástica en la cara volar-radial de la muñeca, entre el tendón del flexor radial del carpo y el abductor largo del pulgar. ¿Cuál es el diagnóstico más probable?",
    options: [
      "Ganglión dorsal de muñeca",
      "Tenosinovitis de De Quervain",
      "Ganglión volar de muñeca",
      "Enfermedad de Kienböck",
    ],
    correct: 2,
    explanation:
      "El ganglión volar de muñeca, segundo en frecuencia entre los gangliones del carpo, se sitúa característicamente entre el flexor radial del carpo y el abductor largo del pulgar, y suele originarse en la cápsula y el ligamento radioescafoideo.",
  },
  {
    id: 192,
    block: "ms",
    code: "De Quervain - Finkelstein",
    image: null,
    prompt:
      "Mujer de 35 años en el posparto refiere dolor progresivo en la cara lateral de la muñeca que aumenta con la movilización del pulgar. Con la muñeca en desviación cubital, se fuerza la flexión pasiva del pulgar y se reproduce el dolor. ¿Qué maniobra se ha realizado y qué patología sugiere?",
    options: [
      "Maniobra de Brunelli; síndrome de intersección tendinosa",
      "Signo de Veyrassat; estiloiditis radial",
      "Maniobra de Eichhoff; degeneración escafo-trapecio-trapezoidea",
      "Prueba de Finkelstein; tenosinovitis de De Quervain",
    ],
    correct: 3,
    explanation:
      "La prueba de Finkelstein, que reproduce dolor al flexionar pasivamente el pulgar con la muñeca en desviación cubital, es característica de la tenosinovitis de De Quervain, más frecuente en mujeres en relación con el embarazo o el posparto.",
  },
  {
    id: 193,
    block: "ms",
    code: "Síndrome de intersección",
    image: null,
    prompt:
      "Un paciente presenta dolor y crepitación en la cara postero-lateral del antebrazo, localizado unos 6 cm proximal a la articulación radiocarpiana, más proximal que el dolor típico de la tenosinovitis de De Quervain. ¿Qué estructuras están afectadas?",
    options: [
      "Segundo compartimento extensor, por roce con el primero",
      "Primer compartimento extensor",
      "Tercer compartimento extensor, a nivel del tubérculo de Lister",
      "Sexto compartimento extensor",
    ],
    correct: 0,
    explanation:
      "El síndrome de intersección tendinosa afecta a los tendones del segundo compartimento extensor por roce con los del primero, y se localiza más proximal en el antebrazo que la tenosinovitis de De Quervain.",
  },
  {
    id: 194,
    block: "ms",
    code: "Degeneración escafo-trapecio-trapezoidea",
    image: null,
    prompt:
      "Paciente con dolor crónico en la muñeca y hallazgos radiográficos de artrosis entre el escafoides, el trapecio y el trapezoide, sin afectación de la articulación trapeciometacarpiana. ¿Cuál es la actitud quirúrgica más adecuada?",
    options: [
      "Artrodesis total de muñeca",
      "Resección del polo distal del escafoides o artrodesis triescafoidea",
      "Trapecectomía con interposición de tejidos blandos",
      "Carpectomía proximal",
    ],
    correct: 1,
    explanation:
      "En la degeneración escafo-trapecio-trapezoidea sin afectación de la articulación trapeciometacarpiana, las opciones incluyen la resección del polo distal del escafoides o la artrodesis triescafoidea (fusión STT).",
  },
  {
    id: 195,
    block: "ms",
    code: "Enfermedad de Kienböck - signo de Finsterer",
    image: null,
    prompt:
      "Paciente con dolor y rigidez progresiva en el dorso de la muñeca refiere que, al cerrar el puño, ha perdido la prominencia habitual de la cabeza del tercer metacarpiano, siendo dolorosa su percusión. ¿A qué signo corresponde este hallazgo y en qué enfermedad es patognomónico?",
    options: [
      "Signo de Wartenberg; síndrome de compresión del nervio radial",
      "Signo de Froment; compresión del nervio cubital",
      "Signo de Finsterer; enfermedad de Kienböck",
      "Signo de Veyrassat; estiloiditis radial",
    ],
    correct: 2,
    explanation:
      "El signo de Finsterer, patognomónico de la enfermedad de Kienböck, consiste en la pérdida de la prominencia normal de la cabeza del tercer metacarpiano al cerrar el puño, por el acortamiento del semilunar.",
  },
  {
    id: 196,
    block: "ms",
    code: "Kienböck - diagnóstico precoz",
    image: null,
    prompt:
      "Varón joven con dolor de muñeca de varios meses de evolución sin antecedente traumático presenta una radiografía simple normal. ¿Qué prueba de imagen es la más adecuada para confirmar una sospecha de enfermedad de Kienböck en esta fase?",
    options: [
      "Tomografía computarizada",
      "Gammagrafía ósea",
      "Ecografía de partes blandas",
      "Resonancia magnética",
    ],
    correct: 3,
    explanation:
      "La resonancia magnética es la técnica de elección para el diagnóstico de la enfermedad de Kienböck en fase temprana, cuando la radiografía simple todavía puede ser normal, mostrando una disminución de señal en T1 y T2 en el semilunar.",
  },
  {
    id: 197,
    block: "ms",
    code: "Kienböck - factores predisponentes",
    image: null,
    prompt:
      "¿Cuál de los siguientes factores anatómicos se ha relacionado como predisponente en la aparición de la enfermedad de Kienböck?",
    options: [
      "Varianza cubital negativa (cúbito minus)",
      "Cúbito plus",
      "Inclinación radial disminuida",
      "Fosa semilunar muy profunda",
    ],
    correct: 0,
    explanation:
      "El cúbito minus o varianza cubital negativa está presente en un porcentaje elevado de los casos de enfermedad de Kienböck, ya que aumenta la transmisión de cargas sobre la articulación radio-semilunar, aunque esta asociación sigue siendo objeto de debate.",
  },
  {
    id: 198,
    block: "ms",
    code: "Preiser vs Kienböck",
    image: null,
    prompt:
      "¿Qué diferencia principal existe entre la enfermedad de Preiser y la enfermedad de Kienböck?",
    options: [
      "La enfermedad de Preiser afecta al semilunar y la de Kienböck al escafoides",
      "La enfermedad de Preiser afecta al escafoides y la de Kienböck al semilunar",
      "Ambas afectan al mismo hueso, pero con distinta edad de presentación",
      "La enfermedad de Preiser aparece con más frecuencia en la infancia",
    ],
    correct: 1,
    explanation:
      "La enfermedad de Preiser es la osteonecrosis idiopática del escafoides carpiano, mientras que la enfermedad de Kienböck es la osteonecrosis idiopática del semilunar, siendo este último el hueso del carpo con mayor incidencia de osteonecrosis.",
  },
  {
    id: 199,
    block: "ms",
    code: "Necrosis avascular del hueso grande",
    image: null,
    prompt:
      "La necrosis avascular del hueso grande del carpo es una entidad poco frecuente. ¿Con qué causa se asocia más habitualmente?",
    options: [
      "Infección articular",
      "Hipotiroidismo",
      "Traumatismos de alta energía",
      "Anticoagulación crónica",
    ],
    correct: 2,
    explanation:
      "La necrosis avascular del hueso grande es rara y se asocia habitualmente a traumatismos de alta energía, aunque también se ha descrito en relación con dosis elevadas de esteroides, quimioterapia o enfermedad de Gaucher.",
  },
  {
    id: 200,
    block: "ms",
    code: "Ganglión dorsal de muñeca",
    image: null,
    prompt:
      "El ganglión más frecuente en la muñeca se localiza en su cara dorsal y suele originarse en el ligamento escafolunar. Ante un ganglión dorsal pequeño y con poca sintomatología, ¿cuál es la actitud más razonable?",
    options: [
      "Punción-aspiración inmediata",
      "Extirpación quirúrgica programada",
      "Artroscopia diagnóstica urgente",
      "Observación, ya que muchos se reabsorben espontáneamente",
    ],
    correct: 3,
    explanation:
      "El ganglión dorsal, originado habitualmente en el ligamento escafolunar, suele producir sintomatología menor y hasta la mitad se reabsorben espontáneamente en varios años, por lo que la observación es la actitud inicial más razonable si es poco sintomático.",
  },
  {
    id: 201,
    block: "ms",
    code: "Rizartrosis - técnica quirúrgica",
    image: null,
    prompt:
      "Paciente con artrosis trapeciometacarpiana avanzada y mala respuesta al tratamiento conservador va a intervenirse. ¿Cuál es la técnica quirúrgica empleada con más frecuencia para este tipo de artrosis?",
    options: [
      "Artroplastia de resección con interposición tendinosa",
      "Artrodesis trapeciometacarpiana",
      "Artroplastia con implante protésico",
      "Osteotomía de sustracción del primer metacarpiano",
    ],
    correct: 0,
    explanation:
      "La artroplastia de resección, con interposición tendinosa y en ocasiones reconstrucción ligamentosa, es la técnica quirúrgica más empleada en la artrosis trapeciometacarpiana del pulgar cuando fracasa el tratamiento conservador.",
  },
  {
    id: 202,
    block: "ms",
    code: "Artrosis de la mano - orden de afectación",
    image: null,
    prompt:
      "En la artrosis de la mano, ¿cuál es el orden de afectación de las articulaciones, de mayor a menor frecuencia?",
    options: [
      "Carpometacarpiana del pulgar, interfalángica distal, metacarpofalángica, interfalángica proximal",
      "Interfalángica distal, carpometacarpiana del pulgar, interfalángica proximal, metacarpofalángica",
      "Metacarpofalángica, interfalángica proximal, interfalángica distal, carpometacarpiana del pulgar",
      "Interfalángica proximal, interfalángica distal, metacarpofalángica, carpometacarpiana del pulgar",
    ],
    correct: 1,
    explanation:
      "En la artrosis de la mano, las articulaciones se afectan en el siguiente orden de frecuencia: interfalángica distal, carpometacarpiana del pulgar, interfalángica proximal y, por último, metacarpofalángica.",
  },
  {
    id: 203,
    block: "ms",
    code: "Mano reumatoide - cuello de cisne",
    image: null,
    prompt:
      "En la mano reumatoide, la deformidad en cuello de cisne se caracteriza por hiperextensión de la articulación interfalángica proximal e hiperflexión de la interfalángica distal. ¿Cuál es el mecanismo fisiopatológico principal implicado?",
    options: [
      "Rotura de la banda central del aparato extensor",
      "Subluxación volar de las bandas laterales del extensor",
      "Desequilibrio tendinoso con relajación de la cápsula volar de la interfalángica proximal",
      "Sección espontánea del tendón flexor superficial",
    ],
    correct: 2,
    explanation:
      "La deformidad en cuello de cisne se produce por un desequilibrio tendinoso y una relajación de la cápsula volar de la articulación interfalángica proximal, a diferencia de la deformidad en ojal o boutonnière, causada por rotura de la banda central del extensor.",
  },
  {
    id: 204,
    block: "ms",
    code: "Síndrome de Vaughn-Jackson",
    image: null,
    prompt:
      "En un paciente con artritis reumatoide evolucionada aparece de forma progresiva una pérdida de extensión, primero del quinto dedo y después del cuarto, en relación con el roce del tendón sobre la cabeza del cúbito prominente. ¿Cómo se denomina este cuadro?",
    options: [
      "Síndrome de Mannerfelt",
      "Deformidad en pulgar adducto",
      "Síndrome de la cabeza del cúbito aislado",
      "Síndrome de Vaughn-Jackson",
    ],
    correct: 3,
    explanation:
      "El síndrome de Vaughn-Jackson consiste en la rotura progresiva de los tendones extensores de cubital a radial, comenzando típicamente por el extensor del 5º dedo y extendiéndose al 4º, por roce sobre la cabeza cubital prominente en la artritis reumatoide.",
  },
  {
    id: 205,
    block: "ms",
    code: "Síndrome de Mannerfelt",
    image: null,
    prompt:
      "En un paciente con artritis reumatoide aparece pérdida brusca de la flexión activa de la interfalángica del pulgar, secundaria al roce del tendón flexor sobre un osteofito situado entre el escafoides, el trapecio y el trapezoide. ¿Cómo se denomina este cuadro?",
    options: [
      "Síndrome de Mannerfelt",
      "Síndrome de Vaughn-Jackson",
      "Dedo en Boutonnière",
      "Pulgar en Z",
    ],
    correct: 0,
    explanation:
      "El síndrome de Mannerfelt consiste en la rotura del flexor largo del pulgar, y en ocasiones del flexor profundo del segundo dedo, por atricción del tendón sobre un osteofito localizado entre el escafoides, el trapecio y el trapezoide.",
  },
  {
    id: 206,
    block: "ms",
    code: "AR - prevención de roturas tendinosas",
    image: null,
    prompt:
      "En un paciente con artritis reumatoide y sinovitis mantenida de los tendones extensores, ¿qué procedimiento realizado de forma precoz puede disminuir el riesgo de rotura tendinosa espontánea?",
    options: [
      "Artrodesis de muñeca",
      "Tenosinovectomía",
      "Denervación de muñeca",
      "Transferencia tendinosa profiláctica",
    ],
    correct: 1,
    explanation:
      "La tenosinovectomía realizada de forma precoz en la fase sinovítica de la artritis reumatoide puede prevenir la rotura de los tendones extensores, ya que elimina la sinovial que invade y debilita el tendón.",
  },
  {
    id: 207,
    block: "ms",
    code: "Fractura de Colles",
    image: null,
    prompt:
      "Mujer de 68 años sufre una caída con la mano en flexión dorsal. En la radiografía se observa una fractura extraarticular del radio distal con desplazamiento dorsal y acortamiento radial, con la típica deformidad en 'dorso de tenedor'. ¿Cómo se denomina clásicamente este tipo de fractura?",
    options: [
      "Fractura de Colles",
      "Fractura de Smith",
      "Fractura de Barton",
      "Fractura de Hutchinson",
    ],
    correct: 0,
    explanation:
      "La fractura de Colles es una fractura extraarticular del radio distal con desplazamiento dorsal y acortamiento radial, característica de las caídas con la muñeca en flexión dorsal, que produce la clásica deformidad en 'dorso de tenedor'.",
  },
  {
    id: 208,
    block: "ms",
    code: "Fractura de Smith",
    image: null,
    prompt:
      "Paciente sufre una caída con la muñeca en flexión palmar. La radiografía muestra una fractura extraarticular del radio distal con desplazamiento volar, y en la exploración se aprecia una deformidad en 'pala de jardinero'. ¿Qué tipo de fractura es compatible con esta presentación?",
    options: [
      "Fractura de Barton dorsal",
      "Fractura de Smith",
      "Fractura de Hutchinson",
      "Fractura die-punch",
    ],
    correct: 1,
    explanation:
      "La fractura de Smith o Goyrand-Smith es una fractura extraarticular del radio distal con desplazamiento volar, típica de caídas con la muñeca en flexión palmar, que produce la deformidad en 'pala de jardinero'.",
  },
  {
    id: 209,
    block: "ms",
    code: "Fractura de Barton",
    image: null,
    prompt:
      "¿Cuál de las siguientes definiciones corresponde a una fractura de Barton?",
    options: [
      "Fractura aislada de la apófisis estiloides del radio",
      "Fractura extraarticular con desplazamiento dorsal y acortamiento radial",
      "Fractura-luxación en la que se luxa el carpo y se fractura el reborde dorsal o volar del radio",
      "Fractura por impactación del semilunar en la superficie articular del radio",
    ],
    correct: 2,
    explanation:
      "La fractura de Barton o Rhea-Barton es una fractura-luxación en la que se luxa el carpo junto con la fractura del reborde dorsal o volar del radio, a diferencia de otras fracturas del radio distal que no asocian luxación carpiana.",
  },
  {
    id: 210,
    block: "ms",
    code: "Fractura de Hutchinson o Chauffeur",
    image: null,
    prompt:
      "Un paciente presenta una fractura aislada de la apófisis estiloides del radio tras un mecanismo de cizallamiento. Esta fractura, conocida como de Hutchinson o Chauffeur, se asocia con frecuencia a la lesión de qué estructura?",
    options: [
      "Fibrocartílago triangular",
      "Nervio mediano",
      "Extensor largo del pulgar",
      "Ligamento escafosemilunar",
    ],
    correct: 3,
    explanation:
      "Las fracturas de la estiloides radial (fractura de Hutchinson o Chauffeur) se asocian con frecuencia a lesiones del ligamento escafosemilunar, por lo que debe explorarse esta estructura ante este tipo de fractura.",
  },
  {
    id: 211,
    block: "ms",
    code: "Criterios de inestabilidad - edad",
    image: null,
    prompt:
      "En las fracturas extraarticulares del radio distal, ¿cuál de los siguientes factores se considera el mayor predictor de pérdida de reducción?",
    options: [
      "Edad superior a 60 años",
      "Fractura de cúbito asociada",
      "Conminución dorsal metafisaria",
      "Acortamiento radial inicial mayor de 10 mm",
    ],
    correct: 0,
    explanation:
      "La edad superior a 60 años es, entre los criterios de inestabilidad de las fracturas extraarticulares del radio distal, el mayor predictor de pérdida de reducción.",
  },
  {
    id: 212,
    block: "ms",
    code: "Sospecha de rotura del FCT",
    image: null,
    prompt:
      "En una fractura de radio distal, ¿qué hallazgo radiográfico obliga a sospechar una rotura asociada del fibrocartílago triangular?",
    options: [
      "Escalón articular menor de 2 mm",
      "Angulación dorsal del radio mayor de 25º",
      "Inclinación radial mayor de 15º",
      "Angulación volar menor de 10º",
    ],
    correct: 1,
    explanation:
      "Se debe sospechar una rotura del fibrocartílago triangular cuando existe un acortamiento radiocubital mayor de 5-7 mm o una angulación dorsal del radio mayor de 25º.",
  },
  {
    id: 213,
    block: "ms",
    code: "Tratamiento conservador con rotura del FCT",
    image: null,
    prompt:
      "Ante una fractura de radio distal con sospecha de rotura del fibrocartílago triangular que se va a tratar de forma conservadora, ¿en qué posición debe inmovilizarse el antebrazo?",
    options: [
      "Pronación completa",
      "Supinación completa",
      "Pronosupinación media",
      "Flexión palmar máxima de la muñeca",
    ],
    correct: 2,
    explanation:
      "Si existe rotura del fibrocartílago triangular, el antebrazo debe inmovilizarse con yeso braquioantebraquial en pronosupinación media durante 3 semanas, ya que es la posición en la que el fibrocartílago está más extendido y cicatriza mejor.",
  },
  {
    id: 214,
    block: "ms",
    code: "Prevención de la compresión del nervio mediano",
    image: null,
    prompt:
      "¿Cuál es la medida más eficaz para prevenir una compresión aguda del nervio mediano tras una fractura de radio distal?",
    options: [
      "Colocar un yeso con la muñeca en flexión mayor de 30º",
      "Administrar corticoides sistémicos de forma precoz",
      "Retrasar la reducción hasta que ceda el edema",
      "Realizar la reducción de la fractura de forma precoz",
    ],
    correct: 3,
    explanation:
      "La reducción precoz de la fractura y evitar flexionar la muñeca más de 30º dentro del yeso son las medidas más eficaces para prevenir la compresión aguda del nervio mediano tras una fractura de radio distal.",
  },
  {
    id: 215,
    block: "ms",
    code: "Criterios aceptables tras la reducción cerrada",
    image: null,
    prompt:
      "Tras la reducción cerrada de una fractura de radio distal, ¿cuál de los siguientes parámetros radiográficos se considera aceptable para no indicar una reducción abierta?",
    options: [
      "Angulación dorsal de 8º",
      "Escalón articular de 3 mm",
      "Acortamiento radial de 5 mm",
      "Inclinación radial de 10º",
    ],
    correct: 0,
    explanation:
      "Con la reducción cerrada se debe conseguir un escalón articular menor de 2 mm, una angulación dorsal menor de 10º, una inclinación radial mayor de 15º y un acortamiento menor de 3 mm; una angulación dorsal de 8º estaría dentro de los límites aceptables.",
  },
  {
    id: 216,
    block: "ms",
    code: "Tratamiento en el anciano con baja demanda",
    image: null,
    prompt:
      "Paciente de 78 años con bajos requerimientos funcionales sufre una fractura extraarticular desplazada del radio distal. ¿Cuál es la actitud terapéutica más adecuada?",
    options: [
      "Fijación interna con placa volar de entrada",
      "Reducción cerrada e inmovilización con yeso",
      "Fijador externo puenteando la articulación radiocarpiana",
      "Reducción abierta y agujas de Kirschner",
    ],
    correct: 1,
    explanation:
      "En pacientes de edad avanzada con bajos requerimientos funcionales, la inmovilización con yeso tras la reducción cerrada suele ser la opción más adecuada, reservando la cirugía para casos seleccionados.",
  },
  {
    id: 217,
    block: "ms",
    code: "Agujas percutáneas",
    image: null,
    prompt:
      "Respecto a las agujas percutáneas empleadas en el tratamiento de las fracturas de radio distal, ¿cuál de las siguientes afirmaciones es correcta?",
    options: [
      "Sustituyen a la inmovilización con yeso durante todo el tratamiento",
      "Se recomienda colocar una única aguja para minimizar el riesgo de lesión nerviosa",
      "Necesitan un soporte externo con yeso durante al menos 4 semanas",
      "Se introducen preferentemente a través de la rama sensitiva del nervio radial",
    ],
    correct: 2,
    explanation:
      "Las agujas de Kirschner percutáneas requieren un soporte externo con yeso durante al menos 4 semanas, colocándose habitualmente entre 2 y 4 agujas y evitando lesionar la rama sensitiva del nervio radial y los tendones extensores.",
  },
  {
    id: 218,
    block: "ms",
    code: "Fijador externo - sobredistracción",
    image: null,
    prompt:
      "Al colocar un fijador externo en una fractura de radio distal, ¿qué complicación se busca evitar limitando la distracción de la articulación radiocarpiana?",
    options: [
      "Infección del trayecto de los pines",
      "Lesión del nervio cubital",
      "Consolidación viciosa en varo",
      "Rigidez articular por sobredistracción",
    ],
    correct: 3,
    explanation:
      "Se recomienda evitar la sobredistracción con el fijador externo, ya que provoca rigidez; no debe superarse 1 mm de distracción en la articulación radiocarpiana ni distraer la articulación mediocarpiana.",
  },
  {
    id: 219,
    block: "ms",
    code: "Placa volar - línea de aguas",
    image: null,
    prompt:
      "Durante la colocación de una placa volar para el tratamiento de una fractura de radio distal, ¿qué precaución técnica reduce el riesgo de rotura del tendón flexor largo del pulgar?",
    options: [
      "No sobrepasar con la placa la línea de aguas ('watershed line')",
      "Colocar la placa distal a la línea de aguas ('watershed line')",
      "Usar tornillos de mayor longitud en la fila distal",
      "Emplear un abordaje dorsal en lugar de volar",
    ],
    correct: 0,
    explanation:
      "Una técnica quirúrgica correcta con placa volar implica no colocar la placa distal a la línea de aguas ('watershed line'), ya que hacerlo aumenta el riesgo de rotura del tendón flexor largo del pulgar.",
  },
  {
    id: 220,
    block: "ms",
    code: "Complicación más frecuente de la placa volar",
    image: null,
    prompt:
      "¿Cuál es la complicación más frecuente asociada a la fijación con placa volar en las fracturas de radio distal?",
    options: [
      "Rotura del extensor largo del pulgar",
      "Síndrome del túnel carpiano",
      "Pseudoartrosis",
      "Lesión de la rama sensitiva del nervio radial",
    ],
    correct: 1,
    explanation:
      "El síndrome del túnel carpiano, presente en torno al 14% de los casos, es la complicación más frecuente de la fijación con placa volar en las fracturas de radio distal.",
  },
  {
    id: 221,
    block: "ms",
    code: "Indicaciones de la placa dorsal",
    image: null,
    prompt:
      "¿En cuál de las siguientes situaciones estaría indicado un abordaje dorsal con placa para una fractura de radio distal?",
    options: [
      "Fractura extraarticular no desplazada en paciente anciano",
      "Fractura de Smith sin conminución",
      "Fractura die-punch con hundimiento dorsal",
      "Fractura de la estiloides cubital aislada",
    ],
    correct: 2,
    explanation:
      "El abordaje dorsal con placa está indicado en fracturas por cizallamiento dorsal, en fracturas die-punch dorsales o en fracturas articulares complejas que requieren visualización directa de los fragmentos.",
  },
  {
    id: 222,
    block: "ms",
    code: "Rotura diferida del extensor largo del pulgar",
    image: null,
    prompt:
      "Un paciente que fue tratado de forma conservadora por una fractura de radio distal presenta, varias semanas después, incapacidad para extender el pulgar por rotura del tendón extensor largo del pulgar. ¿Cuál es el tratamiento más adecuado?",
    options: [
      "Sutura término-terminal directa del tendón",
      "Injerto tendinoso libre interpuesto",
      "Inmovilización con férula en extensión",
      "Transferencia del tendón extensor propio del índice",
    ],
    correct: 3,
    explanation:
      "En la rotura del extensor largo del pulgar, el tendón suele estar degenerado, por lo que se recomienda la transferencia del tendón extensor propio del índice en lugar de la sutura término-terminal.",
  },
  {
    id: 223,
    block: "ms",
    code: "Consolidación con mal resultado funcional",
    image: null,
    prompt:
      "¿Cuál de las siguientes situaciones se asocia a peores resultados funcionales tras la consolidación de una fractura de radio distal?",
    options: [
      "Acortamiento radial mayor de 3 mm",
      "Inclinación radial mayor de 15º",
      "Angulación dorsal menor de 10º",
      "Escalón articular menor de 1 mm",
    ],
    correct: 0,
    explanation:
      "Los resultados funcionales son peores cuando la fractura consolida con más de 20º de angulación dorsal, menos de 10º de inclinación radial o más de 3 mm de acortamiento respecto a la muñeca contralateral.",
  },
  {
    id: 224,
    block: "ms",
    code: "Epidemiología pediátrica",
    image: null,
    prompt:
      "Respecto a las fracturas de la extremidad distal del cúbito y radio en la infancia, ¿cuál de las siguientes afirmaciones es correcta?",
    options: [
      "Suelen ser intraarticulares y de mal pronóstico",
      "Son la fractura más frecuente en niños, siendo la epifisiolisis tipo II la más habitual",
      "Predominan en el sexo femenino",
      "No se asocian con frecuencia a fracturas del codo",
    ],
    correct: 1,
    explanation:
      "La fractura de extremidad distal de cúbito y radio es la fractura más frecuente en la infancia, siendo la epifisiolisis tipo II de Salter y Harris la más habitual, con mejor pronóstico que en adultos al ser raramente intraarticulares.",
  },
  {
    id: 225,
    block: "ms",
    code: "Epifisiolisis - deformidad aceptable",
    image: null,
    prompt:
      "Niño de 9 años presenta una epifisiolisis tipo II de Salter y Harris en el radio distal, con buen remanente de crecimiento. ¿Qué grado de desplazamiento se puede aceptar con tratamiento ortopédico?",
    options: [
      "Cualquier grado de angulación si no hay dolor",
      "Hasta el 20% de contacto y 10º de angulación",
      "Hasta el 50% de contacto y 25º de angulación",
      "Ausencia total de desplazamiento",
    ],
    correct: 2,
    explanation:
      "En las epifisiolisis tipos I y II de Salter y Harris, que son las más frecuentes, se acepta hasta un 50% de contacto y 25º de angulación si queda al menos un año de crecimiento restante.",
  },
  {
    id: 226,
    block: "ms",
    code: "Fractura en rodete",
    image: null,
    prompt:
      "Niño de 7 años sufre una fractura por compresión axial del radio distal que afecta a una sola cortical, sin desplazamiento. ¿Cuál es el tratamiento habitual de esta fractura en rodete?",
    options: [
      "Yeso braquiopalmar durante 6 semanas",
      "Reducción abierta y agujas de Kirschner",
      "Fijador externo puenteando la muñeca",
      "Yeso corto antebraquial o vendaje simple durante 3 semanas",
    ],
    correct: 3,
    explanation:
      "Las fracturas en rodete o torus son fracturas incompletas y estables que afectan a una sola cortical; se tratan con yeso corto antebraquial durante 3 semanas, habiéndose descrito resultados similares con un vendaje simple.",
  },
  {
    id: 227,
    block: "ms",
    code: "Fractura en tallo verde",
    image: null,
    prompt:
      "Niño con una fractura metafisaria en tallo verde del radio distal, con deformidad y afectación de ambas corticales. ¿Cómo se plantea habitualmente la inmovilización?",
    options: [
      "Yeso largo braquiopalmar inicial, seguido de yeso corto hasta completar 4-6 semanas",
      "Yeso corto antebraquial durante todo el tratamiento",
      "Vendaje elástico simple durante 2 semanas",
      "Férula dorsal sin inmovilización circular",
    ],
    correct: 0,
    explanation:
      "En las fracturas en tallo verde, el tratamiento habitual consiste en un yeso largo braquiopalmar durante 3-4 semanas, seguido de un yeso corto antebraquial hasta completar entre 4 y 6 semanas de inmovilización total.",
  },
  {
    id: 228,
    block: "ms",
    code: "Fractura de Galeazzi pediátrica",
    image: null,
    prompt:
      "En una fractura de Galeazzi pediátrica con ápex de la fractura volar y deformidad dorsal, la deformidad rotacional predominante es la supinación. ¿En qué posición debe inmovilizarse el antebrazo para corregirla?",
    options: [
      "Supinación completa",
      "Pronación",
      "Pronosupinación media",
      "Flexión máxima del codo sin rotación",
    ],
    correct: 1,
    explanation:
      "Si el ápex de la fractura es volar y la deformidad dorsal, la deformidad rotacional asociada es la supinación, por lo que es preciso inmovilizar el antebrazo en pronación para corregirla.",
  },
  {
    id: 229,
    block: "ms",
    code: "Ligamento escafolunar",
    image: null,
    prompt:
      "¿Cuál es el ligamento intrínseco más importante para mantener la integridad de la primera hilera del carpo?",
    options: [
      "Ligamento escafolunar",
      "Ligamento lunopiramidal",
      "Ligamento radioescafogrande",
      "Ligamento radiolunar largo",
    ],
    correct: 0,
    explanation:
      "El ligamento escafolunar es el ligamento intrínseco más importante del carpo, ya que mantiene la congruencia de la primera hilera y su lesión es la causa más frecuente de inestabilidad carpiana.",
  },
  {
    id: 230,
    block: "ms",
    code: "Inestabilidad DISI",
    image: null,
    prompt:
      "En una radiografía lateral de muñeca se observa el semilunar en flexión dorsal, con un ángulo escafolunar aumentado, tras la rotura del ligamento escafolunar. ¿Cómo se denomina este patrón de inestabilidad?",
    options: [
      "Inestabilidad VISI",
      "Inestabilidad DISI",
      "Inestabilidad mediocarpiana dorsal",
      "Inestabilidad radiocubital distal",
    ],
    correct: 1,
    explanation:
      "Cuando se rompe el ligamento escafolunar, el semilunar es arrastrado por el piramidal hacia la extensión, apareciendo flexionado dorsalmente en la radiografía lateral; este patrón se denomina inestabilidad DISI (Dorsal Intercalated Segment Instability).",
  },
  {
    id: 231,
    block: "ms",
    code: "Inestabilidad VISI",
    image: null,
    prompt:
      "¿Qué ocurre con la posición del semilunar cuando se rompe el ligamento lunopiramidal?",
    options: [
      "El semilunar se mantiene en posición neutra",
      "El semilunar es arrastrado por el piramidal hacia la extensión",
      "El semilunar es arrastrado por el escafoides hacia la flexión",
      "El semilunar se disloca de forma aislada",
    ],
    correct: 2,
    explanation:
      "Si se rompe el ligamento lunopiramidal, el semilunar es arrastrado por el escafoides hacia la flexión, apareciendo flexionado en la radiografía lateral; este patrón se denomina inestabilidad VISI (Volar Intercalated Segment Instability).",
  },
  {
    id: 232,
    block: "ms",
    code: "Vascularización del escafoides",
    image: null,
    prompt:
      "¿Por qué las fracturas del polo proximal del escafoides tienen mayor riesgo de pseudoartrosis que las del tercio distal?",
    options: [
      "Porque reciben menos carga mecánica",
      "Porque están recubiertas en su totalidad por cartílago articular",
      "Porque su consolidación depende del ligamento escafolunar",
      "Porque la vascularización del escafoides es predominantemente retrógrada",
    ],
    correct: 3,
    explanation:
      "La vascularización del escafoides es predominantemente retrógrada, entrando principalmente por la zona dorsal distal, por lo que cuanto más proximal es la fractura, mayor es el riesgo de isquemia y pseudoartrosis.",
  },
  {
    id: 233,
    block: "ms",
    code: "Signo de Hirsch",
    image: null,
    prompt:
      "En la exploración de una posible fractura de escafoides, el dolor con la compresión axial del tercer metacarpiano solo aparece si la muñeca se desvía radialmente. ¿Cómo se conoce este hallazgo?",
    options: [
      "Signo de Hirsch",
      "Signo de Finsterer",
      "Signo de Terry-Thomas",
      "Prueba de Watson",
    ],
    correct: 0,
    explanation:
      "El signo de Hirsch describe que la compresión axial del tercer metacarpiano solo produce dolor si se desvía radialmente la muñeca, siendo uno de los hallazgos exploratorios sugestivos de fractura de escafoides.",
  },
  {
    id: 234,
    block: "ms",
    code: "Clasificación de Herbert",
    image: null,
    prompt:
      "Según la clasificación de Herbert, ¿qué tipo de fractura de escafoides corresponde a una fractura aguda inestable del tercio medio?",
    options: [
      "Tipo A2",
      "Tipo B2",
      "Tipo C",
      "Tipo D1",
    ],
    correct: 1,
    explanation:
      "En la clasificación de Herbert, las fracturas tipo B son agudas inestables; dentro de ellas, el tipo B2 corresponde a la fractura completa del tercio medio del escafoides.",
  },
  {
    id: 235,
    block: "ms",
    code: "Criterios de inestabilidad de Herbert y Fisher",
    image: null,
    prompt:
      "Según los criterios de Herbert y Fisher, ¿cuál de las siguientes características define una fractura de escafoides como inestable?",
    options: [
      "Desplazamiento menor de 1 mm",
      "Ángulo intraescafoideo menor de 35º",
      "Asociación con una luxación perilunar",
      "Localización en el tercio distal",
    ],
    correct: 2,
    explanation:
      "Según los criterios de Herbert y Fisher, una fractura de escafoides se considera inestable si está desplazada más de 1 mm, si el ángulo intraescafoideo supera 35º, si se asocia a luxaciones perilunares o si afecta al polo proximal.",
  },
  {
    id: 236,
    block: "ms",
    code: "Diagnóstico con radiografía negativa",
    image: null,
    prompt:
      "Paciente con dolor en la tabaquera anatómica tras una caída, con radiografías simples normales y sospecha clínica elevada de fractura de escafoides. ¿Cuál es la prueba más eficaz para el diagnóstico temprano en esta situación?",
    options: [
      "Gammagrafía ósea",
      "Ecografía de partes blandas",
      "Radiografías dinámicas en estrés",
      "Resonancia magnética",
    ],
    correct: 3,
    explanation:
      "Cuando la radiografía simple es negativa y la sospecha clínica es alta, la resonancia magnética es la prueba más eficaz para el diagnóstico temprano de la fractura de escafoides, con una sensibilidad cercana al 100%.",
  },
  {
    id: 237,
    block: "ms",
    code: "Fractura estable de escafoides - inmovilización",
    image: null,
    prompt:
      "Paciente con una fractura estable no desplazada del tercio proximal del escafoides que se trata de forma conservadora con yeso. ¿Qué duración aproximada de inmovilización se recomienda?",
    options: [
      "10-12 semanas",
      "3-4 semanas",
      "6-8 semanas",
      "2-3 semanas",
    ],
    correct: 0,
    explanation:
      "En las fracturas estables de escafoides, la duración de la inmovilización depende de la localización; las del tercio proximal requieren un tiempo más prolongado, entre 10 y 12 semanas.",
  },
  {
    id: 238,
    block: "ms",
    code: "Fractura inestable de escafoides - tratamiento",
    image: null,
    prompt:
      "¿Cuál es el tratamiento óptimo en una fractura inestable de escafoides en un paciente activo?",
    options: [
      "Inmovilización con yeso braquial prolongado",
      "Fijación con tornillo canulado de cabeza ocultable",
      "Reducción cerrada y agujas de Kirschner sin yeso",
      "Resección del fragmento proximal",
    ],
    correct: 1,
    explanation:
      "En las fracturas inestables de escafoides, el tratamiento óptimo se lleva a cabo mediante fijación con tornillos canulados de cabeza ocultable, que permite una consolidación fiable y una recuperación funcional más rápida.",
  },
  {
    id: 239,
    block: "ms",
    code: "Pseudoartrosis de escafoides - definición",
    image: null,
    prompt:
      "¿A partir de qué momento tras una fractura de escafoides sin signos de consolidación se considera que existe una pseudoartrosis establecida?",
    options: [
      "3 meses",
      "4 meses",
      "6 meses",
      "12 meses",
    ],
    correct: 2,
    explanation:
      "Se define como retardo de consolidación la ausencia de signos de reparación entre los 3 y 6 meses tras la fractura, y como pseudoartrosis cuando han transcurrido más de 6 meses sin consolidación.",
  },
  {
    id: 240,
    block: "ms",
    code: "Tratamiento de la pseudoartrosis de escafoides",
    image: null,
    prompt:
      "En el tratamiento quirúrgico de la pseudoartrosis sintomática de escafoides sin deformidad en joroba ni defecto óseo significativo, ¿cuál es una opción de tratamiento aceptada?",
    options: [
      "Carpectomía proximal de entrada",
      "Resección del fragmento proximal",
      "Artrodesis de cuatro esquinas",
      "Osteosíntesis sin injerto óseo",
    ],
    correct: 3,
    explanation:
      "En pseudoartrosis sin deformidad en joroba ni defecto óseo relevante, la osteosíntesis sin injerto óseo (habitualmente con tornillo a compresión de cabeza ocultable) es una opción de tratamiento válida; en casos con defecto óseo se recurre al injerto óseo.",
  },
  {
    id: 241,
    block: "ms",
    code: "SNAC estadio II",
    image: null,
    prompt:
      "Paciente con SNAC en estadio II, con afectación de toda la articulación radioescafoidea y de la articulación escafoides-hueso grande, sin colapso carpiano. ¿Cuál es una opción de tratamiento adecuada?",
    options: [
      "Escafoidectomía y artrodesis de cuatro esquinas",
      "Estiloidectomía radial aislada",
      "Denervación de muñeca aislada",
      "Artrodesis total de muñeca",
    ],
    correct: 0,
    explanation:
      "En el SNAC estadio II, con afectación de toda la articulación radioescafoidea y de la articulación escafoides-hueso grande, una opción adecuada es la resección de la primera hilera del carpo o la escafoidectomía con artrodesis de cuatro esquinas.",
  },
  {
    id: 242,
    block: "ms",
    code: "Fractura del gancho del ganchoso",
    image: null,
    prompt:
      "Jugador de pádel presenta dolor en el talón de la mano tras un golpe directo con la raqueta, con radiografía convencional normal. ¿Qué proyección radiográfica es más útil para visualizar una posible fractura del gancho del ganchoso?",
    options: [
      "Proyección oblicua semipronada",
      "Radiografía del túnel del carpo",
      "Proyección de Robert",
      "Radiografía en estrés con puño cerrado",
    ],
    correct: 1,
    explanation:
      "Las fracturas del gancho del ganchoso, típicas de golpes directos en el talón de la mano con raquetas o palos, son difíciles de ver en radiografías convencionales y se visualizan mejor con una radiografía del túnel del carpo o mediante TC.",
  },
  {
    id: 243,
    block: "ms",
    code: "Fractura del piramidal",
    image: null,
    prompt:
      "¿Cuál es el mecanismo habitual de producción de la fractura de la cortical dorsal del piramidal, la segunda fractura del carpo en frecuencia?",
    options: [
      "Compresión axial con la muñeca en flexión palmar",
      "Golpe directo sobre la eminencia hipotenar",
      "Impactación de la estiloides cubital con la muñeca en extensión y desviación cubital",
      "Torsión forzada con la muñeca en pronación",
    ],
    correct: 2,
    explanation:
      "La fractura del piramidal, sobre todo de su cortical dorsal, se produce típicamente por impactación de la estiloides cubital al caer con la muñeca en extensión y desviación cubital, o por arrancamiento en la inserción de los ligamentos dorsales.",
  },
  {
    id: 244,
    block: "ms",
    code: "Síndrome de Fenton",
    image: null,
    prompt:
      "En una fractura-luxación perilunar, el fragmento proximal del hueso grande rota entre 90 y 180 grados asociado a una fractura de escafoides. ¿Cómo se denomina este cuadro?",
    options: [
      "Muñeca SLAC",
      "Muñeca SNAC",
      "Síndrome HALT",
      "Síndrome de Fenton (escafo-grande)",
    ],
    correct: 3,
    explanation:
      "Cuando el fragmento proximal del hueso grande rota entre 90 y 180º en el contexto de una fractura de escafoides asociada, el cuadro se denomina síndrome escafogrande o síndrome de Fenton.",
  },
  {
    id: 245,
    block: "ms",
    code: "Secuencia lesional de Mayfield",
    image: null,
    prompt:
      "Según la secuencia lesional de Mayfield en las lesiones perilunares, ¿qué estructura se lesiona típicamente en la fase 1?",
    options: [
      "El ligamento escafolunar o el escafoides",
      "El ligamento lunopiramidal o el piramidal",
      "El espacio de Poirier con luxación volar del semilunar",
      "La articulación mediocarpiana entre grande y semilunar",
    ],
    correct: 0,
    explanation:
      "En la secuencia lesional de Mayfield, la fase 1 corresponde a la lesión del ligamento escafolunar (generalmente de volar a dorsal) o a una fractura de escafoides, siendo el inicio del patrón lesional perilunar.",
  },
  {
    id: 246,
    block: "ms",
    code: "Prueba de Watson",
    image: null,
    prompt:
      "Durante la prueba de deslizamiento del escafoides o prueba de Watson, se aplica presión palmar sobre el tubérculo del escafoides mientras la muñeca pasa de desviación cubital a desviación radial. ¿Qué hallazgo apoya una lesión del ligamento escafolunar?",
    options: [
      "Ausencia de dolor durante toda la maniobra",
      "Un chasquido doloroso con subluxación dorsal del escafoides",
      "Limitación de la flexión palmar de la muñeca",
      "Crepitación en la articulación radiocubital distal",
    ],
    correct: 1,
    explanation:
      "En la prueba de Watson, la presión sobre el tubérculo del escafoides impide su flexión normal; si el ligamento escafolunar está roto o laxo, se produce una subluxación dorsal del escafoides con un chasquido doloroso característico.",
  },
  {
    id: 247,
    block: "ms",
    code: "Clasificación artroscópica de Geissler",
    image: null,
    prompt:
      "En la clasificación artroscópica de Geissler para las lesiones del ligamento escafolunar, ¿qué grado corresponde a una rotura ligamentosa completa que permite pasar una óptica de 2,7 mm entre el escafoides y el semilunar?",
    options: [
      "Grado I",
      "Grado II",
      "Grado IV",
      "Grado III",
    ],
    correct: 2,
    explanation:
      "En la clasificación de Geissler, el grado IV corresponde a la rotura ligamentosa completa, en la que se puede pasar una óptica de 2,7 mm entre el escafoides y el semilunar.",
  },
  {
    id: 248,
    block: "ms",
    code: "Inestabilidad mediocarpiana palmar",
    image: null,
    prompt:
      "Paciente refiere un resalte brusco y doloroso en la muñeca al realizar la desviación cubital con pronación, sin antecedente traumático claro, con laxitud palmar demostrada en la exploración de la articulación mediocarpiana. ¿Qué entidad es compatible con este cuadro?",
    options: [
      "Inestabilidad escafolunar estática",
      "Inestabilidad radiocubital distal dorsal",
      "Fractura-luxación perilunar crónica",
      "Inestabilidad mediocarpiana palmar (volar)",
    ],
    correct: 3,
    explanation:
      "La inestabilidad mediocarpiana palmar se caracteriza por laxitud de la articulación mediocarpiana con un resalte brusco o 'clunk' doloroso al desviar la muñeca cubitalmente en pronación, sin relación necesaria con un traumatismo previo.",
  },
  {
    id: 249,
    block: "ms",
    code: "Lesión del FCT tipo IB de Palmer",
    image: null,
    prompt:
      "Paciente con una lesión traumática del fibrocartílago triangular tipo IB de Palmer, con rotura periférica en la base de la estiloides cubital. ¿Cuál es el tratamiento más adecuado?",
    options: [
      "Reparación artroscópica, con o sin fijación de la estiloides",
      "Desbridamiento artroscópico simple",
      "Acortamiento cubital aislado",
      "Abstención terapéutica con seguimiento clínico",
    ],
    correct: 0,
    explanation:
      "Las lesiones tipo IB de Palmer, con rotura periférica en la base de la estiloides cubital, se tratan mediante reparación artroscópica, asociada en ocasiones a reducción abierta y fijación interna de la estiloides si es necesario.",
  },
  {
    id: 250,
    block: "ms",
    code: "Técnica de Sauvé-Kapandji",
    image: null,
    prompt:
      "¿En qué consiste la técnica de Sauvé-Kapandji para las lesiones irreparables de la articulación radiocubital distal?",
    options: [
      "Resección aislada de la cabeza del cúbito",
      "Fusión de la cabeza del cúbito al radio con pseudoartrosis del cuello cubital",
      "Artroplastia total de la articulación radiocubital distal",
      "Reanclaje foveal del fibrocartílago triangular",
    ],
    correct: 1,
    explanation:
      "La técnica de Sauvé-Kapandji consiste en la fusión de la cabeza del cúbito al radio junto con la creación de una pseudoartrosis en el cuello del cúbito, lo que permite mantener la pronosupinación evitando el impacto radiocubital.",
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
