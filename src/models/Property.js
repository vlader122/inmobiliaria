import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
    {
        propertyType: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        totalArea: { type: Number, required: true },
        bedrooms: { type: Number, required: true },
        bathrooms: { type: Number, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        status: { type: String, required: true },
        yearBuilt: { type: Number, required: true },
        transactionType: { type: String, required: true },
        additionalComments: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("Property", propertySchema);
