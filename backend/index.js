const express = require("express");

const app = express();

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

const port = 5000;
app.listen(port, () => console.log(`running on port ${port}`));
