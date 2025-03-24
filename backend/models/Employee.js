import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is a required"],
        unique: true,
        trim: true
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        trim: true
    }
});

export default mongoose.model("Employee", EmployeeSchema);


// wOKSKRcDz7B2XvDZ

// ardrawac


// mongodb+srv://ardrawac:<db_password>@mycluster.k2c3q.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster