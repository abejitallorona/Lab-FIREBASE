let db: any;

const getFirestoreInstance = async () => {
	if (!db) {

    // Import the functions you need from the SDKs you need
    const { initializeApp } = await import ('firebase/app');
    const { getFirestore } = await import ('firebase/firestore'); //Importar los modulos
  

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyCjLBVp83qHWb3PHpO-a2o7c0q1FEQkCqU",
      authDomain: "spotify-6e52e.firebaseapp.com",
      projectId: "spotify-6e52e",
      storageBucket: "spotify-6e52e.appspot.com",
      messagingSenderId: "337385433038",
      appId: "1:337385433038:web:07025dcec703702b15ed9f"
    };
    // Initialize Firebase

      const app = initializeApp(firebaseConfig);
      db = getFirestore(app);
  }

	return db;

};

export const addSongs = async (product: any) => {
	try {
		const db = await getFirestoreInstance();
		const { collection, addDoc } = await import('firebase/firestore');

		const where = collection(db, 'songs');
		await addDoc(where, product);
		console.log('Se añadió con exito');
	} catch (error) {
		console.error('Error adding document', error);
	}
};

export const getSongs = async () => {
	try {
		const db = await getFirestoreInstance();
		const { collection, getDocs } = await import('firebase/firestore');

		const where = collection(db, 'songs');
		const querySnapshot = await getDocs(where);
		const data: any[] = [];

		querySnapshot.forEach((doc) => {
			data.push(doc.data());
		});

		return data;
	} catch (error) {
		console.error('Error getting documents', error);
	}
};