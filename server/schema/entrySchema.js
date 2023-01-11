import mongoose from "mongoose";

const entrySchema = mongoose.Schema({
  name: String,
  phoneNumbers: [{number: String, token: {
    type : Number,
  }}],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

entrySchema.pre('save', async function(next) {
  let entry = this;
  let lastTokenNumber;
  try {
    let lastEntry = await FormData.findOne().sort({'phoneNumbers.token': -1}).select({'phoneNumbers': {$slice: -1}});
    if(!lastEntry) {
      lastTokenNumber = 10000;
    } else {
      lastTokenNumber = lastEntry.phoneNumbers[0].token;
    }
    entry.phoneNumbers.forEach((number) => {
      if(!number.token) {
        lastTokenNumber += 1;
        number.token = lastTokenNumber;
      }
    });
    next();
  } catch (err) {
    next(err);
  }
});

const FormData = mongoose.model("FormData", entrySchema);
export default FormData;
