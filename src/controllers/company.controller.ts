import {AppDataSource} from "../../server"
import {Company} from "../entities/company.entity";
import {Request,Response,NextFunction} from "express"
import ApiResponse from "../Types/ApiResponse";

export const addCompany = async (req:Request,res:Response,next:NextFunction) => {

    const {companyDetails} = req.body;

    try {
        const companyRepository = AppDataSource.getRepository(Company);

        const saveCompany = await companyRepository.save(companyDetails);

        const response:ApiResponse = {
            status:200,
            data:saveCompany,
            message:"Company detals saved successfully",
            success:true
        }

        console.log(response);

        res.status(200).json(response);
    }catch(err) {
        console.log(err,"Error");
        next(err);
    }
}

export const getCompany = async (req:Request,res:Response,next:NextFunction) => {

    try {
        const companyRepository = AppDataSource.getRepository(Company);

        const companyDetails = await companyRepository.find();

        const response:ApiResponse = {
            status:200,
            data:companyDetails,
            message:"Company detals fetched successfully",
            success:true
        }

        console.log(response);

        res.status(200).json(response);
    }catch(err) {
        console.log(err,"Error");
        next(err);
    }
}