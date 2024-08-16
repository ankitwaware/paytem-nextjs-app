import express from "express";

import cors from "cors";
import bankPOSTHandler from "./bank";

const PORT = 3001;
const app = express();

app.use(cors());
// middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ msg: "Healthy Server" });
});

// #10 added dummy bank_webhook_backend
app.post("/hdfcwebhook", bankPOSTHandler);
app.post("/axiswebhook", bankPOSTHandler);
app.post("/kotakwebhook", bankPOSTHandler);

app.listen(PORT, () => {
  console.log(`bank webhook running on port:${PORT}...`);
});
