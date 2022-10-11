const express = require("express");
const { create, list, read, remove, update, category } = require("../controllers/sub");
const router = express.Router();

const { adminCheck, authCheck } = require("../middlewares/auth");
router.post("/sub", authCheck, adminCheck, create);
router.get("/subs", list);
router.get("/subs/:id", category);
router.get("/sub/:slug", read);
router.put("/sub/:slug", authCheck, adminCheck, update);
router.delete("/sub/:slug", authCheck, adminCheck, remove);
module.exports = router;
