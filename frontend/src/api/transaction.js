import api from "./api";

export const getAllTransaction=()=>{
    return api.get("/transaction");
}

export const createTransaction=(data)=>{
    return api.post("/transaction",data);
}

export const deleteTransaction=(id)=>{
    return api.delete(`/transaction/${id}`);
}

export const getSummary=()=>{
    return api.get("/transaction/summary");
}

export const getMonthly=()=>{
    return api.get("/transaction/monthly");
}

export const getCategory=()=>{
    return api.get("/transaction/category")
}