import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    return hasAuthData() ? <Outlet /> : <Navigate to="/login" />;
};
const hasAuthData = (): boolean => {
    return localStorage.getItem("access_token") ? true : false;
}

export default PrivateRoutes;