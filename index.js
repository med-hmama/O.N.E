const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();
const { DBconnection } = require("./config/db");
DBconnection();

const {
  authenticate,
  authorizedAdmin,
} = require("./middlewares/authMiddleware");

const app = express();
const PORT = process.env.port || 3000;

const userRoute = require("./routes/userRoute");
const paymentRoute = require("./routes/paymentRoute");
const postRoute = require("./routes/postRoute");
const entrepriseRoute = require("./routes/entrepriseRoute");
const deskRoute = require("./routes/deskRoute");
const eventRoute = require("./routes/eventRoute");
const messageRoute = require("./routes/messageRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.use("/api/users", userRoute);
app.use("/api/payments", authenticate, authorizedAdmin, paymentRoute);
app.use("/api/posts", authenticate, postRoute);
app.use("/api/entreprises", authenticate, entrepriseRoute);
app.use("/api/desks", authenticate, deskRoute);
app.use("/api/events", authenticate, eventRoute);
app.use("/api/messages", messageRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
