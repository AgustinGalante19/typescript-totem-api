import { Schema, model } from "mongoose";

const Estacion = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true, lowercase: true },
    address: { type: String, required: true },
    phone: String,
    img: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
});

export default model('Estacion', Estacion);