import { Link } from "react-router-dom";

const Chocolate = ({chocolate, deleteChocolate}) => {

    const handleDeleteButton = () => {
        deleteChocolate(chocolate.id)
    }

    return ( 
        <article>
            <h4>{chocolate.name}</h4>
            <p>Estate: {chocolate.estate.name}</p>
            <p>Cocoa %: {chocolate.cocoaPercentage}</p>
            <button onClick={handleDeleteButton}>Delete</button>
            <button>
                <Link to={`/chocolates/${chocolate.id}/edit`}>Edit</Link>
            </button>
            <hr />
        </article>
     );
}
 
export default Chocolate;