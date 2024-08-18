import { UserProvider } from './context/userContext'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import UserPage from './Pages/UserPage'

function App() {

  return (
    <>
      <UserProvider>
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/userpage' element={<UserPage />}/>
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
