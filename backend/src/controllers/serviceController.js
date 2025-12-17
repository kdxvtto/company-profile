import Services from "../models/Services.js";

// Get all services
export const getAllServices = async (req, res) => {
    try {
        const services = await Services.find();
        res.status(200).json({
            success: true,
            data : services
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        });
    }
}

// Create new service
// Wrong before: model Services tidak punya field content, sementara controller mengharuskan content.
// Before: const { title, content, image } = req.body; tanpa field content di schema -> content tidak tersimpan.
export const createService = async (req,res) => {
    try{
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        const { title, content} = req.body;
        if(!title || !content || !image) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required" 
            });
        }
        const service = new Services({ title, content, image });
        const newService = await service.save();
        res.status(201).json({
            success: true,
            data : newService
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

// Update service
export const updateService = async (req,res) => {
    try {
        const service = await Services.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new : true,
            runValidators : true
        });
        if(!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found" 
            });
        }
        res.status(200).json({
            success: true,
            data : service
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

// Delete service
export const deleteService = async (req,res) => {
    try{
        const { id } = req.params;
        const service = await Services.findByIdAndDelete(id);
        if(!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found" 
            });
        }
        res.status(200).json({
            success: true,
            data : service
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}
