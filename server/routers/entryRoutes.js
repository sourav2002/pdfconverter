import express from "express";
import {
  getEntryByToken,
  createEntry,
  getAllEntries,
  getEntryByName,
  updateNumberByToken,
  searchByName,
} from "../controllers/entryController.js";

const router = express.Router();

router.post("/", createEntry);
router.get("/", getAllEntries);
router.get("/name/:name", getEntryByName);
router.get("/search/:name", searchByName);
router.get("/token/:token", getEntryByToken);
router.patch("/token/:token", updateNumberByToken);

export default router;
