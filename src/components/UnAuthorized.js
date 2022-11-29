import { useNavigate } from 'react-router-dom'

const UnAuthorized = () => {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  return (
    <section>
      <h1>Pääsy evätty</h1>
      <br />
      <p>Sinulla ei ole valtuuksia valitsemaasi sisältöön.</p>
      <div className='unauthorized'>
        <button onClick={goBack}>Takaisin</button>
      </div>
    </section>
  )
}

export default UnAuthorized