import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Projects = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [isCreatingDummy, setIsCreatingDummy] = useState(false);

  const roles = ["프론트엔드", "백엔드", "디자이너", "기획자"];
  const techStack = ["React", "Spring", "Figma", "Python", "Vue.js", "Firebase"];

  const { data: projects, isLoading, refetch } = useProjects('recruiting');

  const roleMap: Record<string, string> = {
    "프론트엔드": "frontend",
    "백엔드": "backend",
    "디자이너": "designer",
    "기획자": "planner",
    "frontend": "프론트엔드",
    "backend": "백엔드",
    "designer": "디자이너",
    "planner": "기획자",
  };

  const createDummyData = async () => {
    setIsCreatingDummy(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-dummy-data');
      
      if (error) throw error;
      
      toast.success('더미 데이터가 성공적으로 생성되었습니다!');
      refetch();
    } catch (error: any) {
      console.error('Error creating dummy data:', error);
      toast.error('더미 데이터 생성 실패: ' + (error.message || '알 수 없는 오류'));
    } finally {
      setIsCreatingDummy(false);
    }
  };

  const filteredProjects = projects?.filter(project => {
    if (selectedRole) {
      const roleEng = roleMap[selectedRole];
      const hasRole = project.roles?.some((r: any) => r.role === roleEng);
      if (!hasRole) return false;
    }
    
    if (selectedTech) {
      const hasTech = project.tech_stack?.includes(selectedTech);
      if (!hasTech) return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">퀘스트 탐색</h1>
          <Button 
            onClick={createDummyData} 
            disabled={isCreatingDummy}
            variant="outline"
          >
            {isCreatingDummy ? '생성 중...' : '더미 데이터 생성'}
          </Button>
        </div>
        
        {/* Search and Filter */}
        <div className="gradient-card p-6 rounded-xl border border-border mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="프로젝트명, 기술 스택 검색..." 
                className="pl-10 bg-background/50"
              />
            </div>
            <Button variant="outline" className="md:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              필터
            </Button>
          </div>
          
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-2">역할</p>
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <Badge
                    key={role}
                    variant={selectedRole === role ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/20 transition-smooth"
                    onClick={() => setSelectedRole(selectedRole === role ? null : role)}
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">기술 스택</p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant={selectedTech === tech ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/20 transition-smooth"
                    onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        {isLoading ? (
          <div className="text-center py-12">로딩 중...</div>
        ) : filteredProjects && filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                id={project.id}
                title={project.title}
                goal={project.goal}
                daysLeft={project.daysLeft}
                techStack={project.tech_stack}
                roles={project.roles.map(r => ({
                  role: roleMap[r.role] || r.role,
                  current: r.current,
                  needed: r.needed
                }))}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {projects?.length === 0 
                ? '아직 등록된 프로젝트가 없습니다. 더미 데이터를 생성해보세요!' 
                : '선택한 필터에 맞는 프로젝트가 없습니다.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
