import express, { Router } from "express";

import userController from "@src/controllers/user-controller";

export const router: Router = express.Router();

router.get("/get", userController.getAllUsers);
router.post("/add", userController.addUser);
router.get("/:id", userController.getById);
router.patch("/:id/password", userController.updatePassword);
