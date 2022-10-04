let p = document.createElement('p');
document.body.append(p)

document.getElementById("btnAgregar").onclick = () => { Carrito() };
document.getElementById("btnRegistrarme").onclick = () => { Registrarme() };

let arrayClientes = [];

init();

async function init() {
    let aux;
    let stringCotizaciones = '';
    let hola = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales').then(response => response.json())
        .then(response => aux = response);


    for (let index = 0; index < aux.length; index++) {
        stringCotizaciones += "Agencia: " + aux[index].casa.agencia + " | " + aux[index].casa.nombre + " - Compra:" + aux[index].casa.compra + " - Venta:" + aux[index].casa.venta + "\n"
    }


    let j = document.createElement('p');
    j.innerText = stringCotizaciones;
    document.querySelector('#divcotizacion').append(j);
}


function Registrarme() {
    event.preventDefault();
    let usuario = Object();
    usuario.correo = document.getElementById("txtName").value;
    usuario.contraseña = document.getElementById("txtPass").value;
    usuario.carrito = [];

    arrayClientes.push(usuario);
}


function inicioSesion() {

    let buscar = document.getElementById("txtBuscar").value;
    for (let index = 0; index < arrayClientes.length; index++) {
        if (buscar == arrayClientes[index].correo) {
            return index;
        }
    }
    return -1;
}

function Carrito() {
    event.preventDefault();
    let auxAuth = inicioSesion();
    if (auxAuth != -1) {

        let nuevoProducto = new Object();
        nuevoProducto.producto = document.getElementById("txtProducto").value;
        nuevoProducto.cantidad = document.getElementById("txtCantidad").value;

        arrayClientes[auxAuth].carrito.push(nuevoProducto);

        let stringProductos = "";

        for (let index = 0; index < arrayClientes[auxAuth].carrito.length; index++) {
            stringProductos += arrayClientes[auxAuth].carrito[index].cantidad + " - " + arrayClientes[auxAuth].carrito[index].producto + "\n"

        }

        p.innerText = "El cliente " + arrayClientes[auxAuth].correo + " tiene en su carrito los productos:\n" + stringProductos
        document.querySelector('#divCarrito').append(p)
    } else {
        alert("Usuario no encontrado")
        Registrarme();
    }
}
let buttonComprar = document.getElementById("btnComprar");
buttonComprar.onclick = () => {console.log(Comprar())};
function Comprar() {
    event.preventDefault();
    let image = document.createElement("img");
    image.src = 'resources/ImagenFinal.png';
    image.style = 'position:absolute;width:100%;top:0;'
    document.querySelector('#divInicial').appendChild(image);
    document.querySelector('#ocultarAlComprar').style.display = 'none';
    window.scrollTo(0,0);

}