import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle2, Plus, Trash2, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const UpdateLog = () => {
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [urls, setUrls] = useState<string[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  // 실시간 시계 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // localStorage에서 URL 목록 불러오기
  useEffect(() => {
    const savedUrls = localStorage.getItem("autoOpenUrls");
    if (savedUrls) {
      setUrls(JSON.parse(savedUrls));
    }
  }, []);

  // 페이지 로드 시 등록된 URL 자동으로 열기 (한 번만)
  useEffect(() => {
    if (!hasAutoOpened && urls.length > 0) {
      urls.forEach(url => {
        window.open(url, '_blank');
      });
      setHasAutoOpened(true);
      toast({
        title: "웹페이지 자동 실행",
        description: `${urls.length}개의 등록된 웹페이지를 열었습니다.`,
      });
    }
  }, [urls, hasAutoOpened, toast]);

  const addUrl = () => {
    if (!newUrl.trim()) return;
    
    try {
      new URL(newUrl); // URL 유효성 검사
      const updatedUrls = [...urls, newUrl];
      setUrls(updatedUrls);
      localStorage.setItem("autoOpenUrls", JSON.stringify(updatedUrls));
      setNewUrl("");
      toast({
        title: "URL 등록 완료",
        description: "웹페이지가 등록되었습니다. 다음 방문 시 자동으로 열립니다.",
      });
    } catch {
      toast({
        title: "오류",
        description: "올바른 URL 형식이 아닙니다. (예: https://example.com)",
        variant: "destructive",
      });
    }
  };

  const removeUrl = (index: number) => {
    const updatedUrls = urls.filter((_, i) => i !== index);
    setUrls(updatedUrls);
    localStorage.setItem("autoOpenUrls", JSON.stringify(updatedUrls));
    toast({
      title: "URL 삭제 완료",
      description: "웹페이지가 목록에서 제거되었습니다.",
    });
  };

  const timeString = currentTime.toLocaleTimeString("ko-KR", { 
    hour: "2-digit", 
    minute: "2-digit",
    second: "2-digit"
  });

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          자동 실행 로그
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 실시간 시계 */}
          <div className="p-4 bg-primary/10 rounded-lg text-center">
            <p className="text-2xl font-bold text-primary tabular-nums">{timeString}</p>
            <p className="text-xs text-muted-foreground mt-1">실시간 시계</p>
          </div>

          {/* URL 등록 섹션 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">자동 실행 웹페이지 등록</p>
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://example.com"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addUrl()}
              />
              <Button onClick={addUrl} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* 등록된 URL 목록 */}
          {urls.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">등록된 웹페이지 ({urls.length})</p>
              <div className="space-y-2">
                {urls.map((url, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-secondary rounded-lg">
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 text-xs text-primary hover:underline truncate flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      {url}
                    </a>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeUrl(index)}
                      className="h-6 w-6 p-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 bg-secondary rounded-lg">
            <p className="text-xs text-muted-foreground">
              💡 등록된 웹페이지는 이 페이지를 열 때마다 자동으로 실행됩니다.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateLog;
