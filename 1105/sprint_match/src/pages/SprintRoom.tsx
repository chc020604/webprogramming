import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Github, ExternalLink, Plus } from "lucide-react";

const SprintRoom = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const kanbanColumns = [
    { id: "todo", title: "To Do", tasks: ["로그인 UI 구현", "Firebase 연동", "라우팅 설정"] },
    { id: "inprogress", title: "In Progress", tasks: ["채팅 컴포넌트 제작", "MBTI 매칭 로직"] },
    { id: "done", title: "Done", tasks: ["프로젝트 초기 설정", "디자인 시스템 구축"] },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Countdown Header */}
        <div className="gradient-card p-8 rounded-xl border border-primary/50 mb-8 text-center shadow-glow">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">스프린트 종료까지</h2>
          </div>
          <div className="flex justify-center gap-4 mb-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary">{String(timeLeft.days).padStart(2, '0')}</div>
              <div className="text-sm text-muted-foreground">일</div>
            </div>
            <div className="text-5xl font-bold">:</div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-sm text-muted-foreground">시간</div>
            </div>
            <div className="text-5xl font-bold">:</div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-sm text-muted-foreground">분</div>
            </div>
            <div className="text-5xl font-bold">:</div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-sm text-muted-foreground">초</div>
            </div>
          </div>
          <Button className="gradient-primary shadow-glow" size="lg">
            <CheckCircle2 className="w-5 h-5 mr-2" />
            프로젝트 완료 제출하기
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="kanban" className="w-full">
              <TabsList className="w-full justify-start mb-6">
                <TabsTrigger value="kanban">칸반 보드</TabsTrigger>
                <TabsTrigger value="chat">실시간 메모/채팅</TabsTrigger>
                <TabsTrigger value="links">산출물 링크</TabsTrigger>
              </TabsList>

              <TabsContent value="kanban">
                <div className="grid md:grid-cols-3 gap-4">
                  {kanbanColumns.map((column) => (
                    <div key={column.id} className="gradient-card p-4 rounded-xl border border-border">
                      <h3 className="font-bold mb-4 flex items-center justify-between">
                        {column.title}
                        <Badge variant="secondary">{column.tasks.length}</Badge>
                      </h3>
                      <div className="space-y-2">
                        {column.tasks.map((task, i) => (
                          <div key={i} className="p-3 rounded-lg bg-background/50 border border-border hover:border-primary/50 transition-smooth cursor-pointer">
                            <p className="text-sm">{task}</p>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full" size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          추가
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="chat">
                <div className="gradient-card p-6 rounded-xl border border-border">
                  <div className="h-96 overflow-y-auto mb-4 space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>김</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm">김개발</span>
                            <span className="text-xs text-muted-foreground">오후 2:30</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            로그인 UI 작업 완료했습니다. 확인 부탁드려요!
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Textarea placeholder="메시지를 입력하세요..." className="min-h-[60px]" />
                    <Button className="gradient-primary">전송</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="links">
                <div className="gradient-card p-6 rounded-xl border border-border space-y-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">GitHub Repository</label>
                    <div className="flex gap-2">
                      <Input placeholder="https://github.com/..." />
                      <Button size="icon" variant="outline">
                        <Github className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Demo URL</label>
                    <div className="flex gap-2">
                      <Input placeholder="https://..." />
                      <Button size="icon" variant="outline">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Figma Design</label>
                    <div className="flex gap-2">
                      <Input placeholder="https://figma.com/..." />
                      <Button size="icon" variant="outline">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full gradient-primary">링크 저장</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Team Sidebar */}
          <div className="gradient-card p-6 rounded-xl border border-border h-fit sticky top-24">
            <h3 className="text-xl font-bold mb-4">팀 멤버</h3>
            <div className="space-y-3">
              {["김개발", "이디자인", "박백엔드"].map((name, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>{name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{name}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-success" />
                      <span className="text-xs text-muted-foreground">온라인</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SprintRoom;
