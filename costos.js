(function() {
    const inputsCostos = document.querySelectorAll(
        "#azucar, #maiz-morado, #linaza, #limon, #cebada"
    );
    const total = document.getElementById("total");
    const guardarCostosBtn = document.getElementById("guardar-costos");

    const litros = document.getElementById("litros");

    document.querySelectorAll(".costes input").forEach(input => {
        input.addEventListener("input", calcular);
    });

    function calcular() {
        let totalCosto = 0;

        inputsCostos.forEach(input => {
            totalCosto += parseFloat(input.value) || 0;
        });

        total.value = totalCosto.toFixed(2);

        const litros = parseFloat();
    }

    // Cargar costos guardados al iniciar
    window.addEventListener("load", () => {
    const costosGuardados = JSON.parse(localStorage.getItem("costos"));
    
    if (costosGuardados) {
        document.getElementById("azucar").value = costosGuardados.azucar || 0;
        document.getElementById("maiz-morado").value = costosGuardados.maizMorado || 0;
        document.getElementById("linaza").value = costosGuardados.linaza || 0;
        document.getElementById("limon").value = costosGuardados.limon || 0;
        document.getElementById("cebada").value = costosGuardados.cebada || 0;
        document.getElementById("gas").value = costosGuardados.gas || 0
        calcular();
    }
    });

    // Guardar preferencias
    guardarCostosBtn.addEventListener("click", guardarPreferencias);
    function guardarPreferencias() {
        const costos = {
            azucar: parseFloat(document.getElementById("azucar").value) || 0,
            maizMorado: parseFloat(document.getElementById("maiz-morado").value) || 0,
            linaza: parseFloat(document.getElementById("linaza").value) || 0,
            limon: parseFloat(document.getElementById("limon").value) || 0,
            cebada: parseFloat(document.getElementById("cebada").value) || 0,
            gas: parseFloat(document.getElementById("gas").value) || 0
        };
        localStorage.setItem("costos", JSON.stringify(costos));
    }
})();