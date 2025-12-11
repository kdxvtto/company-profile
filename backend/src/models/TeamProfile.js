import mongoose from "mongoose";

const teamProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    facebook: {
        type: String,
    },
    instagram: {
        type: String,
    },
},{
    timestamps: true
}
);

export default mongoose.model("TeamProfile", teamProfileSchema);