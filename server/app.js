const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/user/user.routes");
const categoryRoutes = require("./modules/category/category.routes");
const productRoutes = require("./modules/product/product.routes");
const cartRoutes = require("./modules/cart/cart.routes");
const orderRoutes = require("./modules/order/order.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");
const paymentRoutes = require("./modules/payment/payment.routes");
const bannerRoutes = require("./modules/banner/banner.routes");

const app = express();

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
    cors({
        origin: [
            process.env.CLIENT_URL,
            process.env.ADMIN_URL,
        ],
        credentials: true,
    })
);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests",
});

app.use(limiter);


//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/banners", bannerRoutes);



// error middleware
const errorMiddleware = require(
    "./middleware/errorMiddleware"
);

app.use(errorMiddleware);




app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API running successfully",
    });
});

module.exports = app;