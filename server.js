const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware para permitir CORS desde el dominio del frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://sinh.com.br');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Endpoint para realizar la solicitud al servidor API REST
app.post('/seguimiento-kangu', async (req, res) => {
  const trackingNumber = req.body.orderId;
  const apiKey = '040c0c1e1850e2aa468ea3efb2dc1735';
  const url = `https://portal.kangu.com.br/tms/transporte/rastrear/${trackingNumber}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `token ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({
      error: 'Error al obtener el rastreo desde Kangu API.',
    });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
