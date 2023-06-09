const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv").config();

const PhoneBook = require("./models/phonebook");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("common"));

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
	{
		name: "Dan Mikky",
		number: "12-43-234345",
		id: 4,
	},
];

// All remaining requests return the React app, so it can handle routing.
app.get("/", function (request, response) {
	response.send("welcome");
});

app.get("/api/info", (req, res) => {
	const time = new Date();
	res.send(`<div>Phonebook has info for ${persons.length} people <br/> ${time} </div>`);
});

app.get("/api/persons", (req, res) => {
	PhoneBook.find({}).then((result) => {
		res.json(result);
	});
});

app.get("/api/persons/:id", (req, res) => {
	const id = req.params.id;
	PhoneBook.findById(id).then((result) => {
		res.json(result);
	});
});

app.delete("/api/persons/:id", (req, res) => {
	const id = req.params.id;
	PhoneBook.findByIdAndDelete(id).then((deletedPerson) => {
		if (!deletedPerson) {
			res.status(404).end();
		} else {
			res.status(200).json(deletedPerson);
		}
	});
});

app.post("/api/persons", (req, res) => {
	const { name, number } = req.body;

	if (!name) {
		res.status(400).json({ error: "Name is missing" });
	}
	if (!number) {
		res.status(400).json({ error: "Number is missing" });
	}

	const newPerson = new PhoneBook({ name: name, number: number });
	newPerson.save().then((savedPerson) => {
		console.log("saved");
		res.status(201).json(savedPerson);
	});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`running on port ${PORT}`));
