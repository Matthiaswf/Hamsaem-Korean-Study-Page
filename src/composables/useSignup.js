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

    // Send verification email
    await res.user.sendEmailVerification();

    // Update user profile
    await res.user.updateProfile({ displayName, photoURL: selectedProfile });

    await addDoc({
      displayName: res.user.displayName,
      userId: res.user.uid,
      isOnline: true,
      isAdmin: false,
      userThumbnail: selectedProfile,
      createdAt: timestamp(),
    });

    isPending.value = false;
    return {
      res,
      message: 'A verification email has been sent. Please check your inbox.',
    }; // Return message
  } catch (err) {
    isPending.value = false;
    error.value = err.message;
    throw err;
  }
};

const useSignup = () => {
  return { error, signup, isPending };
};

export default useSignup;
