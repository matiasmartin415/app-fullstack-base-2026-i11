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

        console.log(`[POO] Enviando orden a lámpara WiZ en ${this.ip}. Brillo: ${this.brillo}%, Temp: ${this.temperatura}K`);

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
                console.log(`¡Backend recibió la actualización para ${this.ip} con éxito!`);
            } else {
                console.error("Fallo la comunicación con el servidor");
            }
        })
        .catch(error => {
            console.error("Error de red en el fetch:", error);
        });
    }
}
