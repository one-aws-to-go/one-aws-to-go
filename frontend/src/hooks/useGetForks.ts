import { Fork } from "../models/ForkItem";
import axios from "axios";
import { useQuery } from "react-query";

export const useGetForks = () => {
  return useQuery(["forks"], async () => {
    const response = await axios.get('/api/forks');
    return response.data as Fork[];
  });
}