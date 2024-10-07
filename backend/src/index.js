const express = require("express");
const HttpError = require("./utilities/error");
const cors = require("cors");

const app = express();

app.use(
	cors({
		origin: ["http://localhost:5173"],
	})
);

const countryRouter = require("./routes/country");

app.use("/countries", countryRouter);

app.use((error, req, res, next) => {
	console.error(error);
	const status = error instanceof HttpError ? error.status : 500;
	const message =
		error.message != null && status !== 500
			? error.message
			: "Internal server error";
	res.status(status).json({ status, message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("server listening on port " + port);
});
