import { AxiosResponse } from 'axios';
import api from '~/services/api';
import { AuthResponse } from '~/models/auth.model';

interface AuthService {
  (user: string, password: string): Promise<AxiosResponse<AuthResponse>>;
}

export const authenticate: AuthService = (user: string, password: string) => {
  return api.post('/v1/auth', { email: user, password });
};
