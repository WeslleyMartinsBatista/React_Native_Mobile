export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Opcional para omitir a senha ao retornar dados
  role: 'admin' | 'cliente' | 'cozinha';
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: Omit<User, 'password'>;
  token?: string;
}