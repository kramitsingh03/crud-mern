import User from "../model/userModel.js"

export const create = async(req,res)=>{
    try{
        const userData = new User(req.body); // when data come from frontend then pass through the model.
        if(!userData){
            return res.status(404).json({msg:"User data not found"});
        }
        const savedData = await userData.save();
        res.status(200).json({msg:"User saved successfully"});
    }
    catch(error){
        res.status(500).json({error:error});
    }
}


export const getAll = async(req,res)=>{
    try{
        const userData= await User.find();
        if(!userData){
            return res.status(404).json({msg:"Users data not found"});
        }
        res.status(200).json(userData);
    }catch(error){
        res.status(500).json({error:error});
    }
}

export const getOne = async(req,res)=>{
    try{
        const id= req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg:"User not found"});
        }
        res.status(200).json(userExist);
    }catch(error){
        res.status(500).json({error:error});
    }
}


export const update = async(req,res)=>{
    try{
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(401).json({msg:"user not found"});
        }
        const updatedData = await User.findByIdAndUpdate(id, req.body,{new:true});
        return res.status(200).json({msg:"user updated successfully"});
    }catch(error){
        res.status(500).json({error:error});
    }
}

export const deleteUser = async(req,res)=>{
    try{
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg:"user not exist"});
        }
        await User.findByIdAndDelete(id);
        return res.status(200).json({msg:"User deleted successfully"});

    }catch(error){
        return res.status(500).json({error:error});
    }
}