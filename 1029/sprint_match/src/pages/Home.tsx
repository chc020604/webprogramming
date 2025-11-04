import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { ArrowRight, Target, Users, Award, CheckCircle2 } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";

const Home = () => {
  const { data: projects, isLoading } = useProjects('recruiting');
  
  const roleMap: Record<string, string> = {
    "frontend": "프론트엔드",
    "backend": "백엔드",
    "designer": "디자이너",
    "planner": "기획자",
  };

  const displayProjects = projects?.slice(0, 4) || [];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              3개월짜리 계획보다,<br />7일짜리 '완주'를 경험하세요.
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              스프린트 매치에서 '잠수' 걱정 없는 초단기 사이드 프로젝트 팀원을 찾아보세요.<br />
              <span className="text-sm">(웹프로그래밍 기말 프로젝트)</span>
            </p>
            <Button size="lg" asChild className="gradient-primary text-lg px-8 py-6 shadow-glow hover:shadow-glow">
              <Link to="/projects">
                지금 퀘스트 탐색하기 <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">작동 방식</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">퀘스트 등록/지원</h3>
              <p className="text-muted-foreground">
                7일짜리 명확한 목표를 가진 프로젝트에 지원하세요.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">스프린트 룸 협업</h3>
              <p className="text-muted-foreground">
                전용 협업 공간에서 7일간 집중적으로 달립니다.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">'완주' 및 평판 획득</h3>
              <p className="text-muted-foreground">
                프로젝트를 완주하고 프로필에 '배지'를 획득하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Quest Board */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold">방금 시작된 퀘스트</h2>
            <Button variant="ghost" asChild className="text-primary">
              <Link to="/projects">
                더 많은 퀘스트 보기 <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
          {isLoading ? (
            <div className="text-center py-12">로딩 중...</div>
          ) : displayProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayProjects.map((project) => (
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
              <p className="text-muted-foreground">아직 등록된 프로젝트가 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">7일 만에 완성된 프로젝트들</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="gradient-card p-6 rounded-xl border border-border">
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-success" />
                </div>
                <p className="text-sm text-muted-foreground">
                  "7일 만에 React와 Firebase로 실시간 채팅 웹을 만들었습니다. 정말 뿌듯해요!"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">당신의 첫 번째 '완주'를 지금 시작하세요.</h2>
          <Button size="lg" asChild className="gradient-primary text-lg px-8 py-6 shadow-glow">
            <Link to="/signup">
              회원가입하고 시작하기 <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
