import express from "express";
import FormData from "../schema/entrySchema.js";
import mongoose from "mongoose";

const router = express.Router();

// --------------------------CREATE ENTRY----------------------------------
export const createEntry = async (req, res) => {
  const { name, ...numbers } = req.body;
  const entry = new FormData({ name, ...numbers });
  try {
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// --------------------------GET ALL ENTRIES ----------------------------------

export const getAllEntries = async (req, res) => {
  try {
    const entries = await FormData.find();
    res.status(200).json(entries);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// -------------------------- GET ENTRY BY NAME ----------------------------------

export const getEntryByName = async (req, res) => {
  try {
      const count = await FormData.countDocuments({ name: {$regex: new RegExp(`^${req.params.name}$`, 'i')}});
      if (count === 0) {
          res.status(404).json({ message: "Name not found." });
      } else {
          const entries = await FormData.find({ name: {$regex: new RegExp(`^${req.params.name}$`, 'i')}});
          res.status(200).json(entries);
      }
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
};
// -------------------------- GET ENTRY BY TOKEN ----------------------------------

export const getEntryByToken = async (req, res) => {
  // token comming through params was in string format
  const token = Number(req.params.token);
  const entry = await FormData.findOne({
    phoneNumbers: { $elemMatch: { token: token } },
  });
  if (!entry) {
    res.status(404).json({ message: "Token not found." });
  } else {
    const filteredPhoneNumber = entry.phoneNumbers.filter((x) => x.token === token);
    const response = {
        name: entry.name,
        number: filteredPhoneNumber[0].number,
        token: filteredPhoneNumber[0].token
    };
    res.status(200).json(response);
  }
};

export const searchByName = async (req, res) => {
  try {
      const entries = await FormData.find({ name: { $regex: new RegExp(req.params.name, "i") }});
      if(entries.length == 0) res.status(404).json({ message: "Name not found." });
      else res.status(200).json(entries);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
};

// --------------------------UPDATE ENTRY BY TOKEN ----------------------------------

export const updateNumberByToken = async (req, res) => {
  try {
    const token = Number(req.params.token);
    const entry = await FormData.findOne({
      phoneNumbers: { $elemMatch: { token: token } },
    });
    if (!entry) {
      res.status(404).json({ message: "Token not found." });
    } else {
      const updatedEntry = await FormData.findOneAndUpdate(
        {
            phoneNumbers: { $elemMatch: { token: token } },
        },
        {
            $set: {
                'phoneNumbers.$.number': req.body.number, 
            }
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedEntry);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export default router;
