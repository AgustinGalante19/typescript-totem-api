import axios from 'axios';
import { Request, Response, Router } from 'express';
import UtilitiesForecast from '../controllers/forecast.controllers';
import UtilitiesTiempo from '../controllers/tiempo.controllers';
import dotenv from "dotenv";


class TiempoRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
        dotenv.config();
    }
    async getTiempoHoy(req: Request, res: Response): Promise<void> {
        try {
            var utilitiesTiempo = new UtilitiesTiempo();

            const respuesta = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=-33.001146355012644&lon=-58.523484474104954&appid=bde204ad8cc3609635eb2ad3c63feac0');
            const minmax = await axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=-33.001146355012644&lon=-58.523484474104954&exclude=hourly&appid=bde204ad8cc3609635eb2ad3c63feac0");

            var response: Object = {
                temperature: utilitiesTiempo.getTemperature(respuesta.data.main.temp),
                temp_max: utilitiesTiempo.toCelcius(minmax.data.daily[0].temp.max) - 2,
                temp_min: utilitiesTiempo.toCelcius(minmax.data.daily[0].temp.min),
                sky: utilitiesTiempo.getSkyState(respuesta.data.weather[0].description),
                date: utilitiesTiempo.getDate(respuesta.data.dt),
                day: utilitiesTiempo.getDay(),
                humidity: respuesta.data.main.humidity,
            }

            res.json(response).statusCode = 200;

        } catch (err) {
            res.json({ message: err }).statusCode = 400;
        }
    }

    async getTiempoExtendido(req: Request, res: Response) {
        try {

            const respuesta = await axios.get("https://api.openweathermap.org/data/2.5/forecast?id=3433658&appid=bde204ad8cc3609635eb2ad3c63feac0");
            let utilidades = new UtilitiesForecast();

            var day_1: Object = {
                day: utilidades.getDia(respuesta.data.list, 4),
                date: utilidades.getFecha(respuesta.data.list, 4),
                temp_max: utilidades.getMax(respuesta.data.list, 0, 8),
                temp_min: utilidades.getMin(respuesta.data.list, 0, 8),
                sky: utilidades.getSkyState(respuesta.data.list, 4),
                humidity: respuesta.data.list[0].main.humidity,
            }

            var day_2: Object = {
                day: utilidades.getDia(respuesta.data.list, 12),
                date: utilidades.getFecha(respuesta.data.list, 12),
                temp_max: utilidades.getMax(respuesta.data.list, 8, 16),
                temp_min: utilidades.getMin(respuesta.data.list, 8, 16),
                sky: utilidades.getSkyState(respuesta.data.list, 12),
                humidity: respuesta.data.list[8].main.humidity
            }

            var day_3: Object = {
                day: utilidades.getDia(respuesta.data.list, 20),
                date: utilidades.getFecha(respuesta.data.list, 20),
                temp_max: utilidades.getMax(respuesta.data.list, 16, 24),
                temp_min: utilidades.getMin(respuesta.data.list, 16, 24),
                sky: utilidades.getSkyState(respuesta.data.list, 20),
                humidity: respuesta.data.list[16].main.humidity,
                icon: null,
            }

            var day_4: Object = {
                day: utilidades.getDia(respuesta.data.list, 28),
                date: utilidades.getFecha(respuesta.data.list, 28),
                temp_max: utilidades.getMax(respuesta.data.list, 24, 32),
                temp_min: utilidades.getMin(respuesta.data.list, 24, 32),
                sky: utilidades.getSkyState(respuesta.data.list, 28),
                humidity: respuesta.data.list[24].main.humidity
            }

            var day_5: Object = {
                day: utilidades.getDia(respuesta.data.list, 36),
                date: utilidades.getFecha(respuesta.data.list, 36),
                temp_max: utilidades.getMax(respuesta.data.list, 32, 40),
                temp_min: utilidades.getMin(respuesta.data.list, 32, 40),
                sky: utilidades.getSkyState(respuesta.data.list, 32),
                humidity: respuesta.data.list[31].main.humidity
            }

            var response: Object = {
                data: [day_1, day_2, day_3, day_4, day_5]
            }
            res.json(response).statusCode = 200;
        } catch (err) {
            res.json({ message: err }).statusCode = 404;
        }
    }

    routes() {
        this.router.get('/', this.getTiempoHoy);
        this.router.get('/extendido', this.getTiempoExtendido);
    }
}

const tiempoRoutes = new TiempoRoutes();
export default tiempoRoutes.router;