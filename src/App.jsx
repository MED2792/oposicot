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
    options: ["31-A1", "31-A2", "31-A3", "31-B1"],
    correct: 0,
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
    options: ["23-A3", "23-B2", "23-C1", "23-C2"],
    correct: 3,
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
    options: ["41-A2", "41-B2", "41-B3", "41-C1"],
    correct: 2,
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
    options: ["Weber A", "Weber B", "Weber C", "Weber D"],
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
    options: ["Garden I", "Garden II", "Garden III", "Garden IV"],
    correct: 2,
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
    options: ["< 30°", "30°–50°", "> 50°", "90° exactos"],
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
    options: ["Tile A", "Tile B", "Tile C", "Tile 0"],
    correct: 2,
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
    options: ["Tipo A", "Tipo B", "Tipo C", "Tipo D"],
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
      "Pared posterior del cuerpo vertebral y ligamento longitudinal posterior",
      "Pedículos, láminas y ligamento amarillo",
      "Apófisis espinosas y ligamentos interespinosos",
    ],
    correct: 1,
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
    options: ["Frankel A", "Frankel B", "Frankel C o D", "Frankel E"],
    correct: 2,
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
      "Ausencia completa de función motora y sensitiva en los segmentos sacros S4-S5",
      "Función motora útil en más de la mitad de los músculos clave",
      "Alteración sensitiva aislada sin afectación motora",
    ],
    correct: 1,
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
      "Más de 45° de angulación, sin importar el desplazamiento",
      "Más de 1 cm de desplazamiento o más de 45° de angulación",
      "Cualquier trazo de fractura visible en la radiografía",
      "Más de 2 cm de desplazamiento exclusivamente",
    ],
    correct: 1,
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
    options: ["11-A1", "11-A3", "11-B1", "11-C1"],
    correct: 2,
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
    options: ["Mason I", "Mason II", "Mason III", "Mason IV"],
    correct: 1,
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
    options: ["13-A", "13-B", "13-C", "13-D"],
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
      "Fractura de Galeazzi",
      "Fractura de Monteggia",
      "Fractura de Colles",
      "Fractura de Smith",
    ],
    correct: 1,
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
      "Fractura de Monteggia",
      "Fractura de Barton",
      "Fractura de Galeazzi",
      "Fractura de Chauffeur",
    ],
    correct: 2,
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
    options: ["23-A2", "23-B1", "23-C1", "23-C3"],
    correct: 0,
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
    options: ["Herbert A1", "Herbert A2", "Herbert B2", "Herbert C"],
    correct: 1,
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
      "Subescapular",
      "Infraespinoso",
      "Supraespinoso",
      "Redondo menor",
    ],
    correct: 2,
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
      "Extensor radial corto del carpo",
      "Pronador redondo",
      "Flexor cubital del carpo",
    ],
    correct: 1,
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
    options: ["2", "3", "4", "5"],
    correct: 2,
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
    options: ["Axilar", "Torácico largo", "Supraescapular", "Musculocutáneo"],
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
      "Desfibrilación simple del labrum superior",
      "Desprendimiento del labrum superior con el anclaje del bíceps",
      "Rotura en asa de cubo del labrum superior sin afectación del tendón del bíceps",
      "Rotura del labrum extendida hacia el tendón del bíceps",
    ],
    correct: 2,
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
      "Ligamento coracohumeral",
      "Ligamento glenohumeral superior",
      "Ligamento glenohumeral medio",
      "Ligamento glenohumeral inferior",
    ],
    correct: 3,
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
    options: ["2 cm", "5 cm", "8 cm", "10 cm"],
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
      "La articulación acromioclavicular",
      "El espacio subacromial",
      "La articulación esternoclavicular",
    ],
    correct: 1,
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
    options: ["C5-C6", "C7 aislada", "C8-T1", "Todo el plexo (C5-T1)"],
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
      "Reflejo de Moro conservado",
      "Signo de Horner",
      "Ausencia del reflejo de prensión",
      "Mano en garra",
    ],
    correct: 1,
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
      "Síndrome de Poland",
      "Deformidad de Sprengel",
      "Disostosis cleidocraneal",
      "Luxación congénita de hombro",
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
      "La pseudoartrosis congénita cursa con dolor intenso",
      "La pseudoartrosis congénita presenta callo hipertrófico en la radiografía",
      "La pseudoartrosis congénita está presente desde el nacimiento, sin fractura previa ni dolor",
      "La fractura obstétrica es siempre bilateral",
    ],
    correct: 2,
    explanation:
      "En la pseudoartrosis congénita de clavícula nunca hubo una fractura: la tumoración está presente desde el nacimiento y es indolora, a diferencia de la fractura obstétrica.",
  },
  {
    id: 33,
    block: "ms",
    code: "Síndrome de Poland",
    image: null,
    prompt:
      "El síndrome de Poland se caracteriza fundamentalmente por:",
    options: [
      "Fusión congénita de vértebras cervicales",
      "Aplasia unilateral de la porción costoesternal del pectoral mayor con alteraciones ipsilaterales en la mano",
      "Ausencia del tercio externo de la clavícula",
      "Hipoplasia bilateral de la cavidad glenoidea",
    ],
    correct: 1,
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
      "Tortícolis muscular congénita",
      "Tortícolis postural congénita",
      "Síndrome de Klippel-Feil",
      "Desplazamiento rotatorio atlo-axoideo",
    ],
    correct: 1,
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
      "El nervio supraescapular contra la escotadura espinoglenoidea",
      "Un elemento del manguito rotador contra el borde anteroinferior del acromion, la articulación acromioclavicular o el ligamento coracoacromial",
      "El tendón del bíceps contra el surco bicipital",
      "El nervio axilar contra el cuello quirúrgico del húmero",
    ],
    correct: 1,
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
    options: ["Estadio I", "Estadio II", "Estadio III", "Estadio IV"],
    correct: 1,
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
    options: ["Estadio 1", "Estadio 2", "Estadio 3", "Estadio 4"],
    correct: 2,
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
      "Media luna; reparación directa a hueso",
      "En forma de U o L; convergencia de márgenes y reparación a hueso",
      "Masiva, contraída e inmóvil; deslizamiento de intervalos",
      "PASTA; reanclaje transtendinoso",
    ],
    correct: 1,
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
      "Únicamente si afecta a más de 2 tendones completos",
      "Solo si hay degeneración grasa severa en los 4 tendones simultáneamente",
      "Si ocurre cualquiera de los siguientes: retracción hasta glena o más allá, infiltración grasa muscular severa, o ascenso de la cabeza humeral con distancia acromiohumeral <7 mm",
      "Únicamente cuando coexiste con artrosis glenohumeral franca",
    ],
    correct: 2,
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
      "Drop-arm test; lesión aislada del subescapular",
      "Belly press test; lesión del subescapular superior",
      "External lag test; rotura posterosuperior masiva con afectación de infraespinoso y redondo menor",
      "Internal lag test; lesión aislada del infraespinoso",
    ],
    correct: 2,
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
    options: ["Grado II", "Grado III", "Grado IV", "Grado V"],
    correct: 2,
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
      "Edad avanzada con bajas demandas funcionales",
      "Rotura masiva e irreparable del MR con elevación activa <90º",
      "Disfunción del deltoides o del nervio axilar",
      "Escape anterosuperior de la cabeza humeral",
    ],
    correct: 2,
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
      "Reparación quirúrgica urgente por vía artroscópica",
      "Tratamiento conservador inicial (no todo MR roto debe intervenirse)",
      "Artroplastia inversa de entrada",
      "Tenotomía del bíceps de forma sistemática",
    ],
    correct: 1,
    explanation:
      "Las roturas parciales de espesor <50% sin traumatismo agudo ni gran debilidad se tratan inicialmente de forma conservadora. Cirugía precoz solo si hay trauma agudo con gran debilidad o tamaño >3 cm.",
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
                const s = stats.byBlock[b.id];
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
