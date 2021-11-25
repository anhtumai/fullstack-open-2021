import mongoose from 'mongoose'
import dotenv from 'dotenv'
import uniqueValidator from 'mongoose-unique-validator'

dotenv.config()

export interface PersonDocument extends mongoose.Document {
    name: string
    number: string
}

const url = process.env.MONGODB_URI

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then((result) => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true,
    },
    number: {
        type: String,
        minlength: 8,
        maxlength: 16,
        required: true,
    },
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document: any, returnedObject: PersonDocument) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

const PersonModel = mongoose.model<PersonDocument>('Person', personSchema)

async function getAllPersons(
    PersonModel: mongoose.Model<PersonDocument, {}, {}>
): Promise<PersonDocument[]> {
    const records = await PersonModel.find({})
    return records as PersonDocument[]
}

export default PersonModel
export { getAllPersons }
