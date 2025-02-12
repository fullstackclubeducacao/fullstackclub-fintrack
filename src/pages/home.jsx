import { Navigate } from 'react-router'

import Header from '@/components/header'
import { useAuthContext } from '@/contexts/auth'

const HomePage = () => {
  const { user, isInitializing } = useAuthContext()
  if (isInitializing) return null
  if (!user) {
    return <Navigate to="/login" />
  }
  return (
    <>
      <Header />
    </>
  )
}

export default HomePage
