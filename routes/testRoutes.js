import express from 'express'
//rest object
import { testPostController } from "../controllers/testController.js";
import userAuth from '../middlewares/authMiddleware.js';



const router = express.Router()


//routes
router.post("/test-post", userAuth, testPostController);





//export
export default router;