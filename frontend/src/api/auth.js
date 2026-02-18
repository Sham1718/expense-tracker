import api from "./api";

export const loginUser=(data)=>{
    console.log(data);
   return api.post("/auth/login",data);
}
