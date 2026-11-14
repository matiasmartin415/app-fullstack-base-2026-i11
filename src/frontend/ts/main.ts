
/*function SayHello(){
    let current_value = document.getElementById("textarea_1") as HTMLInputElement;
    let new_value = "Hello world!!!" + "\n" + current_value.value;
    document.getElementById("textarea_1").innerHTML = new_value;
}*/

/*function SayHello(){
    // Buscamos la caja de texto
    let current_value = document.getElementById("textarea_1") as HTMLInputElement;
    
    // Guardamos lo que habías llegado a escribir (si había algo)
    let textoEscrito = current_value.value;
    
    // Creamos el nuevo texto sumando el saludo arriba
    let new_value = "Hola!!!" + "\n" + textoEscrito;
    
    // ¡AQUÍ ESTÁ EL CAMBIO! Usamos .value en lugar de .innerHTML
    current_value.value = new_value;
}*/
/*function SayHello() {
    // 1. Buscamos la caja de texto
    let cajaTexto = document.getElementById("textarea_1") as HTMLInputElement;
    
    // 2. Guardamos el texto que escribiste con tu teclado
    let textoOriginal: string = cajaTexto.value;
    
    // 3. Contamos cuántos caracteres (letras y espacios) tiene
    let cantidadLetras: number = textoOriginal.length;
    
    // 4. Convertimos todo tu texto a MAYÚSCULAS
    let textoEnMayusculas: string = textoOriginal.toUpperCase();
    
    // 5. Armamos el mensaje final para mostrar en la pantalla
    let resultado: string = `Tu texto en mayúsculas:\n${textoEnMayusculas}\n\n(Escribiste un total de ${cantidadLetras} caracteres).`;
    
    // 6. Lo metemos en el cuadro para que lo veas
    cajaTexto.value = resultado;
}
function ClearText() {
    // Buscamos la caja de texto
    let cajaTexto = document.getElementById("textarea_1") as HTMLInputElement;
    
    // Le asignamos un texto completamente vacío
    if (cajaTexto) {
        cajaTexto.value = "";
    }
}
*/
function SayHello() {
    let cajaTexto = document.getElementById("textarea_1") as HTMLInputElement;
    let contenedorMensaje = document.getElementById("mensaje_ayuda") as HTMLElement; 
    
    // 🔥 PROTECCIÓN: Si por alguna razón no encuentra el div, detenemos la función para que no tire error
    if (!contenedorMensaje) {
        console.error("El elemento 'mensaje_ayuda' no existe en el HTML.");
        return; 
    }

    let texto: string = cajaTexto.value.trim();

    if (texto === "") {
        contenedorMensaje.innerText = "❌ Error: ¡No puedes enviar un texto vacío!";
        contenedorMensaje.style.color = "red";
    } 
    else if (texto.length < 5) {
        contenedorMensaje.innerText = "⚠️ Alerta: El texto debe tener al menos 5 letras.";
        contenedorMensaje.style.color = "orange";
    } 
    else {
        contenedorMensaje.innerText = "✅ ¡Texto válido y procesado correctamente!";
        contenedorMensaje.style.color = "green";
        cajaTexto.value = `Procesado: ${texto.toUpperCase()}`;
    }
}

function ClearText() {
    let cajaTexto = document.getElementById("textarea_1") as HTMLInputElement;
    let contenedorMensaje = document.getElementById("mensaje_ayuda") as HTMLElement; 
    
    if (cajaTexto) cajaTexto.value = "";
    if (contenedorMensaje) contenedorMensaje.innerText = ""; 
}

// ============================================================================
// TU CÓDIGO ACTUAL (SayHello, ClearText, manejo del cuadro de texto, etc.)
// ¡DEJA TODO ESTO TAL CUAL ESTÁ!
// ============================================================================



// ============================================================================
// 💡 AGREGA ESTO JUSTO AL FINAL DE TU ARCHIVO (CÓDIGO NUEVO PARA WIZ)
// ============================================================================

// 1. EL MOLDE: Definimos la Clase aplicando Encapsulamiento
/*
class LamparaWiz {
    private ip: string;
    private brillo: number = 100;
    private temperatura: number = 4000;

    constructor(ipDeLaLampara: string) {
        this.ip = ipDeLaLampara; 
    }

    public cambiarAjustes(nuevoBrillo: number, nuevaTemp: number): void {
        this.brillo = nuevoBrillo;
        this.temperatura = nuevaTemp;

        console.log(`[POO] Enviando orden a lámpara WiZ. Brillo: ${this.brillo}%, Temp: ${this.temperatura}K`);

        // ABSTRACCIÓN: Petición de red hacia el backend Express
        fetch('http://localhost:8000/control-wiz/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ip: this.ip,
                brillo: this.brillo,
                temperatura: this.temperatura
            })
        })
        .then(respuesta => {
            if (respuesta.ok) {
                console.log("¡Backend recibió la actualización de WiZ con éxito!");
            } else {
                console.error("Fallo la comunicación con el servidor");
            }
        })
        .catch(error => {
            console.error("Error de red en el fetch:", error);
        });
    }
}
*/

// 2. EL ARRANQUE: Conectamos los listeners cuando se carga la pantalla
window.addEventListener("load", () => {
    console.log("¡El módulo WiZ se ha cargado correctamente!");

    // 🛠️ FUNCIÓN REUTILIZABLE: Evita repetir código para cada lámpara
    const inicializarLampara = (ip: string, idBrillo: string, idTemperatura: string) => {
        const lampara = new LamparaWiz(ip);

        const controlBrillo = document.getElementById(idBrillo) as HTMLInputElement;
        const controlTemp = document.getElementById(idTemperatura) as HTMLInputElement;

        if (controlBrillo && controlTemp) {
            const enviarCambios = () => {
                const brillo = parseInt(controlBrillo.value);
                const temp = parseInt(controlTemp.value);
                lampara.cambiarAjustes(brillo, temp);
            };

            controlBrillo.addEventListener("change", enviarCambios);
            controlTemp.addEventListener("change", enviarCambios);
        } else {
            console.error(`No se encontraron los controles '${idBrillo}' o '${idTemperatura}' en el HTML`);
        }
    };

    // Instanciamos tus dos lámparas de forma limpia
    inicializarLampara("192.168.1.34", "wiz-brillo", "wiz-temperatura");
    inicializarLampara("192.168.1.47", "wiz-brillo-2", "wiz-temperatura-2");

    // ========================================================================
    // 🚀 CAPTURA Y ENVÍO REAL AL SERVIDOR (Fetch + Async/Await)
    // ========================================================================
    const formulario = document.getElementById("formulario-dispositivo") as HTMLFormElement;
    const txtNombre = document.getElementById("form-nombre") as HTMLInputElement;
    const txtDescripcion = document.getElementById("form-descripcion") as HTMLInputElement;
    const selectTipo = document.getElementById("form-tipo") as HTMLSelectElement;
    const txtIp = document.getElementById("form-ip") as HTMLInputElement;
    const txtMac = document.getElementById("form-mac") as HTMLInputElement;
    const lblMensaje = document.getElementById("form-mensaje") as HTMLElement;

    if (formulario) {
        formulario.addEventListener("submit", async (evento) => {
            evento.preventDefault(); // Evita que Firefox recargue la página

            // Validación: exige al menos IP o MAC si es una lámpara WiZ
            if (selectTipo.value === "3" && txtIp.value.trim() === "" && txtMac.value.trim() === "") {
                lblMensaje.innerText = "⚠️ Debes ingresar al menos la IP o la MAC para una lámpara WiZ.";
                lblMensaje.style.color = "orange";
                return;
            }

            // Armamos el paquete de datos con los nombres exactos que espera Express
            const nuevoDispositivo = {
                name: txtNombre.value,
                description: txtDescripcion.value,
                type: parseInt(selectTipo.value),
                state: 0,
                ip: txtIp.value.trim(),
                mac: txtMac.value.trim()
            };

            try {
                // Disparamos la petición POST asíncrona hacia el servidor
                const respuesta = await fetch('http://localhost:8000/devices/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(nuevoDispositivo)
                });

                if (respuesta.ok) {
                    console.log("📦 ¡Enviado y guardado en Express!", nuevoDispositivo);
                    lblMensaje.innerText = `✅ ¡${nuevoDispositivo.name} guardado en el servidor!`;
                    lblMensaje.style.color = "green";
                    formulario.reset(); // Limpia los casilleros
                } else {
                    lblMensaje.innerText = "❌ Error en el servidor al guardar.";
                    lblMensaje.style.color = "red";
                }
            } catch (error) {
                console.error("Error de red en el fetch:", error);
                lblMensaje.innerText = "❌ Error de conexión con el backend.";
                lblMensaje.style.color = "red";
            }
        });
    }
});
