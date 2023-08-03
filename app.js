const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Middleware para permitir CORS
app.use(cors({
    origin: 'https://sinh.com.br',
  }));

// Endpoint para obtener el rastreo de la primera API
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

// Endpoint para obtener el rastreo de la segunda API
app.post('/seguimiento-frenet', async (req, res) => {
  const { orderId } = req.body;
  const url = 'https://private-anon-fd78d2c5ba-frenetapi.apiary-mock.com/tracking/trackinginfo';
  const data = {
    ShippingServiceCode: '04669',
    TrackingNumber: orderId,
    InvoiceNumber: '',
    InvoiceSerie: '',
    RecipientDocument: '',
    OrderNumber: '',
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: 'Bearer 53D94A52RE1C6R449DRB38DR0B838E70B39D',
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({
      error: 'Error al obtener el rastreo desde Frenet API.',
    });
  }
});

// Iniciar el servidor
const port = 3000; // Puedes cambiar el puerto si es necesario
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
