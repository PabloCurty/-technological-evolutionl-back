import mongoose from "mongoose";

const personSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        nickName: {
            type: String
        },
        photoUrl: {
            type: String
        },
        role: {
            type: String
        },
        email: {
            type: String,
            required: true
        },
        tel: {
            type: String
        },
        brithdayDate: {
            type: Date
        },
        city: {
            type: String
        },
        startDate: {
            type: Date
        },
        userId: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Person", personSchema);