import HomeSkills from "../components/HomeSkills";
import ParisBozzutiHeader from "../components/ParisBozzutiHeader";
import LastCommit from "../components/LastCommit";


export default function Home() {
  return (
    <main className="pariz-bozzuti-homepage flex flex-col items-center w-full px-[5%] py-[5%] lg:px-24 lg:pt-24 ">

      <ParisBozzutiHeader />


      <HomeSkills />

      
      <LastCommit />
      
    </main>
  );
}
