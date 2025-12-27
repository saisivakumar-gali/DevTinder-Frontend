import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from './components/Body'
import Feed from './components/Feed'
import Profile from './components/Profile'
import Login from './components/Login'
import Signup from './components/Signup'
import Connections from './components/Connections'
import Requests from './components/Requests'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body/>}>
            <Route index element={<Feed/>}/> {/* path="/" matches this */}
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/connections' element={<Connections/>}/>
            <Route path='/requests' element={<Requests/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App