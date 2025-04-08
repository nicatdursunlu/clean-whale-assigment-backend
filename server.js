"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
// import authRoutes from './routes/authRoutes';
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
mongoose_1.default
    .connect(process.env.DB_URI)
    .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => console.log('Error connecting to MongoDB Atlas:', err));
// Routes
// app.use('/api/auth', authRoutes)
// Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })
