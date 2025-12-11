import News from "../models/News.js";

// Get all news
export const getAllNews = async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).json({
            success: true,
            data : news
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        });
    }
};

// Get news by ID
export const getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await News.findById(id);
        if(!news) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(200).json({
            success: true,
            data : news
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// Create news
export const createNews = async (req,res) => {
    try{
        const { title, content, image, date } = req.body;
        if(!title || !content || !image) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required" 
            });
        }
        const news = new News({ title, content, image });
        const newNews = await news.save();
        res.status(201).json({
            success: true,
            data : newNews
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

// Update news
export const updateNews = async (req,res) => {
    try {
        const news = await News.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new : true,
            runValidators : true
        });
        if(!news) {
            return res.status(404).json({
                success: false,
                message: "News not found" 
            });
        }
        res.status(200).json({
            success: true,
            data : news
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

// Delete news
export const deleteNews = async (req,res) => {
    try{
        const { id } = req.params;
        const news = await News.findByIdAndDelete(id);
        if(!news) {
            return res.status(404).json({
                success: false,
                message: "News not found" 
            });
        }
        res.status(200).json({
            success: true,
            data : news
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}
