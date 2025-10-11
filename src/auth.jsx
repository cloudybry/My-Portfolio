import PocketBase from 'pocketbase';

// Use environment variable or fallback to ngrok URL
const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL;
const pb = new PocketBase(pocketbaseUrl);

// 🔁 Restore session from localStorage if token exists
const storedToken = localStorage.getItem('pb_token');
if (storedToken) {
  pb.authStore.save(storedToken, null);

  if (!pb.authStore.isValid) {
    pb.authStore.clear();
    localStorage.removeItem('pb_token');
    console.warn('⚠️ Stored token was invalid or expired');
  } else {
    console.log('🔁 Reconnected with valid token');
  }
}

/**
 * 🔐 Login as admin using credentials from .env or fallback
 * Saves token and admin model to authStore and localStorage
 */
export async function loginAdmin() {
  try {
    const email = import.meta.env.VITE_ADMIN_EMAIL || 'cloudybry@admin.com';
    const password = import.meta.env.VITE_ADMIN_PASSWORD || 'Synapps.12';

    const authData = await pb.admins.authWithPassword(email, password);

    pb.authStore.save(authData.token, authData.admin);
    localStorage.setItem('pb_token', authData.token);

    console.log('✅ Logged in as:', authData.admin.email);
    return authData;
  } catch (err) {
    console.error('❌ Admin login failed:', err);
    return null;
  }
}

/**
 * 👋 Logout admin and clear session
 */
export function logoutAdmin() {
  pb.authStore.clear();
  localStorage.removeItem('pb_token');
  console.log('👋 Logged out');
}

export default pb;