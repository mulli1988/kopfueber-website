// Einmalig ausführen: node --env-file=.env.local scripts/seed-blog.mjs
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("MONGODB_URI fehlt!"); process.exit(1); }

await mongoose.connect(MONGODB_URI);

// Minimale Schemas
const User = mongoose.models.User || mongoose.model("User", new mongoose.Schema({
  name: String, email: String, role: String,
}));

const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", new mongoose.Schema({
  title: String, slug: String, content: String, excerpt: String,
  coverImage: String, authorId: mongoose.Schema.Types.ObjectId,
  tags: [String], published: Boolean, publishedAt: Date,
}, { timestamps: true }));

// Admin-User anlegen (falls noch nicht vorhanden)
let admin = await User.findOne({ email: "julia@kopfueber.de" });
if (!admin) {
  admin = await User.create({ name: "Julia Flagmeyer", email: "julia@kopfueber.de", role: "admin" });
  console.log("Admin-User angelegt");
}

// Blogbeitrag anlegen
const existing = await BlogPost.findOne({ slug: "geschwisterstreit-achterbahnfahrt" });
if (existing) { console.log("Beitrag existiert bereits."); process.exit(0); }

await BlogPost.create({
  title: "Geschwisterstreit – die turbulente Achterbahnfahrt des Elterndaseins",
  slug: "geschwisterstreit-achterbahnfahrt",
  excerpt: "Geschwisterstreit treibt Eltern manchmal an den Rand der Verzweiflung. Doch er hat auch eine charmante Seite – denn Kinder lernen dabei einige der wichtigsten Lektionen des Lebens.",
  coverImage: "/blog-geschwister.jpg",
  authorId: admin._id,
  tags: ["Erziehung", "Geschwister", "Tipps"],
  published: true,
  publishedAt: new Date(),
  content: `Hey, liebe Mamis, Papis und Leser,

Heute nehmen wir uns das Thema Geschwisterstreit vor, das Eltern manchmal an den Rand der Verzweiflung treibt. Doch ich verspreche euch, es gibt auch eine charmante Seite an diesem Chaos, die wir manchmal übersehen. Wenn unsere kleinen Wirbelwinde in Konflikte geraten, sind sie dabei, einige der wichtigsten Lektionen des Lebens zu erlernen. Es ist wie ein Training für ihre sozialen Fähigkeiten, auch wenn es für uns Erwachsene manchmal wie ein Sturm im Wasserglas wirkt.

Lasst uns eine Sache klarstellen – Kinder sind Meister der emotionalen Achterbahnfahrt. Ihre Gefühle ändern sich schneller als das Wetter in unseren Breiten. Was für uns wie ein gewaltiger Sturm aussieht, ist für sie manchmal nur ein kleiner Windhauch. Merkt euch das und atmet tief durch.

Kinder sind erstaunlich darin, ihre Konflikte selbst zu lösen, wenn wir ihnen die Chance dazu geben. Ja, Eltern haben oft den Drang, Schiedsrichter zu spielen, aber manchmal ist es besser, die Kids ihre eigenen Lösungen finden zu lassen. Natürlich, wenn echte Gefahr droht, sind wir zur Stelle, aber im Großen und Ganzen sollten wir ihnen vertrauen.

Die Geschwisterbeziehung ist ein kostbares Geschenk. Durch ihre Streitigkeiten lernen Kinder, Rücksicht zu nehmen, zu teilen und Kompromisse zu finden – wichtige soziale Fähigkeiten, die sie ein Leben lang begleiten werden.

## Praktische Tipps für den Umgang mit Geschwisterstreit

**1. Lass die Gefühle fließen**
Wenn dein Kind zu dir kommt und sich über sein Geschwisterchen beschwert, siehst du vielleicht Tränen in seinen Augen. In diesen Momenten ist es unglaublich wichtig, einfühlsam zuzuhören und Verständnis zu zeigen. Manchmal reicht das schon aus, um die Wogen zu glätten.

**2. Unterstützt die Lösungsfindung**
Wenn die Streitereien anhalten, nehmt euch Zeit für jedes Kind, um seine Sicht der Dinge zu hören. Versucht, nicht sofort Schuld zuzuweisen. Ermutigt sie, gemeinsam nach Lösungen zu suchen. Stellt Fragen wie "Was wäre fair?" oder "Wie können wir das Problem lösen?" Das stärkt ihre Bindung zueinander.

**3. Erfüllt individuelle Bedürfnisse**
Ihr könnt den Druck, jedem Kind das Gleiche zu geben, getrost loslassen. Jedes Kind hat einzigartige Bedürfnisse. Indem ihr auf diese eingeht, schafft ihr ein Umfeld, in dem jedes Kind glücklich sein kann.

## Wie könnt ihr Streit vorbeugen?

**1. Ermutigt Vielfalt, vermeidet Rollen** – Steckt eure Kinder nicht in Schubladen. Sie sind einzigartige Individuen.

**2. Vermeidet Vergleiche** – Lob und Anerkennung sind wichtig, aber vermeidet es, ein Kind auf Kosten eines anderen hervorzuheben.

## Wie stärkt ihr die Bindung zwischen euren Kindern?

1. Den Druck rausnehmen – keine Familie ist perfekt.
2. Vorbereitung auf das Geschwisterkind schon in der Schwangerschaft.
3. Willkommensgeschenke für beide Kinder.
4. Positive Eigenschaften teilen – lasst eure Kinder sich gegenseitig sagen, was sie aneinander schätzen.
5. Gemeinsame Zeit verbringen.
6. Eigene Familienregeln aufstellen.
7. Vorbild sein – zeigt, wie man Konflikte respektvoll löst.
8. Wiedergutmachung üben.
9. Lösungsvorschläge gemeinsam erarbeiten.

Und denkt immer daran: Geschwisterstreit ist Teil des Abenteuers namens Familie. Also atmet tief durch und genießt die verrückte Fahrt!

Eure July`,
});

console.log("Blogbeitrag erfolgreich angelegt!");
await mongoose.disconnect();
