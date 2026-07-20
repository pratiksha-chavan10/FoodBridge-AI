import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";


import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import MyDonations from "../pages/MyDonations";
import CreateDonation from "../pages/CreateDonation";
import AvailableDonations from "../pages/AvailableDonations";
import MyClaimedDonations from "../pages/MyClaimedDonations";
import AssignVolunteer from "../pages/AssignVolunteer";
import VolunteerDashboard from "../pages/VolunteerDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import ManageUsers from "../pages/ManageUsers";
import DonationDetails from "../pages/DonationDetails";
import AdminUsers from "../pages/AdminUsers";
import AdminDonations from "../pages/AdminDonations";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/my-donations"
                element={
                    <ProtectedRoute>
                        <MyDonations />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/available-donations"
                element={
                    <ProtectedRoute>
                        <AvailableDonations />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/createDonation"
                element={
                    <ProtectedRoute>
                        <CreateDonation />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/myClaimedDonations"
                element={<MyClaimedDonations />}
            />
            <Route
                path="/assignVolunteer/:id"
                element={<AssignVolunteer />}
            />
            <Route
                path="/volunteer-dashboard"
                element={
                    <ProtectedRoute>
                        <VolunteerDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin-dashboard"
                element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/manage-users"
                element={
                    <ProtectedRoute>
                        <ManageUsers />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/donation/:id"
                element={
                    <ProtectedRoute>
                        <DonationDetails />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/users"
                element={
                    <ProtectedRoute>
                        <AdminUsers />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/donations"
                element={
                    <ProtectedRoute>
                        <AdminDonations />
                    </ProtectedRoute>
                }
            />
                        
            
        </Routes>
    );
}

export default AppRoutes;