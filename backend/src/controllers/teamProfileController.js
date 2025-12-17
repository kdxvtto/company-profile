// Wrong before: nama import/instansiasi bentrok (const teamProfile = new teamProfile) dan kapitalisasi model.
import TeamProfile from "../models/teamProfile.js";

// Get all team profiles
export const getAllTeamProfiles = async (req, res) => {
    try {
        const teamProfiles = await TeamProfile.find();
        res.status(200).json({
            success: true,
            data : teamProfiles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        });
    }
};

// Create team profile
export const createTeamProfile= async (req,res) => {
    try{
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        const { name, position, facebook, instagram } = req.body;
        if(!name || !position || !image) {
            return res.status(400).json({ 
                success: false,
                message: "Name, position, and image are required" 
            });
        }
        const existingTeamProfile = await TeamProfile.findOne({name: { $regex: new RegExp(`^${name}$`, "i") }});
        if(existingTeamProfile) {
            return res.status(400).json({
                success: false,
                message: "Team profile already exists" 
            });
        }
        const teamProfile = new TeamProfile({ name, position, image, facebook, instagram });
        const newTeamProfile = await teamProfile.save();
        res.status(201).json({
            success: true,
            data : newTeamProfile
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

// Update team profile
export const updateTeamProfile = async (req,res) => {
    try {
        const teamProfile = await TeamProfile.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new : true,
            runValidators : true
        });
        if(!teamProfile) {
            return res.status(404).json({
                success: false,
                message: "Team profile not found" 
            });
        }
        res.status(200).json({
            success: true,
            data : teamProfile
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

// Delete team profile
export const deleteTeamProfile = async (req,res) => {
    try{
        const { id } = req.params;
        const teamProfile = await TeamProfile.findByIdAndDelete(id);
        if(!teamProfile) {
            return res.status(404).json({
                success: false,
                message: "Team profile not found" 
            });
        }
        res.status(200).json({
            success: true,
            data : teamProfile
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}
