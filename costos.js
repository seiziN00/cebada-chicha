const azucar = document.getElementById("azucar");
const maizMorado = document.getElementById("maiz-morado");
const linaza = document.getElementById("linaza");
const limon = document.getElementById("limon");
const cebada = document.getElementById("cebada");
const gas = document.getElementById("gas");
const total = document.getElementById("total");

total.addEventListener("input", calcularTotal);
azucar.addEventListener("input", calcularTotal);
maizMorado.addEventListener("input", calcularTotal);
linaza.addEventListener("input", calcularTotal);
limon.addEventListener("input", calcularTotal);
cebada.addEventListener("input", calcularTotal);
gas.addEventListener("input", calcularTotal);

function calcularTotal() {
    const costoAzucar = parseFloat(azucar.value) || 0;
    const costoMaizMorado = parseFloat(maizMorado.value) || 0;
    const costoLinaza = parseFloat(linaza.value) || 0;
    const costoLimon = parseFloat(limon.value) || 0;
    const costoCebada = parseFloat(cebada.value) || 0;
    const costoGas = parseFloat(gas.value) || 0;
    const totalCosto = costoAzucar + costoMaizMorado + costoLinaza + costoLimon + costoCebada + costoGas;
    total.value = totalCosto;
}