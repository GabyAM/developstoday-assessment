const express = require("express");
const countryController = require("../controllers/country");

const router = express.Router();

router.get("/", countryController.getAvailableCountries);
router.get("/:code", countryController.getCountryInfo);

module.exports = router;
