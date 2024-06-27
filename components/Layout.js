import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Layout = ({ children }) => {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <>
      <Head>
        <title>Seneca Software Club</title>
        <meta name="description" content="Seneca Software Club website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/members">Members</Link></li>
            <li><Link href="/todo">Todo</Link></li>
          </ul>
        </nav>
        {session && (
          <div className="user-menu">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              ☰
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link href="/profile">Edit Profile</Link>
                <button onClick={handleLogout}>Log Out</button>
              </div>
            )}
          </div>
        )}
      </header>

      <main className="container">
        {children}
      </main>

      <footer>
        <p>&copy; 2023 Seneca Software Club. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Layout;
