// ===============================
// ANIMAÇÃO AO ROLAR A PÁGINA
// ===============================

const elementos = document.querySelectorAll(
    ".card, .sobre-container, .titulo, .hero-text, .hero-image, form"
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

        if (scrollY >= topo) {

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
font-size:26px;
cursor:pointer;
display:none;
box-shadow:0 10px 25px rgba(0,0,0,.35);
transition:.3s;
z-index:999;
`;

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        botaoTopo.style.display = "block";

    } else {

        botaoTopo.style.display = "none";

    }

});

botaoTopo.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


// ===============================
// EFEITO NOS CARDS
// ===============================

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        card.style.background = `
        radial-gradient(circle at ${x}px ${y}px,
        rgba(255,59,59,.22),
        #1e293b 55%)
        `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.background = "#1e293b";

    });

});


// ===============================
// EFEITO DE DIGITAÇÃO
// ===============================

const titulo = document.querySelector(".hero h1");

if (titulo) {

    const texto = titulo.textContent;

    titulo.textContent = "";

    let i = 0;

    function escrever() {

        if (i < texto.length) {

            titulo.textContent += texto.charAt(i);

            i++;

            setTimeout(escrever, 120);

        }

    }

    escrever();

}