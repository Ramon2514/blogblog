const form = document.getElementById("meu-form");

const textoPost = document.getElementById("texto-post");



form.addEventListener("submit", async (e)=>{


    e.preventDefault();



    textoPost.innerHTML = "🤖 Gabriel AI está processando...";



    try{


        const response = await fetch(

            "https://ramon25.app.n8n.cloud/webhook-test/b08b5a43-54c1-4e70-889e-6f4b345ab878",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify({

                    email:
                    document.getElementById("email").value,


                    message:
                    document.getElementById("message").value


                })

            }

        );




        const text = await response.text();



        textoPost.innerHTML = marked.parse(text);




    }

    catch(error){


        textoPost.innerHTML = 
        "❌ Erro ao conectar com a inteligência artificial.";



        console.error(error);


    }



});