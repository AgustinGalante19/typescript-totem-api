import { Request, Response, } from "express";

export function getPhotos(req: Request, res: Response) {
    return res.json({
        message: "photo saved successfully"
    })
}

export function createPhoto(req: Request, res: Response) {
    return res.json({
        message: "photo saved successfully"
    })
}