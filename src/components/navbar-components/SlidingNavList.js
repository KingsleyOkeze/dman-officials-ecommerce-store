import "../../styles/components-styles/navbar-components/SlidingNavList.css";

function SlidingNavList ({ isOpen }) {

    return (
        <div className={ `${isOpen === true ? "open-sliding-nav-list-container" : "close-sliding-nav-list-container"}` }>
<p>jsfgj</p>
        </div>
    )
}

export default SlidingNavList;

// className="sliding-nav-list-container"