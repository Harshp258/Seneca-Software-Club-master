import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const MainNav = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-left">
          <Link href="/" className="nav-logo">
            &lt;/&gt; SenecaCode
          </Link>
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div className={`nav-right ${mobileMenuOpen ? 'mobile-open' : ''}`}>
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
          <div className="nav-auth">
            {session ? (
                <div className="account-dropdown">
              <button onClick={() => setShowDropdown(!showDropdown)} className="account-btn">
                {session.user.name}
              </button>
                {showDropdown && (
                  <div className="dropdown-content">
                    <Link href="/profile">Edit Profile</Link>
                    <a onClick={handleLogout}>Logout</a>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/signin" className="signin-btn">Sign In</Link>
                <Link href="/signup" className="join-btn">Join Now</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;