import app from "./app";
import dotenv from "dotenv";
import connectToDatabase from "./databases/dbConnection";

dotenv.config();

const port = process.env.PORT;

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
