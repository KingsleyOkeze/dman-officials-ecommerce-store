import { createContext, useEffect, useState } from 'react';

// Create the context
export const SideDrawerContext = createContext();

// Create a provider component
export const SideDrawerProvider  = ({ children }) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const [activeComponent, setActiveComponent] = useState(null);

    const toggleSideDrawer = (componentToShow) => {
        setShowSideDrawer(!showSideDrawer) // Toggle visibility
        setActiveComponent(componentToShow); // Set the active component
    }

    return (
        <SideDrawerContext.Provider value={{ showSideDrawer, setShowSideDrawer,  activeComponent,  setActiveComponent, toggleSideDrawer }}>
                {children}
        </SideDrawerContext.Provider>
    );
}