import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/youSpaceDB';

console.log(`🛢 Connecting to MongoDB at ${connectionString}...`);

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ MongoDB connection promise resolved.'))
    .catch((err) => console.error('❌ MongoDB connection error (promise):', err));

export default mongoose.connection;
