import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Award, TrendingUp } from "lucide-react";

const Ranking = () => {
  const topSprinters = [
    { rank: 1, name: "김개발", role: "프론트엔드", completed: 15, rate: "0%" },
    { rank: 2, name: "이디자인", role: "디자이너", completed: 12, rate: "5%" },
    { rank: 3, name: "박백엔드", role: "백엔드", completed: 11, rate: "8%" },
    { rank: 4, name: "최기획", role: "기획자", completed: 10, rate: "10%" },
    { rank: 5, name: "정풀스택", role: "풀스택", completed: 9, rate: "11%" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        <h1 className="text-4xl font-bold mb-2">스프린터 랭킹</h1>
        <p className="text-muted-foreground mb-8">완주율이 높고 평판이 좋은 우수 팀원들입니다.</p>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          {topSprinters.slice(0, 3).map((sprinter, i) => {
            const heights = ["h-72", "h-80", "h-64"];
            const colors = ["bg-warning/10", "bg-primary/10", "bg-muted"];
            const borderColors = ["border-warning", "border-primary", "border-muted"];
            
            return (
              <Link key={sprinter.rank} to="/profile">
                <div className={`gradient-card p-6 rounded-xl border-2 ${borderColors[i]} ${heights[i]} flex flex-col items-center justify-end hover:shadow-glow transition-smooth cursor-pointer`}>
                  <div className="text-center mb-4">
                    <div className={`w-16 h-16 rounded-full ${colors[i]} flex items-center justify-center mx-auto mb-3 border-2 ${borderColors[i]}`}>
                      <Award className="w-8 h-8" />
                    </div>
                    <div className="text-4xl font-bold mb-2">#{sprinter.rank}</div>
                    <Avatar className="w-20 h-20 mx-auto mb-3">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>{sprinter.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold">{sprinter.name}</h3>
                    <Badge variant="secondary" className="mt-2">{sprinter.role}</Badge>
                    <div className="mt-4 space-y-1">
                      <div className="flex items-center justify-center gap-2 text-primary">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-semibold">{sprinter.completed}회 완주</span>
                      </div>
                      <p className="text-sm text-success">이탈률 {sprinter.rate}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Rest of Rankings */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">전체 랭킹</h2>
          <div className="space-y-3">
            {topSprinters.map((sprinter) => (
              <Link key={sprinter.rank} to="/profile">
                <div className="gradient-card p-6 rounded-xl border border-border hover:border-primary/50 transition-smooth cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="text-3xl font-bold text-muted-foreground w-12">
                      #{sprinter.rank}
                    </div>
                    <Avatar className="w-16 h-16">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>{sprinter.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{sprinter.name}</h3>
                      <Badge variant="secondary">{sprinter.role}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-primary mb-1">
                        <TrendingUp className="w-5 h-5" />
                        <span className="text-2xl font-bold">{sprinter.completed}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">회 완주</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-success">{sprinter.rate}</p>
                      <p className="text-sm text-muted-foreground">이탈률</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
