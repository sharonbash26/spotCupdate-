// Generates short synthetic WAV tone files for the demo song catalog.
// No external dependencies — writes raw PCM16 WAV manually.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { songs } from "./songs.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const audioDir = path.join(__dirname, "..", "audio");
fs.mkdirSync(audioDir, { recursive: true });

const SAMPLE_RATE = 44100;
const DURATION_SEC = 8;
const NOTE_FREQS = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0]; // C4..A4, one per song

function writeWavTone(filePath, freq) {
  const numSamples = SAMPLE_RATE * DURATION_SEC;
  const dataSize = numSamples * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // mono
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const envelope = Math.min(1, t * 8) * Math.min(1, (DURATION_SEC - t) * 8);
    const sample = Math.sin(2 * Math.PI * freq * t) * 0.3 * envelope;
    buffer.writeInt16LE(Math.round(sample * 32767), 44 + i * 2);
  }

  fs.writeFileSync(filePath, buffer);
}

songs.forEach((song, i) => {
  const freq = NOTE_FREQS[i % NOTE_FREQS.length];
  writeWavTone(path.join(audioDir, song.file), freq);
  console.log(`Generated ${song.file} (${freq}Hz)`);
});
