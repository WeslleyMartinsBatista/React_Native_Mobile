📱 Cardápio Nativo - Mobile (React Native + Expo)

    O Cardápio Nativo é um aplicativo mobile desenvolvido em React Native* com Expo, focado em oferecer uma experiência simples e intuitiva para visualização de cardápios, navegação de produtos e realização de pedidos.

🛠️ Tecnologias e Bibliotecas

    [React Native](https://reactnative.dev/):** Framework para desenvolvimento mobile multiplataforma.
    [Expo CLI](https://docs.expo.dev/): Ferramenta de desenvolvimento e execução do ecossistema React Native.
    [Lucide React Native](https://lucide.dev/): Conjunto de ícones vetoriais leves e modernos.
    [React Native SVG](https://github.com/software-mansion/react-native-svg): Suporte à renderização de ícones e ilustrações vetoriais em formato SVG.

⚙️ Guia de Instalação e Configuração

    Siga as instruções abaixo para clonar o repositório, instalar todas as dependências e executar a aplicação no seu ambiente de desenvolvimento.

📋 Pré-requisitos

    Antes de iniciar, certifique-se de possuir em sua máquina:
        [Node.js](https://nodejs.org/) (Versão LTS recomendada).
        [Git](https://git-scm.com/) instalado.
        Aplicativo **Expo Go** no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779)) ou um Emulador Android / Simulador iOS configurado.

1️⃣ Clonar o Repositório

    git clone <URL_DO_SEU_REPOSITORIO>
    cd React_Native_Mobile

2️⃣ Instalar Dependências

    Para baixar os pacotes do projeto (incluindo o lucide-react-native e o react-native-svg), execute no terminal da raiz do projeto:

        npm install

    Caso o terminal exiba avisos de conflito de versões legadas (ERESOLVE), utilize a flag --legacy-peer-deps:

        npm install --legacy-peer-deps

3️⃣ Iniciar o Projeto

    Após a instalação das dependências, rode o comando do Expo limpando o cache do Metro Bundler:

        npx expo start -c

📲 Como visualizar o App:
No celular físico: Abra o app Expo Go, escaneie o QR Code exibido no terminal (no Android) ou pela Câmera (no iOS). Nota: O celular e o computador devem estar na mesma rede Wi-Fi.

    Na Web: Pressione w no terminal para abrir no navegador.

    No Emulador Android: Pressione a no terminal (requer Android Studio).

    No Simulador iOS: Pressione i no terminal (requer Xcode no macOS).

🔄 Fluxo de Trabalho para Colaboradores
Sempre que puxar novas atualizações do repositório remoto, siga esta rotina para manter o ambiente sincronizado e sem erros de dependências:

    # 1. Puxar alterações da branch principal
    git pull origin main

    # 2. Instalar novas bibliotecas adicionadas pela equipe
    npm install --legacy-peer-deps

    # 3. Rodar o servidor limpando o cache
    npx expo start -c

Estrutura de Pastas

    mobile_ReactNative/
    ├── assets/          # Imagens, fontes e recursos estáticos
    ├── src/
    │   ├── models/      # Regras de negócio e estruturas de dados (Ex: userModel.js)
    │   └── screens/     # Telas do aplicativo (Ex: LoginScreen.js)
    ├── App.js           # Ponto de entrada da aplicação
    ├── app.json         # Configurações do Expo
    ├── babel.config.js  # Configuração de presets do Babel
    └── package.json     # Scripts e dependências do projeto
