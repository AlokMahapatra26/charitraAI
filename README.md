# 🧠 Charitra AI – Character Bot WebApp 🧠 Charitra AI – Character Bot WebApp

Charitra AI is a web application that allows users to create, chat with, and share AI-powered character bots using just a name and description. Each character has a unique personality, powered by OpenAI's API.

---

## 🔧 Tech Stack

- **React 19 (Next.js App Router)**
- **Supabase** (Auth + Database)
- **OpenAI GPT API**
- **Drizzle ORM**
- **Tailwind CSS + Shadcn UI**
- **Lucide Icons**

---

## 🚀 Features

- 🧑 Create custom character bots with name and description  
- 🤖 Chat with your created bots  
- 🌍 Make bots public or private  
- 🔒 Auth system with Supabase  
- ⚙️ Clean and scalable codebase  

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/charitra-ai.git
cd charitra-ai
2. Install Dependencies
bash
Copy
Edit
npm install
# or
yarn install
3. Create Environment Variables
Create a .env.local file in the root of the project and add the following:

env
Copy
Edit
DATABASE_URL=your_postgres_connection_string

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

NEXT_PUBLIC_BASE_URL=http://localhost:3000

OPENAI_API_KEY=your_openai_api_key
🔑 Get your OpenAI API Key:
Visit https://platform.openai.com/account/api-keys to generate one.

4. Run the Development Server
bash
Copy
Edit
npm run dev
# or
yarn dev
App will be running at: http://localhost:3000

🧾 License
This project is licensed under the MIT License.

🙌 Contribution
Feel free to fork, raise issues, or open pull requests!
Let's build something awesome together 🚀

✨ Credits
Built with ❤️ using Next.js, Supabase, Drizzle, and OpenAI.

