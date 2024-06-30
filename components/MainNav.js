import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

const MainNav = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-left">
          <Link href="/" className="nav-logo">
            &lt;/&gt; SenecaCode
          </Link>
          <div className="nav-links">
            <Link href="/" className={router.pathname === "/" ? "active" : ""}>Home</Link>
            {session && (
              <>
                <Link href="/feed" className={router.pathname === "/feed" ? "active" : ""}>Feed</Link>
                <Link href="/members" className={router.pathname === "/members" ? "active" : ""}>Club Members</Link>
                <Link href="/todo" className={router.pathname === "/todo" ? "active" : ""}>To-Do List</Link>
                <Link href="/about" className={router.pathname === "/about" ? "active" : ""}>About</Link>
              </>
            )}
          </div>
        </div>
        <div className="nav-right">
          {session ? (
            <>
              <div className="account-dropdown">
                <button onClick={() => setShowDropdown(!showDropdown)} className="account-btn">
                  Account
                </button>
                {showDropdown && (
                  <div className="dropdown-content">
                    <Link href="/profile">Edit Profile</Link>
                    <a onClick={handleLogout}>Logout</a>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/signin" className="signin-btn">Sign In</Link>
              <Link href="/signup" className="join-btn">Join Now</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;