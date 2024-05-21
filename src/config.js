import { config } from "dotenv";
config();

//using deploy db
// export const MONGODB_URI =
//    process.env.MONGODB_URI || "mongodb+srv://vlader122:73818972a@testin.s05r2sp.mongodb.net/?retryWrites=true&w=majority&appName=TestIn";
export const MONGODB_URI =
   process.env.MONGODB_URI || "mongodb://localhost/inmobiliaria";
export const PORT = process.env.PORT || 4000;
export const SECRET = "yoursecretkey";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@localhost";
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";