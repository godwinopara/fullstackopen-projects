import { useState } from "react";

const Phoenbook = () => {
	const [names, setNames] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newUser, setNewUser] = useState({ name: "", number: "" });
	const [filteredList, setFilteredList] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const newContact = { ...newUser };

		// check if contact exit on phonebook
		const userFound = names.find((name) => name.name.toLowerCase() === newContact.name.toLowerCase());

		// Add Contact to phonebook
		if (!userFound) {
			setNames([...names, { name: newContact.name, number: newContact.number }]);
			setNewUser({ name: "", number: "" });
			return;
		}
		// Show Alert
		alert(`${newContact} is already added to phonebook`);
		setNewUser({ name: "", number: "" });
	};

	const handleChangeUser = (e) => {
		const { name, value } = e.target;
		setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
	};

	const handleOnchangeFilter = (e) => {
		const userInput = e.target.value;
		const newFilteredList = names.filter((name) => name.name.includes(userInput));
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
					? filteredList.map((name, i) => (
							<li key={i}>
								{name.name} {name.number}
							</li>
					  ))
					: names.map((name, i) => (
							<li key={i}>
								{name.name} {name.number}
							</li>
					  ))}
			</div>
		</div>
	);
};

export default Phoenbook;
