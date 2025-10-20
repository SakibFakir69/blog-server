
import { Request } from "express";


interface IReqUser{
    id: string,
  
    email:string

}

declare global {
    namespace Express {
        interface Request {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            user? :IReqUser
        }
    }
}
export {};