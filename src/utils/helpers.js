import rateLimit from "express-rate-limit";
import session from "express-session";

const allowedOrigins = [
  //allow origins
  "http://localhost:4000",
  "https://localhost:4000",
  "http://localhost:3001",
  "https://localhost:3001",
  "*",
];

const corsConfig = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credential: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

const rateConfig = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60 * 60 * 1000 },
});

export { corsConfig, rateConfig, sessionConfig };
