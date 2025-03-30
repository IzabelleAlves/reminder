const lembrete = (callback, delay) => {
  setTimeout(callback, delay);
};

let arrayAtvd = [];
let timerArrayAtvd = [];

document
  .getElementById("meuFormulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nomeInput").value;
    const tempo = document.getElementById("tempoLembrete").value;

    arrayAtvd.push(nome);
    timerArrayAtvd.push(tempo);

    const adicionados = document.getElementById("atvd");
    adicionados.innerText = " Adicionados:";

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    arrayAtvd.forEach((atividade, index) => {
      resultado.innerHTML += `<p>Atividade: ${atividade}, Daqui a: ${timerArrayAtvd[index]} minutos</p>`;
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
  });
