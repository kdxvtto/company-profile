import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    content : {
        type : String,
        required : true,
    },
    image : {
        type : [String],
        required : true,
    }
},{
    timestamps : true
}
)

gallerySchema.index({ title: 1 })
gallerySchema.index({ content: 1 })
gallerySchema.index({ createdAt: -1 })

export default mongoose.model("Gallery", gallerySchema);