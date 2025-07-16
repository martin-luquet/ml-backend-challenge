import request from 'supertest';
import app from '../../src/app';

describe('GET /api/fusionados - Integration', () => {
  let token: string;

  beforeAll(async () => {
    const username = `testuser_${Date.now()}`;
    const password = '123456';

    // Crear usuario
    await request(app)
      .post('/api/almacenar')
      .send({ username, password });

    // Obtener token
    const res = await request(app)
      .post('/api/login')
      .send({ username, password });

    token = res.body.token;
  });

  it('debería rechazar sin token', async () => {
    const res = await request(app).get('/api/fusionados/1');
    expect(res.statusCode).toBe(401);
  });

  it('debería devolver datos fusionados con token válido', async () => {
    const res = await request(app)
      .get('/api/fusionados/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('character');
    expect(res.body).toHaveProperty('weather');
  });
});
