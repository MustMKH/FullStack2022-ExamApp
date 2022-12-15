import { Link, useNavigate } from 'react-router-dom'

const UnAuthorized = () => {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  return (
    <main>
      <div className='main-title'>Pääsy evätty</div>
      <div className='sub-title'>Sinulla ei ole valtuuksia valitsemaasi sisältöön.</div>
      <div className='unauthorized'>
        <span><button className='small-btn' onClick={goBack}>Takaisin</button></span>
        <span><Link to='/kirjautuminen'><button className='small-btn' >Kirjautumiseen</button></Link></span>
      </div>
    </main>
  )
}

export default UnAuthorized