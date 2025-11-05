-- 프로필 테이블
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('frontend', 'backend', 'designer', 'planner')),
  tech_stack TEXT[] DEFAULT '{}',
  github_url TEXT,
  notion_url TEXT,
  sprints_completed INTEGER DEFAULT 0,
  dropout_rate NUMERIC(5,2) DEFAULT 0,
  badges INTEGER DEFAULT 0,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 프로젝트 테이블
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  goal TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  leader_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'recruiting' CHECK (status IN ('recruiting', 'in_progress', 'completed')),
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  github_url TEXT,
  demo_url TEXT,
  figma_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are viewable by everyone"
  ON public.projects FOR SELECT
  USING (true);

CREATE POLICY "Leaders can update their projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() = leader_id);

CREATE POLICY "Authenticated users can create projects"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = leader_id);

-- 프로젝트 역할 (모집 포지션)
CREATE TABLE public.project_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('frontend', 'backend', 'designer', 'planner')),
  needed INTEGER NOT NULL CHECK (needed > 0),
  current INTEGER DEFAULT 0 CHECK (current >= 0)
);

ALTER TABLE public.project_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Project roles are viewable by everyone"
  ON public.project_roles FOR SELECT
  USING (true);

CREATE POLICY "Project leaders can manage roles"
  ON public.project_roles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_roles.project_id
      AND projects.leader_id = auth.uid()
    )
  );

-- 지원
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('frontend', 'backend', 'designer', 'planner')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, user_id, role)
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own applications"
  ON public.applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Project leaders can view applications to their projects"
  ON public.applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = applications.project_id
      AND projects.leader_id = auth.uid()
    )
  );

CREATE POLICY "Users can create applications"
  ON public.applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Project leaders can update applications"
  ON public.applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = applications.project_id
      AND projects.leader_id = auth.uid()
    )
  );

-- 팀원
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('frontend', 'backend', 'designer', 'planner')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members are viewable by everyone"
  ON public.team_members FOR SELECT
  USING (true);

CREATE POLICY "Project leaders can manage team members"
  ON public.team_members FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = team_members.project_id
      AND projects.leader_id = auth.uid()
    )
  );

-- 칸반 태스크
CREATE TABLE public.kanban_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.kanban_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view kanban tasks"
  ON public.kanban_tasks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_members.project_id = kanban_tasks.project_id
      AND team_members.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = kanban_tasks.project_id
      AND projects.leader_id = auth.uid()
    )
  );

CREATE POLICY "Team members can manage kanban tasks"
  ON public.kanban_tasks FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_members.project_id = kanban_tasks.project_id
      AND team_members.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = kanban_tasks.project_id
      AND projects.leader_id = auth.uid()
    )
  );

-- 메시지/메모
CREATE TABLE public.sprint_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.sprint_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view messages"
  ON public.sprint_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_members.project_id = sprint_messages.project_id
      AND team_members.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = sprint_messages.project_id
      AND projects.leader_id = auth.uid()
    )
  );

CREATE POLICY "Team members can send messages"
  ON public.sprint_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND (
      EXISTS (
        SELECT 1 FROM public.team_members
        WHERE team_members.project_id = sprint_messages.project_id
        AND team_members.user_id = auth.uid()
      )
      OR
      EXISTS (
        SELECT 1 FROM public.projects
        WHERE projects.id = sprint_messages.project_id
        AND projects.leader_id = auth.uid()
      )
    )
  );

-- 리뷰
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  reviewee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  would_work_again BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, reviewer_id, reviewee_id)
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view reviews they gave or received"
  ON public.reviews FOR SELECT
  USING (auth.uid() = reviewer_id OR auth.uid() = reviewee_id);

CREATE POLICY "Team members can create reviews"
  ON public.reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = reviewer_id
    AND (
      EXISTS (
        SELECT 1 FROM public.team_members
        WHERE team_members.project_id = reviews.project_id
        AND team_members.user_id = auth.uid()
      )
      OR
      EXISTS (
        SELECT 1 FROM public.projects
        WHERE projects.id = reviews.project_id
        AND projects.leader_id = auth.uid()
      )
    )
  );

-- 프로필 자동 생성 트리거
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, nickname, role, tech_stack)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nickname', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'frontend'),
    COALESCE(
      ARRAY(SELECT jsonb_array_elements_text(NEW.raw_user_meta_data->'tech_stack')),
      '{}'::TEXT[]
    )
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 리뷰 집계 함수
CREATE OR REPLACE FUNCTION public.update_profile_stats(p_user_id UUID, p_project_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  positive_reviews INTEGER;
  total_reviews INTEGER;
BEGIN
  -- 완주 횟수 증가
  UPDATE public.profiles
  SET sprints_completed = sprints_completed + 1
  WHERE id = p_user_id;
  
  -- 리뷰 집계
  SELECT 
    COUNT(*) FILTER (WHERE would_work_again = true),
    COUNT(*)
  INTO positive_reviews, total_reviews
  FROM public.reviews
  WHERE reviewee_id = p_user_id AND project_id = p_project_id;
  
  -- 중도 이탈률 업데이트
  IF total_reviews > 0 THEN
    UPDATE public.profiles
    SET 
      dropout_rate = CASE
        WHEN positive_reviews::NUMERIC / total_reviews >= 0.7 THEN GREATEST(dropout_rate - 5, 0)
        ELSE LEAST(dropout_rate + 10, 100)
      END,
      badges = CASE
        WHEN positive_reviews::NUMERIC / total_reviews >= 0.8 THEN badges + 1
        ELSE badges
      END
    WHERE id = p_user_id;
  END IF;
END;
$$;