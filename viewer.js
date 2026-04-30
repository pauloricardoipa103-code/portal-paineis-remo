const BUILTIN_PANELS = [
  {
    nome: "Anomalias Equatorial",
    descricao: "Acompanhamento das anomalias pendentes e executadas encaminhadas pela Equatorial para a REMO.",
    slug: "anomalias-equatorial",
    url: "https://pauloricardoipa103-code.github.io/dashboard-programacao-ipora/"
  },
  {
    nome: "Controle de Execução REMO",
    descricao: "Painel administrativo para acompanhamento das execuções enviadas e controle operacional da REMO.",
    slug: "controle-execucao-remo",
    url: "https://controle-de-execucao-remo.vercel.app/#/admin"
  }
];

function getPanelSlug() {
  return new URLSearchParams(window.location.search).get("painel") || "";
}

async function loadPanels() {
  try {
    const response = await fetch("paineis.json", { cache: "no-store" });
    return await response.json();
  } catch {
    return BUILTIN_PANELS;
  }
}

async function bootViewer() {
  const slug = getPanelSlug();
  const panels = await loadPanels();
  const panel = panels.find(item => item.slug === slug) || panels[0];

  if (!panel || !panel.url) {
    document.getElementById("viewerTitle").textContent = "Painel indisponível";
    document.getElementById("viewerDescription").textContent = "O painel ainda não foi publicado.";
    return;
  }

  document.title = `${panel.nome} | Portal REMO`;
  document.getElementById("viewerTitle").textContent = panel.nome;
  document.getElementById("viewerDescription").textContent = panel.descricao || "Painel REMO";
  document.getElementById("dashboardFrame").src = panel.url;
}

bootViewer();
