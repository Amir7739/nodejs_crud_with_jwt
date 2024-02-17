const { json } = require("express");
const empModel = require("../models/employee")



// Create employee
const createEmp = async(req,res) => {
    const { empId,empName,empSal } = req.body;

    const newEmp = new empModel({
        empId: empId,
        empName: empName,
        empSal: empSal
    })
    try {
        await newEmp.save();
        res.status(201),json({message:"employee added successfully",newEmp});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Employee not added on database"});
    }
}
// Get all employee
const getAllEmp = async(req,res) => {

    try {
        const emp = await empModel.find();
        res.status(200).json(emp);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
    
}

// Get employee by Id
const getEmpById = async (req, res, next) => {
    try {
      const empId = req.params.empId;
      const user = await empModel.findById(empId);
      if (!user) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  // update employee by id
const updateEmp = async(req,res) => {
    const id = req.params.empId;
    const {empId,empName,empSal} = req.body;

    const newEmp = {
        empId: empId,
        empName: empName,
        empSal: empSal
    }

    try {
        const updatedEmp = await empModel.findByIdAndUpdate(id,newEmp,{new:true});
        if (!updatedEmp) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(201).json({message:"Employee data is updated",updatedEmp});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
}

// delte employee by id
const deleteEmp = async(req,res) => {
    const id = req.params.empId;
    try {
        const deleteEmp = await empModel.findByIdAndDelete(id);
        res.status(202).json({message:"Employee deleted successfully",deleteEmp});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
}





module.exports = {
    createEmp,
    getAllEmp,
    getEmpById,
    updateEmp,
    deleteEmp
}