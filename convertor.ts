// add missing imports

import {
  allNotes,
  Chord,
  chordTypes,
  ChordWithScale,
  note,
  Scale,
  ScaleType,
  scaleTypes,
} from "./types";

const chords = ["C", "D", "E", "F", "G", "A", "B"];

const convert = (chords: String[]) => {};

const chordToNotes = (chord: Chord): note[] => {
  let notes = chord.type.intervals.map((interval) => {
    return allNotes[(allNotes.indexOf(chord.currentNote) + interval) % 12];
  });

  notes = notes.filter((note, index) => {
    return notes.indexOf(note) === index;
  });

  return notes;
};

const getChordsNotes = (chords: Chord[]) => {
  const notes = chords.reduce((acc, chord) => {
    return [...acc, ...chordToNotes(chord)];
  }, [] as note[]);

  const uniqueNotes = notes.filter((note, index) => {
    return notes.indexOf(note) === index;
  });

  return uniqueNotes;
};

const getScaleByDef = (baseNote: note, scaleType: ScaleType): note[] => {
  return scaleType.intervals.map(
    (interval) => allNotes[(allNotes.indexOf(baseNote) + interval) % 12]
  );
};

const chordsAndScaleParser = (chords: Chord[], scale: Scale) => {
  const chordsWithScale = chords.map((chord) => {
    return {
      chord,
      scale,
    };
  });

  return chordsWithScale;
};

const parseStringToChord = (chord: String): Chord => {
  let index = 0;
  let currentNote = chord[index] as note;

  index++;

  if (chord?.[index] === "#") {
    currentNote += "#";
    index++;
  }

  if (!(allNotes as String[]).includes(currentNote))
    throw new Error("Invalid note");

  const short = !chord?.[index] ? "M" : chord.slice(index);

  const type = chordTypes.find((type) => type.short === short);

  if (!type) throw new Error("Unknown chord type");

  return {
    currentNote,
    type,
  } as Chord;
};

const getChordsScales = (chords: Chord[]): ChordWithScale[] => {
  const chordsWithScales: ChordWithScale[] = [];

  let unrecognizedChords: Chord[] = [];
  let chordsToCheck = [...chords];

  while (chordsToCheck.length) {
    let chordsScale = null;

    while (!chordsScale) {
      try {
        chordsScale = getChordsScale(chordsToCheck);
        chordsWithScales.push(
          ...chordsAndScaleParser(chordsToCheck, chordsScale)
        );
      } catch {
        if (chordsToCheck.length === 1) throw new Error("Unknown scale");

        unrecognizedChords.unshift(chordsToCheck.pop()!);
      }
    }

    chordsToCheck = [...unrecognizedChords];
    unrecognizedChords = [];
  }

  return chordsWithScales;
};

const getChordsScale = (chords: Chord[]) => {
  const chordsNotes = getChordsNotes(chords);
  return getScaleByNotes(chordsNotes);
};

const getScaleByNotes = (notes: note[]) => {
  let scale: Scale | undefined = undefined;

  for (let scaleType of scaleTypes) {
    const scaleByDef = getScaleByDef(notes[0], scaleType);
    if (notes.every((note) => scaleByDef.includes(note))) {
      scale = {
        baseNote: notes[0],
        notes: scaleByDef,
        type: scaleType,
      };
      break;
    }
  }

  if (scale) return scale;

  throw new Error("No scale found");
};

export {
  chordToNotes,
  convert,
  getScaleByNotes,
  getChordsNotes,
  getChordsScales,
  parseStringToChord,
};
