const express = require('express');
const path = require('path');
const winax = require('winax'); // Importar winax para trabajar con COM
const mysql = require('mysql2');
const db = require('./con_db');

const connection = mysql.createConnection(db);

module.exports = connection;
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar JSON
app.use(express.json());

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para obtener los correos desde la base de datos
app.get('/api/info_correo', (req, res) => {
    connection.query('SELECT accountaddress FROM hm_accounts', (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err.code, err.message);
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }
        res.status(200).json(results || []); // Devuelve los resultados en formato JSON
    });
});

// Endpoint para agregar un nuevo correo en hMailServer
app.post('/api/correos', (req, res) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
        return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
    }

    try {
        console.log('Conectando al COM API de hMailServer...');
        const hMailServerApp = new winax.Object('hMailServer.Application', { architecture: 'x86' }); // Forzar 32 bits
        hMailServerApp.Authenticate('Administrator', 'hmailserver'); // Cambia 'hmailserver' por tu contraseña correcta
    
        console.log('✅ Autenticación exitosa');
    
        // Obtén el dominio donde deseas agregar la cuenta
        const domains = hMailServerApp.Domains;
        const domainName = 'kmail.com'; // Cambia esto por el dominio deseado
        let domain = null;
    
        for (let i = 0; i < domains.Count; i++) {
            const currentDomain = domains.Item(i);
            if (currentDomain.Name === domainName) {
                domain = currentDomain;
                break;
            }
        }
    
        if (!domain) {
            console.error(`❌ Dominio "${domainName}" no encontrado.`);
            return res.status(404).json({ error: `Dominio "${domainName}" no encontrado.` });
        }
    
        console.log(`✅ Dominio "${domainName}" encontrado.`);
    
        // Agrega una nueva cuenta de correo
        const accounts = domain.Accounts;
        const newAccount = accounts.Add();
        newAccount.Address = correo; // Cambia esto por la dirección de correo deseada
        newAccount.Password = contraseña; // Cambia esto por la contraseña deseada
        newAccount.Active = true; // Activa la cuenta
        newAccount.Save();
    
        console.log(`✅ Cuenta de correo "${correo}" creada exitosamente.`);
        res.status(201).json({ message: `✅ Cuenta de correo "${correo}" creada.\ninicio de sesion\ndominio: actual\npuerto1: 143\npuerto2: 25 \n servicio (ftp/sftp) \n usuario: empleado \n contraseña: Empleado123! \n puerto: ftp=21, sftp=22` });
    } catch (error) {
        console.error('❗ Error al interactuar con hMailServer:', error.message || error);
        res.status(500).json({ error: `❗ Error al interactuar con hMailServer: ${error.message}` });
    }

});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});