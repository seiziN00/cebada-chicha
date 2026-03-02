(function() {
  const azucar = document.getElementById("cebada-azucar");
  const cebada = document.getElementById("cebada-cebada");
  const linaza = document.getElementById("cebada-linaza");
  const limon = document.getElementById("cebada-limon");
  const total = document.getElementById("cebada-total");

  const costosGuardados = JSON.parse(localStorage.getItem("costos"));
  console.log("Costos guardados:", costosGuardados);

  [azucar, cebada, linaza, limon].forEach(input => {
    input.addEventListener("input", calcular);
  });

  function calcularAzucar(cantidad, precio = 3) {
    return (parseFloat(cantidad) || 0) * (parseFloat(precio) || 0);
  }

  function calcularCebada(cantidad, precio = 7) {
    return (parseFloat(cantidad) || 0) * (parseFloat(precio) || 0);
  }

  function calcularLinaza(cantidad, precio = 10) {
    return (parseFloat(cantidad) || 0) * (parseFloat(precio) || 0);
  }

  function calcularLimon(cantidad, precio = 10) {
    return (parseFloat(cantidad) || 0) * (parseFloat(precio) || 0) / 100;
  }

  function calcular() {
    let totalCosto = 0;

    totalCosto += calcularAzucar(azucar.value, costosGuardados.azucar) || 0;
    totalCosto += calcularCebada(cebada.value, costosGuardados.cebada) || 0;
    totalCosto += calcularLinaza(linaza.value, costosGuardados.linaza) || 0;
    totalCosto += calcularLimon(limon.value, costosGuardados.limon) || 0;

    total.value = totalCosto.toFixed(2);
  }
})();