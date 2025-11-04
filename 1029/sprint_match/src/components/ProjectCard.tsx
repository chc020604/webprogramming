import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";

interface ProjectCardProps {
  id: string;
  title: string;
  goal: string;
  daysLeft: number;
  techStack: string[];
  roles: {
    role: string;
    current: number;
    needed: number;
  }[];
}

const ProjectCard = ({ id, title, goal, daysLeft, techStack, roles }: ProjectCardProps) => {
  return (
    <Link to={`/projects/${id}`}>
      <div className="gradient-card p-6 rounded-xl border border-border hover:border-primary/50 transition-smooth shadow-card hover:shadow-glow hover:-translate-y-1 cursor-pointer h-full">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex items-center gap-1 text-destructive font-semibold">
            <Clock className="w-4 h-4" />
            <span>D-{daysLeft}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">{goal}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="space-y-2 pt-4 border-t border-border">
          {roles.map((role) => (
            <div key={role.role} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>{role.role}</span>
              </div>
              <span className={role.current >= role.needed ? "text-muted-foreground" : "text-primary"}>
                {role.current}/{role.needed}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
