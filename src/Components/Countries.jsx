import { useEffect, useState } from "react";
import * as service from "../services/service";
import axios from "axios";

const DisplayCountry = ({ country }) => {
	const [showDetails, setShowDetails] = useState(false);

	const toggleShowCountryDetails = () => {
		setShowDetails(!showDetails);
	};
	return (
		<>
			<div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
				<li style={{ marginRight: "10px" }}>{country.name.common}</li>
				<button onClick={toggleShowCountryDetails}>{showDetails ? "hide" : "show"}</button>
			</div>

			{showDetails && (
				<div>
					<h1>{country.name.common}</h1>
					<br />
					<p>Capital: {country.capital[0]}</p>
					<p>Area: {country.area}</p>
					<br />
					<h3>Languages</h3>
					<ul>
						{Object.keys(country.languages).map((language) => (
							<li>{country.languages[language]}</li>
						))}
					</ul>
					<img src={country.flags.png} alt={country.alt} />
				</div>
			)}
		</>
	);
};

const Countries = () => {
	const [countries, setCountries] = useState([]);
	const [countriesList, setCountriesList] = useState(null);
	const [manyMatches, setManyMatches] = useState(false);

	useEffect(() => {
		const countriesData = axios.get("https://studies.cs.helsinki.fi/restcountries/api/all");
		countriesData.then((res) => setCountries(res.data));
	}, []);

	const handleChange = (e) => {
		const userInput = e.target.value.toLowerCase();
		const countriesCopy = [...countries];
		const filterCountries = countriesCopy.filter((country) => country.name.common.toLowerCase().includes(userInput));
		if (filterCountries.length > 9) {
			setManyMatches(true);
			return;
		}

		setManyMatches(false);
		setCountriesList(filterCountries);
	};

	const displayCountries = () => {
		return countriesList?.map((country, id) => {
			return <DisplayCountry key={id} country={country} />;
		});
	};

	return (
		<div>
			find countries
			<input onChange={handleChange} type="text" name="" id="" />
			<div>{manyMatches ? "Too many matches, specify more filter" : countriesList ? displayCountries() : null}</div>
		</div>
	);
};

export default Countries;
