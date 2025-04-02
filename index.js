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
  let container = document.createElement("div");
  container.classList.add("lembrete-container");

  let li = document.createElement("li");
  li.innerHTML = `A atividade: <strong>${lembrete.atividade}</strong> será notificada em: <strong>${lembrete.tempoMinuto} minutos</strong>`;

  let icon = document.createElement("button");
  icon.innerHTML = '<i class="fa-solid fa-trash"></i>';
  icon.classList.add("icon-lembrete");

  container.appendChild(li);
  container.appendChild(icon);

  listaLembretesRenderizados.appendChild(container);
});

document
  .getElementById("meuFormulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nomeLembrete = document.getElementById("nomeInput").value;
    const tempoLembrete = document.getElementById("tempoLembrete").value;

    if (!nomeLembrete.trim() || !tempoLembrete.trim()) return;

    let novoLembrete = {
      id: arrayLembretes.lembretes.length + 1,
      atividade: nomeLembrete,
      tempoMinuto: parseInt(tempoLembrete, 10),
      isCompleted: false,
    };

    arrayLembretes.lembretes.push(novoLembrete);

    let container = document.createElement("div");
    container.classList.add("lembrete-container");

    let li = document.createElement("li");
    li.innerHTML = `A atividade: <strong>${novoLembrete.atividade}</strong> será notificada em: <strong>${novoLembrete.tempoMinuto} minutos</strong>`;

    let icon = document.createElement("button");
    icon.innerHTML = '<i class="fa-solid fa-trash"></i>';
    icon.classList.add("icon-lembrete");

    icon.addEventListener("click", () => {
      container.remove();
      arrayLembretes.lembretes = arrayLembretes.lembretes.filter(
        (lembrete) => lembrete.id !== novoLembrete.id
      );
    });

    container.appendChild(li);
    container.appendChild(icon);
    document.getElementById("lembreteAddRenderizado").appendChild(container);

    document.getElementById("nomeInput").value = "";
    document.getElementById("tempoLembrete").value = "";

    const tmpMilisegundo = novoLembrete.tempoMinuto * 60000;
    alertaLembrete(() => {
      const reminder = document.getElementById("reminder");
      reminder.innerText = "Lembretes Ativos:";
    }, tmpMilisegundo);
  });
