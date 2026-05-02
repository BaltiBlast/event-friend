import express from "express";
import dotenv from "dotenv";
import expressLayouts from "express-ejs-layouts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "layout/main");

app.use(expressLayouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { title: "Gay'vent", hideChrome: true, mainClass: "login-page" });
});

app.get("/event", (req, res) => {
  const participants = [
    { name: "Alex", status: "confirmed" },
    { name: "Camille", status: "pending" },
    { name: "Jordan", status: "declined" },
    { name: "Sam", status: "confirmed" },
  ];

  const statusOrder = {
    confirmed: 1,
    pending: 2,
    declined: 3,
  };

  res.render("event", {
    title: "Soiree Gay'vent",
    event: {
      title: "Soiree Gay'vent",
      description: "Une soiree conviviale pour se rencontrer, discuter et partager un bon moment autour d'un verre.",
      imageUrl:
        "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/YBgLV1KNJPi8RDRB/photo-de-fond-mv0LyEz0y0coVvNK.jpeg",
      participants: participants.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]),
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
