(function() {
  const azucar = document.getElementById("chicha-morada-azucar");
  const chichaMorada = document.getElementById("chicha-morada-maiz");
  const limon = document.getElementById("chicha-morada-limon");
  const gas = document.getElementById("chicha-morada-gas");
  const total = document.getElementById("chicha-morada-total");

  const costosGuardados = JSON.parse(localStorage.getItem("costos"));

  if (!costosGuardados) {
    console.warn("No se encontraron costos guardados. Usando valores predeterminados.");
  }

  [azucar, chichaMorada, limon, gas].forEach(input => {
    input.addEventListener("input", calcular);
  });

  function calcularGas(tiempo, precio = 50) {
    const minutos = 6000;
    return (parseFloat(tiempo) || 0) * (parseFloat(precio) || 0) / minutos;
  }

  function calcularAzucar(cantidad, precio = 3) {
    return (parseFloat(cantidad) || 0) * (parseFloat(precio) || 0);
  }

  function calcularChichaMorada(cantidad, precio = 7) {
    return (parseFloat(cantidad) || 0) * (parseFloat(precio) || 0);
  }

  function calcularLimon(cantidad, precio = 10) {
    return (parseFloat(cantidad) || 0) * (parseFloat(precio) || 0) / 100;
  }

  function calcular() {
    let totalCosto = 0;

    totalCosto += calcularAzucar(azucar.value, costosGuardados.azucar) || 0;
    totalCosto += calcularChichaMorada(chichaMorada.value, costosGuardados.maizMorado) || 0;
    totalCosto += calcularLimon(limon.value, costosGuardados.limon) || 0;
    totalCosto += calcularGas(gas.value, costosGuardados.gas) || 0;

    total.value = totalCosto.toFixed(2);
  }
})();