import mongoose from 'mongoose';

mongoose.connect( 'mongodb://localhost:27017/YouSpace');
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/YouSpace');

export default mongoose.connection;
