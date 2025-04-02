const lembrete = (callback, delay) => {
  setTimeout(callback, delay);
};

let arrayLembretes = [];
let timerArrayLembretes = [];

document
  .getElementById("meuFormulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // this.reset();

    const nome = document.getElementById("nomeInput").value;
    const tempo = document.getElementById("tempoLembrete").value;

    arrayLembretes.push(nome);
    timerArrayLembretes.push(tempo);

    const lembretesAdd = document.getElementById("lembretesAdicionados");
    lembretesAdd.innerText = "Lembretes adicionados:";

    const lembreteAddRenderizado = document.getElementById(
      "lembreteAddRenderizado"
    );
    lembreteAddRenderizado.style.padding = "10px 15px";
    lembreteAddRenderizado.style.border = "1px black solid";
    lembreteAddRenderizado.style.borderRadius = "8px";
    lembreteAddRenderizado.innerHTML = "";
    arrayLembretes.forEach((atividade, index) => {
      lembreteAddRenderizado.innerHTML += `<p><strong>Atividade</strong>: ${atividade}, <strong>Daqui a:</strong> ${timerArrayLembretes[index]} minutos</p>`;
    });

    const tmpMilisegundo = tempo * 60000;

    lembrete(() => {
      const reminder = document.getElementById("reminder");
      reminder.innerText = "Lembretes Ativos:";

      const lembreteElement = document.getElementById("lembrete");

      const novoLembrete = document.createElement("div");
      novoLembrete.id = "divNovoLembrete";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `lembrete-${nome}`;

      const textoLembrete = document.createElement("span");
      textoLembrete.innerText = `${nome}`;

      novoLembrete.appendChild(checkbox);
      novoLembrete.appendChild(textoLembrete);

      lembreteElement.appendChild(novoLembrete);
    }, tmpMilisegundo);

    document.getElementById("meuFormulario").reset();
  });

function ajustarResponsividade() {
  const larguraTela = window.innerWidth;
  const titulo1 = document.getElementById("titulo");
  const titulo = document.getElementById("titulo2");
  const form = document.getElementById("meuFormulario");
  const inputs = document.querySelectorAll("input");
  const button = document.querySelector("button");

  if (larguraTela <= 800) {
    titulo.style.width = "320px";
    titulo.style.display = "flex";
    titulo.style.textAlign = "center";
    titulo.style.padding = "10px";

    form.style.width = "320px";
    form.style.padding = "10px";

    inputs.forEach((input) => {
      input.style.width = "300px";
      input.style.fontSize = "14px";
      input.style.padding = "8px";
    });

    button.style.width = "320px";
    button.style.fontSize = "15px";
    button.style.padding = "10px";
    button.style.marginTop = "10px";
  } else if (larguraTela <= 1200) {
    titulo.style.display = "flex";
    titulo.style.textAlign = "center";
    titulo.style.justifyContent = "center";

    form.style.width = "700px";
    form.style.padding = "70px";

    inputs.forEach((input) => {
      // input.style.width = "480px";
      input.style.fontSize = "16px";
      input.style.padding = "10px";
    });

    button.style.width = "700px";
    button.style.fontSize = "17px";
    button.style.padding = "12px";
    button.style.marginTop = "10px";
  }
}

// Executa ao carregar e ao redimensionar a tela
// window.addEventListener("load", ajustarResponsividade);
// window.addEventListener("resize", ajustarResponsividade);
ajustarResponsividade();
