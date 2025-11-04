import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ProjectRole {
  role: string;
  needed: number;
  current: number;
}

export interface Project {
  id: string;
  title: string;
  goal: string;
  tech_stack: string[];
  status: string;
  leader_id: string;
  roles: ProjectRole[];
  daysLeft?: number;
  created_at: string;
  start_date?: string;
  end_date?: string;
}

export const useProjects = (status?: string) => {
  return useQuery({
    queryKey: ['projects', status],
    queryFn: async () => {
      let query = supabase
        .from('projects')
        .select(`
          *,
          project_roles (
            role,
            needed,
            current
          )
        `)
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data?.map(project => ({
        ...project,
        roles: project.project_roles as ProjectRole[],
        daysLeft: project.end_date 
          ? Math.ceil((new Date(project.end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
          : undefined
      })) || [];
    },
  });
};