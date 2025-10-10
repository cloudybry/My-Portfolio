import PocketBase from 'pocketbase';

const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL || 'https://unturfed-coughingly-shandra.ngrok-free.dev';
const pb = new PocketBase(pocketbaseUrl);

// Auto-reconnect if token exists
const storedToken = localStorage.getItem('pb_token');
if (storedToken) {
  pb.authStore.save(storedToken, null);
  console.log('🔁 Reconnected with stored token');
}

export async function loginAdmin() {
  try {
    const email = import.meta.env.VITE_ADMIN_EMAIL || 'cloudybry@localhost.com';
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

export default pb;