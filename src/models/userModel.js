// Simula uma busca em um banco de dados ou API externa
export const fetchUserData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Weslley",
        role: "Desenvolvedor Mobile",
      });
    }, 1000); // Simula 1 segundo de carregamento
  });
};
