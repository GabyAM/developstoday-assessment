import style from "../assets/styles/countrieslist.module.css";
import { Link } from "react-router-dom";

export function CountriesList({ title, countries }) {
	return (
		<div className={style.container}>
			<h3>{title}</h3>
			<ul className={style.list}>
				{countries?.map((country) => {
					return (
						<li
							className={style["list-country"]}
							key={country.name}
						>
							<Link to={`/country/${country.countryCode}`}>
								<h2 className={style["country-title"]}>
									{country.name}
								</h2>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
