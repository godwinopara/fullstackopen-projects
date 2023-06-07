import { useState } from "react";

const Phoenbook = () => {
	const [names, setNames] = useState([{ name: "Arto Hellas" }]);
	const [newUser, setNewUser] = useState({ name: "", number: "" });

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

	return (
		<div>
			<h2>Phonebook</h2>
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
				{names.map((name, i) => (
					<li key={i}>
						{name.name} {name.number}
					</li>
				))}
			</div>
		</div>
	);
};

export default Phoenbook;
