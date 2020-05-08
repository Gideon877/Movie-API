exports.User = async () => {
    const connection = await MongoClient.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = await connection.db();
    return db.collection('User');
}