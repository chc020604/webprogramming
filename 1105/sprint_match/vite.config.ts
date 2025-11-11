import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // 또는 '@vitejs/plugin-react' (사용 중인 것에 맞게)

export default defineConfig({
  plugins: [react()],
  base: '/webprogramming/', // 중요: 저장소 이름 앞뒤로 슬래시 붙이기
})
