import { Routes, Route } from 'react-router-dom'
import Registration from './pages/Registration.jsx'
import Instructions from './pages/Instructions.jsx'
import Test from './pages/Test.jsx'
import Congratulations from './pages/Congratulations.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Registration />} />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="/test" element={<Test />} />
      <Route path="/congratulations" element={<Congratulations />} />
      {/* <h1>hi this is ansh</h1> */}
    </Routes>
  )
}

export default App
