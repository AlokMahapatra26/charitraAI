import AllCharacters from "@/components/AllCharacters";
import { getUser } from "@/auth/server";
import IntroPage from "@/components/IntroPage";

export default async function Home() {

  const user = await getUser();
  return (
    <>
      {user ? <AllCharacters/> : <IntroPage/>}
      <div className="h-[100px]"></div>

      
    </>
  );
}
