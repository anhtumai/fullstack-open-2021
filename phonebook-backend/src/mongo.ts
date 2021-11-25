import mongoose, { Document } from 'mongoose'

interface PersonDocument extends Document {
    name: string
    number: string
}

function addNewPerson(
    name: string,
    phoneNumber: string,
    Person: mongoose.Model<unknown, {}, {}>,
): void {
    const person = new Person({
        name,
        number: phoneNumber,
    })

    person.save().then((result) => {
        console.log(`Added ${name} ${phoneNumber} to phonebook`)
        mongoose.connection.close()
    })
}

function listAllRecords(Person: mongoose.Model<unknown, {}, {}>): void {
    Person.find({}).then((result) => {
        console.log('phonebook:')
        result.forEach((record) => {
            console.log(`${(record as PersonDocument).name} ${(record as PersonDocument).number}`)
        })
        mongoose.connection.close()
    })
}

function main() {
    const argsNum = process.argv.length

    if (argsNum !== 3 && argsNum !== 5) {
        console.log(
            'Valid commands: `node build/mongo.js <password>` or `node build/mongo.js <password> <name> <number>`',
        )
        process.exit(1)
    }

    const password = process.argv[2]

    const url = `mongodb+srv://fullstack:${password}@phonebook-cluster.0xtwd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

    try {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
    } catch (err) {
        console.log(err)
        process.exit(1)
    }

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    if (argsNum === 3) {
        listAllRecords(Person)
    } else {
        addNewPerson(process.argv[3], process.argv[4], Person)
    }
}

main()
