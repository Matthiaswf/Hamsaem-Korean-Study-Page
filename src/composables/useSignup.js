import { ref } from 'vue';
import { projectAuth } from '../firebase/config';
import useCollection from './useCollection';
import { timestamp } from '../firebase/config';

const error = ref(null);
const isPending = ref(false);
const { addDoc } = useCollection('users');

const signup = async (email, password, displayName, selectedProfile) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (!res) throw new Error('Could not complete signup');

    await res.user.updateProfile({ displayName });

    await addDoc({
      displayName: res.user.displayName,
      userId: res.user.uid,
      isOnline: false,
      isAdmin: false,
      userThumbnail: selectedProfile, // Ensure correct profile picture is stored
      createdAt: timestamp(),
    });

    isPending.value = false;
    return res;
  } catch (err) {
    isPending.value = false;
    error.value = err.message; // Capture error for UI
    throw err; // Rethrow so `submitForm` can handle it
  }
};

const useSignup = () => {
  return { error, signup, isPending };
};

export default useSignup;
