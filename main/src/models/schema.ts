import mongoose from "mongoose";

export interface Business extends Document {
    userId: string;
    name: string;
    BusinessName: string;
    Industry: string;
    Location: string;
    PhoneNumber: string;
}

const businessSchema = new mongoose.Schema<Business>({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    BusinessName: { type: String, required: true },
    Industry: { type: String, required: true },
    Location: { type: String, required: true },
    PhoneNumber: { type: String, required: true }
}, {
    timestamps: true
});

const BusinessModel = mongoose.models.Business || mongoose.model<Business>('Business', businessSchema);
export default BusinessModel;