import { useState } from "react";

const Phoenbook = () => {
	const [names, setNames] = useState([{ name: "Arto Hellas" }]);
	const [newUser, setNewUser] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const newContact = newUser;

		// check if contact exit on phonebook
		const userFound = names.find((name) => name.name.toLowerCase() === newContact.toLowerCase());

		if (!userFound) {
			setNames([...names, { name: newContact }]);
			setNewUser("");
			return;
		}
		alert(`${newContact} is already added to phonebook`);
		setNewUser("");
	};

	const handleChangeUser = (e) => {
		setNewUser(e.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form>
				<div>
					name: <input value={newUser} onChange={handleChangeUser} type="text" name="name" id="name" />
					<button onClick={handleSubmit} type="submit">
						add
					</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				{names.map((name, i) => (
					<li key={i}>{name.name}</li>
				))}
			</div>
		</div>
	);
};

export default Phoenbook;
