import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
    {
        nameClient: {
            type: String,
            required: true
        },
        nameProject: {
            type: String,
            required: true
        },
        language: {
            type: String
        },
        nameTech: [{
            type: String
        }],
        period: [{
            type: Date
        }],
        directLeaders: [{
            type: String
        }],
        userId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Experience", experienceSchema);