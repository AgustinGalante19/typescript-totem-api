import { Schema, model, Document } from 'mongoose';

const RestauranteSchema = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true, unique: true, lowercase: true },
    address: { type: String, required: true },
    phone: { type: String },
    schedule: { type: Object },
    img: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
});

/* interface IPhoto extends Document {
    imagePath: string;
}

export default model<IPhoto>('Restaurante', RestauranteSchema);
 */

export default model('Restaurante', RestauranteSchema);