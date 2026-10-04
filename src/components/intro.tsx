/**
 * Intro de marca: aparece bamu.ro y, debajo, "Báez Muñoz Roberto" con las dos
 * primeras letras de cada palabra resaltadas, para explicar el nombre. Luego la
 * pantalla sube como una cortina mientras entra el hero.
 * Solo CSS (transform y opacity): corre sin esperar a JavaScript.
 * Una vez por sesión (ver introScript); nunca con movimiento reducido ni al imprimir.
 */
const words = [
  ["Bá", "ez"],
  ["Mu", "ñoz"],
  ["Ro", "berto"],
];

export function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-stage">
        <p className="intro-logo">
          bamu<span className="intro-dot">.ro</span>
        </p>
        <p className="intro-name">
          {words.map(([keep, rest], i) => (
            <span key={keep} className="intro-word" style={{ "--w": i } as React.CSSProperties}>
              <span className="intro-keep">{keep}</span>
              {rest}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

/** Corre antes del primer pintado: decide si la intro se reproduce en esta sesión. */
export const introScript = `try{var d=document.documentElement;if(sessionStorage.getItem("intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.intro="seen"}else{sessionStorage.setItem("intro","1");d.dataset.intro="play"}}catch(e){document.documentElement.dataset.intro="seen"}`;
