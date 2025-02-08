import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const error = ref(null);
const isPending = ref(false);
const emailNotVerified = ref(false); // New state to control verification UI

const login = async (email, password) => {
  error.value = null;
  isPending.value = true;
  emailNotVerified.value = false; // Reset state before login attempt

  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password);

    if (!res.user.emailVerified) {
      await projectAuth.signOut(); // Prevent unverified login persistence
      emailNotVerified.value = true; // Set flag for UI
      throw new Error(
        'Your email is not verified. Please verify before logging in.'
      );
    }

    error.value = null;
    isPending.value = false;
    return res;
  } catch (err) {
    console.error('[Login Error]:', err.message);
    error.value = err.message;
    isPending.value = false;
    return null; // Ensure UI knows login failed
  }
};

const resendVerificationEmail = async () => {
  const user = projectAuth.currentUser;
  if (user && !user.emailVerified) {
    try {
      await user.sendEmailVerification();
      return 'Verification email sent!';
    } catch (err) {
      console.error('[Email Verification Error]:', err.message);
      return 'Failed to send verification email.';
    }
  }
  return 'User is already verified or not logged in.';
};

const useLogin = () => {
  return { error, login, resendVerificationEmail, isPending, emailNotVerified };
};

export default useLogin;
