import { useQuery } from "@tanstack/react-query";
import taskService, {type TaskStatistics } from "../Services/taskService";


export const useGetBlogStatistics = () =>{
   const {data, isLoading, error} = useQuery<TaskStatistics>({
        queryKey: ['getBlogStatistics'],
        queryFn: async () => {
            return await taskService.getTaskStatistics();
        }
   });
   return{
    statistics: data, 
    isLoading, 
    error 
   }
}