import { Request, Response, NextFunction, Router } from "express";
import Restaurante from "../models/Restaurante";

class RestaurantesRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    public async getRestaurantes(req: Request, res: Response): Promise<void> {
        try {
            const rests = await Restaurante.find();
            res.json(rests);
        } catch (err) {
            res.json(err);
        }
    }

    public async getRestaurante(req: Request, res: Response): Promise<void> {
        const rest = await Restaurante.findOne({ url: req.params.url });
        if (rest == null) {
            res.status(400);
            res.json('Invalid URL.');
        } else {
            console.log(req.params.url);
            res.json({ data: rest });
        }
    }

    public async addRestaurante(req: Request, res: Response): Promise<void> {
        const { name, url, address, phone, schedule, img } = req.body;
        if (name.length < 5) {
            res.status(400);
            res.json({ message: 'Invalid name.' });
        } else if (address.length < 2) {
            res.status(400);
            res.json({ message: 'Invalid address.' });
        } else {
            const newRest = new Restaurante({ name, url, address, phone, schedule, img });
            await newRest.save();
            res.json({ data: newRest });
        }
    }

    public async updateRestaurante(req: Request, res: Response): Promise<void> {
        const { url } = req.params;
        const rest = await Restaurante.findOneAndUpdate({ url }, req.body, { new: true });
        console.log(url);
        if (rest == null) {
            res.json('Invalid URL.');
        } else {
            res.json(rest);
        }
    }

    public async deleteRestaurante(req: Request, res: Response): Promise<void> {
        const { url } = req.params;
        const deletedRest = await Restaurante.findOneAndDelete({ url });
        if (deletedRest == null) {
            res.status(400);
            res.json('Invalid URL.');
        } else {
            res.json({ response: 'Restaurant deleted successfully.' });
        }
    }

    routes() {
        this.router.get('/', this.getRestaurantes);
        this.router.get('/:url', this.getRestaurante);
        //this.router.post('/', multer.single('image'), this.addRestaurante);
        this.router.post('/', this.addRestaurante);
        this.router.put('/:url', this.updateRestaurante);
        this.router.delete('/:url', this.deleteRestaurante);
    }
}

const restaurantesRoutes = new RestaurantesRoutes();
export default restaurantesRoutes.router;