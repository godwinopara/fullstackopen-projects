// import axios from "axios";
import { useEffect, useState } from "react";
import * as service from "../services/service";

const Phoenbook = () => {
	const [persons, setPersons] = useState([]);
	const [newUser, setNewUser] = useState({ name: "", number: "" });
	const [filteredList, setFilteredList] = useState([]);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		const promise = service.getAll();
		promise.then((res) => {
			setPersons(res);
		});
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
		const newContact = { ...newUser };

		// check if contact exit on phonebook
		const userFound = persons.find((name) => name.name.toLowerCase() === newContact.name.toLowerCase());

		// Add Contact to phonebook
		if (!userFound) {
			// Send data to bankend
			const addUser = service.create({ name: newContact.name, number: newContact.number });
			addUser.then((res) => setPersons(persons.concat(res)));
			setMessage(`Added ${newContact.name}`);
			setNewUser({ name: "", number: "" });
			setTimeout(() => {
				setMessage(null);
			}, 5000);
			return;
		}
		// Show Alert
		if (window.confirm(`${newContact.name} is already added to phonebook, replace the old number with new one`)) {
			const updateUserDetails = service.update(userFound.id, newContact);
			updateUserDetails.then((res) => {
				setPersons(persons.map((person) => (person.id !== res.id ? person : res)));
			});
		}
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

	const handleClickDelete = (id) => {
		const user = persons.find((person) => person.id === id);
		if (window.confirm(`Delete ${user.name}`)) {
			service.deleteUser(id);
			setPersons(persons.filter((person) => person.id !== id));
			setMessage(`Removed ${user.name}`);
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<div>{message}</div>
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
								{person.name} {person.number} <button onClick={() => handleClickDelete(person.id)}>delete</button>
							</li>
					  ))
					: persons.map((person) => (
							<li key={person.id}>
								{person.name} {person.number} <button onClick={() => handleClickDelete(person.id)}>delete</button>
							</li>
					  ))}
			</div>
		</div>
	);
};

export default Phoenbook;
