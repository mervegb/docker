const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  SESSION_SECRET,
} = require("./config/config");
const session = require("express-session");
const redis = require("redis");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: REDIS_URL,
});

const PostRouter = require("./routes/PostRouter");
const AuthRouter = require("./routes/AuthRouter");

const app = express();

app.enable("trust proxy");

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 60000,
    },
  })
);

app.use(express.json());

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to Database"))
  .catch((error) => console.log(error));

app.get("/api/v1", (req, res) => {
  res.send("<h2>hello mero!!!</h2>");
  console.log("yes it ran");
});

app.use("/api/v1/posts", PostRouter);
app.use("/api/v1/user", AuthRouter);

app.listen(process.env.PORT || 5000, () => console.log("Listening to port"));
