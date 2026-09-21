import { User, AuthResponse } from '../models/userModel';

// Lista inicial de utilizadores pré-cadastrados para testes
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin Teste',
    email: 'admin@fogo.com',
    password: '123',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Cliente Exemplo',
    email: 'cliente@fogo.com',
    password: '123',
    role: 'cliente',
    createdAt: new Date().toISOString(),
  },
];

// Utilitário para simular a latência da rede
const delay = (ms: number = 800) => new Promise((resolve) => setTimeout(resolve, ms));

export const MockDatabase = {
  // --- LOGIN ---
  async login(email: string, password: string): Promise<AuthResponse> {
    await delay();

    const user = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim()
    );

    if (!user) {
      return {
        success: false,
        message: 'Utilizador não encontrado com este e-mail.',
      };
    }

    if (user.password !== password) {
      return {
        success: false,
        message: 'Palavra-passe incorreta.',
      };
    }

    // Omitir a palavra-passe do retorno por segurança
    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      message: 'Login efetuado com sucesso!',
      user: userWithoutPassword,
      token: `mock-jwt-token-${user.id}-${Date.now()}`,
    };
  },

  // --- REGISTRO ---
  async register(
    name: string,
    email: string,
    password: string,
    role: 'admin' | 'cliente' | 'cozinha' = 'cliente'
  ): Promise<AuthResponse> {
    await delay();

    const emailFormatted = email.toLowerCase().trim();

    // Validação de e-mail duplicado
    const userExists = mockUsers.some((u) => u.email === emailFormatted);
    if (userExists) {
      return {
        success: false,
        message: 'Este e-mail já está cadastrado.',
      };
    }

    // Criar novo utilizador
    const newUser: User = {
      id: String(mockUsers.length + 1),
      name: name.trim(),
      email: emailFormatted,
      password: password,
      role: role,
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;

    return {
      success: true,
      message: 'Registo efetuado com sucesso!',
      user: userWithoutPassword,
      token: `mock-jwt-token-${newUser.id}-${Date.now()}`,
    };
  },

  // --- BUSCAR TODOS (Para Debug/Testes) ---
  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    await delay(300);
    return mockUsers.map(({ password, ...user }) => user);
  },
};