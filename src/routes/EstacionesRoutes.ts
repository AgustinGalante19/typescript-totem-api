import { Request, Response, Router } from "express";

import Estacion from "../models/Estacion";

class EstacionesRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async getEstaciones(req: Request, res: Response): Promise<void> {
        try {
            const estaciones = await Estacion.find();
            res.json(estaciones);
        } catch (err) {
            res.send(err);
        }
    }

    async getEstacion(req: Request, res: Response): Promise<void> {
        const { url } = req.params;
        const estacion = await Estacion.findOne({ url: url });
        if (estacion == null) {
            res.status(400)
            res.json('Invalid URL.');

        } else {
            res.json(estacion);
        }
    }

    async addEstacion(req: Request, res: Response): Promise<void> {

        const { name, url, address, phone, img } = req.body;
        console.log(name.length);
        if (name.length < 5) {
            res.status(400);
            res.json({ message: 'Invalid name.' });
        } else if (address.length < 2) {
            res.status(400);
            res.json({ message: 'Invalid address.' });
        } else if (img.length < 5) {
            res.status(400);
            res.json({ message: 'Invalid image.' });
        } else {
            res.status(200);
            const newEstacion = new Estacion({ name, url, address, phone, img });
            await newEstacion.save();
            res.json(newEstacion);
        }

    }

    async updateEstacion(req: Request, res: Response): Promise<void> {
        const { url } = req.params;
        const estacion = await Estacion.findOneAndUpdate({ url: url }, req.body, { new: true });
        if (estacion == null) {
            res.status(400);
            res.json({ message: 'Invalid url.' });
        } else {
            res.json(estacion);
        }
    }

    async deleteEstacion(req: Request, res: Response): Promise<void> {
        const deletedEstacion = await Estacion.findOneAndDelete({ url: req.params.url });
        if (deletedEstacion == null) {
            res.status(400);
            res.send('Invalid URL.');
        } else {
            res.status(200);
            res.json('Estacion deleted successfully');
        }
    }

    routes() {
        this.router.get('/', this.getEstaciones);
        this.router.get('/:url', this.getEstacion);
        this.router.post('/', this.addEstacion);
        this.router.put('/:url', this.updateEstacion);
        this.router.delete('/:url', this.deleteEstacion);
    }
}

const estacionesRoutes = new EstacionesRoutes();

export default estacionesRoutes.router;