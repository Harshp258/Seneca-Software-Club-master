import MainNav from './MainNav';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <MainNav />
      <main className="main">{children}</main>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <p className="brand-name">&lt;/&gt;SenecaCode</p>
            <p className="all-rights">© All rights reserved</p>
          </div>
          <div className="footer-right">
            <p>Visit Our Club at:</p>
            <p>Seneca College</p>
            <p>1750 Finch Avenue East</p>
            <p>Toronto Ontario M2J 2X5</p>
            <p>Canada</p>
            <p><span className="mail-icon">✉</span> info.ssdcseneca@gmail.com</p>
          </div>
        </div>
        <div className="footer-social">
          <a href="https://www.instagram.com/seneca_sdc/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://x.com/campusgroups" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="https://www.linkedin.com/company/seneca-software-developers-club/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;