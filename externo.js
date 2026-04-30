const EXTERNAL_PANELS = {
  "anomalias-equatorial": {
    nome: "Anomalias Equatorial",
    descricao: "Acompanhamento das anomalias pendentes e executadas encaminhadas pela Equatorial para a REMO.",
    url: "https://pauloricardoipa103-code.github.io/dashboard-programacao-ipora/"
  },
  "controle-execucao-remo": {
    nome: "Controle de Execução REMO",
    descricao: "Painel administrativo para acompanhamento das execuções enviadas e controle operacional da REMO.",
    url: "https://controle-de-execucao-remo.vercel.app/#/admin"
  }
};

function getSlug() {
  return new URLSearchParams(window.location.search).get("painel") || "";
}

function bootExternalPanel() {
  const panel = EXTERNAL_PANELS[getSlug()];
  if (!panel) {
    document.getElementById("externalTitle").textContent = "Painel indisponível";
    document.getElementById("externalDescription").textContent = "Esse link não possui um painel liberado.";
    return;
  }

  document.title = `${panel.nome} | REMO`;
  document.getElementById("externalTitle").textContent = panel.nome;
  document.getElementById("externalDescription").textContent = panel.descricao;
  document.getElementById("externalFrame").src = panel.url;
}

bootExternalPanel();
