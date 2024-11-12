import '../styles/components-styles/Showcase.css'
import showcase1 from '../images/showcase2.jpg'

function Showcase () {

    return(
        <div className="showcase-container" style={{ 
            backgroundImage: `url(${showcase1})`,
            backgroundSize: 'cover'
            }}>
            <div className="showcase-content">
                <p>Find what fits you @ Dman</p>
                <p>Explore and find your fit @ Dman officials</p>
            </div>
        </div>
    )
}

export default Showcase;