import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true,
        enum: ['create', 'update', 'delete']
    },
    resource: {
        type: String,
        required: true,
        enum: ['news', 'team', 'service', 'publication', 'gallery', 'user']
    },
    resourceName: {
        type: String,
        required: true
    },
    resourceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Index for efficient querying
activityLogSchema.index({ createdAt: -1 });
activityLogSchema.index({ userId: 1 });
activityLogSchema.index({ resource: 1 });

export default mongoose.model("ActivityLog", activityLogSchema);
