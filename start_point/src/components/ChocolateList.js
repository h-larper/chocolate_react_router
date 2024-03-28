import Chocolate from "./Chocolate";

const ChocolateList = ({chocolates, deleteChocolate}) => {

    const chocolateComponents = chocolates.map((chocolate) => {
        return <Chocolate key={chocolate.id} chocolate={chocolate} deleteChocolate={deleteChocolate}/>
    })

    return ( 
        <>
            <h2>List of Chocolates!</h2>
            {chocolateComponents}
        </>
     );
}
 
export default ChocolateList;