import express, { Router, Request, Response } from "express";
import mongoose from "mongoose";
import Order from "../../models/Order";
import OrderHistory from "../../models/OrderHistory";
import User from "../../models/User";
// import {
//     findBidReportsByGroupId,
// } from "../../models/BidReport";
import auth from "../../middleware/auth";

const router: Router = express.Router();

interface AuthRequest extends Request {
  user?: {
    _id: string;
    role: string;
    status: string;
  };
}

const formatDate = (date: string) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + (d.getDate() + 1),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return year + month + day;
  // return [year, month, day].join(':');
};

router.post("/create", auth, async (req: AuthRequest, res: Response) => {
  console.log(req.user._id);

  const order = new Order({
    userId: new mongoose.Types.ObjectId(req.user._id),
    orderPO: req.body.orderPO,
    factory: req.body.factory,
    customer: req.body.customer,
    completionDate: req.body.completionDate,
    readyDate: req.body.readyDate,
  });

  //   console.log("order-create: ", order);
  try {
    const savedOrder = await order.save();
    // console.log("----------", savedOrder._id);
    const orderHistory = new OrderHistory({
      orderId: new mongoose.Types.ObjectId(String(savedOrder._id)),
      userId: new mongoose.Types.ObjectId(req.user._id),
      orderPO: req.body.orderPO,
      factory: req.body.factory,
      customer: req.body.customer,
      completionDate: req.body.completionDate,
      readyDate: req.body.readyDate,
    });
    await orderHistory.save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

router.get("/:userid", auth, async (req: AuthRequest, res: Response) => {
  const orders = await Order.find({
    userId: req.params.userid,
  });
  if (orders.length) {
    return res.json(orders);
  } else if (!orders.length) {
    res.status(204).json({ msg: "Not Found Any Orders!" });
  } else {
    res.status(400).json({ msg: "You have no permission" });
  }
});

router.get(
  "/history/:orderid",
  auth,
  async (req: AuthRequest, res: Response) => {
    const orders = await OrderHistory.find({
      orderId: req.params.orderid,
    });
    console.log("backend history", req.params.orderid);
    if (orders.length) {
      return res.json(orders);
    } else if (!orders.length) {
      res.status(204).json({ msg: "Not Found Any Orders!" });
    } else {
      res.status(400).json({ msg: "You have no permission" });
    }
  }
);

router.put("/:orderId", auth, async (req: AuthRequest, res: Response) => {
  const order = await Order.findById(req.params.orderId);
  const updateOrder = {
    _id: req.params.orderId,
    orderPO: order.orderPO,
    factory: req.body.factory,
    customer: req.body.customer,
    completionDate: req.body.completionDate,
    readyDate: req.body.readyDate,
  };
  if (order) {
    await Order.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.params.orderId) },
      updateOrder
    );
    return res.json(updateOrder);
  } else {
    return res.json({ msg: "Not found!" });
  }
  res.status(400).json({ msg: "You have no permission!" });
});

router.delete("/:orderId", auth, async (req: AuthRequest, res: Response) => {
  const order = await Order.findById(req.params.orderId);
  console.log(req.params.orderId);

  if (!order) {
    console.log("not found!");
    return res.status(404).json({ msg: "Order not found!" });
  }
  await Order.deleteOne({ _id: req.params.orderId });
  await res.json({ msg: "Order has been deleted successfully!" });
});

// //get reports data from groupid of team manager has logined
// router.get("/group/:groupid", auth, async (req: AuthRequest, res: Response) => {
//     findBidReportsByGroupId(Number(req.params.groupid))
//         .then((projects) => res.status(200).json(projects))
//         .catch((err) => res.status(404).json({ msg: "Projects not found!" }));
// });

// //get groupid from userid has logined
// router.get("/getGroupidByUserid/:userid", auth, async (req: AuthRequest, res: Response) => {
//     let user = await User.findOne({ _id: req.params.userid });
//     res.json({ groupid: user.groupid });
// });

router.get("/orders", auth, async (req: AuthRequest, res: Response) => {
  const allOrders = await Order.find()
    .sort("orderPO")
    .sort("factory")
    .sort("customer");
  res.json(allOrders);
});

export default router;
