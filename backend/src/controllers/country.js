const handleAsync = require("../utilities/asyncHandler");
const convertToAlpha3 = require("../utilities/code");
const HttpError = require("../utilities/error");

exports.getAvailableCountries = handleAsync(async (req, res, next) => {
	const response = await fetch(
		"https://date.nager.at/api/v3/AvailableCountries"
	);
	const data = await response.json();
	res.json(data);
});

exports.getCountryInfo = handleAsync(async (req, res, next) => {
	const countryCode = req.params.code;
	if (!/^[A-Z]{2}$/.test(countryCode)) {
		throw new HttpError(400, "Invalid country code");
	}

	const endpoints = [
		`https://date.nager.at/api/v3/CountryInfo/${countryCode}`,
		"https://countriesnow.space/api/v0.1/countries/population",
		"https://countriesnow.space/api/v0.1/countries/flag/images",
	];

	const responses = await Promise.all(
		endpoints.map((endpoint) => fetch(endpoint))
	);
	responses.forEach((response) => {
		if (!response.ok) {
			throw new HttpError(500, "Failed to fetch");
		}
	});
	const [borderData, populationData, flagData] = await Promise.all(
		responses.map((response) => response.json())
	);

	const populationInfo =
		populationData?.data?.find(
			(country) => country.code === convertToAlpha3(countryCode)
		)?.populationCounts || null;

	const flagUrl =
		flagData?.data?.find((country) => country.iso2 === countryCode)?.flag ||
		null;

	if (!(borderData && populationInfo && flagUrl)) {
		throw new HttpError(404, "Couldn't find country data");
	}

	const info = { ...borderData };
	info.populationData = populationInfo;
	info.flagUrl = flagUrl;

	res.json(info);
});
