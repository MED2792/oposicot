import { useState, useMemo } from "react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');`;

const BLOCKS = [
  { id: "fx", label: "Fracturas y clasificación AO" },
  { id: "cadera", label: "Cadera y pelvis" },
  { id: "columna", label: "Columna vertebral" },
];

const QUESTIONS = [
  {
    id: 1,
    block: "fx",
    code: "31-A1",
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div>
          <div className="osc-display" style={{ fontSize: "19px", fontWeight: 700, letterSpacing: "-0.01em" }}>
            OposiCOT
          </div>
          <div
            className="osc-mono"
            style={{ fontSize: "11px", letterSpacing: "0.1em", color: "#5C7A88", marginTop: "2px" }}
          >
            BANCO DE PREGUNTAS · TRAUMATOLOGÍA
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {stage === "quiz" && (
            <div className="osc-mono" style={{ fontSize: "13px", color: "#8FA0A8", textAlign: "right" }}>
              CASO {String(idx + 1).padStart(2, "0")} / {String(pool.length).padStart(2, "0")}
              <br />
              <span style={{ color: "#A9CBDA" }}>
                ACIERTOS {stats.totalCorrect}/{stats.total}
              </span>
            </div>
          )}
          <a
            href="https://ko-fi.com/TU_USUARIO"
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
            <p style={{ color: "#8FA0A8", fontSize: "15px", lineHeight: 1.6, marginBottom: "22px" }}>
              Selecciona los bloques del temario que quieres incluir en esta
              sesión de test. Cada pregunta está etiquetada con su código de
              clasificación, como en un informe clínico real.
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
                {idx + 1 >= pool.length ? "Ver resultados" : "Siguiente caso →"}
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
