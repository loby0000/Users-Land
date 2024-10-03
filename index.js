const apiURL = 'https://my-json-server.typicode.com/loby0000/Api-Usuarios/db';

let users = []; 

function mostrarUsuarios() {
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = ''; 

    users.forEach(user => {
        const row = `
            <tr data-identificacion="${user.identificacion}">
                <td>${user.tipo_identificacion}</td>
                <td>${user.identificacion}</td>
                <td>${user.nombre}</td>
                <td>${user.apellido}</td>
                <td>${user.edad}</td>
                <td>${user.correo}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    document.getElementById('userCount').innerText = `Total de usuarios: ${users.length}`;
}


function obtenerUsuarios() {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            users = data.Users[0]; 
            mostrarUsuarios();
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}


function buscarUsuario() {
    const identificacion = document.getElementById('identificacion').value;

    if (identificacion) {
        const usuarioEncontrado = users.find(user => user.identificacion === identificacion);

        if (usuarioEncontrado) {
           
            document.getElementById('nombre').value = usuarioEncontrado.nombre;
            document.getElementById('apellido').value = usuarioEncontrado.apellido;
            document.getElementById('edad').value = usuarioEncontrado.edad;
            document.getElementById('correo').value = usuarioEncontrado.correo;

            
            document.getElementById('btnModificar').disabled = false;
            document.getElementById('btnEliminar').disabled = false;
        } else {
            alert('Usuario no encontrado');
            console.log('Usuario no encontrado');
        }
    } else {
        alert('Por favor ingrese una identificación');
        console.log('Por favor ingrese una identificación');
    }
}

function modificarUsuario() {
    const identificacion = document.getElementById('identificacion').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const correo = document.getElementById('correo').value;

    if (identificacion && nombre && apellido && edad && correo) {
    
        const usuarioIndex = users.findIndex(user => user.identificacion === identificacion);
        if (usuarioIndex !== -1) {
            users[usuarioIndex] = {
                tipo_identificacion: users[usuarioIndex].tipo_identificacion, 
                identificacion: identificacion,
                nombre: nombre,
                apellido: apellido,
                edad: edad,
                correo: correo
            };

            alert(`Usuario ${identificacion} modificado: ${nombre} ${apellido}, Edad: ${edad}, Correo: ${correo}`);
            console.log(`Usuario ${identificacion} modificado: ${nombre} ${apellido}, Edad: ${edad}, Correo: ${correo}`);
            mostrarUsuarios(); 
        }
    } else {
        alert('Complete todos los campos para modificar.');
        console.log('Complete todos los campos para modificar.');
    }
}

function agregarUsuario() {
    const identificacion = document.getElementById('nuevoid').value;
    const nombre = document.getElementById('nuevoNombre').value;
    const apellido = document.getElementById('nuevoApellido').value;
    const edad = document.getElementById('nuevoEdad').value;
    const correo = document.getElementById('nuevoCorreo').value;
    const tipo_identificacion = document.getElementById('nuevoTipoId').value; 

    if (tipo_identificacion && identificacion && nombre && apellido && edad && correo) {
       
        const nuevoUsuario = {
            tipo_identificacion: tipo_identificacion,
            identificacion: identificacion, 
            nombre: nombre,
            apellido: apellido,
            edad: edad,
            correo: correo
        };
        users.push(nuevoUsuario); 
        alert(`Usuario agregado: Tipo de Identificación: ${tipo_identificacion}, Identificación: ${identificacion}, Nombre: ${nombre} Apellido: ${apellido}, Edad: ${edad}, Correo: ${correo}`);
        console.log(`Usuario agregado: Tipo de Identificación: ${tipo_identificacion}, Identificación: ${identificacion}, Nombre: ${nombre} Apellido: ${apellido}, Edad: ${edad}, Correo: ${correo}`);
        mostrarUsuarios();
    } else {
        alert('Complete todos los campos para agregar un nuevo usuario.');
        console.log('Complete todos los campos para agregar un nuevo usuario.');
    }
}

function eliminarUsuario() {
    const identificacion = document.getElementById('identificacion').value;
    if (identificacion) {
      
        users = users.filter(user => user.identificacion !== identificacion);
        alert(`Usuario con identificación ${identificacion} eliminado.`);
        console.log(`Usuario con identificación ${identificacion} eliminado.`);
        mostrarUsuarios(); 
     
        document.getElementById('identificacion').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('edad').value = '';
        document.getElementById('correo').value = '';
        document.getElementById('btnModificar').disabled = true;
        document.getElementById('btnEliminar').disabled = true;
    } else {
        alert('Por favor ingrese una identificación para eliminar.');
        console.log('Por favor ingrese una identificación para eliminar.');
    }
}

obtenerUsuarios();