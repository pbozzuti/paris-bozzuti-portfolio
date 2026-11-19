import HomeSkills from "../components/HomeSkills";
import ParisBozzutiHeader from "../components/ParisBozzutiHeader";
import LastCommit from "../components/LastCommit";
import FitbitWidget from "../components/FitbitWidget";


export default function Home() {
  return (
    <main className="pariz-bozzuti-homepage flex flex-col items-center w-full px-[5%] py-[5%] lg:px-24 lg:pt-24 ">

      <ParisBozzutiHeader />


      <HomeSkills />

      
      {/* stacked on mobile, side by side on desktop */}
      <div className="w-full flex flex-col lg:flex-row lg:items-stretch items-center justify-center gap-4">
        <LastCommit />
        <FitbitWidget />
      </div>

    </main>
  );
}
