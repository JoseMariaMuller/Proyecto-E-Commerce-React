import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: "prueba-auth-c66e8",
    storageBucket: "prueba-auth-c66e8.firebasestorage.app",
    messagingSenderId: "481887390818",
    appId: "1:481887390818:web:2f57b0d283c13cf30e953b"
};

const app = initializeApp(firebaseConfig);

//////////////////////////////////////////////////////////////////////
///////////////// AUTENTICACIÓN DE USUARIOS FIREBASE//////////////////////////
//////////////////////////////////////////////////////////////////////

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export async function crearUsuario(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Credenciales", userCredential);
        const user = userCredential.user;
        console.log(user);
        return user;
    } catch (error) {
        console.error("Error al crear usuario:", error.code, error.message); // Usar console.error
        throw error;
    }
}

auth.useDeviceLanguage();

export async function logearG() {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("Resultado de login con Google:", result); // Más descriptivo
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log("Credenciales de Google:", credential);
        const token = credential.accessToken; // Si necesitas el token
        const user = result.user;
        console.log("Usuario de Google:", user);
        return user;
    } catch (error) {
        console.error("Error al logear con Google:", error); // Usar console.error
        throw error;
    }
}

export async function loginEmailPass(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Credenciales de email/pass:", userCredential);
        const user = userCredential.user;
        console.log("Usuario de email/pass:", user);
        return user;
    } catch (error) {
        console.error("Error al logear con email/pass:", error.code, error.message); // Usar console.error
        throw error;
    }
}

/////////////////////////////////////////////////////////////////
///////////////////// BASE DE DATOS FIRESTORE ////////////////////////
////////////////////////////////////////////////////////////////

export const db = getFirestore(app); // Exporta db también, si es necesario en otros lugares

export async function crearProducto(producto) {
    try {
        const docRef = await addDoc(collection(db, "productos"), {
            name: producto.name,
            imagen: producto.imagen,
            price: producto.price,
            description: producto.description,
            createdAt: new Date() // Buena práctica añadir una marca de tiempo
        });
        console.log("Document written with ID from Firebase utility: ", docRef.id);
        return docRef.id; // Retorna el ID para que el contexto sepa que ha terminado
    } catch (e) {
        console.error("Error adding document in crearProducto (Firebase utility): ", e);
        throw e; // Relanza el error para un manejo de errores adecuado en la cadena
    }
}

export async function editarProductoFirebase(producto) {
    try {
        const docRef = doc(db, "productos", producto.id);
        await setDoc(docRef, {
            name: producto.name,
            imagen: producto.imagen,
            price: producto.price,
            description: producto.description
        });
        console.log("Document updated with ID in Firebase utility:", producto.id);
        return producto; // Retorna el producto actualizado o su ID
    } catch (e) {
        console.error("Error updating document in editarProductoFirebase (Firebase utility): ", e);
        throw e;
    }
}

export async function eliminarProductoF(id) {
    try {
        await deleteDoc(doc(db, "productos", id));
        console.log("Document deleted with ID in Firebase utility:", id);
        return true;
    } catch (e) {
        console.error("Error deleting document in eliminarProductoF (Firebase utility): ", e);
        throw e;
    }
}

export async function obtenerProductosF() {
    try {
        const productos = [];
        const querySnapshot = await getDocs(collection(db, "productos"));
        console.log("Query Snapshot de Firebase:", querySnapshot);

        querySnapshot.docs.forEach(doc => {
            const data = doc.data();
            productos.push({
                id: doc.id,
                name: data.name,
                imagen: data.imagen,
                price: data.price,
                description: data.description
            });
        });
        return productos;
    } catch (error) {
        console.error("Error al obtener los productos de Firebase:", error);
        throw error;
    }
}

export async function obtenerProductoEnFirebase(id) {
    try {
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Datos del documento desde la utilidad de Firebase:", docSnap.data());
            const data = docSnap.data();
            const producto = {
                id: docSnap.id,
                name: data.name,
                imagen: data.imagen,
                price: data.price,
                description: data.description
            };
            console.log("Producto obtenido de la utilidad de Firebase:", producto);
            return producto;
        } else {
            console.log("¡No existe tal documento en Firebase!");
            throw new Error("Producto no encontrado.");
        }
    } catch (error) {
        console.error("Error al obtener el producto de la utilidad de Firebase:", error);
        throw error;
    }
}