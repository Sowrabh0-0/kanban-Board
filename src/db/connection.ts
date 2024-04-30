import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface CustomNodeJSGlobal extends NodeJS.Global {
  mongoose: {
    conn: typeof mongoose | null,
    promise: Promise<typeof mongoose> | null
  }
}

declare const global: CustomNodeJSGlobal;

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false  
    };


    global.mongoose.promise = mongoose.connect(MONGODB_URI!, opts).then(mongoose => {
      return mongoose;
    });
  }
  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}

export default dbConnect;
