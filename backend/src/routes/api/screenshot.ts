import express, { Router, Request, Response } from "express";
import Screenshot, { findByIpAndDate } from "../../models/Screenshot";

import { upload } from "../../utils/helper";
import { findConfigurationByIp } from "../../models/Surveillance";
import { findUserDataByUserName } from "../../models/User";
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

// route: api/screenshot/add
// description: save new screenshot for each user
// method: POST
// param: userId: User's id, screen: Screen file for each user
/**
 * @api: api/screenshot/add
 * @desc: Save new screenshot for each ip address
 * @method: POST
 * @param screen Being uploaded screenshot file for each ip
 */
router.post(
  "/add",
  upload.single("screen"),
  async (req: Request, res: Response) => {
    const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)
      ? req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0]
        ? req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0]
        : "localhost"
      : "localhost";
    if (!req.body.fileName) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    console.log("Screenshot saved:", req.body);
    const screen = new Screenshot({
      ip_address: ip,
      screenshot_path: req.body.fileName,
      created_at: Date.now(),
    });
    try {
      await screen
        .save()
        .then((r) => {
          findConfigurationByIp(ip)
            .then((conf) => {
              if (conf.length) {
                res.status(202).json({
                  ipAddress: conf[0].ip_address,
                  screenTick: conf[0].screenshot_duration,
                  clipboard: conf[0].is_capture_clipboard,
                  keystroke: conf[0].is_capture_keystroke,
                  dataTick: conf[0].data_duration,
                  screenQuality: conf[0].screen_quality,
                  userName: conf[0].user_name,
                });
              } else res.status(400).json({ msg: "Invalid IP Address." });
            })
            .catch((err) => res.status(400).json({ msg: err.message.data }));
        })
        .catch((err) => {
          res.status(400).json({ msg: err.message });
        });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
);

// route: api/screenshot/get/:userName/:date/:offset/:size
// description: get screenshot of specific user on specific date.
// method: GET
// param: userName: User's name (not real name), date: date ("2023/6/10")
/**
 * @api: api/screenshot/get/:date/:offset/:size
 * @desc: Get specific screens for request ip address on specific date
 * @method: GET
 * @param user_name Represents the username of the screens.
 * @param date Represents the specific date of screenshots
 * @param offset Represents offset in the list of screenshots for pagination
 * @param size Represents display size in the list of screenshots for pagination
 */
router.get(
  "/get/:user_name/:date/:offset/:size",
  auth,
  async (req: AuthRequest, res: Response) => {
    // console.log("Request user:", req.user);
    if (req.user.is_surv_checker === 0 && req.user.role != "admin") {
      res.status(400).json({ msg: "Permission denied." });
      return;
    }
    try {
      findUserDataByUserName(req.params.user_name)
        .then((user) => {
          if (user.length) {
            const ip = user[0].ip;
            findByIpAndDate(
              ip,
              req.params.date,
              Number(req.params.offset),
              Number(req.params.size)
            )
              .then((screens) => {
                res.status(200).json(screens);
              })
              .catch((err) => res.status(400).json({ msg: err.message }));
          }
        })
        .catch((err) => res.status(400).json({ msg: err.message }));
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  }
);

export default router;
