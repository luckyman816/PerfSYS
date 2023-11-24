import express, { Router, Request, Response } from "express";
import {
  createConfigurationByIp,
  findConfigurationByIp,
} from "../../models/Surveillance";
const router: Router = express.Router();

/**
 * @api: api/surveillance/ping
 * @desc: Add new surveillance configuration for each ip if don't exist
 * @method: GET
 * @return: Created configuration or existing configuration for request ip
 */
router.get("/ping", (req: Request, res: Response) => {
  try {
    const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)
      ? req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0]
        ? req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0]
        : "localhost"
      : "localhost";
    console.log("Ping requested:", ip);
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
        } else {
          createConfigurationByIp({
            ipAddress: ip,
          })
            .then((createdConf) => {
              res.status(200).json({
                ipAddress: createdConf.ip_address,
                screenTick: createdConf.screenshot_duration,
                clipboard: createdConf.is_capture_clipboard,
                keystroke: createdConf.is_capture_keystroke,
                dataTick: createdConf.data_duration,
                screenQuality: createdConf.screen_quality,
                userName: createdConf.user_name,
              });
            })
            .catch((err) => res.status(400).json({ msg: err.message.data }));
        }
      })
      .catch((err) => res.status(400).json({ msg: err.message.data }));
  } catch (error) {
    res.status(400).json({ msg: error.message.data });
  }
});

export default router;
