import { Request, Response } from "express";
import { getChordsScales, parseStringToChord } from "./convertor";
import { Chord, ChordType, chordTypes, ChordWithScale, note } from "./types";

const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  // get chords
  const chords: string[] = req.query?.chords
    ? JSON.parse(req.query.chords as string)
    : [];

  const parsedChords: Chord[] = chords.map((chord: String) =>
    parseStringToChord(chord)
  );

  res.send(getChordsScales(parsedChords));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
