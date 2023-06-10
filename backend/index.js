const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const PhoneBook = require("./models/phonebook")

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan("common"))

// All remaining requests return the React app, so it can handle routing.
app.get("/", function (request, response) {
	response.send("welcome")
})

app.get("/api/info", (req, res) => {
	const time = new Date()
	res.send(`<div>Phonebook has info for 10 people <br/> ${time} </div>`)
})

app.get("/api/persons", (req, res) => {
	PhoneBook.find({})
		.then((result) => {
			res.json(result)
		})
		.catch((err) => {
			res.status(500).send(err)
		})
})

app.get("/api/persons/:id", (req, res) => {
	const id = req.params.id
	PhoneBook.findById(id)
		.then((person) => {
			if (person) {
				res.json(person)
			} else {
				res.status(404)
			}
		})
		.catch((err) => {
			res.status(500).send(err)
		})
})

app.delete("/api/persons/:id", (req, res) => {
	const id = req.params.id
	PhoneBook.findByIdAndDelete(id)
		.then((deletedPerson) => {
			if (deletedPerson) {
				res.status(204)
			} else {
				res.status(404).end()
			}
		})
		.catch((err) => {
			res.status(400).send(err)
		})
})

app.post("/api/persons", (req, res) => {
	const { name, number } = req.body

	if (!name) {
		res.status(400).json({ error: "Name is missing" })
	}
	if (!number) {
		res.status(400).json({ error: "Number is missing" })
	}

	const newPerson = new PhoneBook({ name: name, number: number })
	newPerson
		.save()
		.then((savedPerson) => {
			console.log("saved")
			res.status(201).json(savedPerson)
		})
		.catch((err) => {
			res.status(500).send(err)
		})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`running on port ${PORT}`))
