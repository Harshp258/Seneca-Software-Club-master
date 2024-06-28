import { useSession } from "next-auth/react"

export default function Posts() {
  const { data: session, status } = useSession()

  const createPost = async () => {
    if (status === "authenticated") {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ /* your post data */ }),
      })
      // ... handle response
    }
  }

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>
  }

  return (
    // ... your component JSX
  )
}
