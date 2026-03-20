// Skript: Erstellt einen Admin-Account oder setzt einen bestehenden Account auf Admin
// Aufruf: node --env-file=.env.local scripts/make-admin.mjs

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGODB_URI fehlt in .env.local");

await mongoose.connect(MONGODB_URI);

const UserSchema = new mongoose.Schema({
  name:         String,
  email:        { type: String, unique: true, lowercase: true },
  passwordHash: String,
  role:         { type: String, default: "user" },
  purchases:    [],
  subscriptionStatus: { type: String, default: "none" },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

const EMAIL    = "Julyfleur@outlook.com";
const NAME     = "Julia";
const PASSWORD = "Kopfueber2024!"; // <-- Passwort, bitte nach dem ersten Login ändern

const existing = await User.findOne({ email: EMAIL.toLowerCase() });

if (existing) {
  await User.updateOne({ email: EMAIL.toLowerCase() }, { role: "admin" });
  console.log(`✓ Benutzer "${EMAIL}" wurde auf Admin gesetzt.`);
} else {
  const passwordHash = await bcrypt.hash(PASSWORD, 12);
  await User.create({ name: NAME, email: EMAIL.toLowerCase(), passwordHash, role: "admin" });
  console.log(`✓ Admin-Account erstellt: ${EMAIL} / Passwort: ${PASSWORD}`);
  console.log(`  → Bitte nach dem ersten Login das Passwort ändern!`);
}

await mongoose.disconnect();
