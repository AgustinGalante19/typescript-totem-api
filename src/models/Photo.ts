import { Schema, model, Document } from "mongoose";

const schema = new Schema({
    title: String,
    imagePath: String
});

interface iPhoto extends Document {
    title: string;
    imagePath: string;
}

export default model<iPhoto>("Photo", schema);