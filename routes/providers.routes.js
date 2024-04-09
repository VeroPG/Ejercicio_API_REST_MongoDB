const providersController = require("../controllers/providers.controller");
const router = require("express").Router();

// RUTAS:

router.get("/:id?", providersController.getProvider);
router.post("/", providersController.createProvider);
router.put("/", providersController.updateProvider);
router.delete("/:id?", providersController.deleteProvider);

module.exports = router;
