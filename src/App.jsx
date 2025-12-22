import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import EcommerceLayout from './components/Ecommerce/EcommerceLayout'
import Experiments from './components/Experiments/Experiments';
import IsOnline from './components/IsOnline/IsOnline';
import Ecommerce from './components/Ecommerce/Ecommerce';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<div>Nothing here yet</div>} />
        <Route path='/ecommerce/*' element={<Ecommerce />} />
        <Route path='/isOnline' element={<IsOnline />} />
        <Route path='/experiments' element={<Experiments />} />
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
