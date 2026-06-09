let hraVety = [];
let aktualniIndex = 0;
let vybranaKarta = null;
let tazenaKarta = null;

// ✅ TVOJE VĚTY (OPRAVENÉ POLE)
let data = [
  {
    veta: "Tatínek vaří večeři.",
    slova: [
      { text: "Tatínek", druh: "podstatné jméno" },
      { text: "vaří", druh: "sloveso" },
      { text: "večeři", druh: "podstatné jméno" }
    ]
  },
  {
    veta: "Oběd jíme u stolu!",
    slova: [
      { text: "Oběd", druh: "podstatné jméno" },
      { text: "jíme", druh: "sloveso" },
      { text: "u", druh: "předložka" },
      { text: "stolu", druh: "podstatné jméno" }
    ]
  },
  {
    veta: "Maminka a tatínek jedou na kole.",
    slova: [
      { text: "Maminka", druh: "podstatné jméno" },
      { text: "a", druh: "spojka" },
      { text: "tatínek", druh: "podstatné jméno" },
      { text: "jedou", druh: "sloveso" },
      { text: "na", druh: "předložka" },
      { text: "kole", druh: "podstatné jméno" }
    ]
  },
  {
    veta: "Babička má na zahradě slepice.",
    slova: [
      { text: "Babička", druh: "podstatné jméno" },
      { text: "má", druh: "sloveso" },
      { text: "na", druh: "předložka" },
      { text: "zahradě", druh: "podstatné jméno" },
      { text: "slepice", druh: "podstatné jméno" }
    ]
  },
  {
    veta: "Dědeček hraje karty.",
    slova: [
      { text: "Dědeček", druh: "podstatné jméno" },
      { text: "hraje", druh: "sloveso" },
      { text: "karty", druh: "podstatné jméno" }
    ]
  },
  {
    veta: "Chceš zmrzlinu nebo tříšť?",
    slova: [
      { text: "Chceš", druh: "sloveso" },
      { text: "zmrzlinu", druh: "podstatné jméno" },
      { text: "nebo", druh: "spojka" },
      { text: "tříšť", druh: "podstatné jméno" }
    ]
  },
  {
    veta: "Maminka pracuje na počítači.",
    slova: [
      { text: "Maminka", druh: "podstatné jméno" },
      { text: "pracuje", druh: "sloveso" },
      { text: "na", druh: "předložka" },
      { text: "počítači", druh: "podstatné jméno" }
    ]
  },
  {
    veta: "Miminko spí v postýlce.",
    slova: [
      { text: "Miminko", druh: "podstatné jméno" },
      { text: "spí", druh: "sloveso" },
      { text: "v", druh: "předložka" },
      { text: "postýlce", druh: "podstatné jméno" }
    ]
  },
  {
    veta: "Čtu knihu o princezně.",
    slova: [
      { text: "Čtu", druh: "sloveso" },
      { text: "knihu", druh: "podstatné jméno" },
      { text: "o", druh: "předložka" },
      { text: "princezně", druh: "podstatné jméno" }
    ]
  },
  {
    veta: "Pes běží na zahradu a štěká.",
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
    veta: "Kočka sedí na stromě a spí.",
    slova: [
      { text: "Kočka", druh: "podstatné jméno" },
      { text: "sedí", druh: "sloveso" },
      { text: "na", druh: "předložka" },
      { text: "stromě", druh: "podstatné jméno" },
      { text: "a", druh: "spojka" },
      { text: "spí", druh: "sloveso" }
    ]
  },
  {
    veta: "Dítě kreslí obrázek a zpívá.",
    slova: [
      { text: "Dítě", druh: "podstatné jméno" },
      { text: "kreslí", druh: "sloveso" },
      { text: "obrázek", druh: "podstatné jméno" },
      { text: "a", druh: "spojka" },
      { text: "zpívá", druh: "sloveso" }
    ]
  },
  {
    veta: "Žák sedí ve třídě a píše.",
    slova: [
      { text: "Žák", druh: "podstatné jméno" },
      { text: "sedí", druh: "sloveso" },
      { text: "ve", druh: "předložka" },
      { text: "třídě", druh: "podstatné jméno" },
      { text: "a", druh: "spojka" },
      { text: "píše", druh: "sloveso" }
    ]
  },
  {
    veta: "Kamarádi běží do parku a hrají si.",
    slova: [
      { text: "Kamarádi", druh: "podstatné jméno" },
      { text: "běží", druh: "sloveso" },
      { text: "do", druh: "předložka" },
      { text: "parku", druh: "podstatné jméno" },
      { text: "a", druh: "spojka" },
      { text: "hrají", druh: "sloveso" }
    ]
  }
];


// ✅ GENEROVÁNÍ
function generuj() {
  hraVety = [];
  aktualniIndex = 0;

  while (hraVety.length < 3) {
    let r = data[Math.floor(Math.random() * data.length)];
    if (!hraVety.includes(r)) {
      hraVety.push(r);
    }
  }

  document.getElementById("veta").innerText = "";
  document.getElementById("aktualni-karta").innerHTML = "";
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

// ✅ LÍZNI
function lizniKartu() {

  if (aktualniIndex >= hraVety.length) {
    document.getElementById("veta").innerText = "Konec hry ✅";
    document.getElementById("aktualni-karta").innerHTML = "";
    return;
  }

  let vetaObj = hraVety[aktualniIndex];

  document.getElementById("veta").innerText = vetaObj.veta;

  let zona = document.getElementById("aktualni-karta");
  zona.innerHTML = "";

  vetaObj.slova.forEach(s => {
    zona.appendChild(vytvorKartu(s.text, s.druh));
  });

  aktualniIndex++;
}

// ✅ PŘESUN
function presun(sloupec, karta) {

  let puvodni = karta.parentElement;

  if (puvodni && puvodni.classList.contains("sloupec")) {
    karta.remove();
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

// ✅ NOVÁ HRA
function novaHra() {
  document.querySelectorAll(".sloupec").forEach(s => {
    s.innerHTML = "";
    s.style.background = "#c8e6c9";
  });

  document.getElementById("aktualni-karta").innerHTML = "";
  document.getElementById("veta").innerText = "";

  generuj();
}

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

    sloupec.style.background = ok ? "green" : "red";
  });
}
