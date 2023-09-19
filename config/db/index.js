import { mongoose } from "mongoose";

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://trungdangdev06:DILtdQ7YGZZ6J2Po@gymblogs.zfohny8.mongodb.net/BlogData"
    );
    console.log("Connect successfully!!");
  } catch (error) {
    console.log("Connect failure!");
  }
}

export default connect;
