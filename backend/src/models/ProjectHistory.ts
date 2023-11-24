import { Schema,  model, Model} from "mongoose";

interface IProjectHistory  extends Document{
    userId: Schema.Types.ObjectId;
    projectUniqueName: string;
    complectness: number;
    payment: number;
    status: number;
    created: Date;
}

interface IProjectHistoryModel extends Model<IProjectHistory>{}

const ProjectHistorySchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    projectUniqueName: {
        type: String,
        ref: "pro_name"
    },
    complectness: {
        type: Number
    },
    payment: {
        type: Number
    },
    status: {
        type: Number
    },
    created: {
        type: Date,
        default: Date.now
    }
});


const ProjectHistory: IProjectHistoryModel = model<IProjectHistory, IProjectHistoryModel>("ProjectHistory", ProjectHistorySchema);
// const ProjectHistory = model("ProjectHistory", ProjectHistorySchema);
export default ProjectHistory;