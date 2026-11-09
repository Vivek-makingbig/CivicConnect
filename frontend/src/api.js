import axios from "axios";

const API = axios.create(
    { 
        baseURL: "http://localhost:5000",
         withCredentials: true,
    });

export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
export const logout = ()=>API.post('/auth/logout');

//Reporting disaster
export const reportDisaster = (data)=> API.post("/report/report",data); 

//Getting disaster reported by an user
export const getmydisasterReport = ()=>API.get("/report/myreports")

//Get all disaster reports for admin
export const getAllReports = ()=>API.get('/report/all');

// Voting on a disaster report
export const voteReport = (reportId, action) => API.patch("/report/vote", { reportId, action });


//Update status of disaster report
export const updateReport = (id,data)=>API.patch(`/report/updatereport/${id}`,data);

//Delete disaster report
export const deleteReport = (id)=>API.delete(`/report/deletereport/${id}`);


//Create alert(Admin)
export const createAlert = (data)=>API.post('/alert/createalert',data);

//Get all alert messages(user)
export const getAllAlertMessages = ()=>API.get('/alert/allalerts');
