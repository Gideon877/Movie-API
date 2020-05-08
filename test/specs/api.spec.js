const { MongoClient } = require('mongodb');
const MONGO_URL = process.env.MONGO_DB_URL || 'mongodb://localhost/movies';
const proxyquire = require('proxyquire');
const { User } = require('../stubs/api.api.stub');
const api = proxyquire('../../src/api/api', {
    // '../models/user': User
})

console.log({ MONGO_URL })
describe('insert', () => {
    let connection;
    let db;

    it('testing', async(done)=> {
        try {
            const users = await api.findUsers();
            expect(0).toEqual(users.length);
            done()
        } catch (error) {
            expect(1).toBe(2)
            done(error)
        }
    })
    // beforeAll(async () => {
    //     connection = await MongoClient.connect(MONGO_URL, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true
    //     });
    //     db = await connection.db();

    // });

    // afterAll(async () => {
    //     await connection.close();
    // });

    // beforeEach(() => {
    //     db.collection('User').remove({
    //         _id: 'some-user-id'
    //     })
    // });


    // it('should insert a doc into collection', async () => {
    //     const user = db.collection('User');
    //     const mockUser = { _id: 'some-user-id', name: 'John' };
    //     await user.insertOne(mockUser);
    //     const insertedUser = await user.findOne({ _id: 'some-user-id' });
    //     console.log(insertedUser)
    //     expect(insertedUser).toEqual(mockUser);
    // });
});
