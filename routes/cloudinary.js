const express = require("express");
const { upload, removeImage } = require("../controllers/cloudinary");
const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

router.post("/uploadImages", authCheck, adminCheck, upload);
router.post("/removeImage", authCheck, adminCheck, removeImage);
router.get("/fileupload", (req, res) => {
  res.json({
    Message: "Ok",
  });
});
module.exports = router;