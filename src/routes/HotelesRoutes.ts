import { Request, Response, Router } from "express";

import Hotel from "../models/Hotel";

class HotelesRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    async getHoteles(req: Request, res: Response): Promise<void> {
        try {
            const hoteles = await Hotel.find();
            res.json(hoteles);
        } catch (err) {
            res.json(err);
        }
    }

    async getHotel(req: Request, res: Response): Promise<void> {
        const { url } = req.params;
        const hotel = await Hotel.findOne({ url: url });
        if (hotel == null) {
            res.status(400);
            res.json('Invalid url')
        } else {
            res.json(hotel);
        }
    }
    async addHotel(req: Request, res: Response): Promise<void> {
        const { name, url, address, phone, schedule, img } = req.body;
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
            const newHotel = new Hotel({ name, url, address, phone, schedule, img });
            await newHotel.save();
            res.json({ data: newHotel });
        }
    }

    async updateHotel(req: Request, res: Response): Promise<void> {
        const { url } = req.body;
        const hotel = await Hotel.findOneAndUpdate({ url }, req.body, { new: true });
        if (hotel == null) {
            res.status(400);
            res.json('Invalid url')
        } else {
            res.json(hotel);
        }
    }

    async deleteHotel(req: Request, res: Response): Promise<void> {
        const deletedHotel = await Hotel.findOneAndDelete({ url: req.params.url });
        if (deletedHotel == null) {
            res.status(400);
            res.json('Invalid url')
        } else {
            res.json('Hotel deleted successfully.');
        }
    }

    routes() {
        this.router.get('/', this.getHoteles);
        this.router.get('/:url', this.getHotel);
        this.router.post('/', this.addHotel);
        this.router.put('/:url', this.updateHotel);
        this.router.delete('/:url', this.deleteHotel);
    }
}

const hotelesRoutes = new HotelesRoutes();
export default hotelesRoutes.router;