import express,{Request,Response} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { userRouter } from "./modules/users/user.route";
import { projectRouter } from "./modules/project/project.route";
import { blogRouter } from "./modules/blog/blog.route";
import { authRouter } from "./modules/auth/auth.route";

const app = express();


app.use(
  cors({
    origin: ["https://blog-qvx3b2ykl-sakibfakirs-projects.vercel.app","https://blog-5ad23efxt-sakibfakirs-projects.vercel.app",'https://blog-ui-rosy.vercel.app' ] ,// frontend URL

     credentials: true, // allow cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // allow all HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // allow headers
  })
);
app.use(cookieParser()); // 
app.use(express.json());



app.use("/api/v1/users", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/auth", authRouter);


app.get("/", (req:Request, res:Response) => {
  res.send("Hello World!");
});



export const ServerApp = app;
