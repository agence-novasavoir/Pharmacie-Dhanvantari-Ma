
const gardes = [
  ["2026-07-13","2026-07-19","13 juillet – 19 juillet 2026"],
  ["2026-08-03","2026-08-09","03 août – 09 août 2026"],
  ["2026-08-24","2026-08-30","24 août – 30 août 2026"],
  ["2026-09-14","2026-09-20","14 septembre – 20 septembre 2026"],
  ["2026-10-05","2026-10-11","05 octobre – 11 octobre 2026"],
  ["2026-10-26","2026-11-01","26 octobre – 01 novembre 2026"],
  ["2026-11-16","2026-11-22","16 novembre – 22 novembre 2026"],
  ["2026-12-07","2026-12-13","07 décembre – 13 décembre 2026"],
  ["2026-12-28","2027-01-03","28 décembre 2026 – 03 janvier 2027"]
];

function localDate(iso){
  const [y,m,d]=iso.split("-").map(Number);
  return new Date(y,m-1,d);
}
function renderGardes(){
  const box=document.getElementById("guardTimeline");
  if(!box) return;
  const today=new Date(); today.setHours(0,0,0,0);
  box.innerHTML=gardes.map((g,i)=>{
    const start=localDate(g[0]), end=localDate(g[1]);
    const current=today>=start && today<=end;
    return `<article class="guard ${current?"current":""}">
      <strong>Garde n°${i+1}</strong>
      <span>${g[2]}</span>
      <div class="small" style="margin-top:7px">Contact garde : +229 01 51 30 36 47</div>
    </article>`;
  }).join("");
}
document.addEventListener("DOMContentLoaded",renderGardes);
