import { ExtendedFork } from "../models/ForkItem";
import axios from "axios";
import { useQuery } from "react-query";

export const useGetExtendedFork = (id: string | undefined) => {
  return useQuery(["fork"], async () => {
    const response = await axios.get(`/api/forks/${id}`);
    return response.data as ExtendedFork;
  });
}