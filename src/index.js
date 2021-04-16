const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

const validateRequest = require("./utils/validateRequest");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use(
  "/user_service/auth",
  createProxyMiddleware({
    target: `http://${process.env.USER_HOST}:${process.env.USER_PORT}`,
    changeOrigin: true,
    pathRewrite: {
      "^/user_service": "",
    },
  })
);

// Routes that need authentication should be after this middleware
app.use(validateRequest);

app.use(
  "/user_service/users",
  createProxyMiddleware({
    target: `http://${process.env.USER_HOST}:${process.env.USER_PORT}`,
    changeOrigin: true,
    pathRewrite: {
      "^/user_service": "",
    },
  })
);

app.use(
  "/generator",
  createProxyMiddleware({
    target: `http://${process.env.DATA_STORAGE_HOST}:${process.env.DATA_STORAGE_PORT}`,
    changeOrigin: true,
  })
);

app.use(
  "/update",
  createProxyMiddleware({
    target: `http://${process.env.UPDATE_HOST}:${process.env.UPDATE_PORT}`,
    changeOrigin: true,
    pathRewrite: {
      "^/update": "",
    }
  })
)

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log("Server running on port ", process.env.PORT);
  return null;
});
