import Layout from '../components/Layout'
import Image from 'next/image'


export default function About() {
  return (
    <Layout>
      <div className="about-container">
        <h1 className="about-title">About Seneca Software Club</h1>
        
        <div className="about-content">
          <div className="about-image">
          <Image
              src="/image/programmer.png"
              alt="Seneca Software Club Logo"
              width={300}
              height={300}
            />
          </div>
          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              The Seneca Software Club is dedicated to fostering a community of passionate 
              developers, innovators, and tech enthusiasts. We aim to provide a platform for 
              students to enhance their coding skills, collaborate on exciting projects, and 
              stay updated with the latest trends in software development.
            </p>

            <h2>What We Do</h2>
            <ul>
              <li>Organize weekly coding workshops and hackathons</li>
              <li>Host guest lectures from industry professionals</li>
              <li>Collaborate on open-source projects</li>
              <li>Provide mentorship and career guidance</li>
              <li>Participate in coding competitions</li>
            </ul>

            <h2>Join Us</h2>
            <p>
              Whether you're a coding novice or an experienced developer, there's a place for 
              you in our club. Join us to learn, grow, and make lasting connections in the 
              world of software development.
            </p>

            <h2>Meeting Times</h2>
            <p>
              We meet every Wednesday at 5:00 PM in Room 301, Technology Building. 
              All Seneca students are welcome!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
