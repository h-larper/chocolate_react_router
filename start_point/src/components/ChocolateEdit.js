import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";

const ChocolateEdit = ({estates, updateChocolate}) => {

    const chocolate = useLoaderData();
    const navigate = useNavigate();

    const [stateChocolate, setStateChocolate] = useState(
        {
            name: chocolate.name,
            cocoaPercentage: chocolate.cocoaPercentage,
            estateId: chocolate.estate.id,
            id: chocolate.id
        }
    )

    const estateOptions = estates.map( estate => {
        return <option key={estate.id} value={estate.id}>{estate.name}</option>
    })

    const handleChange = (event) => {               // for tracking changes in form, not submitting a form
        const propertyName = event.target.name;
        const copiedChocolate = {...stateChocolate};
        copiedChocolate[propertyName] = event.target.value;
        setStateChocolate(copiedChocolate);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        updateChocolate(stateChocolate);
        navigate("/chocolates");
    }

    return (  
        <>
            <form onSubmit ={handleFormSubmit}>
            <h3>Update chocolate</h3>

            <label htmlFor="chocolate-name">Chocolate Name:</label>
            <input
                id="chocolate-name"
                name="name"
                type="text"
                onChange={handleChange}
                value={stateChocolate.name}
            />
            
            <label htmlFor="cocoa-percentage">Cocoa Percentage:</label>
            <input
                id="cocoa-percentage"
                name="cocoaPercentage"
                type="number"
                min={1}
                max={100}
                onChange={handleChange}
                value={stateChocolate.cocoaPercentage}
            />
            
            <label htmlFor="estate">Estate</label>
            <select
                id="estate"
                name="estateId"
                defaultValue={stateChocolate.estateId}
                onChange={handleChange}
            >
                <option disabled value="select-estate">Choose an estate</option>
                {estateOptions}
            </select>

            <input type="submit" value="Update Chocolate"/>
        </form>
        </>
    );
}
 
export default ChocolateEdit;