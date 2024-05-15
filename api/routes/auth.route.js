import express from "express"
import { signup } from "../contollers/auth.controller.js";

const route = express.Router();

route.post("/signup",signup);

export default route