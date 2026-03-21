// node --env-file=.env.local scripts/seed-forum.mjs
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGODB_URI fehlt");

await mongoose.connect(MONGODB_URI);

const ForumCategorySchema = new mongoose.Schema({
  name: String, slug: String, description: String, section: String, order: Number,
});
const ForumCategory = mongoose.models.ForumCategory || mongoose.model("ForumCategory", ForumCategorySchema);

await ForumCategory.deleteMany({});

const categories = [
  // Kita & Erzieher
  { name: "Kita-Alltag & Organisation",      slug: "kita-alltag",        description: "Tagesabläufe, Dienstpläne, Raumgestaltung und alles rund um den Kita-Alltag.", section: "kita",   order: 1 },
  { name: "Pädagogische Ideen & Konzepte",   slug: "paedagogik",         description: "Methoden, Konzepte und Ideen für die pädagogische Arbeit.", section: "kita",   order: 2 },
  { name: "Basteln & Kreativität",           slug: "basteln-kita",       description: "Bastel-Ideen, Kunstprojekte und kreative Aktivitäten für die Gruppe.", section: "kita",   order: 3 },
  { name: "Elternkommunikation",             slug: "elternkommunikation",description: "Elterngespräche, Elternbriefe, Zusammenarbeit mit Familien.", section: "kita",   order: 4 },
  { name: "Materialien & Ressourcen",        slug: "materialien-kita",   description: "Empfehlungen, Vorlagen und Ressourcen für Erzieherinnen.", section: "kita",   order: 5 },
  // Eltern
  { name: "Familienalltag",                  slug: "familienalltag",     description: "Alltag mit Kindern, Routinen, Haushalt und Familie.", section: "eltern", order: 1 },
  { name: "Erziehungsfragen & Tipps",        slug: "erziehung",          description: "Fragen rund um Erziehung, Grenzen setzen und Kindentwicklung.", section: "eltern", order: 2 },
  { name: "Freizeitideen mit Kindern",       slug: "freizeit",           description: "Ausflüge, Spiele, Basteln und Aktivitäten für die Familie.", section: "eltern", order: 3 },
  { name: "Schulvorbereitung",               slug: "schulvorbereitung",  description: "Vorbereitung auf die Schule, Lernspiele und Tipps.", section: "eltern", order: 4 },
  { name: "Allgemeines & Plauderecke",       slug: "plauderecke",        description: "Für alles, was woanders nicht passt — einfach quatschen!", section: "eltern", order: 5 },
];

await ForumCategory.insertMany(categories);
console.log(`✓ ${categories.length} Forum-Kategorien angelegt.`);
await mongoose.disconnect();
