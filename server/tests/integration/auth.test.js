const request = require('supertest');
const { User } = require('../../Models/user');
const { Genre } = require('../../Models/genre');


describe('auth middleware', () => {

    beforeEach(() => { server = require('../../index') })
    afterEach(async () => {
        server.close()
        await Genre.deleteMany({})
    })

    let token;

    const sendAuthenticatedRequest = async () => {
        return request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: 'genre1' });
    }

    beforeEach(async () => {
        let user = new User()
        token = await user.generateAuthToken()
    })

    it('should return 401 if no token is provided', async () => {
        token = ''
        const res = await sendAuthenticatedRequest();
        expect(res.status).toBe(401)
    })

    it('should return 400 if token is invalid', async () => {
        token = 'a'
        const res = await sendAuthenticatedRequest();
        expect(res.status).toBe(400);
    })


    it('should return 200 if the token is valid', async () => {
        const res = await sendAuthenticatedRequest();
        expect(res.status).toBe(200);
    })
})