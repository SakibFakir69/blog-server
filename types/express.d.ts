
declare module "express";
declare module "cors";
declare module "cookie-parser";
declare module "jsonwebtoken";
declare module "bcrypt";



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