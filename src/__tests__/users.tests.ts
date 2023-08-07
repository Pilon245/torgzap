import request from 'supertest'
import {app} from "../index";

describe('API Tests', () => {
    it('All Users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
    });

    let user: any

    it('Create User', async () => {
        const newUser = { name: 'John', email: 'john@example.com', age: 10, password: "124567890" };
        const response = await request(app).post('/api/users').send(newUser);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', 'John');
        expect(response.body).not.toHaveProperty('password');
        user = response.body
    });

    it('Get Users by Id', async () => {
        const response = await request(app).get(`/api/users/${user.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'John');
        expect(response.body).toHaveProperty('email');
        expect(response.body).not.toHaveProperty('password');
    });

    it('Update Users by Id', async () => {
        const updateUser = { name: 'Ivan', email: 'johna@pl.com', age: 10 };
        const response = await request(app).put(`/api/users/${user.id}`).send(updateUser);
        expect(response.status).toBe(204);
    });

    it('Check Name Updated User', async () => {
        const response = await request(app).get(`/api/users/${user.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Ivan');
    });

    it('Delete Users', async () => {
        const response = await request(app).delete(`/api/users/${user.id}`)
        expect(response.status).toBe(204);
    });

    it('Not Deleted Users', async () => {
        const response = await request(app).delete(`/api/users/${user.id}`)
        expect(response.status).toBe(404);
    });

    it('Check Name Deleted User', async () => {
        const response = await request(app).get(`/api/users/${user.id}`);
        expect(response.status).toBe(404);
    });


    it('Create User Bad Request #1', async () => {
        const newUser = { name: 'John', email: 'johnaS1', age: 10, password: "124567890" };
        const response = await request(app).post('/api/users').send(newUser);
        expect(response.status).toBe(400);
    });

    it('Create User Bad Request #2', async () => {
        const newUser = { name: 'John', email: 'johnaS1', age: 10 };
        const response = await request(app).post('/api/users').send(newUser);
        expect(response.status).toBe(400);
    });

    it('Create User for Login', async () => {
        const newUser = { name: 'Kim', email: 'john@example.com', age: 110, password: "123456789" };
        const response = await request(app).post('/api/users').send(newUser);
        expect(response.status).toBe(201);
    });

    let authToken = ""

    it('Login', async () => {
        const auth = { login: 'Kim', password: '123456789' };
        const response = await request(app).post('/api/login').send(auth);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('accessToken');
        authToken = response.body.accessToken
    });

    it('Not Login', async () => {
        const authBody = { login: 'Kim', password: '12Z3456789' };
        const response = await request(app).post('/api/login').send(authBody);
        expect(response.status).toBe(401);
    });

    it('My account', async () => {
        const response = await request(app).get('/api/my-account').set('Authorization', `Bearer ${authToken}`)
        expect(response.status).toBe(200);
    });

});
