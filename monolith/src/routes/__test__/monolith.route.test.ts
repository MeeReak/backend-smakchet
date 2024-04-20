import request from 'supertest';
import app from '../../app'

describe('GET /', () => {
  it('should respond with status 200 and expected response', async () => {
    // Make a GET request to the '/' endpoint
    const response = await request(app).get('/monolith-health');

    // Assert that the response status is 200
    expect(response.status).toBe(200);

    // Assert that the response body matches the expected result
    expect(response.body).toEqual({ message: 'ok' });
  });
});
