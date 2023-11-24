import { Schema, Model, model, Document } from "mongoose";

export interface IWorkTime extends Document {
    user: Schema.Types.ObjectId,
    year: Number,
    month: Number,
    day: Number,
    time: number,
    inputUser: Schema.Types.ObjectId
}

interface IWorkTimeModel extends Model<IWorkTime> { }

const WorkTimeSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        default: 0,
    },
    inputUser: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    collection: "worktime",
    timestamps: true
});

const WorkTime: IWorkTimeModel = model<IWorkTime, IWorkTimeModel>("WorkTime", WorkTimeSchema);

/**
 * 
 * @param groupid The number of special group
 * @param month 
 * @param year 
 * @returns The array of WorkTime for condition
 */
const findByCondition = async (
    groupid: number = -1,
    year: number = new Date().getFullYear(),
    month: number = 0
): Promise<IWorkTime[]> => {
    if (groupid === -1) {
        return await WorkTime.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            // {
            //     $sort: {
            //         "user.groupid": 1,
            //         "user.realname": -1
            //     }
            // },
            {
                $project: {
                    user: {
                        username: 1, realname: 1, groupid: 1
                    },
                    year: 1, month: 1, time: 1, day: 1
                }
            },
            {
                $match: {
                    $and: [
                        { "year": year },
                        { "month": month }
                    ]
                }
            },
            {
                $facet: {
                    main: [
                        {
                            $sort: { "day": 1 }
                        },
                        {
                            $group: {
                                _id: "$user.realname",
                                username: { $last: "$user.username" },
                                groupid: { $last: "$user.groupid" },
                                totalTime: { $sum: "$time" },
                                workingTimes: {
                                    $push: "$$ROOT"
                                }
                            }
                        },
                    ],
                    total: [
                        {
                            $group: {
                                _id: "$day",
                                total: { $sum: "$time" },
                            }
                        },
                        {
                            $sort: { "_id": 1 }
                        }
                    ],
                    groupTotal: [
                        {
                            $group: {
                                _id: "$user.groupid",
                                total: { $sum: "$time" },
                                workingTimes: { $push: "$$ROOT" }
                            }
                        },
                        {
                            $sort: { "_id": 1 }
                        }
                    ]
                }
            }
        ]);
    } else {
        return await WorkTime.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    user: {
                        username: 1, realname: 1, groupid: 1
                    },
                    year: 1, month: 1, time: 1, day: 1
                }
            },
            {
                $match: {
                    $and: [
                        { "year": year },
                        { "month": month },
                        { "user.groupid": groupid }
                    ]
                }
            },
            {
                $facet: {
                    main: [
                        {
                            $sort: { "day": 1 }
                        },
                        {
                            $group: {
                                _id: "$user.realname",
                                username: { $last: "$user.username" },
                                groupid: { $last: "$user.groupid" },
                                totalTime: { $sum: "$time" },
                                workingTimes: {
                                    $push: "$$ROOT"
                                }
                            }
                        },
                    ],
                    total: [
                        {
                            $group: {
                                _id: "$day",
                                total: { $sum: "$time" },
                            }
                        }
                    ],
                    memberTotal: [
                        {
                            $group: {
                                _id: "$user.realname",
                                totalTime: { $sum: "$time" },
                                workingTimes: {
                                    $push: "$$ROOT"
                                }
                            }
                        }
                    ]
                }
            }
        ]);
    }
}

/**
 * 
 * @param user 
 * @param year 
 * @param month 
 * @param day 
 * @returns return true if exist worktime document
 */
const isExistWorkTime = async (
    user: string,
    year: Number,
    month: Number,
    day: Number
): Promise<boolean> => {
    return (await WorkTime.find({ user, year, month, day })).length > 0;
}

export { findByCondition, isExistWorkTime };

export default WorkTime;