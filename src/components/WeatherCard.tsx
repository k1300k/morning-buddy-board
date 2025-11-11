import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Wind } from "lucide-react";

// Mock data for now - will be replaced with API call
const mockWeatherData = {
  temp: 18,
  feelsLike: 16,
  sky: "맑음",
  rainChance: 20,
  fineDust: "좋음",
  tip: "가벼운 외투 챙기세요",
};

const WeatherCard = () => {
  const getWeatherIcon = (sky: string) => {
    switch (sky) {
      case "비":
        return <CloudRain className="w-8 h-8 text-accent" />;
      case "흐림":
        return <Cloud className="w-8 h-8 text-muted-foreground" />;
      default:
        return <Sun className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getWeatherIcon(mockWeatherData.sky)}
          오늘의 날씨
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-primary">{mockWeatherData.temp}°</span>
            <span className="text-muted-foreground">체감 {mockWeatherData.feelsLike}°</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">날씨</p>
              <p className="text-lg font-medium">{mockWeatherData.sky}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">강수확률</p>
              <p className="text-lg font-medium">{mockWeatherData.rainChance}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">미세먼지</p>
              <p className="text-lg font-medium">{mockWeatherData.fineDust}</p>
            </div>
            <div className="col-span-2 mt-2 p-3 bg-secondary rounded-lg">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-accent" />
                <p className="text-sm font-medium">{mockWeatherData.tip}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
