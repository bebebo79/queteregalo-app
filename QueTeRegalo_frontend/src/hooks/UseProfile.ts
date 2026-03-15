import { useQuery } from "@tanstack/react-query"
import { getProfile } from "../api/ProfileApi"

export const useProfile = () => {
  const {data, isError, isLoading} = useQuery({
          queryKey : ['profile'],
          queryFn : getProfile,
          retry:1,
          refetchOnWindowFocus: false
      })
  
      return {data, isError, isLoading}
}
