const bodyParser = require("body-parser");
import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import { ErrorHandler } from "./src/middlewares/errorHandler";
import {DataSource} from "typeorm"
import { Company } from "./src/entities/company.entity";

app.use(bodyParser.json());
app.use(cors());

dotenv.config();

export const AppDataSource = new DataSource({
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"root",
    password:"admin",
    database:"test",
    entities:[Company],
    synchronize:true,
    logging:false
})

const connectDB = async () => {
    try{
        const connection = await AppDataSource.initialize();
        console.log(connection);
    }catch(e){
        console.log(e,"error");
    }
}

connectDB();

const PORTNUMBER: number = parseInt(process.env.PORT) || 5000;

app.use(ErrorHandler);

app.listen(PORTNUMBER, (): void => {
    console.log(`Server is running on ${PORTNUMBER}`);
});
