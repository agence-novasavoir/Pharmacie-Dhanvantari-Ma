
const CONFIG = {
  whatsapp: "2290151303647",
  phone1: "+229 01 51 30 36 47",
  phone2: "+229 01 45 71 32 64",
  maps: "https://maps.app.goo.gl/AEkMrrphcdCBYKuMA"
};

function whatsappUrl(message){
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(message){
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
}

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const backTop = document.querySelector(".back-top");

  if(menuToggle && navLinks){
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuToggle.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
    });
    navLinks.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
      });
    });
  }

  window.addEventListener("scroll", () => {
    if(header) header.classList.toggle("scrolled", window.scrollY > 20);
    if(backTop) backTop.classList.toggle("show", window.scrollY > 450);
  }, {passive:true});

  if(backTop){
    backTop.addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));
  }

  const year = document.querySelectorAll("[data-year]");
  year.forEach(el => el.textContent = new Date().getFullYear());

  const reveal = document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window){
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:.10});
    reveal.forEach(el => observer.observe(el));
  }else{
    reveal.forEach(el => el.classList.add("visible"));
  }

  updateOpeningStatus();
  setInterval(updateOpeningStatus, 60000);

  document.querySelectorAll("[data-whatsapp]").forEach(btn => {
    btn.addEventListener("click", () => {
      openWhatsApp(btn.dataset.whatsapp || "Bonjour Pharmacie Dhanvantari-MA, je souhaite obtenir des informations.");
    });
  });
});

function updateOpeningStatus(){
  const dots = document.querySelectorAll(".status-dot");
  if(!dots.length) return;
  const now = new Date();
  const minutes = now.getHours()*60 + now.getMinutes();
  const open = minutes >= 420 && minutes < 1320;
  dots.forEach(dot => {
    dot.style.background = open ? "#22c55e" : "#ef4444";
    dot.title = open ? "Ouverte actuellement" : "Fermée actuellement";
  });
}

function productMessage(action, product){
  const messages = {
    availability: `Bonjour Pharmacie Dhanvantari-MA, je souhaiterais savoir si le produit « ${product} » est actuellement disponible. Merci.`,
    price: `Bonjour Pharmacie Dhanvantari-MA, pourriez-vous m'indiquer le prix du produit « ${product} » ? Merci.`,
    order: `Bonjour Pharmacie Dhanvantari-MA, je souhaite commander/réserver le produit « ${product} ». Pouvez-vous me confirmer sa disponibilité et les modalités ? Merci.`
  };
  return messages[action] || messages.availability;
}

/* Accueil : animation d'introduction et micro-parallaxe, index uniquement */
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("homeIntro");
  if (intro) {
    // Ne pas bloquer la page si le navigateur reste ouvert très longtemps.
    window.setTimeout(() => {
      intro.classList.add("intro-finished");
    }, 3600);
  }

  const home = document.body.classList.contains("home-page");
  if (!home || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const hero = document.querySelector(".hero");
  const visual = document.querySelector(".hero-image img");
  if (!hero || !visual) return;

  let raf = null;
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      visual.style.transform = `translate3d(${x * 8}px, ${y * 5 - 8}px, 0)`;
    });
  });
  hero.addEventListener("mouseleave", () => {
    if (raf) cancelAnimationFrame(raf);
    visual.style.transform = "";
  });
});
