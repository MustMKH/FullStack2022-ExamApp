import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <main>
            <h1 className='section-title'>HUPS! Sivua, jolle yritit mennä, ei ole olemassa.</h1>
            <button className='small-btn' onClick={() => navigate(-1)}>Takaisin</button>
        </main>
    )
}

export default NotFound