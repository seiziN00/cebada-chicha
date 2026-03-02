/* ============================================================
   app.js — Cebada & Chicha Cost Calculator
   ES6 refactored, single-file architecture
   ============================================================ */

(() => {
  "use strict";

  // ── DOM helpers ──────────────────────────────────────────────

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  // ── Utility functions ────────────────────────────────────────

  /** Safely parse a numeric value, returning 0 when invalid. */
  const num = (value) => parseFloat(value) || 0;

  /** Calculate cost = quantity × unit price. */
  const calcCost = (quantity, unitPrice) => num(quantity) * num(unitPrice);

  /**
   * Calcular costos para ingredientes vendidos por cien unidades (e.g. limón).
   * cost = quantity × unitPrice / 100
   */
  const calcCostPerHundred = (quantity, unitPrice) =>
    num(quantity) * num(unitPrice) / 100;

  /** Format a number as Peruvian Soles. */
  const formatSoles = (value) => `S/ ${num(value).toFixed(2)}`;

  // ── Cost input mapping ───────────────────────────────────────
  // Maps localStorage key → DOM input id

  const COST_FIELDS = [
    { key: "azucar",            id: "azucar" },
    { key: "cebada",            id: "cebada" },
    { key: "maizMorado",        id: "maiz-morado" },
    { key: "linaza",            id: "linaza" },
    { key: "limon",             id: "limon" },
    { key: "pina",              id: "pineapple" },
    { key: "leche",             id: "leche" },
    { key: "fresa",             id: "fresa" },
    { key: "lucuma",            id: "lucuma" },
    { key: "tamarindo",         id: "tamarindo" },
    { key: "maracuya",          id: "maracuya" },
    { key: "chocolate",         id: "chocolate" },
    { key: "bolsitasMarcianos", id: "bolsitas-marcianos" },
    { key: "bolsasCebadaChicha",id: "bolsas-cebada-chicha" },
  ];

  const STORAGE_KEY = "costos";

  // ── State (in-memory mirror of saved costs) ──────────────────

  let costosGuardados = loadCostos();

  // ── Persistence helpers ──────────────────────────────────────

  function loadCostos() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
    } catch {
      return {};
    }
  }

  function saveCostos(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  // ── Theme toggle ─────────────────────────────────────────────

  const THEME_KEY = "theme";

  const initTheme = () => {
    const saved = localStorage.getItem(THEME_KEY);
    const preferred = saved ?? (
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    );
    applyTheme(preferred);
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    const icon = $(".btn-theme__icon");
    if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
  };

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  };

  // ── Costes section ───────────────────────────────────────────

  const calcularTotalCostes = () => {
    const total = $$(".input-costo").reduce(
      (sum, input) => sum + num(input.value), 0
    );
    $("#total").value = total.toFixed(2);
  };

  const cargarCostosGuardados = () => {
    COST_FIELDS.forEach(({ key, id }) => {
      const input = $(`#${id}`);
      if (input && costosGuardados[key] !== undefined) {
        input.value = costosGuardados[key] || "";
      }
    });
    calcularTotalCostes();
  };

  const guardarPreferencias = () => {
    const costos = {};
    COST_FIELDS.forEach(({ key, id }) => {
      costos[key] = num($(`#${id}`).value);
    });

    saveCostos(costos);
    costosGuardados = costos;

    // Visual feedback
    const btn = $("#guardar-costos");
    btn.textContent = "Guardado ✓";
    btn.classList.add("btn--saved");
    setTimeout(() => {
      btn.textContent = "Guardar preferencias";
      btn.classList.remove("btn--saved");
    }, 2000);

    // Propagate changes in real time
    recalcularTodo();
  };

  // ── Cebada section ───────────────────────────────────────────

  const calcularCebada = () => {
    const c = costosGuardados;
    let total = 0;

    total += calcCost($("#cebada-azucar").value, c.azucar);
    total += calcCost($("#cebada-cebada").value, c.cebada);
    total += calcCost($("#cebada-linaza").value, c.linaza);
    total += calcCostPerHundred($("#cebada-limon").value, c.limon);

    $("#cebada-total").value = total.toFixed(2);
    calcularResultados();
  };

  // ── Chicha morada section ────────────────────────────────────

  const calcularChicha = () => {
    const c = costosGuardados;
    let total = 0;

    total += calcCost($("#chicha-morada-azucar").value, c.azucar);
    total += calcCost($("#chicha-morada-maiz").value, c.maizMorado);
    total += calcCost($("#chicha-morada-pineapple").value, c.pina);
    total += calcCostPerHundred($("#chicha-morada-limon").value, c.limon);

    $("#chicha-morada-total").value = total.toFixed(2);
    calcularResultados();
  };

  // ── Resultados section ───────────────────────────────────────

  const calcularResultadosProducto = (costoTotalId, litrosId, precioId, prefix) => {
    const costoTotal = num($(`#${costoTotalId}`).value);
    const litros = num($(`#${litrosId}`).value);
    const precioVenta = num($(`#${precioId}`).value);

    const costoPorLitro = litros > 0 ? costoTotal / litros : 0;
    const gananciaPorLitro = precioVenta - costoPorLitro;
    const gananciaPorLote = gananciaPorLitro * litros;

    $(`#costo-litro-${prefix}`).textContent = formatSoles(costoPorLitro);
    $(`#ingreso-litro-${prefix}`).textContent = formatSoles(gananciaPorLitro);
    $(`#ganancia-lote-${prefix}`).textContent = formatSoles(gananciaPorLote);
  };

  const calcularResultados = () => {
    calcularResultadosProducto(
      "cebada-total", "litros-lote-cebada", "precio-cebada", "cebada"
    );
    calcularResultadosProducto(
      "chicha-morada-total", "litros-lote-chicha", "precio-chicha", "chicha"
    );
  };

  // ── Recalculate everything (after saving preferences) ────────

  const recalcularTodo = () => {
    calcularCebada();
    calcularChicha();
    calcularResultados();
  };

  // ── Event binding ────────────────────────────────────────────

  const init = () => {
    // Theme
    initTheme();
    $("#theme-toggle").addEventListener("click", toggleTheme);

    // Costes inputs → recalculate total
    $$(".card--costes input[type='number']:not(:disabled)").forEach((input) => {
      input.addEventListener("input", calcularTotalCostes);
    });

    // Save button
    $("#guardar-costos").addEventListener("click", guardarPreferencias);

    // Cebada inputs
    $$("#cebada-azucar, #cebada-cebada, #cebada-linaza, #cebada-limon")
      .forEach((input) => input.addEventListener("input", calcularCebada));

    // Chicha inputs
    $$("#chicha-morada-azucar, #chicha-morada-maiz, #chicha-morada-limon, #chicha-morada-pineapple")
      .forEach((input) => input.addEventListener("input", calcularChicha));

    // Producción & Ventas inputs → recalculate results
    $$(
      "#litros-lote-cebada, #litros-lote-chicha, #precio-cebada, #precio-chicha"
    ).forEach((input) => input.addEventListener("input", calcularResultados));

    // Load saved costs and run initial calculations
    cargarCostosGuardados();
    recalcularTodo();
  };

  // ── Bootstrap ────────────────────────────────────────────────

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
