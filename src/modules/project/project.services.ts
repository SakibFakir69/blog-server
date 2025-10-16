import { Prisma } from "../../../generated/prisma"
import { prisma } from "../../db"





// const createProject = async (payload:Prisma.ProjectCreateInput , id:string)=>{

    

//     const result = await prisma.project.create(
//         {
//             data:{
//                 ...payload,userId:id
//             },

//               include: {
//             user: {
//                 select: {
//                     id: true,
//                     name: true,
//                     image: true,
//                 },
//             },
//         },
//         }
//     )
//     console.log(result);

//     return result;
// }
// update project 

const createProject = async (payload: Prisma.ProjectCreateInput, userId: string) => {
  const result = await prisma.project.create({
    data: {
      title: payload.title,
      description: payload.description,
      image: payload.image,
      githubUrl: payload.githubUrl,
      liveUrl: payload.liveUrl,
      techStack: payload.techStack,
      status: payload.status,

      // ✅ Proper relation connection
      user: {
        connect: { id: userId },
      },
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return result;
};

const updateProject = async(id:string, data:Prisma.ProjectCreateInput)=>{

    const result = await prisma.project.update({
        where:{
            id:id
        },
        data
    })

    return result;

}


// get ptojecy by id

const getByProjectID =async (id:string)=>{

    const result = await prisma.project.findUnique({
        where:{
            id:id
        }
    })
    console.log(result, " id ")
    return result;

}
const deleteProject = async (id:string)=>{
  console.log(id)

    const result = await prisma.project.delete({
        where:{
            id:id
        }
    })
    return result
}



export const projectServies ={
    createProject , updateProject , getByProjectID , deleteProject
}