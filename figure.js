// Stang + illustrert figur som viser fremgang mot en pull-up (0-100%).
const RIG_SVG = `
  <svg viewBox="-10 -45 240 360" role="img" aria-label="Illustrasjon av Cathrine som henger fra en pull-up-stang, ved dagens fremgang">
    <line x1="14" y1="20" x2="206" y2="20" class="goal-mark"></line>
    <text x="206" y="13" text-anchor="end" class="goal-mark-label">MÅL</text>
    <rect x="34" y="8" width="10" height="22" rx="2" class="mount"></rect>
    <rect x="176" y="8" width="10" height="22" rx="2" class="mount"></rect>
    <rect x="30" y="28" width="160" height="14" rx="7" class="bar-real"></rect>
    <path id="armLeft" class="figure-arm" d="M66,35 Q75,84.5 90,134"></path>
    <path id="armRight" class="figure-arm" d="M154,35 Q145,84.5 130,134"></path>
    <circle cx="66" cy="35" r="7" class="hand"></circle>
    <circle cx="154" cy="35" r="7" class="hand"></circle>
    <g id="figureBody" transform="translate(0,134)">
      <path class="figure-hair" d="M91,-40 C89,-59 98,-73 110,-73 C122,-73 131,-59 129,-40 C131,-32 130,-20 126,-10 C120,-19 116,-24 110,-24 C104,-24 100,-19 94,-10 C90,-20 89,-32 91,-40 Z"></path>
      <circle class="figure-head" cx="110" cy="-34" r="19"></circle>
      <path class="figure-torso" d="M90,0 C86,26 84,55 95,90 L125,90 C136,55 134,26 130,0 Z"></path>
      <rect class="figure-legs" x="93" y="88" width="15" height="80" rx="7"></rect>
      <rect class="figure-legs" x="112" y="88" width="15" height="80" rx="7"></rect>
      <path class="figure-hair" d="M92,-28 C84,-14 80,2 84,18 C88,10 92,-2 96,-14 Z"></path>
      <path class="figure-hair" d="M128,-28 C136,-14 140,2 136,18 C132,10 128,-2 124,-14 Z"></path>
    </g>
  </svg>
`;

function mountRig(container) {
  container.innerHTML = RIG_SVG;
  return {
    figureBody: container.querySelector('#figureBody'),
    armLeft: container.querySelector('#armLeft'),
    armRight: container.querySelector('#armRight'),
  };
}

function lerp(a, b, t) { return a + (b - a) * t; }

// p: 0-1. 0 = henger rett ned med strake armer, 1 = haken over stanga.
function positionFigure(rig, p) {
  const clamped = Math.max(0, Math.min(1, p));
  const ty = lerp(134, 38, clamped);
  const elbow = lerp(3, 26, clamped);
  const cy = (35 + ty) / 2;
  const cxLeft = 78 - elbow;
  const cxRight = 142 + elbow;
  rig.figureBody.setAttribute('transform', 'translate(0,' + ty.toFixed(2) + ')');
  rig.armLeft.setAttribute('d', 'M66,35 Q' + cxLeft.toFixed(2) + ',' + cy.toFixed(2) + ' 90,' + ty.toFixed(2));
  rig.armRight.setAttribute('d', 'M154,35 Q' + cxRight.toFixed(2) + ',' + cy.toFixed(2) + ' 130,' + ty.toFixed(2));
}
