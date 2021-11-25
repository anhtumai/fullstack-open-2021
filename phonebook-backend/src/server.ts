import express, { NextFunction, Request, Response } from 'express'
import { IncomingMessage } from 'http'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import PersonModel, { getAllPersons, PersonDocument } from './models/person'

interface RequestIncomingMessage extends IncomingMessage {
    body: any
}

const PORT = process.env.PORT || 3001

const app = express()
app.use(express.json())
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :post-param'
    )
)
app.use(cors())

morgan.token('post-param', (req, _res, _param) => {
    const requestBody = (req as RequestIncomingMessage).body
    if (req.method === 'POST') {
        return JSON.stringify(requestBody)
    }
    return ''
})

app.get('/api/persons', (_req, res) => {
    getAllPersons(PersonModel).then((persons) => {
        res.json(persons)
    })
})

app.get('/info', (_req, res) => {
    getAllPersons(PersonModel).then((persons) => {
        let message = ''
        message += `<p>Phonebook has info for ${persons.length} people</p>`
        message += `<p>${new Date().toString()}</p>`
        res.send(message)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    const { id } = req.params
    PersonModel.findById(id)
        .then((person: PersonDocument) => {
            if (person) {
                return res.status(201).json(person)
            }
            return res.status(404).end()
        })
        .catch((err) => next(err))
})

app.post('/api/persons', (req, res, next) => {
    if (req.body.name === undefined || req.body.number === undefined) {
        return res.status(400).json({ error: 'Name or number is missing' })
    }
    const newPerson = new PersonModel({
        name: req.body.name,
        number: req.body.number,
    })

    newPerson
        .save()
        .then((result) => res.status(201).json(result))
        .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
    const { id } = req.params
    console.log(id)
    PersonModel.findByIdAndRemove(id)
        .then((result) => {
            if (result) {
                return res.status(204).json(result)
            }
            return res.status(404).end()
        })
        .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body

    if (name == undefined || number === undefined) {
        return res.status(400).json({ error: 'Name or number is missing' })
    }
    const { id } = req.params
    PersonModel.findOneAndUpdate(
        { _id: id },
        { name, number },
        { new: true, runValidators: true, context: 'query' }
    )
        .then((result) => {
            if (result) return res.status(201).json(result)
            return res.status(404).end()
        })
        .catch((err) => next(err))
})

function errorHandler(
    error: any,
    _req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res
            .status(400)
            .json({ error: 'Malformatted id: Record with ID does not exist.' })
    }
    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
