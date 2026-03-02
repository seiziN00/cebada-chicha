// costoPorLitro = costoTotal / litros;
// ingresoPorLitro = precioVenta * litros;
// gananciaPorLote = ingresoPorLitro - costoTotal;

(function() {
  // Para la cebada
  const cebadaTotalCoste = document.getElementById("cebada-total");
  const litrosLoteCebada = document.getElementById("litros-lote-cebada");
  const precioVentaCebada = document.getElementById("precio-cebada");
  const costoLitroCebadaResultado = document.getElementById("costo-litro-cebada");
  const ingresoLitroCebadaResultado = document.getElementById("ingreso-litro-cebada");
  const gananciaLoteCebadaResultado = document.getElementById("ganancia-lote-cebada");

  [cebadaTotalCoste, litrosLoteCebada, precioVentaCebada].forEach(input => {
     input.addEventListener("input", calcularResultadosCebada);
  });

  // Cargar resultados para cebada
  function calcularResultadosCebada() {
    const costoTotal = parseFloat(cebadaTotalCoste.value) || 0;
    const litros = parseFloat(litrosLoteCebada.value) || 0;
    const precioVenta = parseFloat(precioVentaCebada.value) || 0;

    const costoPorLitro = litros > 0 ? costoTotal / litros : 0;
    const gananciaPorLitro = precioVenta - costoPorLitro;
    const gananciaPorLote = gananciaPorLitro * litros;

    costoLitroCebadaResultado.textContent = `S/ ${costoPorLitro.toFixed(2)}`;
    ingresoLitroCebadaResultado.textContent = `S/ ${gananciaPorLitro.toFixed(2)}`;
    gananciaLoteCebadaResultado.textContent = `S/ ${gananciaPorLote.toFixed(2)}`;
  }


  // Para la chicha morada
  const chichaMoradaTotalCoste = document.getElementById("chicha-morada-total");
  const litrosLoteChichaMorada = document.getElementById("litros-lote-chicha");
  const precioVentaChichaMorada = document.getElementById("precio-chicha");
  const costoLitroChichaMoradaResultado = document.getElementById("costo-litro-chicha");
  const ingresoLitroChichaMoradaResultado = document.getElementById("ingreso-litro-chicha");
  const gananciaLoteChichaMoradaResultado = document.getElementById("ganancia-lote-chicha");

  [chichaMoradaTotalCoste, litrosLoteChichaMorada, precioVentaChichaMorada].forEach(input => {
    input.addEventListener("input", calcularResultadosChichaMorada);
  });

  // Cargar resultados para chicha morada
  function calcularResultadosChichaMorada() {
    const costoTotal = parseFloat(chichaMoradaTotalCoste.value) || 0;
    const litros = parseFloat(litrosLoteChichaMorada.value) || 0;
    const precioVenta = parseFloat(precioVentaChichaMorada.value) || 0;

    const costoPorLitro = litros > 0 ? costoTotal / litros : 0;
    const gananciaPorLitro = precioVenta - costoPorLitro;
    const gananciaPorLote = gananciaPorLitro * litros;

    costoLitroChichaMoradaResultado.textContent = `S/ ${costoPorLitro.toFixed(2)}`;
    ingresoLitroChichaMoradaResultado.textContent = `S/ ${gananciaPorLitro.toFixed(2)}`;
    gananciaLoteChichaMoradaResultado.textContent = `S/ ${gananciaPorLote.toFixed(2)}`;
  }
})();