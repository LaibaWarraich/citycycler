import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/route", (req, res) => {
    res.json({ message: "Backend funktioniert!" });
});

app.listen(3000, () => {
    console.log("Backend läuft auf Port 3000");
});
