import { useEffect, useState } from "react";
import { CountriesList } from "./CountriesList";

function fetchCountries() {
	return fetch("http://localhost:3000/countries").then((res) => {
		if (!res.ok) {
			throw new Error("Error at fetching countries");
		}
		return res.json();
	});
}

export function AllCountries() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [countries, setCountries] = useState(null);

	useEffect(() => {
		setLoading(true);
		fetchCountries()
			.then((fetchedCountries) => {
				setCountries(fetchedCountries);
				setError(null);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return <p>Loading countries...</p>;
	}
	if (error) {
		return <p>Failed to load the countries</p>;
	}

	return (
		<CountriesList
			title="All Countries"
			countries={countries}
		></CountriesList>
	);
}
