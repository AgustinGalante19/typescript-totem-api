import { Request, Response, Router } from "express";
import Farmacia from "../models/Farmacia";


class FarmaciasRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    public async getFarmacias(req: Request, res: Response): Promise<void> {
        try {
            const farms = await Farmacia.find();
            res.json(farms);
        } catch (err) {
            console.log(err);
        }
    }

    public async getFarmacia(req: Request, res: Response): Promise<void> {
        console.log(req.params.url);
        const farm = await Farmacia.findOne({ url: req.params.url });
        if (farm == null) {
            res.status(400);
            res.json('Invalid URL.');
        } else {
            res.json(farm);
        }
    }

    public async addFarmacia(req: Request, res: Response): Promise<void> {
        const { name, url, address, phone, schedule, img, } = req.body;
        const newFarm = new Farmacia({ name, url, address, phone, schedule, img });
        if (name.length < 3) {
            res.status(400);
            res.json('Invalid name.');
        } else if (url.lenth <= 0) {
            res.status(400);
            res.json('Invalid URL.');
        } else if (address.length < 3) {
            res.status(400);
            res.json('Invalid address.');
        } else if (img.lenth < 2) {
            res.status(400);
            res.json('Invalid image.');
        } else {
            await newFarm.save();
            res.json({ data: newFarm });
        }
    }

    public async updateFarmacia(req: Request, res: Response): Promise<void> {
        const { url } = req.params;
        const farm = await Farmacia.findOneAndUpdate({ url }, req.body, { new: true });
        if (farm == null) {
            res.json('Invalid URL.');
        } else {
            res.json(farm);
        }
    }

    public async deleteFarmacia(req: Request, res: Response): Promise<void> {
        const { url } = req.params;
        const deletedFarm = await Farmacia.findOneAndDelete({ url });
        if (deletedFarm == null) {
            res.json('Invalid URL.');
        } else {
            res.json({ response: 'Farmacia deleted successfully.' });
        }
    }

    public routes() {
        this.router.get('/', this.getFarmacias);
        this.router.get('/:url', this.getFarmacia);
        this.router.post('/', this.addFarmacia);
        this.router.put('/:url', this.updateFarmacia);
        this.router.delete('/:url', this.deleteFarmacia);
    }
}

const farmaciasRoutes = new FarmaciasRoutes();
export default farmaciasRoutes.router;