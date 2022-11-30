const dbName = 'clean-node-api'
export default {
  dbName: process.env.DB_NAME || dbName,
  mongoUrl: process.env.MONGO_URL || `mongodb://localhost:27017/${dbName}`,
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'jwtSecret'
}
