const PASSWORD_HASH = "3cded15183a109607972148ec06119366c1072ce02f2f41e75849199837cc008";
const SESSION_KEY = "remoPortalAuthorized";

let dashboards = [
  {
    nome: "Anomalias Equatorial",
    descricao: "Acompanhamento das anomalias pendentes e executadas encaminhadas pela Equatorial para a REMO.",
    area: "Operacional",
    responsavel: "REMO Engenharia",
    status: "Publicado",
    atualizadoEm: "30/04/2026",
    slug: "anomalias-equatorial",
    url: "https://pauloricardoipa103-code.github.io/dashboard-programacao-ipora/"
  }
];

const loginView = document.getElementById("loginView");
const portalView = document.getElementById("portalView");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const searchInput = document.getElementById("searchInput");
const areaFilter = document.getElementById("areaFilter");
const statusFilter = document.getElementById("statusFilter");
const panelGrid = document.getElementById("panelGrid");

function text(value) {
  return String(value ?? "");
}

function escapeHtml(value) {
  return text(value).replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[ch]));
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

function showPortal() {
  loginView.hidden = true;
  portalView.hidden = false;
  loadDashboards();
}

function showLogin() {
  loginView.hidden = false;
  portalView.hidden = true;
}

async function loadDashboards() {
  try {
    const response = await fetch("paineis.json", { cache: "no-store" });
    dashboards = await response.json();
  } catch {
    // Mantém a lista embutida quando o portal é aberto localmente via file://.
  }
  fillFilters();
  render();
}

function fillFilters() {
  const areas = [...new Set(dashboards.map(item => item.area).filter(Boolean))].sort();
  const statuses = [...new Set(dashboards.map(item => item.status).filter(Boolean))].sort();
  areaFilter.innerHTML = '<option value="">Todas</option>' + areas.map(area => `<option value="${escapeHtml(area)}">${escapeHtml(area)}</option>`).join("");
  statusFilter.innerHTML = '<option value="">Todos</option>' + statuses.map(status => `<option value="${escapeHtml(status)}">${escapeHtml(status)}</option>`).join("");
}

function filteredDashboards() {
  const query = searchInput.value.trim().toLowerCase();
  return dashboards.filter(item => {
    if (areaFilter.value && item.area !== areaFilter.value) return false;
    if (statusFilter.value && item.status !== statusFilter.value) return false;
    if (!query) return true;
    return [item.nome, item.descricao, item.area, item.responsavel].some(field => text(field).toLowerCase().includes(query));
  });
}

function render() {
  const items = filteredDashboards();
  document.getElementById("metricTotal").textContent = dashboards.length.toLocaleString("pt-BR");
  document.getElementById("metricPublished").textContent = dashboards.filter(item => item.status === "Publicado").length.toLocaleString("pt-BR");
  document.getElementById("metricDraft").textContent = dashboards.filter(item => item.status !== "Publicado").length.toLocaleString("pt-BR");

  if (!items.length) {
    panelGrid.innerHTML = '<div class="empty">Nenhum painel encontrado para os filtros selecionados.</div>';
    return;
  }

  panelGrid.innerHTML = items.map(item => {
    const isPublished = item.status === "Publicado" && item.url;
    const statusClass = item.status === "Publicado" ? "" : " implantacao";
    const button = isPublished
      ? `<a class="open-link" href="visualizar.html?painel=${encodeURIComponent(item.slug || item.nome)}">Abrir painel</a>`
      : '<span class="open-link disabled">Em preparação</span>';
    return `
      <article class="dashboard-card">
        <div class="card-head">
          <h2>${escapeHtml(item.nome)}</h2>
          <span class="status${statusClass}">${escapeHtml(item.status)}</span>
        </div>
        <p>${escapeHtml(item.descricao)}</p>
        <div class="meta">
          <span><strong>Área:</strong> ${escapeHtml(item.area)}</span>
          <span><strong>Responsável:</strong> ${escapeHtml(item.responsavel)}</span>
          <span><strong>Atualização:</strong> ${escapeHtml(item.atualizadoEm)}</span>
        </div>
        <div class="card-actions">${button}</div>
      </article>
    `;
  }).join("");
}

loginForm.addEventListener("submit", async event => {
  event.preventDefault();
  loginError.textContent = "";
  const password = document.getElementById("password").value;
  if (await sha256(password) === PASSWORD_HASH) {
    sessionStorage.setItem(SESSION_KEY, "true");
    showPortal();
  } else {
    loginError.textContent = "Senha incorreta.";
  }
});

document.getElementById("logoutButton").addEventListener("click", () => {
  sessionStorage.removeItem(SESSION_KEY);
  showLogin();
});

[searchInput, areaFilter, statusFilter].forEach(control => {
  control.addEventListener("input", render);
  control.addEventListener("change", render);
});

if (sessionStorage.getItem(SESSION_KEY) === "true") {
  showPortal();
} else {
  showLogin();
}
