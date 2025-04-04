// const alertaLembrete = (callback, delay) => {
//   setTimeout(callback, delay);
// };

// let arrayLembretes = {
//   lembretes: [{}],
// };

// function renderizarLembreteExemplo() {
//   // Lembretes Adicionados
//   let container = document.createElement("div");
//   container.classList.add("lembrete-container");

//   let li = document.createElement("li");
//   li.innerHTML = `A atividade: <strong>Correr</strong> será notificada em: <strong>10 minutos</strong>`;

//   let icon = document.createElement("button");
//   icon.innerHTML = '<i class="fa-solid fa-trash"></i>';
//   icon.classList.add("icon-lembrete");

//   // Lembretes Ativos
//   const lembreteElement = document.getElementById("lembrete");

//   const textoLembrete = document.createElement("li");
//   textoLembrete.classList.add("lembreteAtivo");
//   textoLembrete.innerHTML = `A atividade: <strong>Correr</strong> precisa ser feita agora!`;
//   textoLembrete.classList.add("isCompleted");

//   lembreteElement.appendChild(textoLembrete);
//   container.appendChild(li);
//   container.appendChild(icon);
//   document.getElementById("lembreteAddRenderizado").appendChild(container);
// }

// renderizarLembreteExemplo();

// document
//   .getElementById("meuFormulario")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     const nomeLembrete = document.getElementById("nomeInput").value;
//     const tempoLembrete = document.getElementById("tempoLembrete").value;

//     if (!nomeLembrete.trim() || !tempoLembrete.trim()) return;

//     let novoLembrete = {
//       id: arrayLembretes.lembretes.length,
//       atividade: nomeLembrete,
//       tempoMinuto: parseInt(tempoLembrete, 10),
//       isCompleted: false,
//     };

//     if (Object.keys(arrayLembretes.lembretes[0]).length === 0) {
//       arrayLembretes.lembretes[0] = novoLembrete;
//     } else {
//       arrayLembretes.lembretes.push(novoLembrete);
//     }

//     let container = document.createElement("div");
//     container.classList.add("lembrete-container");

//     let li = document.createElement("li");
//     li.innerHTML = `A atividade: <strong>${novoLembrete.atividade}</strong> será notificada em: <strong>${novoLembrete.tempoMinuto} minutos</strong>`;

//     let icon = document.createElement("button");
//     icon.innerHTML = '<i class="fa-solid fa-trash"></i>';
//     icon.classList.add("icon-lembrete");

//     icon.addEventListener("click", () => {
//       container.remove();
//       arrayLembretes.lembretes = arrayLembretes.lembretes.filter(
//         (lembrete) => lembrete.id !== novoLembrete.id
//       );
//     });

//     container.appendChild(li);
//     container.appendChild(icon);
//     document.getElementById("lembreteAddRenderizado").appendChild(container);

//     document.getElementById("nomeInput").value = "";
//     document.getElementById("tempoLembrete").value = "";

//     const tmpMilisegundo = novoLembrete.tempoMinuto * 60000;

//     alertaLembrete(() => {
//       // const reminder = document.getElementById("reminder");
//       // reminder.innerText = "Lembretes Ativos:";

//       const lembreteElement = document.getElementById("lembrete");

//       const lembreteAtivo = arrayLembretes.lembretes.find(
//         (l) => l.id === novoLembrete.id
//       );

//       if (lembreteAtivo) {
//         const textoLembrete = document.createElement("li");
//         textoLembrete.classList.add("lembreteAtivo");
//         textoLembrete.innerHTML = `A atividade: <strong>${lembreteAtivo.atividade}</strong> precisa ser feita agora!`;

//         if (lembreteAtivo.isCompleted) {
//           textoLembrete.classList.add("isCompleted");
//         }

//         textoLembrete.addEventListener("click", () => {
//           console.log("Clicou no elemento");

//           lembreteAtivo.isCompleted = !lembreteAtivo.isCompleted;

//           textoLembrete.classList.toggle("isCompleted");
//         });

//         lembreteElement.appendChild(textoLembrete);
//       }
//     }, tmpMilisegundo);
//   });

// function responsividade() {
//   let larguraTela = window.innerWidth;
//   let lembretes = document.querySelectorAll("#lembreteAddRenderizado li");

//   lembretes.forEach((lembrete) => {
//     if (larguraTela <= 800) {
//       lembrete.style.fontSize = "0.85rem";
//     } else if (larguraTela <= 1200) {
//       lembrete.style.fontSize = "0.95rem";
//     } else {
//       lembrete.style.fontSize = "1rem";
//     }
//   });
// }

// responsividade();
// window.addEventListener("resize", ajustarFontesLembretes);

const arrayLembretes = { lembretes: [{}] };

responsividade();
window.addEventListener("resize", responsividade);

// Lembrete de exemplo
function renderizarLembreteExemplo() {
  const exemplo = {
    id: 0,
    atividade: "Correr",
    tempoMinuto: 10,
    isCompleted: true,
  };

  renderizarLembreteAdicionado(exemplo);
  renderizarLembreteAtivo(exemplo);
}

renderizarLembreteExemplo();

function criarBotaoRemover(id) {
  const botao = document.createElement("button");
  botao.innerHTML = '<i class="fa-solid fa-trash"></i>';
  botao.classList.add("icon-lembrete");

  botao.addEventListener("click", () => {
    const elAdicionado = document.getElementById(`lembrete-add-${id}`);
    const elAtivo = document.getElementById(`lembrete-ativo-${id}`);

    if (elAdicionado) elAdicionado.remove();
    if (elAtivo) elAtivo.remove();

    arrayLembretes.lembretes = arrayLembretes.lembretes.filter(
      (l) => l.id !== id
    );
  });

  return botao;
}

function renderizarLembreteAdicionado(lembrete) {
  const container = document.createElement("div");
  container.classList.add("lembrete-container");
  container.id = `lembrete-add-${lembrete.id}`;

  const li = document.createElement("li");
  li.innerHTML = `A atividade: <strong>${lembrete.atividade}</strong> será notificada em: <strong>${lembrete.tempoMinuto} minutos</strong>`;

  const botao = criarBotaoRemover(lembrete.id);

  container.appendChild(li);
  container.appendChild(botao);

  document.getElementById("lembreteAddRenderizado").appendChild(container);
}

function renderizarLembreteAtivo(lembrete) {
  const container = document.createElement("div");
  container.classList.add("lembrete-container");
  container.id = `lembrete-ativo-${lembrete.id}`;

  const textoLembrete = document.createElement("li");
  textoLembrete.classList.add("lembreteAtivo");
  textoLembrete.innerHTML = `A atividade: <strong>${lembrete.atividade}</strong> precisa ser feita agora!`;

  if (lembrete.isCompleted) {
    textoLembrete.classList.add("isCompleted");
  }

  textoLembrete.addEventListener("click", () => {
    lembrete.isCompleted = !lembrete.isCompleted;
    textoLembrete.classList.toggle("isCompleted");
  });

  const botao = criarBotaoRemover(lembrete.id);

  container.appendChild(textoLembrete);
  container.appendChild(botao);

  document.getElementById("lembrete").appendChild(container);
}

document
  .getElementById("meuFormulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nomeInput").value.trim();
    const tempo = parseInt(
      document.getElementById("tempoLembrete").value.trim(),
      10
    );
    // console.log(Date.now());
    // if (!nome || isNaN(tempo)) return;

    const novoLembrete = {
      id: Date.now(),
      atividade: nome,
      tempoMinuto: tempo,
      isCompleted: false,
    };

    if (Object.keys(arrayLembretes.lembretes[0]).length === 0) {
      arrayLembretes.lembretes[0] = novoLembrete;
    } else {
      arrayLembretes.lembretes.push(novoLembrete);
    }

    renderizarLembreteAdicionado(novoLembrete);

    setTimeout(() => {
      const lembreteAtivo = arrayLembretes.lembretes.find(
        (l) => l.id === novoLembrete.id
      );

      if (lembreteAtivo) renderizarLembreteAtivo(lembreteAtivo);
    }, tempo * 60000);

    document.getElementById("nomeInput").value = "";
    document.getElementById("tempoLembrete").value = "";
  });

// Responsividade de fonte
function responsividade() {
  const largura = window.innerWidth;
  const lembretes = document
    .getElementById("lembreteAddRenderizado")
    .getElementsByTagName("li");

  for (const lembrete of lembretes) {
    if (largura <= 800) {
      lembrete.style.fontSize = "0.85rem";
    } else if (largura <= 1200) {
      lembrete.style.fontSize = "0.95rem";
    } else {
      lembrete.style.fontSize = "1rem";
    }
  }
}
