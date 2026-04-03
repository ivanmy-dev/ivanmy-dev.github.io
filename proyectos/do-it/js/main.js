
let datos = [];

function contac(contactoform) {
    const { nombre, mail, telefono, mensaje } = contactoform;
    let dato = { nombre: nombre.value, mail: mail.value, telefono: telefono.value, mensaje: mensaje.value };
    datos.push(dato);

    console.log(datos);
    contactoform.reset();
    alert('Mensaje Enviado!');
}


// calcular imc
function calcimc(calculadora) {
    let kilos = 0;
    let centiM = 0;

    centiM = parseInt(document.getElementById("centiM").value);
    kilos = parseInt(document.getElementById("kilo").value);
    
    let alturaMetros = centiM / 100;
    let calculo = (kilos / Math.pow(alturaMetros, 2)).toFixed(1);
    let diagnostico = "";
    let color = "#007bff"; 

    if (calculo < 18.5) {
        diagnostico = "Bajo peso";
        color = "#ffc107";
    } else if (calculo >= 18.5 && calculo <= 24.9) {
        diagnostico = "Peso normal (Saludable)";
        color = "#28a745";
    } else if (calculo >= 25 && calculo <= 29.9) {
        diagnostico = "Sobrepeso";
        color = "#fd7e14";
    } else if (calculo >= 30 && calculo <= 34.9) {
        diagnostico = "Obesidad Grado I";
        color = "#dc3545";
    } else if (calculo >= 35 && calculo <= 39.9) {
        diagnostico = "Obesidad Grado II";
        color = "#bd2130";
    } else {
        diagnostico = "Obesidad Grado III (Mórbida)";
        color = "#721c24"; 
    }

    document.getElementById('resultado').innerHTML = `
        <div style="border: 2px solid ${color}; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center;">
            <h3 style="margin: 0; font-size: 1.2rem; color: white;">Tu IMC es: <strong>${calculo}</strong></h3>
            <p style="color: ${color}; text-align: center; font-weight: bold; font-size: 1.4rem; margin: 10px 0 0 0; text-transform: uppercase;">
                ${diagnostico}
            </p>
        </div>
    `;

    console.log(`IMC: ${calculo} - ${diagnostico}`);
}

$(document).ready(function () {
    $('#centiM').on('input change', function () {
        $('#rcentiM').val($(this).val() + ' cm');
    });
    
    $('#kilo').on('input change', function () {
        $('#rkilo').val($(this).val() + ' kg');
    });
});