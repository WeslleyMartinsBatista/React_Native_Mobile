import { MockDatabase } from '../models/mockDatabase';

// Exemplo em um handler de Login
const handleLogin = async () => {
  const response = await MockDatabase.login(emailInput, passwordInput);

  if (response.success) {
    console.log('Utilizador logado:', response.user);
    console.log('Token:', response.token);
    // Redirecionar para a Home ou Salvar na Session/Store
  } else {
    alert(response.message);
  }
};

// Exemplo em um handler de Registro
const handleRegister = async () => {
  const response = await MockDatabase.register(nameInput, emailInput, passwordInput);

  if (response.success) {
    console.log('Novo registo:', response.user);
    // Redirecionar para a Home/Login
  } else {
    alert(response.message);
  }
};