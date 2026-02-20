import api from "./api";

export const loginUser=(data)=>{
   return api.post("/auth/login",data);
}

export const register=(data)=>{
   return api.post("/auth/register",data);
}
