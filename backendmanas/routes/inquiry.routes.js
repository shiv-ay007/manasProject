import { Router } from "express";
import { addInquiry, addInquiry1, addInquiry2, addInquiry3, addInquiry4, deleteAllInquiries, deleteInquiry, getInquiry } from "../controller/inquiry.controller.js";
import fetchReviews from "../controller/review.controller.js";






const inquiryRoute = Router();

inquiryRoute.post("/", addInquiry);
inquiryRoute.get("/", getInquiry);
inquiryRoute.get("/review", fetchReviews);
inquiryRoute.delete("/:id", deleteInquiry);
inquiryRoute.delete("/delete/all", deleteAllInquiries);

inquiryRoute.post("/vastu",addInquiry1)
inquiryRoute.post("/pristine",addInquiry2)
inquiryRoute.post("/somya",addInquiry3)
inquiryRoute.post("/express",addInquiry4)



export default inquiryRoute;
