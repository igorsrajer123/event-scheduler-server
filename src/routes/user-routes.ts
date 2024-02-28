import express, { Router } from "express";

import userController from "@src/controllers/user-controller";

export const router: Router = express.Router();

router.get("/get-users", userController.getAllUsers);
router.post("/add-user", userController.addUser);
