import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    ci: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true
    },
    birth: {
        type: Date,
        required: true
    },
    address: String,
    phone: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Customer", customerSchema);