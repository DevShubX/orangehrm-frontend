"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import api from "@/lib/api";
import { User } from "@/models/user.model";

type AuthContextType = {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    // const pathname = usePathname();

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            setToken(storedToken);
            validateToken(storedToken);
        } else {
            setIsLoading(false);
            logout();
        }
    }, []);

    const validateToken = async (token: string) => {
        try {
            setIsLoading(true);
            const res = await api.get("/auth/authorize", {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setUser(res.data.user);
            setIsLoading(false);
        } catch (err) {
            console.error("Auth error:", err);
            logout();
        }
    };

    const login = (token: string) => {
        localStorage.setItem("authToken", token);
        router.push("/admin");
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
        setToken(null);
        router.push("/signin");
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};