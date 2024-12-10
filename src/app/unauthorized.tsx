import Link from 'next/link';

function Unauthorized() {
  return (
    <div>
      <h2>Unauthorized</h2>
      <p>Please log in to access this page.</p>
      <Link href="/login">Go to Login</Link>
    </div>
  );
}

export default Unauthorized;
