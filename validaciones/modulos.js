export const validarText = (event) => {
  let letra = event.key;
  const regexTexto = /^[a-zA-Z]+$/;
  if (!regexTexto.test(letra)) {
    event.preventDefault();
  }
};

export const validarNum = (event) => {
  const letra = event.key;
  // Permitir teclas especiales
  const teclasPermitir = [
    "Backspace",
    "ArrowLeft",
    "ArrowRight",
    "Delete",
    "Tab",
  ];
  if (teclasPermitir.includes(letra)) return; 
  const regexNumeros = /^[0-9]$/;
  // Solo números del 0 al 9
  if (!regexNumeros.test(letra)) {
    event.preventDefault();
  }
};
export const validarContaseña = (event) => {
  let letra = event.key;
  const regexContra = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  const teclasPermitir = [
    "Backspace",
    "ArrowLeft",
    "ArrowRight",
    "Delete",
    "Tab",
  ];
  if (teclasPermitir.includes(letra)) return;
  if (regexContra.test(letra)) {
    alert("contraseña valida");
  }
};
export const campo = (event) => {
  if (event.target.value !== "") {
    event.target.classList.remove("input__border");
    if (event.target.nextElementSibling) {
      event.target.nextElementSibling.remove();
    }
  }
};


export const validarForm = (e) => {
  e.preventDefault();
  const datosUsuario = {};

  const campos = [...e.target].filter((hijo) =>
    hijo.hasAttribute("required")
  );

  // Validación de INPUT y SELECT
  campos.forEach((dato) => {
    switch (dato.tagName) {
      case "INPUT":
        if (["text", "tel", "password"].includes(dato.type)) {
          if (dato.value.trim() === "") {
            dato.classList.add("input__border");
            let span = document.createElement("span");
            span.classList.add("span");
            span.textContent = `Debes llenar el campo ${dato.name} que se encuentra vacío`;
            dato.insertAdjacentElement("afterend", span);
          } else {
            datosUsuario[dato.name] = dato.value;
          }
        } else if (dato.type !== "radio" && dato.type !== "checkbox") {
          // Otros inputs (email, etc.)
          datosUsuario[dato.name] = dato.value;
        }
        break;

      case "SELECT":
        if (dato.selectedIndex === 0) {
            const contenedor = document.querySelector(".content__check");

          const span = document.createElement("span");
          span.classList.add("span");
          span.textContent = `Debes seleccionar al menos  3 en lenguaje`;

          contenedor.insertAdjacentElement("afterend", span);
        } else {
          datosUsuario[dato.name] = dato.value;
        }
        break;
    }
  });

  //se capturan los radios 

  const radios = campos.filter((el) => el.type === "radio");
  const radioSeleccionado = radios.find((r) => r.checked);
  if (radioSeleccionado) {
    datosUsuario[radioSeleccionado.name] = radioSeleccionado.value;
  } else if (radios.length > 0) {
    datosUsuario[radios[0].name] = "";
    
  
  }

   // se capturan los chechboxs y se filtran
  const checks = campos.filter((el) => el.type === "checkbox");
    //se filtran para saber si estan chequiados 
  const checksMarcados = checks.filter((ch) => ch.checked);
  // se verifica si hay menos de tres de lo contrario retornara el objeto con su valor 
  if (checksMarcados.length < 3 && checks.length > 0) {
    datosUsuario[checks[0].name] = "";
    const contenedor = document.querySelector(".content__check");

    const span = document.createElement("span");
    span.classList.add("span");
    span.textContent = `Debes seleccionar al menos  3 en lenguaje`;

    contenedor.insertAdjacentElement("afterend", span);
  } else if (checks.length > 0) {
    datosUsuario[checks[0].name] = checksMarcados.map((ch) => ch.value);
  }

  console.log(datosUsuario);
  return datosUsuario;
};
// peticion de get ...

const url = "http://localhost:3000";

 export async function get(endpoint) {
  try {
    const peticion = await fetch(`${url}/${endpoint}`)
    return await peticion.json();
  } catch (error) {
    console.error("Error mio",error)
  }
  return;
}




export const validarCamposMinimos = (event) => {
  let minimo= event.target.getAttribute("min");
  if (event.target.value.length < minimo) {
    event.target.classList.add("input__border")
    if (event.target.nextElementSibling) event.target.nextElementSibling.remove();
    let afterend = document.createElement('span');
    afterend.textContent = `El campo ${event.target.getAttribute("name")} debe tener minimo ${min} caracteres`
    event.target.insertAdjacentElement('afterend', afterend);
    return false;
  } else return true;
}


// creacion de tablas
export const crearTablas = (data, datosUsuario) => {
  if (datosUsuario.length > 0) {
    const body = document.querySelector("body");
    const tabla = document.createElement("table");
    tabla.classList.add("tabla");

    // Encabezado
    const encabezado = document.createElement("thead");
    const raizEncabezado = document.createElement("tr");
    datosUsuario.forEach(nombre => {
      const campo = document.createElement("th");
      campo.textContent = nombre;
      raizEncabezado.append(campo);
    });
    encabezado.append(raizEncabezado);
    tabla.append(encabezado);

    // Cuerpo
    const cuerpo = document.createElement("tbody");
    data.forEach(reLenguaje => {
      const raiz = document.createElement("tr");

      Object.keys(reLenguaje).forEach(clave => {
        const nuevoCampo = document.createElement("td");
        nuevoCampo.textContent = reLenguaje[clave];
        raiz.append(nuevoCampo);
      });

      // Botones
      const opcion = document.createElement("td");
      const contenBotones = document.createElement("div");
      const botonEditar = document.createElement("button");
      const botonEliminar = document.createElement("button");

      botonEditar.textContent = "Editar";
      botonEliminar.textContent = "Eliminar";

      contenBotones.append(botonEditar);
      contenBotones.append(botonEliminar);
      opcion.append(contenBotones);
      raiz.append(opcion);

      cuerpo.append(raiz);
    });

    tabla.append(cuerpo);
    body.append(tabla);
  }
};
