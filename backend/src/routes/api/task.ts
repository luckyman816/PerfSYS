import express, { Router, Request, Response } from "express";
import Task from "../../models/Task";
import auth from "../../middleware/auth";
import mongoose from "mongoose";
import {
  findTasksByGroupId,
  updateAllocationPercentage,
  findTaskGetUsernames,
  findTaskGetUserGroupnames,
} from "../../models/Task";
const router: Router = express.Router();

interface AuthRequest extends Request {
  user?: {
    _id: string;
    role: string;
    groupid: number;
  };
}

// route: api/task/new
// description: add new task
// method: POST and it's private only for Admin
router.post("/new", auth, async (req: AuthRequest, res: Response) => {
  let allocdata = [];
  if (req.body.allocDevs) {
    allocdata = req.body.allocDevs.map((item) => {
      return {
        userid: new mongoose.Types.ObjectId(item),
      };
    });
  }
  const task = new Task({
    title: req.body.title,
    task_type: req.body.task_type,
    content: req.body.content,
    from_date: req.body.from_date,
    to_date: req.body.to_date,
    allocDevs: allocdata,
    priority: req.body.priority,
  });
  try {
    await task.save();

    res.json({ msg: "Successfully registered" });
  } catch (error) {
    res.status(400).json({ msg: "DIe!" });
  }
});

// route: api/task/all
// description: add new task
// method: GET and it's private only for Admin
router.get("/all", auth, async (req: AuthRequest, res: Response) => {
  if (req.user.role === "admin") {
    const tasks = await Task.find({ trashed: false }).sort({
      from_date: "desc",
    });
    return res.json(tasks);
  }
  res.status(400).json({ msg: "You have no permission" });
});
router.get("/trash", auth, async (req: AuthRequest, res: Response) => {
  if (req.user.role === "admin") {
    const tasks = await Task.find({ trashed: true });
    return res.json(tasks);
  }
  res.status(400).json({ msg: "You have no permission" });
});
// route: api/task/:taskid
// description: add new task
// method: GET and it's private only for Admin
router.get("/:taskid", auth, async (req: AuthRequest, res: Response) => {
  const task = await Task.findById(req.params.taskid);
  if (task) return res.json(task);
  res.status(400).json({ msg: "You have no permission" });
});

router.delete("/:taskid", auth, async (req: AuthRequest, res: Response) => {
  const task = await Task.findById(req.params.taskid);
  if (task) {
    task.trashed = true;
    task.save();
    return res.json({ msg: "Successfully Removed" });
  }
  res.status(400).json({ msg: "You have no permission" });
});

router.post(
  "/restore/:taskid",
  auth,
  async (req: AuthRequest, res: Response) => {
    const task = await Task.findById(req.params.taskid);
    if (task) {
      task.trashed = false;
      task.save();
      return res.json({ msg: "Successfully Backup" });
    }
    res.status(400).json({ msg: "You have no permission" });
  }
);

router.get("/user/:userid", auth, async (req: AuthRequest, res: Response) => {
  const tasks = await Task.find({
    "allocDevs.userid": req.params.userid,
    trashed: false,
  }).sort({ from_date: "desc" });
  if (tasks) return res.json(tasks);
  return res.status(404).json({ msg: "No Task for this user" });
});

router.get("/names/:taskid", auth, async (req: AuthRequest, res: Response) => {
  findTaskGetUsernames(req.params.taskid)
    .then((result) => {
      const names = result[0].users;
      const progress = result[0].allocDevs;
      let resarray = [];
      names.forEach((name) => {
        const t = progress.find(
          (item) => item.userid.toString() === name._id.toString()
        );
        resarray.push({ ...t, realname: name.realname });
      });
      res.json(resarray);
    })
    .catch((err) => res.status(404).json({ msg: err }));
});

router.get(
  "/groupnames/:taskid",
  auth,
  async (req: AuthRequest, res: Response) => {
    findTaskGetUserGroupnames(req.params.taskid, req.user.groupid)
      .then((result) => {
        const names = result[0].users.filter(
          (item) => item.groupid === req.user.groupid
        );
        const progress = result[0].allocDevs;
        let resarray = [];
        names.forEach((name) => {
          const t = progress.find(
            (item) => item.userid.toString() === name._id.toString()
          );
          resarray.push({ ...t, realname: name.realname });
        });
        res.json(resarray);
      })
      .catch((err) => res.status(404).json({ msg: err }));
  }
);

router.get("/group/:groupid", auth, async (req: AuthRequest, res: Response) => {
  findTasksByGroupId(Number(req.params.groupid))
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(404).json({ msg: "Task Not Found" }));
});

router.put("/edit/:taskid", auth, async (req: AuthRequest, res: Response) => {
  const task = await Task.findById(req.params.taskid);
  let allocdata = [];
  if (req.body.allocDevs) {
    allocdata = req.body.allocDevs.map((item) => {
      return {
        userid: new mongoose.Types.ObjectId(item),
      };
    });
  }
  const taskU = {
    title: req.body.title,
    task_type: req.body.task_type,
    content: req.body.content,
    from_date: req.body.from_date,
    to_date: req.body.to_date,
    allocDevs: allocdata,
    priority: req.body.priority,
  };
  if (task) {
    await Task.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.params.taskid) },
      { $set: taskU },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.json({ msg: "Task Edit successfully" });
  }
  res.status(400).json({ msg: "Error" });
});

router.post(
  "/update/:taskid",
  auth,
  async (req: AuthRequest, res: Response) => {
    try {
      updateAllocationPercentage(
        req.params.taskid,
        req.user._id,
        Number(req.body.percentage)
      );
      res.json({ msg: "Update Successfully" });
    } catch (error) {
      res.status(400).json({ msg: error });
    }
  }
);
export default router;
