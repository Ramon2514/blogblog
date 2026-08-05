// ===============================
// ANIMAÇÕES AO ROLAR A PÁGINA
// ===============================

const elementos = document.querySelectorAll(
    ".card, .sobre-container, .titulo, .hero-text, form"
);

function revelarElementos() {

    const alturaTela = window.innerHeight * 0.85;

    elementos.forEach((elemento) => {

        const topo = elemento.getBoundingClientRect().top;

        if (topo < alturaTela) {

            elemento.classList.add("mostrar");

        }

    });

}

window.addEventListener("scroll", revelarElementos);
window.addEventListener("load", revelarElementos);

// ===============================
// MENU ATIVO
// ===============================

const secoes = document.querySelectorAll("section");
const links = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let atual = "";

    secoes.forEach((secao) => {

        const topo = secao.offsetTop - 120;

        if (window.scrollY >= topo) {

            atual = secao.getAttribute("id");

        }

    });

    links.forEach((link) => {

        link.classList.remove("ativo");

        if (link.getAttribute("href") === "#" + atual) {

            link.classList.add("ativo");

        }

    });

});

// ===============================
// BOTÃO VOLTAR AO TOPO
// ===============================

const botaoTopo = document.createElement("button");

botaoTopo.innerHTML = "↑";
botaoTopo.id = "topo";

document.body.appendChild(botaoTopo);

botaoTopo.style.cssText = `
position:fixed;
right:25px;
bottom:25px;
width:55px;
height:55px;
border:none;
border-radius:50%;
background:#ff3b3b;
color:white;
font-size:24px;
cursor:pointer;
display:none;
z-index:999;
box-shadow:0 10px 25px rgba(0,0,0,.3);
transition:.3s;
`;

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        botaoTopo.style.display = "block";

    } else {

        botaoTopo.style.display = "none";

    }

});

botaoTopo.onclick = () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

// ===============================
// EFEITO DOS CARDS
// ===============================

document.querySelectorAll(".card").forEach((card)=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        card.style.background = `
        radial-gradient(circle at ${x}px ${y}px,
        rgba(255,59,59,.18),
        #1e293b 60%)
        `;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.background="#1e293b";

    });

});

// ===============================
// DIGITAÇÃO DO TÍTULO
// ===============================

const titulo = document.querySelector(".hero h1");

if(titulo){

    const texto = titulo.textContent;

    titulo.textContent="";

    let i=0;

    function escrever(){

        if(i<texto.length){

            titulo.textContent+=texto.charAt(i);

            i++;

            setTimeout(escrever,120);

        }

    }

    escrever();

}

// ===============================
// IA (N8N)
// ===============================

const form = document.getElementById("meu-form");
const textoPost = document.getElementById("texto-post");

if(form){

form.addEventListener("submit", async (e)=>{

e.preventDefault();

textoPost.innerHTML = "<h3>🤖 A IA está pensando...</h3>";

try{

const response = await fetch("https://ramon25.app.n8n.cloud/webhook/b08b5a43-54c1-4e70-889e-6f4b345ab878",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email:document.getElementById("email").value,

message:document.getElementById("message").value

})

});

const resposta = await response.text();

textoPost.innerHTML = marked.parse(resposta);

}catch(error){

textoPost.innerHTML=`
<h2>Erro ao conectar</h2>
<p>Não foi possível obter resposta da IA.</p>
`;

console.error(error);

}

});

}