import mongoose from "mongoose";

const connectToDataBase = async () => {
  try {
    console.log(process.env.MONGO_URI);

    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Data base has been connected succesfully ${connection.connection.host}`
    );
  } catch (error) {
    console.log(
      `Somthing went wrong while connecting to database ${error.message}`
    );
  }
};

export default connectToDataBase;
