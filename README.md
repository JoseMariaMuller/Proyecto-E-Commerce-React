## 🔐 Configuración de Firebase

Por seguridad, el archivo `firebase.js` con las credenciales reales no está incluido en este repositorio.

### 📋 Pasos para configurar:
1. Ir a `src/auth/`
2. Copiar el archivo `firebase.example.js` y renombrarlo como `firebase.js`
3. Pegar tus propias credenciales de Firebase dentro del objeto `firebaseConfig`

```js
// src/auth/firebase.js
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_BUCKET",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

export default firebaseConfig;
