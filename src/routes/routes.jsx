import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Profile from '../pages/Profile';  // Importa el nuevo componente de Profile
import CreatePost from "../pages/CreatePost";


export function MyRoutes() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
            <Route path="/" element={<UserProfile />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
        </BrowserRouter>
    );
}

export default MyRoutes;
