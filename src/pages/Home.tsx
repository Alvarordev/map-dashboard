import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage) {
      const isAuthenticated = localStorage.getItem('authToken')

      if(!isAuthenticated) {
        navigate('/login')
      } else {
        navigate('/ds/dashboard')
      }
    }
  })

  return (
    <div>
      <h3>Home</h3>
    </div>
  )
}

export default Home