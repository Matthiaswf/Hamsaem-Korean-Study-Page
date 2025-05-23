import { ref, watchEffect } from 'vue';
import { projectFirestore } from '../firebase/config';

const getDocument = (collection, id) => {
  const document = ref(null);
  const error = ref(null);

  // register the firestore collection reference
  let documentRef = projectFirestore.collection(collection).doc(id);

  const unsub = documentRef.onSnapshot(
    (doc) => {
      // check if the document exists & has data
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id };
        error.value = null;
      } else {
        error.value = 'that document does not exist';
        document.value = null;
      }
    },
    (err) => {
      console.log(err.message);
      error.value = 'could not fetch the document';
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, document };
};

export default getDocument;
