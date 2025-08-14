import axios from "axios";
import { createContext, useEffect, useState, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertContext } from "./AlertContext";

export const SearchContext = createContext(); 

export const SearchProvider = ({ children }) => {
    const { showAlert } = useContext(AlertContext);
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const previousPath = useRef(location.pathname); // Store the previous path


    const handleSearchInput = async () => {
        if (searchInput.length > 0) {
            try {
                const response = await axios.get(
                    `/customer/search-product?searchInput=${searchInput}&page=0&limit=12`
                );

                if (response.status === 200) {
                    setSearchResult(response.data.result);
                if (location.pathname !== "/category-page/search") {
                    previousPath.current = location.pathname; // Save the current path
                    navigate("/category-page/search");
                }
            }
            } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;
                if (status) {
                    showAlert("Error", errMessage);
                }
            } else {
                showAlert("Error", "Unknown error occurred while searching!");
            }
            // console.log("err searching ", err)
            }
        } else {
            navigate(previousPath.current); // Redirect if searchInput is empty
        }
    };

    useEffect(() => {
        handleSearchInput();
    }, [searchInput])

    return (
        <SearchContext.Provider value={{
            searchInput, 
            setSearchInput,
            handleSearchInput,
            searchResult,
        }}>
            {children}
        </SearchContext.Provider>
    )
}