import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://unturfed-coughingly-shandra.ngrok-free.dev'); // No trailing slash

function AdminPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const token = localStorage.getItem('pb_auth');
        if (token) {
          pb.authStore.load(token);
        }

        if (!pb.authStore.isValid) {
          console.warn('🔒 Not authenticated. Redirecting...');
          navigate('/login');
          return;
        }

        const records = await pb.collection('contacts').getFullList({
          sort: '-created'
        });

        setContacts(records);
        console.log('✅ Fetched contacts:', records);
      } catch (err) {
        console.error('❌ PocketBase error:', err);
        setError('Failed to fetch contact submissions.');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [navigate]);

  const handleLogout = () => {
    pb.authStore.clear();
    localStorage.removeItem('pb_auth');
    navigate('/login');
  };

  if (loading) return <p style={{ fontStyle: 'italic' }}>Loading submissions...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout} style={{ marginBottom: '1rem' }}>
        Logout
      </button>
      {contacts.length === 0 ? (
        <p>No contact submissions yet.</p>
      ) : (
        contacts.map((record) => (
          <div key={record.id} style={{ marginBottom: '1rem' }}>
            <p><strong>{record.name}</strong>: {record.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminPage;