// import { useState, useEffect } from "react";
// import axios from "axios";

// const useFetch = (endpoint, query) => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [lastFetchTime, setLastFetchTime] = useState(null);
//   const [retryCount, setRetryCount] = useState(0); // Initialize retryCount state
//   const MAX_RETRIES = 3;

//   const options = {
//     method: 'GET',
//     url: `https://jsearch.p.rapidapi.com/${endpoint}`,
//     params: { ...query },
//     headers: {
//       'X-RapidAPI-Key': '92d087de84mshcce6dc52a06a019p176526jsn407809376a80',
//       'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
//     },
//   };

//   const fetchData = async () => {
//     setIsLoading(true);
//     console.log("Fetching data...");
//     try {
//       const response = await axios.request(options);
//       console.log("Data fetched successfully:", response.data.data);
//       setData(response.data.data);
//       setIsLoading(false);
//       setLastFetchTime(Date.now());
//       setRetryCount(0); // Reset retry count on successful fetch
//     } catch (error) {
//       if (error.response?.status === 429 && retryCount < MAX_RETRIES) {
//         const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
//         setRetryCount(retryCount + 1); // Increment retryCount directly
//         console.log(`Rate limited. Retrying in ${delay / 1000} seconds...`);
//         setTimeout(fetchData, delay);
//       } else {
//         setError("Something went wrong. Please try again later.");
//         setIsLoading(false);
//         console.error("Error fetching data:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     if (!lastFetchTime || Date.now() - lastFetchTime >= 60000) {
//       fetchData(); // Fetch data immediately if last fetch time is not set or more than 1 minute has elapsed
//     } else {
//       // Inside fetchData function
//       const delay = Math.pow(2, retryCount) * 50000000; // Retry every 500 seconds (5000 milliseconds)
//       console.log(`Waiting ${delay / 1000} seconds before retrying...`);
//       const timer = setTimeout(fetchData, delay); // Fetch data after remaining delay
//       return () => clearTimeout(timer); // Cleanup timeout on component unmount or next fetch
//     }
//   }, [lastFetchTime]);

//   const refetch = () => {
//     fetchData();
//   };

//   return { data, isLoading, error, refetch };
// };

// export default useFetch;

import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": '21913c902dmsh1a62b3c1356d798p12a7d7jsna509eb41a172',
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
