/* ============================================================
   Fonctions communes — Club Bouliste Baie-Comeau
   ============================================================ */

// Menu burger (mobile)
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("btn-burger");
  const nav = document.querySelector("nav.principale");
  if (burger && nav) {
    burger.addEventListener("click", () => nav.classList.toggle("ouvert"));
  }

  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav.principale a").forEach(a => {
    if (a.getAttribute("href") === page) a.classList.add("actif");
  });
});

function echapper(txt) {
  if (txt === undefined || txt === null) return "";
  const div = document.createElement("div");
  div.textContent = txt;
  return div.innerHTML;
}

if (typeof auth !== "undefined") {
  auth.onAuthStateChanged(user => {
    const c = document.getElementById("lien-connexion");
    const i = document.getElementById("lien-inscription");
    const d = document.getElementById("lien-deconnexion");
    if (c) c.style.display = user ? "none" : "";
    if (i) i.style.display = user ? "none" : "";
    if (d) {
      d.style.display = user ? "" : "none";
      d.onclick = (e) => { e.preventDefault(); auth.signOut().then(() => location.href = "index.html"); };
    }
  });
}

function formaterDate(iso) {
  if (!iso) return "";
  const mois = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
  const [a, m, j] = iso.split("-").map(Number);
  return `${j} ${mois[m - 1]} ${a}`;
}

function formaterDateBloc(iso) {
  const moisCourt = ["JAN","FÉV","MAR","AVR","MAI","JUIN","JUIL","AOÛT","SEP","OCT","NOV","DÉC"];
  const [a, m, j] = iso.split("-").map(Number);
  return { jour: j, mois: moisCourt[m - 1] };
}

function afficherAlerte(conteneurId, message, type = "ok") {
  const conteneur = document.getElementById(conteneurId);
  if (!conteneur) return;
  conteneur.innerHTML = `<div class="alerte ${type}">${echapper(message)}</div>`;
  if (type === "ok") setTimeout(() => { conteneur.innerHTML = ""; }, 4000);
}

const observateurScroll = ("IntersectionObserver" in window)
  ? new IntersectionObserver((entrees) => {
      entrees.forEach(entree => {
        if (entree.isIntersecting) {
          entree.target.classList.add("visible");
          observateurScroll.unobserve(entree.target);
        }
      });
    }, { threshold: .12 })
  : null;

function activerRevelationScroll(conteneur) {
  if (!observateurScroll) return;
  const racine = conteneur || document;
  racine.querySelectorAll(".carte, .carte-joueur, .match, .message").forEach(el => {
    if (el.dataset.revele) return;
    el.dataset.revele = "1";
    el.classList.add("au-scroll");
    observateurScroll.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  activerRevelationScroll();
  const main = document.querySelector("main");
  if (main && "MutationObserver" in window) {
    const observateurMutation = new MutationObserver(() => activerRevelationScroll(main));
    observateurMutation.observe(main, { childList: true, subtree: true });
  }
});
