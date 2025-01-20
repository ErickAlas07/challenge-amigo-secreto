// Declaración de variables
let amigos = [];
let lista = document.getElementById('listaAmigos');

// Función para agregar amigos
function agregarAmigo() {
    let name = document.getElementById('amigo').value.trim();

    // Validar nombre
    if (!validarNombre(name)) return;

    // Validar si el amigo ya existe en la lista
    if (existeAmigo(name)) return;

    amigos.push(name); // Agregar amigo a la lista
    limpiarCaja(); // Limpiar caja de texto
    mostrarAmigos(); // Mostrar lista de amigos
}

// Función para mostrar lista de amigos
function mostrarAmigos(){
    let listaAmigos = '';
    
    lista.innerHTML = ''; // Limpiar la lista existente

    // Recorrer la lista de amigos
    for(let amigo of amigos){
        listaAmigos += `<li>${amigo}</li>`;
    }
   lista.innerHTML = listaAmigos;
}

// Función para sortear amigo secreto
function sortearAmigo() {
    // Validar que haya amigos en la lista
    if (amigos.length === 0) {
        mostrarResultado('No hay amigos en la lista');
        return;
    }

    // Generar un índice aleatorio
    let indiceRandom = Math.floor(Math.random() * amigos.length);

    // Mostrar el amigo secreto
    mostrarResultado(`El amigo secreto sorteado es: ${amigos[indiceRandom]}`);

    // Eliminar amigo de la lista
    amigos.splice(indiceRandom, 1);

    // Actualizar la lista HTML
    actualizarLista();
}

// Función para validar entrada de texto
function validarNombre(name) {
    if (name === '') {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, ingrese un nombre.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return false;
    }
    return true;
}

// Función para validar si existe un amigo en la lista
function existeAmigo(name) {
    if (amigos.includes(name)) {
        Swal.fire({
            title: 'Duplicado',
            text: 'El amigo ya existe en la lista.',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            limpiarCaja(); // Limpiar caja de texto 
        });
        return true;
    }
    return false;
}

// Función para limpiar caja de texto
function limpiarCaja(){
    document.getElementById('amigo').value = '';
}

// Función para mostrar un mensaje en el resultado
function mostrarResultado(mensaje) {
    let resultado = document.getElementById('resultado');
    resultado.innerHTML = `<li>${mensaje}</li>`;
}

// Función para actualizar la lista HTML
function actualizarLista() {
    amigos = [];
    lista.innerHTML = '';
    for (let amigo of amigos) lista.innerHTML += `<li>${amigo}</li>`;
}

// Eventos
// Evento para añadir amigo al presionar ENTER
document.getElementById('amigo').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        agregarAmigo();
    }
});