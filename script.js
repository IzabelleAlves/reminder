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
