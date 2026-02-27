/**
 * Middleware CORS configurado para restringir los orígenes permitidos.
 *
 * Este módulo:
 * - Define una whitelist de orígenes permitidos
 * - Valida dinámicamente el origen de cada solicitud
 * - Permite solicitudes sin origen (Postman, curl, etc.)
 * - Rechaza cualquier origen que no esté en la whitelist
 *
 * Uso típico en Express:
 *   import corsInstance from "./cors.js";
 *   app.use(corsInstance);
 *
 * @module corsInstance
 */

import cors from "cors";

const whitelist = ["http://localhost:3000", "http://localhost:5173", "http://localhost:4000", "https://marketplace-servicios-locales.vercel.app" ];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const corsInstance = cors(corsOptions);

export default corsInstance;