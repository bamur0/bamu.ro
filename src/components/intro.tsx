/**
 * Intro de marca: "Báez Muñoz Roberto" se reduce a las dos primeras letras de
 * cada palabra y se convierte en bamu.ro. Solo CSS: corre sin esperar a JavaScript.
 * Se muestra una vez por sesión (ver introScript) y nunca con movimiento reducido ni al imprimir.
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
        <p className="intro-name">
          {words.map(([keep, drop], i) => (
            <span key={keep} className="intro-word">
              <span className="intro-keep">{keep}</span>
              <span className="intro-drop">{drop}</span>
              {i < words.length - 1 && <span className="intro-gap">{"\u00A0"}</span>}
            </span>
          ))}
        </p>
        <p className="intro-logo">
          bamu<span className="text-muted">.ro</span>
        </p>
      </div>
    </div>
  );
}

/** Corre antes del primer pintado: decide si la intro se reproduce en esta sesión. */
export const introScript = `try{var d=document.documentElement;if(sessionStorage.getItem("intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.intro="seen"}else{sessionStorage.setItem("intro","1");d.dataset.intro="play"}}catch(e){document.documentElement.dataset.intro="seen"}`;
