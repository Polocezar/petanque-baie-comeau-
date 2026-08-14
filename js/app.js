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

  // Marque le lien de navigation actif selon la page courante
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav.principale a").forEach(a => {
    if (a.getAttribute("href") === page) a.classList.add("actif");
  });
});

// Échappe le HTML pour éviter toute injection dans les champs saisis manuellement
function echapper(txt) {
  if (txt === undefined || txt === null) return "";
  const div = document.createElement("div");
  div.textContent = txt;
  return div.innerHTML;
}

// Formate une date ISO (2026-04-14) en "14 avril 2026"
function formaterDate(iso) {
  if (!iso) return "";
  const mois = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
  const [a, m, j] = iso.split("-").map(Number);
  return `${j} ${mois[m - 1]} ${a}`;
}

// Formate une date ISO en petit bloc {jour, mois} pour les cartes de match
function formaterDateBloc(iso) {
  const moisCourt = ["JAN","FÉV","MAR","AVR","MAI","JUIN","JUIL","AOÛT","SEP","OCT","NOV","DÉC"];
  const [a, m, j] = iso.split("-").map(Number);
  return { jour: j, mois: moisCourt[m - 1] };
}

// Affiche une alerte temporaire dans un conteneur donné
function afficherAlerte(conteneurId, message, type = "ok") {
  const conteneur = document.getElementById(conteneurId);
  if (!conteneur) return;
  conteneur.innerHTML = `<div class="alerte ${type}">${echapper(message)}</div>`;
  if (type === "ok") setTimeout(() => { conteneur.innerHTML = ""; }, 4000);
}
