import express, { Router, Request, Response } from "express";
import mongoose from "mongoose";
import ProjectHistory from "../../models/ProjectHistory";
import auth from "../../middleware/auth";

const router: Router = express.Router();

interface AuthRequest extends Request {
    user?: {
        _id: string;
        role: string;
        groupid: number;
        is_surv_checker: number;
    };
}

router.post("/create", auth, async (req: AuthRequest, res: Response) => {
    const projectHistory = new ProjectHistory({
        userId: new mongoose.Types.ObjectId(req.body.userId),
        projectUniqueName: req.body.projectUniqueName,
        complectness: req.body.complectness,
        payment: req.body.payment,
        status: req.body.status
    });
    try {
        await projectHistory.save();
        res.json({ msg: "ProjectHistory has been successfully created!", result: projectHistory });
    } catch (error) {
        res.status(400).json({ msg: error });
    }
});

router.get("/project/:projectname", auth, async (req: AuthRequest, res: Response) => {
    let findCond = {projectUniqueName: req.params.projectname};
    req.user?.role !== 'Team Manager' ? Object.defineProperty(findCond, "userId", {value: req.user._id}) : '';
    
    console.log(findCond);
    const projecthistory = await ProjectHistory.find(
        findCond
    ).sort({ created: "desc" });

    if(projecthistory.length) {
        return res.json(projecthistory);
    } else {
        return res.json({msg: "Not found!"});
    }
});


export default router;