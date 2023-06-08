const express = require("express");

const app = express();

app.use(express.json());

const persons = [
	{
		name: "Arto Hellas",
		number: "040-123456",
		id: 1,
	},
	{
		name: "Ada Lovelace",
		number: "39-44-5323523",
		id: 2,
	},
	{
		name: "Dan Abramov",
		number: "12-43-234345",
		id: 3,
	},
];

app.get("/", (req, res) => {
	res.send("hello world");
});

app.get("/info", (req, res) => {
	const time = new Date();
	res.send(`<div>Phonebook has info for ${persons.length} people <br/> ${time} </div>`);
});

app.get("/api/persons", (req, res) => {
	res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
	const id = Number(req.params.id);
	const person = persons.find((person) => person.id === id);
	if (person) {
		res.json(person);
	} else {
		res.json("Not Found").status(404).end();
	}
});

app.delete("/api/persons/:id", (req, res) => {
	const id = Number(req.params.id);
	const newPersons = persons.filter((person) => person.id !== id);
	const person = persons.find((person) => person.id === id);

	if (person) {
		res.json(newPersons).status(204).end();
	} else {
		res.status(404).end();
	}
});

app.post("/api/persons", (req, res) => {
	const newContact = req.body;
	const existingUser = persons.find((person) => person.name.toLowerCase() === newContact.name.toLowerCase());

	if (!newContact.name) {
		res.status(400).json({ error: "Name is missing" });
	}
	if (!newContact.number) {
		res.status(400).json({ error: "Number is missing" });
	}
	if (existingUser) {
		res.status(400).json({ error: "User already exists" });
	}

	console.log(newContact.name);

	console.log(req.headers);
	console.log(newContact);
	res.json(newContact);
});

const port = 5000;
app.listen(port, () => console.log(`running on port ${port}`));
