import { validarText} from "./modulos.js";
import { validarForm ,campo,crearTablas,get} from "./modulos.js";
const formulario = document.querySelector("form");
const ciudad = document.querySelector('[name="ciudad"]');

formulario.addEventListener( "submit",validarForm)
ciudad.addEventListener("keydown", validarText);
ciudad.addEventListener("blur", campo);

const ciudades = await get("ciudades");
crearTablas(["id", "ciudad"], ciudades.data);

export const validarText = (event) => {
  let letra = event.key;
  const regexTexto = /^[a-zA-Z]+$/;
  if (!regexTexto.test(letra)) {
    event.preventDefault();
  }
};
