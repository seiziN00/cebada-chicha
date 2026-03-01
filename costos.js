(function() {
    const inputsCostos = document.querySelectorAll(".input-costo");
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
        document.getElementById("cebada").value = costosGuardados.cebada || 0;
        document.getElementById("maiz-morado").value = costosGuardados.maizMorado || 0;
        document.getElementById("linaza").value = costosGuardados.linaza || 0;
        document.getElementById("limon").value = costosGuardados.limon || 0;
        document.getElementById("pineapple").value = costosGuardados.pina || 0;
        document.getElementById("canela").value = costosGuardados.canela || 0;
        document.getElementById("leche").value = costosGuardados.leche || 0;
        document.getElementById("fresa").value = costosGuardados.fresa || 0;
        document.getElementById("lucuma").value = costosGuardados.lucuma || 0;
        document.getElementById("tamarindo").value = costosGuardados.tamarindo || 0;
        document.getElementById("maracuya").value = costosGuardados.maracuya || 0;
        document.getElementById("chocolate").value = costosGuardados.chocolate || 0;
        document.getElementById("vainilla").value = costosGuardados.vainilla || 0;
        document.getElementById("bolsitas-marcianos").value = costosGuardados.bolsitasMarcianos || 0;
        document.getElementById("bolsas-cebada-chicha").value = costosGuardados.bolsasCebadaChicha || 0;
        calcular();
    }
    });

    // Guardar preferencias
    guardarCostosBtn.addEventListener("click", guardarPreferencias);
    function guardarPreferencias() {
        const costos = {
            azucar: parseFloat(document.getElementById("azucar").value) || 0,
            cebada: parseFloat(document.getElementById("cebada").value) || 0,
            maizMorado: parseFloat(document.getElementById("maiz-morado").value) || 0,
            linaza: parseFloat(document.getElementById("linaza").value) || 0,
            limon: parseFloat(document.getElementById("limon").value) || 0,
            pina: parseFloat(document.getElementById("pineapple").value) || 0,
            canela: parseFloat(document.getElementById("canela").value) || 0,
            leche: parseFloat(document.getElementById("leche").value) || 0,
            fresa: parseFloat(document.getElementById("fresa").value) || 0,
            lucuma: parseFloat(document.getElementById("lucuma").value) || 0,
            tamarindo: parseFloat(document.getElementById("tamarindo").value) || 0,
            maracuya: parseFloat(document.getElementById("maracuya").value) || 0,
            chocolate: parseFloat(document.getElementById("chocolate").value) || 0,
            vainilla: parseFloat(document.getElementById("vainilla").value) || 0,
            bolsitasMarcianos: parseFloat(document.getElementById("bolsitas-marcianos").value) || 0,
            bolsasCebadaChicha: parseFloat(document.getElementById("bolsas-cebada-chicha").value) || 0
        };
        localStorage.setItem("costos", JSON.stringify(costos));
    }
})();