# DonXL

Sitio web de DonXL — Perros calientes. Permite armar un pedido (hot dogs con adiciones y bebidas), revisarlo, elegir método de pago y enviarlo directo por WhatsApp.

## Estructura

```
index.html      Estructura de la página
css/styles.css  Estilos
js/script.js    Lógica del sitio (menú, carrito, WhatsApp)
assets/         Imágenes (logo, hero, menú, bebidas)
server.js       Servidor estático para producción (Railway)
```

## Desarrollo local

Al ser un sitio estático, se puede abrir `index.html` directamente en el navegador, o servirlo con:

```bash
node server.js
```

Y entrar a `http://localhost:3000`.

## Despliegue en Railway

El proyecto incluye `package.json` y `server.js`, así que Railway lo detecta como app de Node y lo levanta con `node server.js` automáticamente (puerto tomado de la variable `PORT`).

## Configuración

El número de WhatsApp al que se envían los pedidos y los precios/adiciones del menú se configuran en [`js/script.js`](js/script.js).
