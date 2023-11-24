import mongoose, { Schema, Model, model, ObjectId } from "mongoose";

export interface IScreenshot extends Document {
  ip_address: string;
  user_name: string;
  screenshot_path: string;
  created_at: Date;
}

interface IScreenshotModel extends Model<IScreenshot> {}

const ScreenshotSchema: Schema = new Schema({
  ip_address: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
  },
  screenshot_path: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Screenshot: IScreenshotModel = model<IScreenshot, IScreenshotModel>(
  "Screenshot",
  ScreenshotSchema
);

/**
 * @desc Find screenshots by ip and date with pagination.
 * @param ip String represents ip address of screenshot
 * @param date Date string represents the specific date of screenshot
 * @param offset Offsets the count of screenshot for pagination
 * @param limit Limitation of screenshot for one page.
 * @returns The array of screenshot info including ip_address, screenshot_path, etc...
 */
const findByIpAndDate = async (
  ip: string,
  date: string,
  offset: number,
  limit: number
): Promise<IScreenshot[]> => {
  const dateObj1 = new Date(date);
  const dateObj2 = new Date(date);
  dateObj2.setDate(dateObj2.getDate() + 1);
  dateObj2.setMinutes(dateObj2.getMinutes() - 1);
  return await Screenshot.find({
    ip_address: ip,
    created_at: { $gt: dateObj1, $lt: dateObj2 },
  })
    .skip(offset)
    .limit(limit);
};

export { findByIpAndDate };

export default Screenshot;
