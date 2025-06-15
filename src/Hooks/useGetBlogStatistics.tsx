import { useQuery } from "@tanstack/react-query";
import api from "./apiClient";

interface TaskType {
    id: number;
    title: string;
    status: 'In Progress' | 'Complete' | 'Pending';
    date: string;
    description: string;
}

interface TaskStatistics {
    totalTasks: number;
    totalComplete: number;
    totalPending: number;
    totalInProgress: number;
    tasks: TaskType[];
}

export const useGetBlogStatistics = () =>{
    const {data, isLoading, error} = useQuery<TaskStatistics>({
        queryKey: ["getBlogStatistics"],
        queryFn: async () =>{
            const response = await api.get("/tasks");
            const tasks: TaskType[] = response.data;

            const totalTasks = tasks.length;
            const totalComplete = tasks.filter(task => task.status === 'Complete').length;
            const totalPending = tasks.filter(task => task.status === 'Pending').length;
            const totalInProgress = tasks.filter(task => task.status === 'In Progress').length;
            
            return{
                totalTasks,
                totalComplete,
                totalPending,
                totalInProgress,
                tasks
            }
        }
    })
     return { 
        statistics: data, 
        isLoading, 
        error 
    };
}