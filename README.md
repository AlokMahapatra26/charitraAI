# 🧠 Charitra AI

Charitra AI is a web app where users can create AI character bots using just a name and description. Users can chat with their characters and share them publicly.

## 🔧 Tech Stack
- Next.js 15
- Supabase (Auth + DB)
- OpenAI API
- Drizzle ORM
- Tailwind CSS + Shadcn UI

## 🚀 Getting Started

1. Clone the repo:
   git clone https://github.com/AlokMahapatra26/charitraAI.git
   cd charitra-ai

2. Install dependencies:
   npm install

3. Create a `.env.local` file and add the following:

   DATABASE_URL=your_postgres_url  
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url  
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key  
   NEXT_PUBLIC_BASE_URL=http://localhost:3000  
   OPENAI_API_KEY=your_openai_key  

4. Run the app:
   npm run dev

App will be running at: http://localhost:3000

---

Built with ❤️ using OpenAI, Supabase, and Next.js.
