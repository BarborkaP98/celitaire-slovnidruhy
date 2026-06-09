let balicek = [];
let vybranaKarta = null;
let tazenaKarta = null;

// ✅ DATA (jen 4 slovní druhy)
let data = [
  {
    veta: "Pes běží na zahradu a štěká",
    slova: [
      { text: "Pes", druh: "podstatné jméno" },
      { text: "běží", druh: "sloveso" },
      { text: "na", druh: "předložka" },
      { text: "zahradu", druh: "podstatné jméno" },
      { text: "a", druh: "spojka" },
      { text: "štěká", druh: "sloveso" }
    ]
  },
  {
    veta: "Kočka sedí na stromě a spí",
    slova: [
      { text: "Kočka", druh: "podstatné jméno" },
      { text: "sedí", druh: "sloveso" },
      { text: "na", druh: "předložka" },
      { text: "stromě", druh: "podstatné jméno" },
      { text: "a", druh: "spojka" },
      { text: "spí", druh: "sloveso" }
    ]
  }
];

// ✅ GENEROVÁNÍ
function generuj() {
  balicek = [];

  let vybrana = data[Math.floor(Math.random() * data.length)];

  // zobraz větu
  document.getElementById("veta").innerText = vybrana.veta;

  vybrana.slova.forEach(s => {
    balicek.push({
      text: s.text,
      vysledek: s.druh
    });
  });

  balicek.sort(() => Math.random() - 0.5);
}

// ✅ KARTA
function vytvorKartu(text, vysledek) {
  let karta = document.createElement("div");
  karta.className = "karta";
  karta.innerText = text;
  karta.dataset.v = vysledek;
  karta.draggable = true;

  karta.addEventListener("click", () => {
    document.querySelectorAll(".karta").forEach(k => k.style.border = "none");
    karta.style.border = "2px solid red";
    vybranaKarta = karta;
  });

  karta.addEventListener("dragstart", () => {
    tazenaKarta = karta;
  });

  return karta;
}

// ✅ LÍZNUTÍ
function lizniKartu() {
  let zona = document.getElementById("aktualni-karta");

  if (balicek.length === 0) {
    zona.innerHTML = "<b>Konec hry ✅</b>";
    return;
  }

  let k = balicek.pop();

  zona.innerHTML = "";
  zona.appendChild(vytvorKartu(k.text, k.vysledek));
}

// ✅ PŘESUN
function presun(sloupec, karta) {

  let puvodni = karta.parentElement;

  if (puvodni && puvodni.classList.contains("sloupec")) {
    karta.remove();

    if (puvodni.querySelectorAll(".karta").length === 0) {
      puvodni.innerHTML = "";
    }
  }

  if (sloupec.querySelectorAll(".karta").length === 0) {
    let nadpis = document.createElement("div");
    nadpis.innerText = karta.dataset.v;
    nadpis.style.fontWeight = "bold";
    sloupec.appendChild(nadpis);
  }

  sloupec.appendChild(karta);

  vybranaKarta = null;
  tazenaKarta = null;

  document.getElementById("aktualni-karta").innerHTML = "";
}

// ✅ INIT
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".sloupec").forEach(sloupec => {

    sloupec.addEventListener("click", () => {
      if (!vybranaKarta) return;
      presun(sloupec, vybranaKarta);
    });

    sloupec.addEventListener("dragover", e => e.preventDefault());

    sloupec.addEventListener("drop", e => {
      e.preventDefault();
      if (!tazenaKarta) return;
      presun(sloupec, tazenaKarta);
    });

  });

  generuj();
});

// ✅ KONTROLA
function zkontroluj() {
  document.querySelectorAll(".sloupec").forEach(sloupec => {

    let karty = sloupec.querySelectorAll(".karta");

    if (karty.length === 0) {
      sloupec.style.background = "red";
      return;
    }

    let v = karty[0].dataset.v;
    let ok = true;

    karty.forEach(k => {
      if (k.dataset.v !== v) ok = false;
    });

    sloupec.style.background =
      ok && karty.length >= 1 ? "green" : "red";
  });
}

// ✅ NOVÁ HRA
function novaHra() {
  document.querySelectorAll(".sloupec").forEach(s => {
    s.innerHTML = "";
    s.style.background = "#c8e6c9";
  });

  document.getElementById("aktualni-karta").innerHTML = "";

  generuj();
}
