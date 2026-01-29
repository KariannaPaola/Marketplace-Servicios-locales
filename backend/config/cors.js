import cors from "cors";

const whitelist = ["http://localhost:3000", "http://localhost:3001", "http://localhost:5173", "http://localhost:4000" ];

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