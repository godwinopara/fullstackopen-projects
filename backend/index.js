const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("common"));

if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://godwinopara62:${password}@cluster0.ybrj36b.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const phoneBookSchema = mongoose.Schema({ name: String, number: String });
const PhoneBook = mongoose.model("PhoneBook", phoneBookSchema);

// PhoneBook.find({}).then((result) => {
// 	result.forEach((contact) => {
// 		console.log(contact);
// 	});
// 	mongoose.connection.close();
// });
phoneBookSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

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
		console.log(result);
		res.json(result);
	});
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`running on port ${PORT}`));
