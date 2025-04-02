const alertaLembrete = (callback, delay) => {
  setTimeout(callback, delay);
};

let arrayLembretes = {
  lembretes: [
    {
      id: 1,
      atividade: "Revisar código do projeto",
      tempoMinuto: 2,
      isCompleted: false,
    },
  ],
};

const listaLembretesRenderizados = document.getElementById(
  "lembreteAddRenderizado"
);

arrayLembretes.lembretes.forEach((lembrete) => {
  let li = document.createElement("li");
  li.innerHTML = `A atividade: <strong>${lembrete.atividade}</strong> será notificada em: <strong>${lembrete.tempoMinuto} minutos</strong>`;

  listaLembretesRenderizados.appendChild(li);
});

document
  .getElementById("meuFormulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nomeLembrete = document.getElementById("nomeInput").value;
    const tempoLembrete = document.getElementById("tempoLembrete").value;

    if (!nomeLembrete || !tempoLembrete) return;

    let novoLembrete = {
      id: arrayLembretes.lembretes.length + 1,
      atividade: nomeLembrete,
      tempoMinuto: parseInt(tempoLembrete, 10),
      isCompleted: false,
    };

    arrayLembretes.lembretes.push(novoLembrete);

    let li = document.createElement("li");
    li.innerHTML = `A atividade: <strong>${novoLembrete.atividade}</strong> será notificada em: <strong>${novoLembrete.tempoMinuto} minutos</strong>`;
    document.getElementById("lembreteAddRenderizado").appendChild(li);

    document.getElementById("nomeInput").value = "";
    document.getElementById("tempoLembrete").value = "";

    const tmpMilisegundo = arrayLembretes.lembretes.tempoMinuto * 60000;

    alertaLembrete(() => {}, tmpMilisegundo);
  });
