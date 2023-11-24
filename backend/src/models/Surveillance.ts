import mongoose, { Schema, Model, model, UpdateWriteOpResult } from "mongoose";

export interface ISurveillance extends Document {
  ip_address: string;
  user_name: string;
  screenshot_duration: number;
  is_capture_clipboard: boolean;
  is_capture_keystroke: boolean;
  data_duration: number;
  screen_quality: number;
}

interface ISurveillanceModel extends Model<ISurveillance> {}

const SurveillanceSchema: Schema = new Schema({
  ip_address: {
    type: String,
    required: true,
    default: "localhost",
  },
  user_name: {
    type: String,
  },
  screenshot_duration: {
    type: Number,
    required: true,
    default: 300000,
  },
  is_capture_clipboard: {
    type: Boolean,
    required: true,
    default: false,
  },
  is_capture_keystroke: {
    type: Boolean,
    required: true,
    default: false,
  },
  data_duration: {
    type: Number,
    required: true,
    default: 60000,
  },
  screen_quality: {
    type: Number,
    required: true,
    default: 7,
  },
});

const Surveillance: ISurveillanceModel = model<
  ISurveillance,
  ISurveillanceModel
>("Surveillance", SurveillanceSchema);

const createConfigurationByIp = async ({
  ipAddress = "localhost",
  userName = "",
  screenDuration = 300000,
  isCaptureClipboard = false,
  isCaptureKeystroke = false,
  dataDuration = 60000,
  screenQuality = 7,
}) => {
  const conf = new Surveillance({
    ip_address: ipAddress,
    user_name: userName,
    screenshot_duration: screenDuration,
    is_capture_clipboard: isCaptureClipboard,
    is_capture_keystroke: isCaptureKeystroke,
    data_duration: dataDuration,
    screen_quality: screenQuality,
  });
  try {
    await conf.save();
    return conf;
  } catch (error) {
    return error;
  }
};

const findConfigurationByIp = async (ip: string): Promise<ISurveillance[]> => {
  return await Surveillance.find({
    ip_address: ip,
  });
};

export { findConfigurationByIp, createConfigurationByIp };

export default Surveillance;
