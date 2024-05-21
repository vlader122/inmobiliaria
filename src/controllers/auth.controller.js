import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/Role.js";
import { SECRET } from "../config.js";
import { invalidTokens } from '../middlewares/authJwt.js';

export const signupHandler = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    // Creating a new User Object
    const newUser = new User({
      username,
      email,
      password,
      roles
    });

    // checking for roles
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      console.log(foundRoles);
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    // Saving the User Object in Mongodb
    const savedUser = await newUser.save();

    // Create a token
    const token = jwt.sign({ id: savedUser._id }, SECRET, {
      expiresIn: 86400, // 24 hours
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const signinHandler = async (req, res) => {
  try {
    // Request body email can be an email or username
    const emailFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!emailFound) return res.status(400).json({ message: "Email Not Found" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      emailFound.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    const token = jwt.sign({ id: emailFound._id }, SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};

export const signoutHandler = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];

    // Verificar si no hay token en los encabezados
    if (!token) {
      return res.status(403).json({ message: "Token requerido" });
    }

    // Agregar el token a la lista de tokens inválidos si existe
    if (token) {
      invalidTokens.add(token);
      console.log(`Token inválido añadido: ${token}`);
    }

    return res.status(200).json({ message: "Sesión cerrada con éxito." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "No se pudo cerrar la sesión." });
  }
};