// import axios from "axios";
import { useEffect, useState } from "react";
import * as service from "../services/service";

const Phoenbook = () => {
	const [persons, setPersons] = useState([]);
	const [newUser, setNewUser] = useState({ name: "", number: "" });
	const [filteredList, setFilteredList] = useState([]);

	useEffect(() => {
		const promise = service.getAll();
		promise.then((res) => {
			setPersons(res.data);
		});
	}, []);

	// const addPerson = () => {};

	function handleSubmit(e) {
		e.preventDefault();
		const newContact = { ...newUser };

		// check if contact exit on phonebook
		const userFound = persons.find((name) => name.name.toLowerCase() === newContact.name.toLowerCase());

		// Add Contact to phonebook
		if (!userFound) {
			const addUser = service.create({ name: newContact.name, number: newContact.number });
			addUser.then((res) => {
				console.log(res);
				setPersons([...persons, res.data]);
			});
			setNewUser({ name: "", number: "" });
			return;
		}
		// Show Alert
		alert(`${newContact} is already added to phonebook`);
		setNewUser({ name: "", number: "" });
	}

	const handleChangeUser = (e) => {
		const { name, value } = e.target;
		setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
	};

	const handleOnchangeFilter = (e) => {
		const userInput = e.target.value;
		const newFilteredList = persons.filter((name) => name.name.includes(userInput));
		setFilteredList(newFilteredList);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			filter shown with: <input onChange={handleOnchangeFilter} type="search" name="" id="" />
			<form>
				<div>
					name: <input value={newUser.name} onChange={handleChangeUser} type="text" name="name" id="name" />
					<br />
					number: <input value={newUser.number} onChange={handleChangeUser} type="text" name="number" id="number" />
					<button onClick={handleSubmit} type="submit">
						add
					</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				{filteredList.length > 0
					? filteredList.map((person) => (
							<li key={person.name.id}>
								{person.name} {person.number}
							</li>
					  ))
					: persons.map((person) => (
							<li key={person.id}>
								{person.name} {person.number}
							</li>
					  ))}
			</div>
		</div>
	);
};

export default Phoenbook;
