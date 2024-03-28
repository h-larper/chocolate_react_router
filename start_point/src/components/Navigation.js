import { Link, Outlet } from "react-router-dom";

const Navigation = () => {

    return(
        <>
            <nav>
                <ul>
                    <li><Link to="/chocolates">All Chocolates</Link></li>
                    <li><Link to="/chocolates/new">Add New Chocolate</Link></li>
                </ul>
            </nav>
            <Outlet/>
        </>
    );    

}

export default Navigation;