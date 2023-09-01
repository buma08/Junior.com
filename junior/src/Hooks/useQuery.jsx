import {
    useSearchParams,
  } from "react-router-dom"
  
function useQuery() {
    const [queryParams] = useSearchParams()
    return ( queryParams );
}

export default useQuery;