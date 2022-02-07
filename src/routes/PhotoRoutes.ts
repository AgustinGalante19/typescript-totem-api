import { Request, Response, Router } from "express";
import { createPhoto, getPhotos } from "../controllers/photo.controller";

import multer from "../libs/multer";

class PhotoRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get('/', (req, res) => { res.send("godd") });
        this.router.post('/', multer.single("image"), createPhoto)
    }
}

const photoRoutes = new PhotoRoutes();
export default photoRoutes.router;