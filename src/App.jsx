import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Body from './components/Body'
import Profile from './components/Profile'
import Login from './components/Login'
import { Provider, } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './components/Feed'


const App = () => {
 
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' element={<Body/>}>
      <Route path="/" element={<Feed/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/login' element={<Login/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App