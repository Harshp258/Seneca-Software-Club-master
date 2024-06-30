import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Link from 'next/link'
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa'

export default function SignIn() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const result = await signIn('credentials', {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    })

    if (result.error) {
      setError(result.error)
    } else {
      router.push('/')
    }
  }

  return (
    <Layout>
      <br />
      <br />
      <div className="auth-container">
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Sign in to continue your journey</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            <FaSignInAlt /> Sign In
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <div className="auth-switch">
          <p>Don't have an account?</p>
          <Link href="/signup" className="btn btn-secondary">
            Sign Up
          </Link>
        </div>
      </div>
    </Layout>
  )
}
