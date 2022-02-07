import { Schema, model } from "mongoose";

const Hotel = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true, lowercase: true },
    address: { type: String, required: true },
    phone: String,
    schedule: Object,
    img: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
});

export default model('Hotel', Hotel);