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
        nameTech: {
            type: String,
            required: true
        },
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