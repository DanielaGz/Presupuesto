const ingresos = [];

const egresos = []

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () =>{
    let totalIngreso = 0;
    ingresos.forEach(ingreso => {
        totalIngreso += ingreso.valor;
    });
    return totalIngreso;
}

let totalEgresos = () =>{
    let totalEgreso = 0;
    egresos.forEach(egreso => {
        totalEgreso += egreso.valor;
    });
    return totalEgreso;
}

let cargarCabecero = () =>{
    let ingresos = totalIngresos();
    let egresos = totalEgresos();
    let presupuesto = ingresos - egresos;
    let porcentajeEgreso = egresos / ingresos;

    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto)
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingreso').innerHTML = formatoMoneda(ingresos);
    document.getElementById('egreso').innerHTML = formatoMoneda(egresos);
}

const formatoMoneda = (valor) =>{
    return valor.toLocaleString('en-US', {style: 'currency', currency:'USD', minimumFractionDigits:2});
}

const formatoPorcentaje = (valor) =>{
    return valor.toLocaleString('en-US', {style: 'percent', minimumFractionDigits:2});
}

const cargarIngresos = () =>{
    let ingresosHTML = '';
    ingresos.forEach(ingreso => {
        ingresosHTML += crearIngresoHTML(ingreso);
    });
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) =>{
    let ingresoHTML= `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">
            ${ingreso.descripcion}
        </div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">
                + ${formatoMoneda(ingreso.valor)}
            </div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>`;   
    return ingresoHTML;
}

const eliminarIngreso = (id) =>{
    let indicieEliminar = ingresos.findIndex(ingreso => ingreso.id === id)
    ingresos.splice(indicieEliminar,1);
    cargarCabecero();
    cargarIngresos();
}

const cargarEgresos = () =>{
    let egresosHTML = '';
    egresos.forEach(egreso => {
        egresosHTML += crearEgresoHTML(egreso);
    });
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) =>{
    let egresoHTML = `
    <div class="elemento limpiarElemento">
        <div class="elemento_descripcion">
            ${egreso.descripcion}
        </div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">
                - ${formatoMoneda(egreso.valor)}
            </div>
            <div class="elemento_porcentaje">
                ${formatoPorcentaje(egreso.valor/totalEgresos())}
            </div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick="eliminarEgreso(${egreso.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return egresoHTML;
}

const agregarDato = () =>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}

const eliminarEgreso = (id) =>{
    let indicieEliminar = egresos.findIndex(egreso => egreso.id === id)
    egresos.splice(indicieEliminar,1);
    cargarCabecero();
    cargarEgresos();
}