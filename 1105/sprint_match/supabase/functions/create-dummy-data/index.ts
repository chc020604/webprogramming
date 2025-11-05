import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    console.log('Starting dummy data creation...')

    // 더미 사용자 데이터
    const dummyUsers = [
      // 고수 (5명)
      { email: 'codemaster@example.com', nickname: '김코드마스터', role: 'frontend', tech_stack: ['React', 'TypeScript', 'Next.js'], github_url: 'https://github.com/codemaster', notion_url: 'https://notion.so/codemaster', sprints_completed: 15, dropout_rate: 0, badges: 8 },
      { email: 'backendgod@example.com', nickname: '이백엔드신', role: 'backend', tech_stack: ['Spring', 'Java', 'MySQL'], github_url: 'https://github.com/backendgod', notion_url: 'https://notion.so/backendgod', sprints_completed: 18, dropout_rate: 0, badges: 10 },
      { email: 'designking@example.com', nickname: '박디자인왕', role: 'designer', tech_stack: ['Figma', 'Sketch', 'Adobe XD'], github_url: 'https://github.com/designking', notion_url: 'https://notion.so/designking', sprints_completed: 12, dropout_rate: 0, badges: 7 },
      { email: 'fullstack@example.com', nickname: '최풀스택', role: 'frontend', tech_stack: ['React', 'Node.js', 'MongoDB'], github_url: 'https://github.com/fullstack', notion_url: 'https://notion.so/fullstack', sprints_completed: 20, dropout_rate: 0, badges: 12 },
      { email: 'planner@example.com', nickname: '정기획전문', role: 'planner', tech_stack: ['Notion', 'Jira', 'Figma'], github_url: 'https://github.com/planner', notion_url: 'https://notion.so/planner', sprints_completed: 16, dropout_rate: 0, badges: 9 },
      
      // 중수 - 프론트엔드 (5명)
      { email: 'reactdev@example.com', nickname: '김리액트', role: 'frontend', tech_stack: ['React', 'JavaScript'], github_url: 'https://github.com/reactdev', notion_url: 'https://notion.so/reactdev', sprints_completed: 5, dropout_rate: 15, badges: 2 },
      { email: 'vuedev@example.com', nickname: '이뷰개발', role: 'frontend', tech_stack: ['Vue.js', 'TypeScript'], github_url: 'https://github.com/vuedev', notion_url: 'https://notion.so/vuedev', sprints_completed: 4, dropout_rate: 10, badges: 1 },
      { email: 'webdev@example.com', nickname: '박웹개발', role: 'frontend', tech_stack: ['React', 'TailwindCSS'], github_url: 'https://github.com/webdev', notion_url: 'https://notion.so/webdev', sprints_completed: 3, dropout_rate: 20, badges: 1 },
      { email: 'frontend@example.com', nickname: '최프론트', role: 'frontend', tech_stack: ['Next.js', 'React'], github_url: 'https://github.com/frontend', notion_url: 'https://notion.so/frontend', sprints_completed: 6, dropout_rate: 12, badges: 2 },
      { email: 'reactredux@example.com', nickname: '정자바', role: 'frontend', tech_stack: ['React', 'Redux'], github_url: 'https://github.com/reactredux', notion_url: 'https://notion.so/reactredux', sprints_completed: 4, dropout_rate: 18, badges: 1 },
      
      // 중수 - 백엔드 (5명)
      { email: 'springdev@example.com', nickname: '강스프링', role: 'backend', tech_stack: ['Spring', 'Java'], github_url: 'https://github.com/springdev', notion_url: 'https://notion.so/springdev', sprints_completed: 5, dropout_rate: 10, badges: 2 },
      { email: 'nodedev@example.com', nickname: '조노드', role: 'backend', tech_stack: ['Node.js', 'Express'], github_url: 'https://github.com/nodedev', notion_url: 'https://notion.so/nodedev', sprints_completed: 4, dropout_rate: 15, badges: 1 },
      { email: 'pythondev@example.com', nickname: '윤파이썬', role: 'backend', tech_stack: ['Python', 'FastAPI'], github_url: 'https://github.com/pythondev', notion_url: 'https://notion.so/pythondev', sprints_completed: 3, dropout_rate: 20, badges: 1 },
      { email: 'dbdev@example.com', nickname: '장디비', role: 'backend', tech_stack: ['PostgreSQL', 'MongoDB'], github_url: 'https://github.com/dbdev', notion_url: 'https://notion.so/dbdev', sprints_completed: 5, dropout_rate: 12, badges: 2 },
      { email: 'backend@example.com', nickname: '임백엔드', role: 'backend', tech_stack: ['Spring', 'MySQL'], github_url: 'https://github.com/backend', notion_url: 'https://notion.so/backend', sprints_completed: 4, dropout_rate: 18, badges: 1 },
      
      // 중수 - 디자이너 (3명)
      { email: 'designer1@example.com', nickname: '한디자인', role: 'designer', tech_stack: ['Figma', 'Adobe XD'], github_url: 'https://github.com/designer1', notion_url: 'https://notion.so/designer1', sprints_completed: 5, dropout_rate: 10, badges: 2 },
      { email: 'uidesign@example.com', nickname: '신UI', role: 'designer', tech_stack: ['Figma', 'Sketch'], github_url: 'https://github.com/uidesign', notion_url: 'https://notion.so/uidesign', sprints_completed: 4, dropout_rate: 15, badges: 1 },
      { email: 'uxdesign@example.com', nickname: '오UX', role: 'designer', tech_stack: ['Figma', 'Protopie'], github_url: 'https://github.com/uxdesign', notion_url: 'https://notion.so/uxdesign', sprints_completed: 3, dropout_rate: 12, badges: 1 },
      
      // 중수 - 기획자 (2명)
      { email: 'planner1@example.com', nickname: '송기획', role: 'planner', tech_stack: ['Notion', 'Jira'], github_url: 'https://github.com/planner1', notion_url: 'https://notion.so/planner1', sprints_completed: 4, dropout_rate: 15, badges: 1 },
      { email: 'pm@example.com', nickname: '전PM', role: 'planner', tech_stack: ['Figma', 'Notion'], github_url: 'https://github.com/pm', notion_url: 'https://notion.so/pm', sprints_completed: 5, dropout_rate: 10, badges: 2 },
      
      // 신입 (10명)
      { email: 'newfrontend1@example.com', nickname: '배신입프론트1', role: 'frontend', tech_stack: ['React'], github_url: 'https://github.com/newfrontend1', notion_url: '', sprints_completed: 0, dropout_rate: 0, badges: 0 },
      { email: 'newfrontend2@example.com', nickname: '서신입프론트2', role: 'frontend', tech_stack: ['JavaScript', 'HTML', 'CSS'], github_url: 'https://github.com/newfrontend2', notion_url: '', sprints_completed: 0, dropout_rate: 0, badges: 0 },
      { email: 'newfrontend3@example.com', nickname: '홍신입프론트3', role: 'frontend', tech_stack: ['Vue.js'], github_url: 'https://github.com/newfrontend3', notion_url: '', sprints_completed: 0, dropout_rate: 0, badges: 0 },
      { email: 'newbackend1@example.com', nickname: '허신입백엔드1', role: 'backend', tech_stack: ['Node.js'], github_url: 'https://github.com/newbackend1', notion_url: '', sprints_completed: 0, dropout_rate: 0, badges: 0 },
      { email: 'newbackend2@example.com', nickname: '구신입백엔드2', role: 'backend', tech_stack: ['Python'], github_url: 'https://github.com/newbackend2', notion_url: '', sprints_completed: 0, dropout_rate: 0, badges: 0 },
      { email: 'newbackend3@example.com', nickname: '권신입백엔드3', role: 'backend', tech_stack: ['Java'], github_url: 'https://github.com/newbackend3', notion_url: '', sprints_completed: 0, dropout_rate: 0, badges: 0 },
      { email: 'newdesigner1@example.com', nickname: '남신입디자이너1', role: 'designer', tech_stack: ['Figma'], github_url: 'https://github.com/newdesigner1', notion_url: '', sprints_completed: 0, dropout_rate: 0, badges: 0 },
      { email: 'newdesigner2@example.com', nickname: '채신입디자이너2', role: 'designer', tech_stack: ['Adobe XD'], github_url: 'https://github.com/newdesigner2', notion_url: '', sprints_completed: 0, dropout_rate: 0, badges: 0 },
      { email: 'newplanner1@example.com', nickname: '류신입기획1', role: 'planner', tech_stack: ['Notion'], github_url: 'https://github.com/newplanner1', notion_url: '', sprints_completed: 0, dropout_rate: 0, badges: 0 },
      { email: 'newplanner2@example.com', nickname: '문신입기획2', role: 'planner', tech_stack: ['Figma'], github_url: 'https://github.com/newplanner2', notion_url: '', sprints_completed: 0, dropout_rate: 0, badges: 0 },
    ]

    console.log(`Creating ${dummyUsers.length} dummy users...`)
    
    const createdUserIds: string[] = []
    
    for (const user of dummyUsers) {
      try {
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email: user.email,
          password: 'password123',
          email_confirm: true,
          user_metadata: {
            nickname: user.nickname,
            role: user.role,
            tech_stack: user.tech_stack
          }
        })

        if (authError) {
          console.error(`Error creating user ${user.email}:`, authError)
          continue
        }

        if (authData.user) {
          console.log(`Created user: ${user.nickname}`)
          createdUserIds.push(authData.user.id)
          
          // 프로필 업데이트
          const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .update({
              github_url: user.github_url,
              notion_url: user.notion_url,
              sprints_completed: user.sprints_completed,
              dropout_rate: user.dropout_rate,
              badges: user.badges
            })
            .eq('id', authData.user.id)

          if (profileError) {
            console.error(`Error updating profile for ${user.nickname}:`, profileError)
          }
        }
      } catch (err) {
        console.error(`Exception creating user ${user.email}:`, err)
      }
    }

    console.log(`Successfully created ${createdUserIds.length} users`)

    // 프로젝트 생성을 위해 첫 5명의 ID 사용
    if (createdUserIds.length < 5) {
      throw new Error('Not enough users created to generate projects')
    }

    // 프로젝트 생성
    const projects = [
      { title: 'MBTI 궁합 랜덤 채팅 웹', goal: 'Firebase 기반 실시간 채팅 배포', description: 'Firebase의 Realtime Database와 Authentication을 활용하여 실시간 1:1 채팅이 가능한 웹 애플리케이션을 개발합니다.', tech_stack: ['React', 'Firebase', 'TailwindCSS'], leader_id: createdUserIds[0], status: 'recruiting' },
      { title: 'AI 운동 루틴 추천 앱', goal: 'OpenAI API 활용한 개인화 추천', description: 'OpenAI API를 활용하여 사용자의 건강 데이터와 목표에 맞는 맞춤형 운동 루틴을 추천하는 앱을 개발합니다.', tech_stack: ['Next.js', 'OpenAI', 'MongoDB'], leader_id: createdUserIds[5], status: 'recruiting' },
      { title: '포모도로 타이머 + 할 일 관리', goal: '간단한 생산성 웹앱 제작', description: '포모도로 기법을 활용한 시간 관리와 할 일 목록을 통합한 생산성 향상 웹앱을 개발합니다.', tech_stack: ['Vue.js', 'Supabase'], leader_id: createdUserIds[6], status: 'recruiting' },
      { title: '음악 취향 분석 대시보드', goal: 'Spotify API로 통계 시각화', description: 'Spotify API를 활용하여 사용자의 음악 취향을 분석하고 시각화하는 대시보드를 개발합니다.', tech_stack: ['React', 'D3.js', 'Spotify API'], leader_id: createdUserIds[7], status: 'recruiting' },
      { title: '맛집 추천 SNS', goal: '위치 기반 맛집 공유 플랫폼', description: '사용자들이 방문한 맛집을 공유하고 위치 기반으로 주변 맛집을 추천받을 수 있는 SNS를 개발합니다.', tech_stack: ['React', 'Spring', 'MySQL'], leader_id: createdUserIds[10], status: 'recruiting' },
      { title: '영화 추천 챗봇', goal: 'AI 기반 영화 추천 시스템', description: 'AI를 활용하여 사용자의 취향에 맞는 영화를 추천하는 챗봇을 개발합니다.', tech_stack: ['Python', 'FastAPI', 'OpenAI'], leader_id: createdUserIds[12], status: 'recruiting' },
      { title: '반려동물 건강 일기', goal: '반려동물 건강 관리 앱', description: '반려동물의 건강 기록, 예방접종 일정, 병원 방문 기록 등을 관리하는 앱을 개발합니다.', tech_stack: ['React', 'Firebase', 'TypeScript'], leader_id: createdUserIds[15], status: 'recruiting' },
    ]

    const { data: projectsData, error: projectsError } = await supabaseAdmin
      .from('projects')
      .insert(projects)
      .select()

    if (projectsError) {
      console.error('Error creating projects:', projectsError)
      throw projectsError
    }

    console.log(`Created ${projectsData?.length} projects`)

    // 프로젝트 역할 설정
    if (projectsData && projectsData.length > 0) {
      const projectRoles = [
        { project_id: projectsData[0].id, role: 'designer', needed: 1, current: 0 },
        { project_id: projectsData[0].id, role: 'frontend', needed: 2, current: 0 },
        { project_id: projectsData[0].id, role: 'backend', needed: 1, current: 0 },
        
        { project_id: projectsData[1].id, role: 'planner', needed: 1, current: 0 },
        { project_id: projectsData[1].id, role: 'frontend', needed: 1, current: 0 },
        { project_id: projectsData[1].id, role: 'backend', needed: 1, current: 0 },
        
        { project_id: projectsData[2].id, role: 'designer', needed: 1, current: 0 },
        { project_id: projectsData[2].id, role: 'frontend', needed: 2, current: 0 },
        
        { project_id: projectsData[3].id, role: 'frontend', needed: 2, current: 0 },
        { project_id: projectsData[3].id, role: 'backend', needed: 1, current: 0 },
        
        { project_id: projectsData[4].id, role: 'designer', needed: 1, current: 0 },
        { project_id: projectsData[4].id, role: 'frontend', needed: 1, current: 0 },
        { project_id: projectsData[4].id, role: 'backend', needed: 2, current: 0 },
        
        { project_id: projectsData[5].id, role: 'frontend', needed: 1, current: 0 },
        { project_id: projectsData[5].id, role: 'backend', needed: 2, current: 0 },
        
        { project_id: projectsData[6].id, role: 'designer', needed: 1, current: 0 },
        { project_id: projectsData[6].id, role: 'frontend', needed: 2, current: 0 },
      ]

      const { error: rolesError } = await supabaseAdmin
        .from('project_roles')
        .insert(projectRoles)

      if (rolesError) {
        console.error('Error creating project roles:', rolesError)
      } else {
        console.log(`Created ${projectRoles.length} project roles`)
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully created ${createdUserIds.length} users and ${projectsData?.length} projects`,
        userIds: createdUserIds
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in create-dummy-data:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})