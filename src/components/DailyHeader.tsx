import { Sun } from "lucide-react";
import ProgramInfoModal from "./ProgramInfoModal";

const DailyHeader = () => {
  const today = new Date();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dateString = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 (${days[today.getDay()]})`;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <Sun className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">좋은 아침이에요 ☀️</h1>
        </div>
        <ProgramInfoModal />
      </div>
      <p className="text-muted-foreground text-lg">{dateString}</p>
    </div>
  );
};

export default DailyHeader;
