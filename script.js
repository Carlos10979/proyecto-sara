const wishes = [
  "Disfrutar plenamente de tu presencia y de cada momento juntos.",
  "Conocerte más a fondo: tus miedos, tus heridas, tus fortalezas y tu esencia.",
  "Seguir fortaleciendo esta conexión tan especial que tenemos.",
  "Continuar siendo ese súper equipo que somos, acompañándonos y disfrutando el camino.",
  "Fortalecer juntos nuestra relación con Dios."
];
document.getElementById("beginBtn").addEventListener("click",()=>document.getElementById("carta").scrollIntoView({behavior:"smooth"}));
const wishButtons=[...document.querySelectorAll(".candle-card")],foundWishes=new Set();
wishButtons.forEach(button=>button.addEventListener("click",()=>{
  const index=Number(button.dataset.wish);foundWishes.add(index);button.classList.add("lit");
  document.getElementById("wishCount").textContent=`DESEO ${String(index+1).padStart(2,"0")} DE 05`;
  document.getElementById("wishText").textContent=wishes[index];
  document.getElementById("wishProgress").style.width=`${foundWishes.size*20}%`;
  const all=document.getElementById("allWishes");
  if(foundWishes.size===wishes.length){all.textContent="Los cinco deseos están encendidos. Ahora descubre los tuyos. ♡";setTimeout(()=>document.getElementById("tus-deseos").scrollIntoView({behavior:"smooth"}),4000)}

  else all.textContent=`Ya descubriste ${foundWishes.size} de 5 deseos. Sigue encendiendo las velitas. ✨`;
}));

document.getElementById("saveAnswer").addEventListener("click", async () => {
  const answer = document.getElementById("answer").value.trim();
  const note = document.getElementById("answerNote");
  const button = document.getElementById("saveAnswer");

  if (!answer) {
    note.textContent = "Escribe primero tus deseos; quiero conocerlos. ♡";
    document.getElementById("answer").focus();
    return;
  }

  button.disabled = true;
  button.textContent = "Enviando tus deseos...";

  try {
    const response = await fetch("https://formsubmit.co/ajax/saravpuerta@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        message: answer,
        _subject: "Los deseos de nuestra aventura ♡",
        _template: "table"
      })
    });

    if (!response.ok) throw new Error("No se pudo enviar");

    note.textContent = "Tus deseos llegaron correctamente. Gracias por compartirlos conmigo. ♡";
    document.getElementById("answer").value = "";

  } catch (error) {
    note.textContent = "No pudimos enviar tus deseos. Inténtalo nuevamente. ♡";
  }

  button.disabled = false;
  button.textContent = "Guardar mis deseos";
});

document.getElementById("yesBtn").addEventListener("click",()=>{
  document.getElementById("finalMessage").classList.add("show");
  document.getElementById("finalMessage").scrollIntoView({behavior:"smooth",block:"center"});
  for(let i=0;i<28;i++){const star=document.createElement("span");star.textContent=Math.random()>.5?"✦":"♡";star.style.cssText=`position:fixed;left:${Math.random()*100}vw;top:-20px;z-index:20;color:${Math.random()>.5?"#a9ecff":"#e4d5ff"};font-size:${12+Math.random()*16}px;pointer-events:none;animation:fall ${2.5+Math.random()*2.5}s linear forwards;`;document.body.appendChild(star);setTimeout(()=>star.remove(),5200)}
});
const style=document.createElement("style");style.textContent="@keyframes fall{to{transform:translateY(110vh) rotate(360deg);opacity:0}}";document.head.appendChild(style);
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
window.addEventListener("scroll",()=>{const scrollable=document.documentElement.scrollHeight-window.innerHeight;document.getElementById("progress").style.width=`${scrollable>0?(window.scrollY/scrollable)*100:0}%`});
