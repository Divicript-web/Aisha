/* ================ NEIGE MULTICOLORE ================ */
const snowLayer = document.getElementById("snow-layer");
function createSnowFlake() {
    const flake = document.createElement("div");
    flake.innerHTML = "❄";
    flake.style.left = Math.random()*100+"vw";
    flake.style.fontSize = 10+Math.random()*20+"px";
    flake.style.color = `hsl(${Math.random()*360}, 80%, 70%)`; // couleur aléatoire
    flake.style.opacity = Math.random();
    flake.style.position="fixed";
    flake.style.top="-10px";
    flake.style.animation=`fall ${3+Math.random()*5}s linear`;
    snowLayer.appendChild(flake);
    setTimeout(()=>flake.remove(),8000);
}
setInterval(createSnowFlake,120);

/* ================ ÉTOILES ================ */
const starsLayer = document.getElementById("stars-layer");
for(let i=0;i<150;i++){
    const star=document.createElement("div");
    star.className="star";
    star.style.left=Math.random()*100+"%";
    star.style.top=Math.random()*100+"%";
    star.style.fontSize=1+Math.random()*3+"px";
    starsLayer.appendChild(star);
}

/* ================ TEXTE TYPEWRITER ================ */
const texts = [
`En ce jour de Noël, une lumière particulière s'installe.
Elle ne vient pas seulement des décorations, mais des coeurs qui s'ouvrent.
C'est un moment simple, vrai où la paix cherche sa place en nous.`,

`Noël, c'est un rappel silencieux de l'amour, du partage et de la douceur.
Le sourire compte plus que les mots, chaque geste devient précieux.`,

`En ce jour si spécial, je te souhaite un Noël rempli de chaleur et de cérénité.
Que la joie t'accompagne aujourd'hui et que sa lumière te suive bien après ce jour.`
];

let currentText=0;
function typeWriter(element,text,callback){
    let i=0;
    element.style.opacity=1;
    function type(){if(i<text.length){element.innerHTML+=text.charAt(i);i++;setTimeout(type,30);}else if(callback){setTimeout(callback,800);}}
    type();
}
function showNextText(){if(currentText<texts.length){const element=document.getElementById("text"+(currentText+1));typeWriter(element,texts[currentText],()=>{currentText++;showNextText();});}}
showNextText();

/* ================ MESSAGE SECRET ================ */
const secretMessage=document.getElementById("secret-message");
document.getElementById("open-secret").onclick=()=>{
    secretMessage.style.display = secretMessage.style.display==="block" ? "none" : "block";
};

/* ================ GUIRLANDES ================ */
const lightsLayer=document.getElementById("lights-layer");
document.getElementById("toggle-lights").onclick=()=>{
    if(lightsLayer.style.display==="block"){lightsLayer.style.display="none"; lightsLayer.innerHTML="";}
    else{
        lightsLayer.style.display="block";
        for(let i=0;i<80;i++){
            const light=document.createElement("div");
            light.className="light";
            light.style.left=Math.random()*100+"%";
            light.style.top=Math.random()*100+"%";
            light.style.backgroundColor=`hsl(${Math.random()*360},100%,50%)`;
            lightsLayer.appendChild(light);
        }
    }
};

/* ================ MUSIQUE + FADE ================= */
const music1 = document.getElementById("music1");
const music2 = document.getElementById("music2");
music1.volume = 1;
music2.volume = 0;

// Jouer musique 1 dès que possible
window.addEventListener("load", ()=>{
    music1.play().then(()=>{music1.muted=false;}).catch(()=>console.log("Autoplay bloqué"));
});

// Fade in / fade out
function fadeOut(audio,duration=2000){
    let interval = 50;
    let step = audio.volume / (duration/interval);
    let fade = setInterval(()=>{
        if(audio.volume > 0){ audio.volume -= step; }
        else{ audio.pause(); clearInterval(fade);}
    }, interval);
}
function fadeIn(audio,duration=2000){
    audio.volume = 0;
    audio.play().then(()=>{audio.muted=false;}); // lever le mute
    let interval = 50;
    let step = 1 / (duration/interval);
    let fade = setInterval(()=>{
        if(audio.volume < 1){ audio.volume += step; }
        else clearInterval(fade);
    }, interval);
}

// Bouton musique
document.getElementById("play-music").onclick = ()=>{
    fadeOut(music1,2000);
    fadeIn(music2,2000);

    if(lightsLayer.style.display==="none") document.getElementById("toggle-lights").click();

    let lightInterval = setInterval(()=>{
        if(music2.paused){ clearInterval(lightInterval); return; }
        const lights = document.querySelectorAll('.light');
        lights.forEach(l=>{
            l.style.backgroundColor=`hsl(${Math.random()*360},100%,50%)`;
        });
    }, 300);
};
