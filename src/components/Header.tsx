import "@/styles/globals.css";
import { getUser } from "@/auth/server";
import { Navbar } from "@/components/Navbar";

async function Header() {

  const user = await getUser();
  
  
  

  return (
    <Navbar user={user}/>
  );
}

export default Header;