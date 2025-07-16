import { generarToken, verificarToken } from '../../../src/utils/jwtUtils';

describe('JWT Utils', () => {
  it('debe generar y verificar un token válido', () => {
    const payload = { id: 1, username: 'martin.luque' };
    const token = generarToken(payload);
    const decoded = verificarToken(token);

    expect(decoded).toMatchObject(payload);
  });
});