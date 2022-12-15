import picture from './images/image-222.png'

const UnderConstruction = () => {
    return (
        <main>
            <div className='page-title'>Tämä osio on vielä keskeneräinen</div>
            <img src={picture} width="600px" alt="Work in progress" />
        </main>
    )
}

export default UnderConstruction