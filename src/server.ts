import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import path from 'path';
//Routes
import RestaurantesRoutes from './routes/RestaurantesRoutes';
import FarmaciasRoutes from './routes/FarmaciasRoutes';
import HotelesRoutes from './routes/HotelesRoutes';
import EstacionesRoutes from './routes/EstacionesRoutes';
import TiempoRoutes from './routes/TiempoRoutes';
import PhotoRoutes from './routes/PhotoRoutes';

class Server {
    private app: express.Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        const MONGO_URI = "mongodb://localhost/api_totem";

        mongoose.connect(MONGO_URI || process.env.MONGODB_URL)
            .then(() => {
                console.log('Connected to MONGODB successfully');
            });

        //Settings
        this.app.set('port', process.env.PORT || 5000);
        this.app.set('views', path.join(__dirname, 'views'));
        //this folder for this application will be used to store public files.
        this.app.use('/uploads', express.static(path.resolve('uploads')));

        //Middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    routes() {
        //this.app.use(indexRoutes);
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'views/index.html'));
        });
        this.app.use('/api/restaurantes', RestaurantesRoutes);
        this.app.use('/api/farmacias', FarmaciasRoutes);
        this.app.use('/api/hoteles', HotelesRoutes);
        this.app.use('/api/estaciones-de-servicio', EstacionesRoutes);
        this.app.use('/api/tiempo', TiempoRoutes);
        this.app.use('/api/images', PhotoRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port: ' + this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();