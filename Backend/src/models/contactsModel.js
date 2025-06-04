import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "user"
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    {
        timeStamps: true
    }
)
const Contact = mongoose.model("Contact", contactSchema)
export default Contact