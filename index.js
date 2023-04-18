let preguntas_aleatorias = true;
let mostrar_pantalla_juego_terminado = true;
let reiniciar_puntos_juego = true;

window.onload = function ()
{
    basePreguntas = readText("https://antoniovalentinsayago.github.io/test_conocmiento/base_preguntas.json");
    interpreset_bp = JSON.parse(basePreguntas);
    escogerPreguntaAleatoria();
};
  
let pregunta;
let posibles_espuestas;

btn_correspondiente = 
[
    select_id("btn1"),
    select_id("btn2"),
    select_id("btn3"),
    select_id("btn4")
];
let ngpreguntas = [];

let preguntasHechas = 0;
let preguntasCorrectas = 0;

function escogerPreguntaAleatoria()
{
    let n;
    if (preguntas_aleatorias)
    {
        n = Math.floor(Math.random() * interpreset_bp.length);    
    } else
    {n = 0;}
    
    while (ngpreguntas.includes(n))
    {
      n++;
      if (n >= interpreset_bp.length)
      {
        n = 0;  
      } 
      //Aqui el Juego reinicia
      if (ngpreguntas.length == interpreset_bp.length)
      {
        if(mostrar_pantalla_juego_terminado)
        {
            alert("Puntuacion: " + preguntasCorrectas + (preguntasHechas -1));
        } 
        if (reiniciar_puntos_juego)
        {
            preguntasCorrectas = 0;
            preguntasHechas = 0;    
        } 
        ngpreguntas = [];
      }
    }
    ngpreguntas.push(n);
    preguntasHechas++;

    escogerPregunta(n);
}

function escogerPregunta(n)
{
    pregunta = interpreset_bp[n];
    select_id("categoria").innerHTML = pregunta.categoria;    
    select_id("pregunta").innerHTML = pregunta.pregunra;    
    select_id("numero").innerHTML = pregunta.n; 
    
    let pc = preguntasCorrectas;

    if (preguntasHechas > 1)
    {
        select_id("puntaje").innerHTML = pc + " / " + (preguntasHechas - 1);
    }else 
    {
        select_id("puntaje").innerHTML = " ";
    }

    style("imagen").objectFit = pregunta.objectFit;
    desordenarRespuesta(pregunta);
    if (pregunta.imagen)
    {
        select_id("imagen").setAttribute("src", pregunta.imagen);
        style("imagen").height = "200px";
        style("imagen").width = "100%";
    }else {
        style("imagen").height = "0px";
        style("imagen").width = "0%";
        setTimeout( () => {
            select_id("imagen").setAttribute("src", "");
        },500);
    }
}

function desordenarRespuesta(pregunta)
{
    posibles_respuestas = 
    [
        pregunta.respuesta,
        pregunta.incorrecta1,
        pregunta.incorrecta2,
        pregunta.incorrecta3,
    ];
    
    posibles_respuestas.sort(() => Math.random() - 0.5);

    select_id("btn1").innerHTML  = posibles_respuestas[0];
    select_id("btn2").innerHTML  = posibles_respuestas[1];
    select_id("btn3").innerHTML  = posibles_respuestas[2];
    select_id("btn4").innerHTML  = posibles_respuestas[3];
}

let suspender_botones = false;

function oprimir_btn(i)
{
    if (suspender_botones)
    {
        return;    
    }    

    suspender_botones = true;
    if (posibles_respuestas[i] == pregunta.respuesta)
    {
        preguntasCorrectas++;    
        btn_correspondiente[i].style.background = "lightgreen";
    }else 
    {
        btn_correspondiente[i].style.background = "pink";
    }

    for (let j = 0; j < 4; j++)
    {
        if (posibles_respuestas[j] == pregunta.respuesta)
        {
            btn_correspondiente[i].style.background = "lightgreen";
            break;
        }    
    }

    setTimeout(() => {
        reiniciar_puntos();
        suspender_botones = false;
    },3000);
}

function reiniciar_puntos()
{
    for(const btn of btn_correspondiente)
    {
        btn.style.basePreguntas="white";
    }
    escogerPreguntarAlatoria();
}

function select_id(id)
{
    return document.getElementById(id);    
}

function style(id)
{
    return select_id(id).style;    
}

function readText(ruta_local)
{
    var texto = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', ruta_local, false);
    xmlhttp.send();

    if (xmlhttp.status == 200)
    {
        texto = xmlhttp.responseText;
    }
    return texto;
}

