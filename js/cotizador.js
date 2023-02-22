// Declaro variables para los precios de cada item
let dahuaPrecio = 3000;
let hikPrecio = 10000;
let almacenamiento1tbPrecio = 15000;
let almacenamiento2tbPrecio = 25000;
let almacenamiento4tbPrecio = 40000;
let manoDeObraPrecio = 15000;

// Declaro la variable de preciototal 
let precioTotal = 0;

// Recopilo info
let marcaRadio = document.querySelectorAll('input[name="favMarca"]');
let almacenamientoRadio = document.querySelectorAll('input[name="capacidad"]');
let numeroDeCamaras = document.querySelector('.inputNumber');
let manoDeObraCheck = document.querySelector('#manoDeObra');
let resultDiv = document.querySelector('#price');

// Agrego un event listener del boton
document.querySelector('.botonCotizacion').addEventListener('click', function () {

    // Ciclo para traer info de marcas
    for (let i = 0; i < marcaRadio.length; i++) {
        if (marcaRadio[i].checked) {
            if (marcaRadio[i].id == "dahua") {
                precioTotal += dahuaPrecio;
            } else {
                precioTotal += hikPrecio;
            }
        }
    }

    // Ciclo para traer info de almacenamiento
    for (let i = 0; i < almacenamientoRadio.length; i++) {
        if (almacenamientoRadio[i].checked) {
            if (almacenamientoRadio[i].id == "1tb") {
                precioTotal += almacenamiento1tbPrecio;
            } else if (almacenamientoRadio[i].id == "2tb") {
                precioTotal += almacenamiento2tbPrecio;
            } else {
                precioTotal += almacenamiento4tbPrecio;
            }
        }
    }

    // Número de cámaras
    let numberOfCameras = parseInt(numeroDeCamaras.value);
    precioTotal += numberOfCameras * 15000;

    // Chequear la mano de obra
    if (manoDeObraCheck.checked) {
        precioTotal += manoDeObraPrecio * numberOfCameras;
    }

    // Render del precio final 
    resultDiv.innerHTML = "El precio total es: " + precioTotal;

    // Recopilo el email del cliente
    let clienteEmail = document.querySelector('input[name="clienteEmail"]').value;

    // Creo un objeto con la información de la cotización
    const cotizacion = {
        marcaRadio: marcaRadio.selectedIndex,
        almacenamientoRadio: almacenamientoRadio.selectedIndex,
        numeroDeCamaras: numeroDeCamaras.value,
        clienteEmail: clienteEmail,
        manoDeObraCheck: manoDeObraCheck.checked,
        precioTotal: precioTotal
    };

    localStorage.setItem("cotizacion", JSON.stringify(cotizacion));

    // Obtengo los datos guardados en local storage
    let presupuestos = JSON.parse(localStorage.getItem("presupuestos")) || [];

    // Agrego la nueva cotización a los datos guardados
    presupuestos.push(cotizacion);


});

// Creamos una función que devuelve una promesa
function obtenerPrecioDolar() {
    return new Promise((resolve, reject) => {
      // Hacemos una solicitud a la API del Banco Central de la República Argentina
      fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
        .then(response => response.json())
        .then(data => {
          // Analizamos la respuesta de la API para obtener el precio actual del dólar en pesos argentinos
          const dolarHoy = data.find(value => value.casa.nombre === "Dolar")
          // Devolvemos el precio actual del dólar en pesos argentinos
          resolve(dolarHoy.casa.venta);
        })
        .catch(error => {
          // Devolvemos el error en caso de que falle la solicitud a la API
          reject(error);
        });
    });
  }
  
  // Usamos la función que devuelve la promesa
  obtenerPrecioDolar()
    .then(precio => {
      // Mostramos el precio en un div
      const PrecioDolar = document.querySelector('#precioDolar');
      PrecioDolar.innerHTML = `El precio actual del dólar oficial en pesos argentinos es: $ ${precio}`;
    })
    .catch(error => console.error(error));








