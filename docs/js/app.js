const ingresos = [
    new Ingreso('Salario', 2100.00),
    new Ingreso('Venta casa', 5000.00)
];

const egresos = [
    new Egreso('Alquiler',900),
    new Egreso('Compras',400)
]

let cargarApp = () => {
    cargarCabecero();
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
