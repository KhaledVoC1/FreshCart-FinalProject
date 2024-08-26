import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function useFetch({
  endPoint,
  queryKey,
  refetchIntervalData = null,
}) {
  let [x, setX] = useState(0);
  function getData() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/${endPoint}`); //علي حسب الي هيرجع
  }

  let response = useQuery({
    queryKey: [queryKey],
    queryFn: getData,
    refetchInterval: refetchIntervalData,
    
  });

  return response;
}
