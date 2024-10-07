import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CountriesList } from "./CountriesList";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import style from "../assets/styles/countrydetail.module.css";

function fetchCountry(code) {
	return fetch(`http://localhost:3000/countries/${code}`).then((res) => {
		if (!res.ok) {
			throw new Error("Failed to fetch country data");
		}
		return res.json();
	});
}

export function CountryDetail() {
	const { code } = useParams();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [country, setCountry] = useState(null);

	useEffect(() => {
		setLoading(true);
		fetchCountry(code)
			.then((fetchedCountry) => {
				setCountry(fetchedCountry);
				setError(null);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => setLoading(false));
	}, [code]);

	if (loading) {
		return <p>Loading country...</p>;
	}
	if (error) {
		return <p>Failed to load the country</p>;
	}
	if (country)
		return (
			<div className={style.detail}>
				<h2 className={style.title}>{country.commonName}</h2>
				<img className={style.flag} src={country.flagUrl}></img>
				<div className={style.population}>
					<h3>Population over time</h3>
					<ResponsiveContainer width={"100%"} height={300}>
						<LineChart
							data={country.populationData}
							margin={{
								right: 20,
								left: 20,
							}}
						>
							<Line
								type="monotone"
								dataKey="uv"
								stroke="#8884d8"
							/>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="year" />
							<YAxis />
							<Tooltip
								formatter={(value) =>
									new Intl.NumberFormat().format(value)
								}
							/>
							<Line
								type="monotone"
								dataKey="value"
								stroke="#8884d8"
								name="Population"
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
				<CountriesList
					title="Border countries"
					countries={country.borders.map((country) => ({
						name: country.commonName,
						countryCode: country.countryCode,
					}))}
				></CountriesList>
			</div>
		);
}
