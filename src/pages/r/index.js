import { useRouter } from 'next/router'

function Resource() {
  const router = useRouter()

  if (typeof window !== 'undefined') {
    router.push('/home')
  }

  return null
}

export default Resource
