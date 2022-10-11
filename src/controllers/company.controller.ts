import {AppDataSource} from "../../server"
import {Company} from "../entities/company.entity";
import {Request,Response,NextFunction} from "express"
import ApiResponse from "src/Types/ApiResponse";

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

        res.status(200).json(response);
    }catch(err) {
        console.log(err,"Error");
        next(err);
    }
}