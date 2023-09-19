import { mongoose } from "mongoose";

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Trunghd_Blog");
    console.log("Connect successfully!!");
  } catch (error) {
    console.log("Connect failure!");
  }
}

export default connect;
