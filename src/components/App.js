import '../App.css'
import { Fragment } from 'react'

// - - - REACT ROUTER DOM, TODO: Redirect - - -
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// - - - COMPONENTS - - -
import Playground from './Playground'
import Header from './Header'
import Footer from './Footer'
// import Exam from './Exam'
import Exams from './Exams'
// import Toast from './Toast'
import Register from './Register'
import Login from './Login'
import Dashboard from './Dashboard'
import Home from './Home'
import Users from './Users'
// import EditExam from './EditExam'
// import GetExamData from './GetExamData'
// import ExamEvent from './ExamEvent'

// TODO: Navigation bar (router)

// TODO:

const App = () => {

  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <div className='container'>
          <Routes>
            {/* - - - PUBLIC ROUTES - - - */}

            {/* <Route exact path='/opettaja/tentit/50' element={<Playground />} /> */}
            <Route exact path='/' element={<Home />} />
            <Route exact path='/kirjautuminen' element={<Login />} />
            <Route exact path='/rekisteröinti' element={<Register />} />
            {/* - - - PROTECTED ROUTES: OPETTAJA - - - */}
            <Route exact path='/opettaja/hallintapaneeli' element={<Dashboard />} />
            <Route exact path='/opettaja/tentit' element={<Exams />} />
            <Route path='/opettaja/tentit/:tentti' element={<Playground />} />
            <Route exact path='/opettaja/käyttäjät' element={<Users />} />
            {/* - - - TODO: PROTECTED ROUTES: OPPILAS - - -
            <Route path='/tentit' element={<ScheduledExamsAndExamResults />} />
            This need a separate end point, because only teachers need to see corret answers:
            <Route path='/tentit/:tentti' element={<ExamEvent />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </Fragment>
  )
}

export default App;
