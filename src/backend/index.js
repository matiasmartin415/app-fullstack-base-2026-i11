//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================
/*
app.get('/devices/', function(req, res, next) {
    devices = [
        { 
            'id': 1, 
            'name': 'Lampara 1', 
            'description': 'Luz living', 
            'state': 0, 
            'type': 1, 
        },
        { 
            'id': 2, 
            'name': 'Ventilador 1', 
            'description': 'Ventilador Habitacion', 
            'state': 1, 
            'type': 2, 
        },
    ]
    res.send(JSON.stringify(devices)).status(200);
});
*/
///////////////A diferencia anterior comentado, saca afuera get dispositivos y cambia res
//=======[ Settings, Imports & Data ]==========================================


//=======[ Main module code ]==================================================

// 👇 1. SACAMOS LA LISTA AFUERA PARA QUE CONSERVE LOS DISPOSITIVOS NUEVOS
let devices = [
    { 
        'id': 1, 
        'name': 'Lampara 1', 
        'description': 'Luz living', 
        'state': 0, 
        'type': 1, 
    },
    { 
        'id': 2, 
        'name': 'Ventilador 1', 
        'description': 'Ventilador Habitacion', 
        'state': 1, 
        'type': 2, 
    },
];

// 👇 2. RUTA DE LECTURA: Devuelve los precargados + los nuevos que cargues
app.get('/devices/', function(req, res, next) {
    res.status(200).send(JSON.stringify(devices));
});

// 👇 3. NUEVA RUTA DE ALTA: Recibe el JSON de tu formulario y lo suma a la lista
app.post('/devices/add', function(req, res) {
    const nuevo = req.body;
    
    // Calcula el siguiente ID disponible (3, 4, 5...)
    nuevo.id = devices.length > 0 ? devices[devices.length - 1].id + 1 : 1;

    // Lo guarda al final del arreglo
    devices.push(nuevo);

    console.log(`➕ [Express] Dispositivo sumado: ${nuevo.name} | IP: ${nuevo.ip || 'N/A'} | MAC: ${nuevo.mac || 'N/A'}`);
    res.status(201).json({ mensaje: "Registrado con éxito", dispositivo: nuevo });
});

///////////////
// ============================================================================
// 💡 NUEVO ENDPOINT: Recibe los movimientos de las barras deslizantes de tu frontend
// ============================================================================
const dgram = require('dgram'); // Herramienta nativa de Node para mandar paquetes Wi-Fi (UDP)

app.post('/control-wiz/', function(req, res) {
    // 1. Capturamos los datos empaquetados que mandó el fetch desde main.ts
    const ipLampara = req.body.ip;
    const nivelBrillo = req.body.brillo;       // Número entre 10 y 100
    const nivelTemp = req.body.temperatura;    // Número entre 2700 y 6500

    // 2. Construimos el mensaje de texto en el formato JSON idéntico que WiZ exige de fábrica
    const mensajeWiz = JSON.stringify({
        method: "setPilot",
        params: {
            state: true,          // La encendemos automáticamente al mover la barra
            dimming: nivelBrillo, // Setea la potencia de la luz
            temp: nivelTemp       // Setea el color frío o cálido
        }
    });

    // 3. Creamos un socket UDP y le disparamos el paquete por Wi-Fi al puerto 38899 de la lámpara
    const clienteUdp = dgram.createSocket('udp4');
    
    clienteUdp.send(mensajeWiz, 38899, ipLampara, function(err) {
        clienteUdp.close(); // Cerramos el canal de red de forma segura para no saturar la RAM
        
        if (err) {
            console.error("❌ Falló el envío Wi-Fi local hacia WiZ:", err);
            res.status(500).send("Error de comunicación con la lámpara");
        } else {
            console.log(`📡 [WiZ] Comando enviado con éxito a ${ipLampara} -> Brillo: ${nivelBrillo}%, Temp: ${nivelTemp}K`);
            res.status(200).send("Lámpara WiZ actualizada con éxito");  
        }
    });
});

///////////////
app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================

//////////////
