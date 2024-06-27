import Layout from '../components/Layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      <h1 style={{ color: 'var(--primary-red)', marginBottom: '20px' }}>Welcome to Seneca Software Club</h1>
      <p>Join our community of passionate developers and innovators!</p>
      <Link href="/signup" className="btn" style={{ marginTop: '20px' }}>
        Join Now
      </Link>
    </Layout>
  )
}
