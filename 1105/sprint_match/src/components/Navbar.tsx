import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Zap className="w-6 h-6 text-primary" />
          <span>Sprint Match</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/projects" className="text-foreground hover:text-primary transition-smooth">
            퀘스트 탐색
          </Link>
          <Link to="/ranking" className="text-foreground hover:text-primary transition-smooth">
            스프린터 랭킹
          </Link>
          <div className="flex items-center gap-3 ml-4">
            <Button variant="ghost" asChild>
              <Link to="/login">로그인</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/signup">회원가입</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
