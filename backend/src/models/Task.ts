import mongoose, { Schema, Model, model, UpdateWriteOpResult } from "mongoose";

interface ITaskType {
  total_type: String;
  mini_type: String;
  report_type: number;
}

interface ITaskDev {
  userid: {
    type: Schema.Types.ObjectId;
    ref: "user";
  };
  percentage: number;
}

export interface ITask extends Document {
  task_type: ITaskType;
  title: string;
  content: string;
  allocDevs: [ITaskDev];
  from_date: Date;
  to_date: Date;
  trashed: Boolean;
  priority: number;
}

interface UNString {
  _id: string;
  realname: string;
  groupid: number;
}
interface PRString {
  userid: string;
  percentage: number;
}
interface RTask {
  _id: string;
  users: [UNString];
  allocDevs: [PRString];
}
interface ITaskModel extends Model<ITask> {}

const TaskSchema: Schema = new Schema({
  task_type: {
    total_type: String,
    mini_type: String,
    report_type: Number,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  allocDevs: [
    {
      userid: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      percentage: {
        type: Number,
        default: 0,
      },
    },
  ],
  from_date: {
    type: Date,
    default: Date.now(),
  },
  to_date: {
    type: Date,
    required: true,
  },
  trashed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Number,
    default: 0,
  },
});

const Task: ITaskModel = model<ITask, ITaskModel>("Task", TaskSchema);

async function findTasksByGroupId(groupId: number): Promise<ITask[]> {
  return await Task.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "allocDevs.userid",
        foreignField: "_id",
        as: "users",
      },
    },
    {
      $match: {
        "users.groupid": groupId,
        trashed: false,
      },
    },
    {
      $project: {
        task_type: 1,
        title: 1,
        content: 1,
        allocDevs: 1,
        from_date: 1,
        to_date: 1,
        trashed: 1,
        priority: 1,
      },
    },
  ])
    .sort({ from_date: "desc" })
    .exec();
}

async function findTaskGetUserGroupnames(
  taskId: string,
  groupid: number
): Promise<RTask[]> {
  return await Task.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "allocDevs.userid",
        foreignField: "_id",
        as: "users",
      },
    },
    {
      $match: {
        _id: new mongoose.Types.ObjectId(taskId),
      },
    },
    {
      $project: {
        "allocDevs.userid": 1,
        "allocDevs.percentage": 1,
        "users._id": 1,
        "users.realname": 1,
        "users.groupid": 1,
      },
    },
  ]).exec();
}

async function findTaskGetUsernames(taskId: string): Promise<RTask[]> {
  return await Task.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "allocDevs.userid",
        foreignField: "_id",
        as: "users",
      },
    },
    {
      $match: {
        _id: new mongoose.Types.ObjectId(taskId),
      },
    },
    {
      $project: {
        "allocDevs.userid": 1,
        "allocDevs.percentage": 1,
        "users._id": 1,
        "users.realname": 1,
      },
    },
  ]).exec();
}

async function updateAllocationPercentage(
  taskId: string,
  devId: string,
  percentage: number
): Promise<UpdateWriteOpResult> {
  if (
    mongoose.Types.ObjectId.isValid(taskId) &&
    mongoose.Types.ObjectId.isValid(devId)
  ) {
    const result = await Task.updateOne(
      { _id: taskId, "allocDevs.userid": devId },
      { $set: { "allocDevs.$.percentage": percentage } }
    ).exec();
    return result;
  }
  throw Error("Not valid Id");
}
export default Task;

export {
  findTasksByGroupId,
  updateAllocationPercentage,
  findTaskGetUsernames,
  findTaskGetUserGroupnames,
};
