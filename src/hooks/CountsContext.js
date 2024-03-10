import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { post } from "../Helper";

const CountsContext = createContext();

export const useCounts = () => useContext(CountsContext);

export const CountsProvider = ({ children }) => {
  const [counts, setCounts] = useState({ countNadure: 0, countOdsotnost: 0 });
  const countUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/countProsnje.php`;

  // Define a function to fetch counts from your backend
  const fetchCounts = useCallback(async () => {
    try {
      post(countUrl, {}).then((response) => {
        setCounts({
          countNadure: response.data.countNadure,
          countOdsotnost: response.data.countOdsotnost,
        });
      }, []);
    } catch (error) {
      console.error("Failed to fetch counts", error);
    }
  }, []);

  // Call fetchCounts when the component mounts
  useEffect(() => {
    fetchCounts();
  }, []);

  // Provide a way to manually update counts, which also re-fetches them
  const updateCounts = async (newCounts) => {
    setCounts((prevCounts) => ({ ...prevCounts, ...newCounts }));
  };

  return (
    <CountsContext.Provider value={{ counts, updateCounts }}>
      {children}
    </CountsContext.Provider>
  );
};
