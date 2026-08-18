
const produits = [
  {
    nom:"Actimove — orthèses et maintien articulaire",
    categorie:"Orthopédie",
    image:"1.jpeg",
    description:"Gamme de produits de maintien et de soutien articulaire présentée dans notre espace Orthopédie.",
    source:"1.jpeg"
  },
  {
    nom:"Oftomance — soins oculaires",
    categorie:"Conseils",
    image:"2.jpeg",
    description:"Produits de soins oculaires présentés dans notre espace Conseils. Disponibilité et utilisation à confirmer auprès de l'équipe.",
    source:"2.jpeg"
  },
  {
    nom:"Produits Lilas & espace maternité",
    categorie:"Beauté & maternité",
    image:"3.jpeg",
    description:"Sélection de produits de soins, beauté, hygiène et maternité visible dans notre officine.",
    source:"3.jpeg"
  },
  {
    nom:"GamalateBios, BIOFAR & Genesium",
    categorie:"Compléments & vitamines",
    image:"4.jpeg",
    description:"Univers de compléments alimentaires, vitamines et minéraux présenté dans notre rayon.",
    source:"4.jpeg"
  },
  {
    nom:"Bien-être & hygiène intime",
    categorie:"Bien-être & hygiène",
    image:"5.jpeg",
    description:"Produits dédiés au confort, au bien-être et à l'hygiène quotidienne.",
    source:"5.jpeg"
  },
  {
    nom:"Espace pharmacie Dhanvantari-MA",
    categorie:"Officine",
    image:"6.jpeg",
    description:"Découvrez l'officine, ses horaires et son environnement.",
    source:"6.jpeg"
  },
  {
    nom:"MTN MoMo Pay & prestations",
    categorie:"Paiement & assurance",
    image:"7.jpeg",
    description:"Informations visibles sur les moyens de paiement et prestations/agréments présentés par l'officine.",
    source:"7.jpeg"
  },
  {
    nom:"Nursie, Conforta, Physiolac & Blédine",
    categorie:"Bébé & puériculture",
    image:"8.jpeg",
    description:"Espace bébé avec biberons, accessoires, laits infantiles et produits alimentaires pour enfants.",
    source:"8.jpeg"
  },
  {
    nom:"Magnésium",
    categorie:"Compléments & vitamines",
    image:null,
    description:"Produit de complémentation à retrouver selon le stock réel de la pharmacie.",
    source:"Catalogue provisoire"
  },
  {
    nom:"Fer",
    categorie:"Compléments & vitamines",
    image:null,
    description:"Produit de complémentation à retrouver selon le stock réel de la pharmacie.",
    source:"Catalogue provisoire"
  },
  {
    nom:"Complexe B",
    categorie:"Compléments & vitamines",
    image:null,
    description:"Produit de complémentation à retrouver selon le stock réel de la pharmacie.",
    source:"Catalogue provisoire"
  },
  {
    nom:"Produits bébé Physiolac",
    categorie:"Bébé & puériculture",
    image:null,
    description:"Gamme de produits bébé à vérifier dans l'inventaire réel de la pharmacie.",
    source:"Catalogue provisoire"
  },
  {
    nom:"Blédine",
    categorie:"Bébé & puériculture",
    image:null,
    description:"Produits alimentaires pour bébé à vérifier selon l'inventaire réel.",
    source:"Catalogue provisoire"
  },
  {
    nom:"Nursie",
    categorie:"Bébé & puériculture",
    image:null,
    description:"Accessoires de puériculture à vérifier selon l'inventaire réel.",
    source:"Catalogue provisoire"
  }
];

function productCard(p, index){
  const image = p.image
    ? `<img src="${p.image}" alt="${p.nom}" loading="lazy">`
    : `<div style="height:100%;display:grid;place-items:center;color:#087a43;font-weight:900;padding:20px;text-align:center">Catalogue<br>à mettre à jour</div>`;

  return `
    <article class="product-card reveal">
      <div class="product-image">
        ${image}
        <span class="product-number">${String(index+1).padStart(2,"0")}</span>
      </div>
      <div class="product-body">
        <div class="product-category">${p.categorie}</div>
        <h3>${p.nom}</h3>
        <p>${p.description}</p>
        <div class="price-note">Prix : à demander • Disponibilité : à vérifier</div>
        <div class="product-actions">
          <button class="btn btn-outline" onclick="showProduct('${encodeURIComponent(p.nom)}')">Détails</button>
          <button class="btn btn-whatsapp" onclick="openWhatsApp(productMessage('availability', '${escapeJs(p.nom)}'))">Disponibilité</button>
        </div>
      </div>
    </article>`;
}

function escapeJs(value){
  return value.replaceAll("\\","\\\\").replaceAll("'","\\'");
}

function renderCatalogue(){
  const grid = document.getElementById("catalogueGrid");
  if(!grid) return;

  const search = (document.getElementById("productSearch")?.value || "").toLowerCase().trim();
  const category = document.getElementById("categoryFilter")?.value || "Toutes";

  const filtered = produits.filter(p => {
    const matchesCategory = category === "Toutes" || p.categorie === category;
    const haystack = `${p.nom} ${p.categorie} ${p.description}`.toLowerCase();
    return matchesCategory && haystack.includes(search);
  });

  grid.innerHTML = filtered.map((p,i)=>productCard(p,i)).join("");
  const count = document.getElementById("catalogueCount");
  if(count) count.textContent = `${filtered.length} élément(s) affiché(s)`;

  document.querySelectorAll("#catalogueGrid .reveal").forEach(el => requestAnimationFrame(()=>el.classList.add("visible")));
  const empty = document.getElementById("catalogueEmpty");
  if(empty) empty.style.display = filtered.length ? "none" : "block";
}

function showProduct(encodedName){
  const name = decodeURIComponent(encodedName);
  const p = produits.find(x => x.nom === name);
  if(!p) return;
  const modal = document.getElementById("productModal");
  if(!modal) return;

  document.getElementById("modalProductName").textContent = p.nom;
  document.getElementById("modalProductCategory").textContent = p.categorie;
  document.getElementById("modalProductDescription").textContent = p.description;
  document.getElementById("modalProductImage").innerHTML = p.image
    ? `<img src="${p.image}" alt="${p.nom}" style="width:100%;height:250px;object-fit:cover;border-radius:16px;margin-bottom:18px">`
    : `<div style="height:160px;border-radius:16px;background:#e9f8f0;display:grid;place-items:center;color:#087a43;font-weight:900;margin-bottom:18px">Photo à ajouter</div>`;

  const button = document.getElementById("modalWhatsApp");
  button.onclick = () => openWhatsApp(productMessage("availability", p.nom));
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
}

function closeProductModal(){
  const modal = document.getElementById("productModal");
  if(modal){
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden","true");
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  const grid = document.getElementById("catalogueGrid");
  if(!grid) return;

  const filter = document.getElementById("categoryFilter");
  [...new Set(produits.map(p=>p.categorie))].sort().forEach(c=>{
    const option = document.createElement("option");
    option.value=c; option.textContent=c; filter.appendChild(option);
  });

  document.getElementById("productSearch")?.addEventListener("input", renderCatalogue);
  filter?.addEventListener("change", renderCatalogue);
  document.getElementById("modalClose")?.addEventListener("click", closeProductModal);
  document.getElementById("productModal")?.addEventListener("click", e=>{
    if(e.target.id === "productModal") closeProductModal();
  });

  renderCatalogue();
});
