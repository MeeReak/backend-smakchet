import { ApplicationRepository } from "@application/databases/repositories/application.repository";

export class ApplicationService{

    public ApplicationRepo:ApplicationRepository;

    constructor(){
        this.ApplicationRepo = new ApplicationRepository();
    }

    // Apply for Event

    async applyEvent(formSubmit:object){
        try{
            return await this.ApplicationRepo.applyEvent(formSubmit);
        }catch(error:unknown | any){
            throw error;
        }
    }

    // Update status if user passed or failed

    async updateStatus(id:string , status:string){
        try{
            return await this.ApplicationRepo.updateStatus(id,status);
        }catch(error){
            throw error;
        }
    }
}