import '../App.css'
import { AuthProvider } from '../context/AuthProvider'

// - - - REACT ROUTER DOM, TODO: Redirect - - -
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// - - - COMPONENTS - - -
// EditExam and GetExamData are currently being edited in Playground
import Layout from './Layout'
import Playground from './Playground'
import Exams from './Exams'
import Register from './Register'
import Login from './Login'
import Dashboard from './Dashboard'
import Home from './Home'
import Users from './Users'
import NotFound from './NotFound'
import Staff from './Staff'
import UnderConstruction from './UnderConstruction'
import RequireAuth from './RequireAuth'
// import EditExam from './EditExam'
// import GetExamData from './GetExamData'
import StudentDashboard from './StudentDashboard'
import StudentExam from './StudentExam'
import ExamEvent from './ExamEvent'
import UnAuthorized from './UnAuthorized'
import UnAuthenticated from '../UnAuthenticated'
import LogoutSuccessful from './LogoutSuccessful'

const App = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className='container'>
          <Routes>
            <Route path="/" element={<Layout />}>

              {/* - - - PUBLIC ROUTES - - - */}
              <Route exact path='/' element={<Home />} />
              <Route exact path='/kirjautuminen' element={<Login />} />
              <Route exact path='/rekisteröinti' element={<Register />} />
              <Route exact path='/keskeneräinen' element={<UnderConstruction />} />
              <Route exact path='/kirjauduttava' element={<UnAuthenticated />} />
              <Route exact path='/uloskirjautuminen' element={<LogoutSuccessful />} />

              {/* - - - PROTECTED ROUTES: OPETTAJA - - - */}
              <Route element={<RequireAuth allowedRoles={[1111, 2222]} />}>
                <Route exact path='/opettaja/hallintapaneeli' element={<Dashboard />} />
                <Route exact path='/opettaja/tentit' element={<Exams />} />
                <Route path='/opettaja/tentit/:tentti' element={<Playground />} />
                <Route exact path='/oppilaat' element={<Users />} />
              </Route>

              {/* - - - PROTECTED ROUTES: YLLÄPITÄJÄ - - - */}
              <Route element={<RequireAuth allowedRoles={[1111]} />}>
                <Route exact path='/opettajat' element={<Staff />} />
              </Route>

              {/* - - - PROTECTED ROUTES: OPPILAS - - - */}
              <Route element={<RequireAuth allowedRoles={[1234]} />}>
                <Route path='/hallintapaneeli' element={<StudentDashboard />} />
                <Route path='/tentit' element={<StudentExam />} />
                <Route path='/tentit/:tentti' element={<ExamEvent />} />
              </Route>

              {/* - - - CATCHES - - - */}
              <Route exact path='/pääsy-evätty' element={<UnAuthorized />} />
              <Route path="*" element={<NotFound />} />

            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter >
  )
}

export default App;
