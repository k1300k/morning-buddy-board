import DailyHeader from "@/components/DailyHeader";
import CommuteChecklist from "@/components/CommuteChecklist";
import WeatherCard from "@/components/WeatherCard";
import SubwayTimetable from "@/components/SubwayTimetable";
import UpdateLog from "@/components/UpdateLog";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--morning-gradient-start))] to-[hsl(var(--morning-gradient-end))] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <DailyHeader />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <CommuteChecklist />
          </div>
          
          <div className="lg:col-span-1">
            <WeatherCard />
          </div>
          
          <div className="lg:col-span-1">
            <UpdateLog />
          </div>
          
          <div className="lg:col-span-3">
            <SubwayTimetable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
