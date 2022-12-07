import './css/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Consumerreq from './Components/Consumerreg';
import Consumerlogin from './Components/Consumerlogin';
import Loadingpage from './Components/Loadingpage';
import About from './Components/About';
import Logout from './Components/Logout';
import Allproduct from './Components/All Shops.js'
import Singleproductfinal from './Components/Singleproductfinal'



import { createContext, useReducer } from 'react';
import { initialState, reducer, } from '../src/reducer/UseReducer';
import AllShopsData from './Components/AllShopsData';
export const UserContext = createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/consumer-register" element={<Consumerreq />}></Route>
            <Route path='/consumer-login' element={<Consumerlogin />}></Route>
            <Route path='/loading' element={<Loadingpage />}></Route>
            <Route path='/consumer-profile' element={<About />}></Route>
            <Route path='/consumer-logout' element={<Logout />}></Route>
            <Route path='/all-shops' element = {<AllShopsData/>}></Route>
            <Route path='/all-shops/:id' element = {<Allproduct/>}></Route>   
            <Route path='/single-product' element = {<Singleproductfinal/>}></Route>          
            
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;

