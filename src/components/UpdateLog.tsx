import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle2 } from "lucide-react";

const UpdateLog = () => {
  const now = new Date();
  const isWeekday = now.getDay() >= 1 && now.getDay() <= 5;
  const lastUpdate = now.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          자동 실행 로그
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-foreground font-medium">
                {isWeekday
                  ? "오늘은 평일이므로 루틴이 실행되었습니다 ✅"
                  : "오늘은 휴일이므로 루틴이 건너뜀 💤"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">마지막 업데이트: {lastUpdate}</p>
            </div>
          </div>
          <div className="p-3 bg-secondary rounded-lg">
            <p className="text-xs text-muted-foreground">
              평일 오전 5시에 자동으로 업데이트됩니다.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateLog;
