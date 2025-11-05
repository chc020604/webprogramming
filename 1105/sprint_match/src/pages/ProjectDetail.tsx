import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Users, Github, ExternalLink } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">MBTI 궁합 랜덤 채팅 웹</h1>
                <div className="flex items-center gap-2 text-destructive font-semibold">
                  <Clock className="w-5 h-5" />
                  <span className="text-xl">D-7</span>
                </div>
              </div>
            </div>

            <div className="gradient-card p-6 rounded-xl border border-border">
              <h2 className="text-2xl font-bold mb-4">프로젝트 목표</h2>
              <p className="text-muted-foreground leading-relaxed">
                Firebase의 Realtime Database와 Authentication을 활용하여 실시간 1:1 채팅이 가능한 웹 애플리케이션을 개발합니다. 
                MBTI 유형을 기반으로 궁합이 좋은 상대와 랜덤 매칭되는 시스템을 구현합니다.
              </p>
            </div>

            <div className="gradient-card p-6 rounded-xl border border-border">
              <h2 className="text-2xl font-bold mb-4">필요 기술</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• React Hooks (useState, useEffect, useContext)</li>
                <li>• Firebase Realtime Database 및 Authentication</li>
                <li>• TailwindCSS를 활용한 반응형 UI 구현</li>
                <li>• 실시간 데이터 동기화 처리</li>
              </ul>
            </div>

            <div className="gradient-card p-6 rounded-xl border border-border">
              <h2 className="text-2xl font-bold mb-4">이런 분을 원해요</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 매일 1시간 이상 작업 시간을 확보할 수 있는 분</li>
                <li>• Git을 통한 협업 경험이 있는 분</li>
                <li>• 적극적으로 소통하고 문제를 해결하려는 의지가 있는 분</li>
                <li>• 마지막까지 책임감 있게 완주할 수 있는 분</li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="gradient-card p-6 rounded-xl border border-border sticky top-24">
              <h3 className="text-xl font-bold mb-4">팀 현황</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">리더</p>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>김</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">김개발</p>
                      <p className="text-xs text-muted-foreground">프론트엔드 개발자</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">디자이너 (1/1)</p>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 opacity-60">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>이</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">이디자인</p>
                      <p className="text-xs text-muted-foreground">UI/UX 디자이너</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">프론트엔드 (0/2)</p>
                  <Button className="w-full gradient-primary shadow-glow">
                    <Users className="w-4 h-4 mr-2" />
                    지원하기
                  </Button>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">백엔드 (1/1)</p>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 opacity-60">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>박</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">박백엔드</p>
                      <p className="text-xs text-muted-foreground">백엔드 개발자</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-sm font-semibold mb-3">기술 스택</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Firebase</Badge>
                  <Badge variant="secondary">TailwindCSS</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="icon">
                  <Github className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
