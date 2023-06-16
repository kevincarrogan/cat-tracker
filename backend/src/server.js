import express from "express";
import cors from "cors";

import { connectToTracker, getCats, getLocations } from "./cats.js";

const app = express();

app.use(cors());

app.get("/cats/", async (req, res) => {
  const cats = await getCats();
  res.json(cats);
});

app.get("/cats/locations/stream/", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Transfer-Encoding", "chunked");

  setInterval(async () => {
    const locations = await getLocations();
    res.write(`data: ${JSON.stringify(locations)}\n\n`);
  }, 5000);
});

await connectToTracker();

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
