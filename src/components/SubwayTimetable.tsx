import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Train } from "lucide-react";
import { useState, useEffect } from "react";

const SUBWAY_DATA = {
  station: "솔샘역 (우이신설선)",
  directions: [
    {
      name: "삼양사거리 방면",
      times: ["05:41", "05:53", "06:05", "06:17", "06:29", "06:40", "06:48", "06:53"],
    },
    {
      name: "북한산보국문 방면",
      times: ["05:42", "05:54", "06:06", "06:18", "06:25", "06:31", "06:37", "06:42"],
    },
  ],
};

const SubwayTimetable = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const findNextTrain = (times: string[]) => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    return times.findIndex((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      const trainTime = hours * 60 + minutes;
      return trainTime > now;
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Train className="w-5 h-5 text-accent" />
          지하철 시간표
        </CardTitle>
        <p className="text-sm text-muted-foreground">{SUBWAY_DATA.station}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {SUBWAY_DATA.directions.map((direction, dirIdx) => {
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
