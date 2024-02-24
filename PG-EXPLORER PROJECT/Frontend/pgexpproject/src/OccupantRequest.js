import { Outlet } from "react-router-dom";

function OccupantRequest()
{
    return(
        <div>
            <h1>list of requests</h1>
            <Outlet />
        </div>
    )
}

export default OccupantRequest;