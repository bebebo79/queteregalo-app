import { useQuery } from "@tanstack/react-query"
import { getPresents } from "../api/PresentsApi"

export const usePresent = () => {
  const {data, isError, isLoading} = useQuery({
          queryKey : ['present'],
          queryFn : getPresents,
          retry:1,
          refetchOnWindowFocus: false
      })
  
      return {data, isError, isLoading}
}
