const express = require("express");
const router = express.Router();
const PhoneBook = require("../models/phonebook");

router.get("/info", (req, res) => {
	const time = new Date();
	res.send(`<div>Phonebook has info for 10 people <br/> ${time} </div>`);
});

router.get("/persons", (req, res) => {
	PhoneBook.find({})
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});

router.get("/persons/:id", (req, res) => {
	const id = req.params.id;
	PhoneBook.findById(id)
		.then((person) => {
			if (person) {
				res.json(person);
			} else {
				res.status(404);
			}
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});

router.delete("/persons/:id", (req, res) => {
	const id = req.params.id;
	PhoneBook.findByIdAndDelete(id)
		.then((deletedPerson) => {
			if (deletedPerson) {
				res.status(204);
			} else {
				res.status(404).end();
			}
		})
		.catch((err) => {
			res.status(400).send(err);
		});
});

router.post("/persons", (req, res) => {
	const { name, number } = req.body;

	if (!name) {
		res.status(400).json({ error: "Name is missing" });
	}
	if (!number) {
		res.status(400).json({ error: "Number is missing" });
	}

	const newPerson = new PhoneBook({ name: name, number: number });
	newPerson
		.save()
		.then((savedPerson) => {
			console.log("saved");
			res.status(201).json(savedPerson);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});

module.exports = router;
