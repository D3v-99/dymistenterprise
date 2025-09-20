import { Outlet } from 'react-router-dom'
import Navigation from './components/Navigation.tsx'
import Footer from './components/Footer.tsx'
import './App.css'

function App() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
