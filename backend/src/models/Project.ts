import mongoose, { Schema, Model, model, ObjectId } from "mongoose";

const ProjectSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  projectUniqueName: {
    type: String,
    // unique: true,
    ref: "pro_name",
  },
  marketplace: {
    type: String
  },
  skillset: {
    type: [String]
  },
  summary: {
    type: String
  },
  detail: {
    type: String
  },
  type: {
    type: Number,
    default: 0 //0:fixed, 1:hourly
  },
  milestoneBudget: {
    type: [Number]
  },
  hourlyBudget: {
    type: String
  },
  clientInfo: {
    clientNationality: {
      type: String
    },
    clientName: {
      type: String
    },
    clientOther: {
      type: String
    }
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  complectness: {
    type: Number
  },
  projectStatus: {
    type: Number,
    default: 0
    //1:To-do, 2:On-going, 3:In Review, 4:Finished, 5:Failed
  },
  failReason: {
    type: String
  },
  reportDate: {
    type: Date,
    default: Date.now
  }
});

async function findProjectsByGroupId(groupId: number) {
  return await Project.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $match: {
        "user.0.groupid": groupId
      },
    },
    {
      $project: {
        userId: 1,
        projectUniqueName: 1,
        marketplace: 1,
        skillset: 1,
        summary: 1,
        detail: 1,
        type: 1,
        milestoneBudget: 1,
        hourlyBudget: 1,
        clientInfo: 1,
        startDate: 1,
        endDate: 1,
        complectness: 1,
        projectStatus: 1,
        failReason: 1,
        reportDate: 1
      }
    }
  ]).sort({ userId: "desc", projectStatus: 'desc', projectUniqueName: 'desc' })
    .exec();
}

const Project = model("Project", ProjectSchema);

export default Project;

export {
  findProjectsByGroupId
}