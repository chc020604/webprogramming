import Navbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "@/components/ProjectCard";
import { Github, ExternalLink, Award, TrendingUp, AlertCircle } from "lucide-react";

const UserProfile = () => {
  const mockProjects = [
    {
      id: "1",
      title: "MBTI 궁합 랜덤 채팅 웹",
      goal: "Firebase 기반 실시간 채팅 배포",
      daysLeft: 7,
      techStack: ["React", "Firebase", "TailwindCSS"],
      roles: [
        { role: "디자이너", current: 1, needed: 1 },
        { role: "프론트엔드", current: 0, needed: 2 },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="space-y-6">
            <div className="gradient-card p-6 rounded-xl border border-border sticky top-24">
              <div className="text-center mb-6">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>김</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">김개발</h2>
                <p className="text-muted-foreground">프론트엔드 개발자</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-lg bg-background/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">완주한 스프린트</span>
                    <TrendingUp className="w-4 h-4 text-success" />
                  </div>
                  <p className="text-3xl font-bold text-primary">7회</p>
                </div>

                <div className="p-4 rounded-lg bg-background/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">중도 이탈률</span>
                    <AlertCircle className="w-4 h-4 text-destructive" />
                  </div>
                  <p className="text-3xl font-bold text-destructive">10%</p>
                </div>

                <div className="p-4 rounded-lg bg-background/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">획득한 배지</span>
                    <Award className="w-4 h-4 text-warning" />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                      <Award className="w-5 h-5 text-warning" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                      <Award className="w-5 h-5 text-success" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <h3 className="text-sm font-semibold">기술 스택</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">TailwindCSS</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">Firebase</Badge>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="flex-1">
                  <Github className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="flex-1">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Activity Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="w-full justify-start mb-6">
                <TabsTrigger value="projects">참여한 프로젝트 (7)</TabsTrigger>
                <TabsTrigger value="reviews">작성한 리뷰 (5)</TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {[...mockProjects, ...mockProjects, ...mockProjects].map((project, i) => (
                    <ProjectCard key={i} {...project} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="gradient-card p-6 rounded-xl border border-border">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>이</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-semibold">이디자인</p>
                          <Badge variant="secondary" className="text-xs">디자이너</Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">
                          "정말 열정적으로 프로젝트에 임해주셨습니다. 빠른 응답과 높은 퀄리티의 작업물 덕분에 
                          프로젝트를 성공적으로 완주할 수 있었습니다. 다음에도 꼭 함께하고 싶습니다!"
                        </p>
                        <p className="text-xs text-muted-foreground">MBTI 궁합 랜덤 채팅 웹 • 2024.03</p>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
