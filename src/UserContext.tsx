import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the context type
interface UserContextType {
    userId: number | null;
    setUser: (userId: number) => void;
}

// Create a context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<number | null>(null);

    const setUser = (userId: number) => {
        setUserId(userId);
    };

    return (
        <UserContext.Provider value={{ userId, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Create a custom hook for using the context
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
