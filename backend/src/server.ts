import 'dotenv/config';
import app from "./app.js"
import  sequelize  from "./database/connection.js";

const PORT = process.env.PORT || 5000;

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error('❌ JWT_SECRET is not set in environment variables');
    process.exit(1);
}

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}/api/v1/health`);
        });
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        process.exit(1);
    }
}

startServer();
