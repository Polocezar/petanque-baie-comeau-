/* ============================================================
   Club Bouliste Baie-Comeau — feuille de style
   Palette tirée du maillot du club (rouge/noir) + gris "boule en acier"
   ============================================================ */

@import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;600;700&family=Work+Sans:wght@400;500;600&display=swap');

:root{
  --rouge:        #C8102E;
  --rouge-vif:    #E01438;
  --rouge-fonce:  #8F0B21;
  --noir:         #141414;
  --noir-doux:    #1f1f1f;
  --acier:        #9AA0A6;
  --acier-clair:  #E4E6E8;
  --sable:        #EDE4D3;
  --blanc:        #FFFFFF;
  --vert-ok:      #2E7D4F;
  --rouge-neg:    #C8102E;
  --or:           #D4AF37;
  --argent:       #A9A9AE;
  --bronze:       #B0703A;

  --police-affiche: "Anton", "Oswald", "Arial Narrow", sans-serif;
  --police-titre: "Oswald", "Arial Narrow", sans-serif;
  --police-texte: "Work Sans", "Segoe UI", sans-serif;

  --rayon: 14px;
  --ombre: 0 6px 20px rgba(20,14,10,.12);
  --ombre-forte: 0 16px 34px rgba(20,14,10,.2);
}

*{ box-sizing: border-box; }
html{ scroll-behavior: smooth; }

body{
  margin:0;
  font-family: var(--police-texte);
  color: var(--noir);
  line-height: 1.5;
