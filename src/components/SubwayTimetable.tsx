import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Train } from "lucide-react";
import { useState, useEffect } from "react";

const SUBWAY_DATA = {
  station: "솔샘역 (우이신설선)",
  weekday: {
    directions: [
      {
        name: "북한산보국문(신설동) 방면",
        times: ["05:42", "05:54", "06:06", "06:18", "06:25", "06:31", "06:37", "06:42", "06:47", "06:52"],
      },
      {
        name: "삼양사거리(북한산우이) 방면",
        times: ["05:41", "05:53", "06:05", "06:17", "06:29", "06:40", "06:48", "06:53", "06:58", "07:03"],
      },
    ],
  },
  weekend: {
    directions: [
      {
        name: "북한산보국문(신설동) 방면",
        times: ["06:02", "06:22", "06:42", "07:02", "07:22", "07:42"],
      },
      {
        name: "삼양사거리(북한산우이) 방면",
        times: ["06:05", "06:25", "06:45", "07:05", "07:25", "07:45"],
      },
    ],
  },
};

const SubwayTimetable = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const isWeekend = () => {
    const day = currentTime.getDay();
    return day === 0 || day === 6; // 0 = 일요일, 6 = 토요일
  };

  const findNextTrain = (times: string[]) => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    return times.findIndex((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      const trainTime = hours * 60 + minutes;
      return trainTime > now;
    });
  };

  const currentSchedule = isWeekend() ? SUBWAY_DATA.weekend : SUBWAY_DATA.weekday;
  const scheduleType = isWeekend() ? "주말/공휴일" : "평일";

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Train className="w-5 h-5 text-accent" />
          지하철 시간표
        </CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{SUBWAY_DATA.station}</p>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
            {scheduleType}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {currentSchedule.directions.map((direction, dirIdx) => {
            const nextTrainIdx = findNextTrain(direction.times);
            return (
              <div key={dirIdx}>
                <h3 className="font-medium mb-3 text-foreground">{direction.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {direction.times.map((time, idx) => (
                    <div
                      key={idx}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        idx === nextTrainIdx
                          ? "bg-primary text-primary-foreground shadow-md scale-105"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubwayTimetable;
