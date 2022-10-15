type note =
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "A"
  | "B"
  | "C#"
  | "D#"
  | "F#"
  | "G#"
  | "A#";

interface Chord {
  currentNote: note;
  type: ChordType;
}

interface ChordWithScale {
  chord: Chord;
  scale: Scale;
}

interface ChordType {
  name: string;
  short: string;
  intervals: number[];
}

interface ScaleType {
  name: string;
  intervals: number[];
}

interface Scale {
  baseNote: note;
  notes: note[];
  type: ScaleType;
}

const allNotes: note[] = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const chordTypes: ChordType[] = [
  {
    name: "Major",
    short: "M",
    intervals: [0, 4, 7],
  },
  {
    name: "Minor",
    short: "m",
    intervals: [0, 3, 7],
  },
  {
    name: "Diminished",
    short: "dim",
    intervals: [0, 3, 6],
  },
  {
    name: "Augmented",
    short: "aug",
    intervals: [0, 4, 8],
  },
  {
    name: "Major 7th",
    short: "M7",
    intervals: [0, 4, 7, 11],
  },
  {
    name: "Minor 7th",
    short: "m7",
    intervals: [0, 3, 7, 10],
  },
];

const scaleTypes: ScaleType[] = [
  {
    name: "Major",
    intervals: [0, 2, 4, 5, 7, 9, 11],
  },
  {
    name: "Minor",
    intervals: [0, 2, 3, 5, 7, 8, 10],
  },
  {
    name: "Dorian",
    intervals: [0, 2, 3, 5, 7, 9, 10],
  },
  {
    name: "Phrygian",
    intervals: [0, 1, 3, 5, 7, 8, 10],
  },
  {
    name: "Lydian",
    intervals: [0, 2, 4, 6, 7, 9, 11],
  },
  {
    name: "Mixolydian",
    intervals: [0, 2, 4, 5, 7, 9, 10],
  },
  {
    name: "Locrian",
    intervals: [0, 1, 3, 5, 6, 8, 10],
  },
  {
    name: "Harmonic Minor",
    intervals: [0, 2, 3, 5, 7, 8, 11],
  },
  {
    name: "Melodic Minor",
    intervals: [0, 2, 3, 5, 7, 9, 11],
  },
  {
    name: "Whole Tone",
    intervals: [0, 2, 4, 6, 8, 10],
  },
  {
    name: "Diminished",
    intervals: [0, 2, 3, 5, 6, 8, 9, 11],
  },
  {
    name: "Whole Half Diminished",
    intervals: [0, 2, 3, 5, 6, 8, 9, 11],
  },
  {
    name: "Half Whole Diminished",
    intervals: [0, 1, 3, 4, 6, 7, 9, 10],
  },
  {
    name: "Blues",
    intervals: [0, 3, 5, 6, 7, 10],
  },
  {
    name: "Pentatonic Major",
    intervals: [0, 2, 4, 7, 9],
  },
];

interface resValue {
  scales: Scale[];
  chordsWithScales: ChordWithScale[];
}

export {
  note,
  Chord,
  ChordType,
  chordTypes,
  allNotes,
  Scale,
  scaleTypes,
  ScaleType,
  ChordWithScale,
};
