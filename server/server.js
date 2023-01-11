import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import env from "dotenv";
import bodyParser from "body-parser";
import entryRoute from './routers/entryRoutes.js'
import FormData from "./schema/entrySchema.js";
env.config();

const app = express();
app.use(express.json());
// Set up body parser to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/entry", entryRoute);

app.use("/", (req, res) => {
  res.status(200).send(`<h1>welcome to pdfconverter api</h1>`);
});

const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
  {
    // const data = {
    //     name: 'Ankit',
    //     phoneNumbers: ['8989898989', '78767676882', '981927192792']
    //   };
      
    //   FormData.insertMany(data)
      app.listen(PORT, () =>
        console.log(`server running on http://localhost:${PORT}`)
      )
  }
  )
  .catch((err) => console.log(err + " can't connect to db"));
