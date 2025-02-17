import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
// import CompleteRegistration from './components/CompleteRegistration';
import Contact from './components/Contact';
import MyAccount from './components/MyAccount';
import UploadFiles from './components/UploadFiles';
import CompleteRegistration from './components/CompleteRegistration';

export default function App() {
  return (
    <BrowserRouter>
      {/* header */}
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/completeRegistration' element={<CompleteRegistration/>} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/myaccount' element={<MyAccount />} />
        <Route path='/uploadfiles' element={<UploadFiles />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
