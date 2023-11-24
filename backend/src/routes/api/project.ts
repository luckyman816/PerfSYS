import express, { Router, Request, Response } from "express";
import mongoose from "mongoose";
import Project from "../../models/Project";
import User from "../../models/User";
import {
    findProjectsByGroupId,
} from "../../models/Project";
import auth from "../../middleware/auth";

const router: Router = express.Router();

interface AuthRequest extends Request {
    user?: {
        _id: string;
        role: string;
        groupid: number;
        is_surv_checker: number;
        username: string;
    };
}

const formatDate = (date: string) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate() + 1),
        year = d.getFullYear(),
        hour = d.getHours(),
        min = d.getMinutes(),
        sec = d.getSeconds();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return year + month + day + hour + min + sec;
    // return [year, month, day].join(':');
};

router.post("/create", auth, async (req: AuthRequest, res: Response) => {

    const project = new Project({
        userId: new mongoose.Types.ObjectId(req.body.userId),
        projectUniqueName: req.user.groupid + '-' + req.user.username + '-' + req.body.skillset[0] + '-' + formatDate(new Date(Date.now()).toString()),
        marketplace: req.body.marketplace,
        skillset: req.body.skillset,
        summary: req.body.summary,
        detail: req.body.detail,
        milestoneBudget: req.body.milestoneBudget,
        hourlyBudget: req.body.hourlyBudget,
        clientInfo: req.body.clientInfo,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        complectness: req.body.complectness,
        projectStatus: req.body.projectStatus,
        failReason: req.body.failReason,
    });
    console.log('project-create: ', project);
    try {
        await project.save();
        res.json({ msg: "Project has been successfully created!", result: project });
    } catch (error) {
        res.status(400).json({ msg: error });
    }
});

router.get("/user/:userid", auth, async (req: AuthRequest, res: Response) => {
    const projects = await Project.find({
        userId: req.params.userid
    });
    if (projects.length) {
        return res.json(projects);
    } else if (!projects.length) {
        res.status(204).json({ msg: "Not Found Any Projects!"});
    } else {
        res.status(400).json({ msg: "You have no permission" });
    }
});

router.put("/edit/:projectId", auth, async (req: AuthRequest, res: Response) => {
    const project = await Project.findById(req.params.projectId);
    const updateProject = {
        marketplace: req.body.marketplace,
        skillset: req.body.skillset,
        summary: req.body.summary,
        detail: req.body.detail,
        milestoneBudget: req.body.milestoneBudget,
        hourlyBudget: req.body.hourlyBudget,
        clientInfo: req.body.clientInfo,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        complectness: req.body.complectness,
        projectStatus: req.body.projectStatus,
        failReason: req.body.failReason,
    };
    if (project) {
        await Project.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.params.projectId) },
            updateProject,
            // { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        // await Project.findByIdAndUpdate(req.params.projectId, updateProject);
        return res.json({ msg: "Project has been updated successfully!" });
    } else {
        return res.json({msg: "Not found!"})
    }
    res.status(400).json({ msg: "You have no permission!" });
});

router.delete("/:projectId", auth, async (req: AuthRequest, res: Response) => {
    const report = await Project.findById(req.params.projectId);
    console.log(req.params.projectId);
    
    if (!report) {
        console.log('not found!');
        return res.status(404).json({ msg: "Project not found!" });
    }
    // if (req.user.role !== "admin") {
    //     console.log('no permission!');

    //     return res.status(400).json({ msg: "You have no permission to delete the report!" });
    // }
    await Project.deleteOne({ _id: req.params.projectId });
    await res.json({ msg: "DailyReport has been deleted successfully!" });
});

//get reports data from groupid of team manager has logined
router.get("/group/:groupid", auth, async (req: AuthRequest, res: Response) => {
    findProjectsByGroupId(Number(req.params.groupid))
        .then((projects) => res.status(200).json(projects))
        .catch((err) => res.status(404).json({ msg: "Projects not found!" }));
});

//get groupid from userid has logined
router.get("/getGroupidByUserid/:userid", auth, async (req: AuthRequest, res: Response) => {
    let user = await User.findOne({ _id: req.params.userid });
    res.json({ groupid: user.groupid });
});

router.get("/all", auth, async (req: AuthRequest, res: Response) => {
    const allProjects = await Project.find().sort("groupid").sort("projectStatus").sort("projectUniqueName");
    res.json(allProjects);
})

export default router;