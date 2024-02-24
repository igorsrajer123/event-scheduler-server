const express = require("express");

const { getAllUsers, addUser } = require("./../controllers/user-controller");

const router = express.Router();

router.get("/get-users", getAllUsers);
router.post("/add-user", addUser);

module.exports = router;
