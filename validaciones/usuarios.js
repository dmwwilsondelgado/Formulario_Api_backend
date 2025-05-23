import { validarForm ,validarText,validarNum,validarContaseña,campo} from "./modulos.js";

const formulario = document.querySelector("form");
const nombre = document.querySelector('[name="nombre"]');
const apellido = document.querySelector('[name="apellido"]');
const telefono = document.querySelector('[name="telefono"]');
const documento = document.querySelector('[name="documento"]');
const usuario = document.querySelector('[name="usuario"]');
const contrasena = document.querySelector('[name="contrasena"]');
const ciudades=document.querySelector('[name="ciudades"]');
const generos=document.querySelector('[name=genero]')
const codiciones = document.querySelector("#permisos");
const boton = document.querySelector("btn_guardar");

formulario.addEventListener("submit", validarForm);

nombre.addEventListener("keydown", validarText);
apellido.addEventListener("keydown", validarText);
telefono.addEventListener("keydown", validarNum);
documento.addEventListener("keydown", validarNum);
usuario.addEventListener("keydown", validarText);
contrasena.addEventListener("keydown", validarContaseña);

nombre.addEventListener("blur", campo);
apellido.addEventListener("blur", campo);
telefono.addEventListener("blur", campo);
documento.addEventListener("blur", campo);
usuario.addEventListener("blur", campo);
contrasena.addEventListener("blur", campo);
codiciones.addEventListener("blur", campo);

codiciones.addEventListener("DOMContentLoaded", (event) => {
  if (!codiciones.checked) {
    boton.setAttribute("disable", "")
  }
  else {
    boton.removeAttribute("disable")
  }
})


