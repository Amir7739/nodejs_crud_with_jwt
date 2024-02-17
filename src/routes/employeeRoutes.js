const express = require('express');

const auth = require('../middleware/auth');
const employeeRoute = express.Router();
const empController = require('../controllers/employeeController');

employeeRoute.post("/createEmployee",empController.createEmp);
employeeRoute.get("/getAllEmp",auth,empController.getAllEmp);
employeeRoute.get("/:empId",auth,empController.getEmpById);
employeeRoute.put("/:empId",auth,empController.updateEmp);
employeeRoute.delete("/:empId",auth,empController.deleteEmp);



module.exports = employeeRoute;