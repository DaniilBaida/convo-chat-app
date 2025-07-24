import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import HomePage from "@/pages/HomePage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import SettingsPage from "@/pages/SettingsPage";
import ProfilePage from "@/pages/ProfilePage";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "@/components/ui/loader";

function App() {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    console.log({ authUser });

    if (isCheckingAuth && !authUser) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader />
            </div>
        );
    }
    return (
        <>
            <div>
                <NavBar />
                <Routes>
                    <Route
                        path="/"
                        element={
                            authUser ? <HomePage /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            !authUser ? <RegisterPage /> : <Navigate to="/" />
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            !authUser ? <LoginPage /> : <Navigate to="/" />
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            authUser ? (
                                <SettingsPage />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            authUser ? (
                                <ProfilePage />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                </Routes>
            </div>
        </>
    );
}

export default App;
