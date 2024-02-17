const mongoose = require('mongoose');

const empSchema = mongoose.Schema({
    empId: {
        type: String,
        required: true,
        unique: true
    },
    
    empName: {
        type: String,
        required: true
    },
    empSal: {
        type: String,
        required:true
    }
})


module.exports = mongoose.model("Employee",empSchema);