import express, { Router, Request, Response } from "express";
import { check, Result, ValidationError, validationResult } from "express-validator";
import WorkTime, { findByCondition, isExistWorkTime } from "../../models/WorkTime";
import auth from "../../middleware/auth";
import requireAdmin from "../../middleware/requireAdmin";
import url from "url";
import User, { findUsersWorkingTimeOfTodayByUsername } from "../../models/User";

const router: Router = express.Router();

interface AuthRequest extends Request {
    user?: {
        _id: string;
        username: string;
        role: string;
        groupid: number;
        is_surv_checker: number;
        working_time_users: string[]
    };
}

router.post(
    "/input-time",
    auth,
    [
        check("worktimes", "WorkTimes is required").isArray(),
    ],
    async (req: AuthRequest, res: Response) => {
        try {
            const errors: Result<ValidationError> = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).send({ errors: errors.array() });
            }

            const { worktimes } = req.body;
            const curDate = new Date();
            const year = curDate.getFullYear();
            const month = curDate.getMonth() + 1;
            const day = curDate.getDate();
            
            await Promise.all(worktimes.map(async (worktime: { user: string; time: number; }) => {
                const { user, time } = worktime;
                let findUser = await User.findById(user);
                if (req.user.working_time_users.includes(findUser.username)) {
                    let exist = await isExistWorkTime(user, year, month, day);
                    if (!exist) {
                        let workTime = new WorkTime({
                            user, year, month, day, time, inputUser: req.user._id
                        });
                        await workTime.save();
                    } else {
                        await WorkTime.findOneAndUpdate({
                            user, year, month, day
                        }, { time });
                    }
                }

            }));
            res.status(200).send(
                `Successfully saved.`
            )
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Error corrupted.");
        }
    }
);

router.get(
    "/worktimes",
    auth,
    requireAdmin,
    async (req: Request, res: Response) => {
        try {
            let params = url.parse(req.url, true).query;
            let { groupid, year, month } = params;
            let result = await findByCondition(parseInt(String(groupid)), parseInt(String(year)), parseInt(String(month)));
            return res.status(200).send(result);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Error corrupted.");
        }
    }
)

router.get(
    "/wkarray",
    auth,
    async (req: AuthRequest, res: Response) => {
        try {
            let username = req.user.username;
            let times = await findUsersWorkingTimeOfTodayByUsername(username as string);
            res.status(200).send(times);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
)

export default router;