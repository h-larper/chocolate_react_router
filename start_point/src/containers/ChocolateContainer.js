import ChocolateList from "../components/ChocolateList";
import ChocolateForm from "../components/ChocolateForm";
import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChocolateEdit from "../components/ChocolateEdit";

const ChocolateContainer = () => {

    const [chocolates, setChocolates] = useState([]);
    const [estates, setEstates] = useState([]);

    const fetchChocolates = async () => {
        const response = await fetch("http://localhost:8080/chocolates");
        const data = await response.json();
        setChocolates(data);
    }
    const fetchEstates = async () => {
        const response = await fetch("http://localhost:8080/estates");
        const data = await response.json();
        setEstates(data);
    }

    const postChocolate = async (newChocolate) => {
        const response = await fetch("http://localhost:8080/chocolates", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newChocolate)
        })
        const savedChocolate = await response.json();
        setChocolates([...chocolates, savedChocolate])
    }

    const deleteChocolate = async (chocolateId) => {
        await fetch(`http://localhost:8080/chocolates/${chocolateId}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        })
        setChocolates(chocolates.filter((chocolate) => chocolate.id !== chocolateId))
    }

    const updateChocolate = async (chocolate) => {
        await fetch(`http://localhost:8080/chocolates/${chocolate.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(chocolate)
        });
        await fetchChocolates();
    }

    const chocolateLoader = ({params}) => {
        return chocolates.find(chocolate => {
            return chocolate.id === parseInt(params.id);
        })
    }

    const chocolateRoutes = createBrowserRouter([
        {
            path: "/",
            element: <Navigation/>,
            children: [
                {
                    path: "/chocolates",
                    element: <ChocolateList
                        chocolates={chocolates}
                        deleteChocolate={deleteChocolate}
                    />
                },
                {
                    path: "/chocolates/new",
                    element: <ChocolateForm
                        estates={estates}
                        postChocolate={postChocolate}
                    />
                },
                {
                    path: "/chocolates/:id/edit",
                    loader: chocolateLoader,
                    element: <ChocolateEdit 
                        estates={estates}
                        updateChocolate={updateChocolate}
                    />
                }
            ]
        }
    ]);

    useEffect(() => {
        fetchChocolates();
        fetchEstates();
    }, [])


    return ( 
        <>
            <h1>Single Origin Chocolate</h1>
            <RouterProvider router={chocolateRoutes}/>
        </>
     );
}
 
export default ChocolateContainer;