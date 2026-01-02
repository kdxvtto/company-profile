import Gallery from "../models/Gallery.js";
import { getPublicIdFromUrl } from "../config/cloudinary.js";
import { deleteFromCloudinary } from "../config/cloudinary.js";
import mongoose from "mongoose";
import { createActivityLog } from "./activityLogController.js";

export const getGallery = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const gallery = await Gallery.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        const totalGallery = await Gallery.countDocuments();
        const totalPages = Math.ceil(totalGallery / limit);
        return res.status(200).json({
            success : true,
            data : gallery,
            pagination: {
                totalGallery,
                totalPages,
                currentPage: page,
                limit
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}

export const createGallery = async (req, res) => {
    const image = req.file ? req.file.path : null;
    try {
        const { title, content } = req.body;
        if (!title || !content || !image) {
            return res.status(400).json({
                success : false,
                message : "Bad Request"
            })
        }
        const gallery = new Gallery({ title, content, image : [image] });
        await gallery.save();
        
        // Log activity
        if (req.user) {
            await createActivityLog({
                action: 'create',
                resource: 'gallery',
                resourceName: gallery.title,
                resourceId: gallery._id,
                userId: req.user._id,
                userName: req.user.name || 'Admin'
            });
        }
        
        return res.status(201).json({
            success : true,
            data : gallery
        })
    } catch (error) {
        if (image) {
            const publicId = getPublicIdFromUrl(image);
            await deleteFromCloudinary(publicId);
        }
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export const updateGallery = async (req, res) => {
    const newImage = req.file ? req.file.path : null;
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            if (newImage) {
                const publicId = getPublicIdFromUrl(newImage);
                await deleteFromCloudinary(publicId);
            }
            return res.status(404).json({
                success : false,
                message : "Not Found"
            })
        }
        const gallery = await Gallery.findById(id);
        if (!gallery) {
            if (newImage) {
                const publicId = getPublicIdFromUrl(newImage);
                await deleteFromCloudinary(publicId);
            }
            return res.status(404).json({
                success : false,
                message : "Not Found"
            })
        }
        const oldImages = gallery.image;
        if (newImage) {
            gallery.image = [newImage];
        }
        Object.assign(gallery, req.body);
        await gallery.save();
        if (newImage && oldImages && oldImages.length > 0) {
            for (const img of oldImages) {
                const publicId = getPublicIdFromUrl(img);
                await deleteFromCloudinary(publicId);
            }
        }
        
        // Log activity
        if (req.user) {
            await createActivityLog({
                action: 'update',
                resource: 'gallery',
                resourceName: gallery.title,
                resourceId: gallery._id,
                userId: req.user._id,
                userName: req.user.name || 'Admin'
            });
        }
        
        return res.status(200).json({
            success : true,
            data : gallery
        })
    } catch (error) {
        if (newImage) {
            const publicId = getPublicIdFromUrl(newImage);
            await deleteFromCloudinary(publicId);
        }
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export const deleteGallery = async (req, res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success : false,
                message : "Gallery not found"
            })
        }
        const gallery = await Gallery.findByIdAndDelete(id);
        if (!gallery) {
            return res.status(404).json({
                success : false,
                message : "Gallery not found"
            })
        }
        if (gallery.image && gallery.image.length > 0) {
            for (const img of gallery.image) {
                const publicId = getPublicIdFromUrl(img);
                await deleteFromCloudinary(publicId);
            }
        }
        
        // Log activity
        if (req.user) {
            await createActivityLog({
                action: 'delete',
                resource: 'gallery',
                resourceName: gallery.title,
                resourceId: gallery._id,
                userId: req.user._id,
                userName: req.user.name || 'Admin'
            });
        }
        
        return res.status(200).json({
            success : true,
            data : gallery
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}
