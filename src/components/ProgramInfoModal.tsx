import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, MessageSquare, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const ProgramInfoModal = () => {
  const versions = [
    {
      version: "v1.0",
      date: "2025-11-12",
      prompt: "초기 프로젝트 생성",
      features: [
        "일일 출근 루틴 대시보드 기본 구조",
        "출근 체크리스트 컴포넌트",
        "날씨 정보 카드",
        "지하철 시간표",
        "자동 실행 로그"
      ]
    },
    {
      version: "v1.1",
      date: "2025-11-12",
      prompt: "1.출근체크리스트 수정 가능 삭제 추가 수정\n2.지하철 시간표\n가.북한산 보국문(신설동) 먼저 표시하고 다음번이 삼양사거리(북한산우이) 순서\n나.평일과 공휴일/휴일(토,일)에 따라 시간 변경",
      features: [
        "출근 체크리스트 항목 추가/수정/삭제 기능",
        "체크리스트 로컬 스토리지 저장",
        "지하철 시간표 방향 순서 변경 (북한산보국문 → 삼양사거리)",
        "평일/주말 시간표 자동 전환",
        "주말/공휴일 배지 표시"
      ],
      improvements: [
        "사용자 맞춤형 체크리스트 관리 가능",
        "실시간 요일 감지로 정확한 지하철 시간표 제공"
      ]
    },
    {
      version: "v1.2",
      date: "2025-11-12",
      prompt: "자동 실행 로그에 웹페이지 네이버시계가 5시에 실행",
      features: [
        "네이버 시계 웹페이지 링크 추가",
        "오전 5시 자동 실행 안내",
        "외부 링크 새 탭 열기 기능"
      ],
      improvements: [
        "자동 실행 로그에 실용적인 시계 기능 연동"
      ]
    },
    {
      version: "v1.3",
      date: "2025-11-12",
      prompt: "프로그램 개발 이력 및 프롬프트 기반 정보 추가",
      features: [
        "프로그램 정보 모달 컴포넌트",
        "버전별 개발 이력 표시",
        "실제 사용자 프롬프트 질의 내용 포함",
        "바이브코딩 프롬프트 방식 설명",
        "버전별 기능 및 개선사항 상세 표시"
      ],
      improvements: [
        "프로그램 진화 과정 투명하게 공개",
        "AI 기반 개발 방식 시각화"
      ]
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Info className="w-4 h-4" />
          프로그램 정보
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-primary" />
            일일 출근 루틴 - 개발 이력
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            <div className="p-4 bg-secondary/50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">프로그램 소개</h3>
              <p className="text-sm text-muted-foreground">
                이 프로그램은 <strong>바이브코딩 프롬프트 방식</strong>으로 개발되었습니다. 
                사용자의 자연어 요청을 AI가 이해하고 즉시 구현하는 혁신적인 개발 방식으로, 
                모든 기능이 실제 사용자 프롬프트를 통해 단계적으로 진화했습니다.
              </p>
            </div>

            <div className="space-y-6">
              {versions.map((version, index) => (
                <div 
                  key={version.version} 
                  className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="default">{version.version}</Badge>
                      <span className="text-xs text-muted-foreground">{version.date}</span>
                    </div>
                    {index === versions.length - 1 && (
                      <Badge variant="secondary">Latest</Badge>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="bg-muted/50 rounded-md p-3">
                      <div className="flex items-start gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-xs font-semibold text-primary">사용자 프롬프트</span>
                      </div>
                      <p className="text-sm whitespace-pre-line pl-6">{version.prompt}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">추가된 기능</h4>
                      <ul className="space-y-1">
                        {version.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {version.improvements && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2">개선사항</h4>
                        <ul className="space-y-1">
                          {version.improvements.map((improvement, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1">✓</span>
                              <span>{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                💡 이 프로그램은 계속해서 진화합니다. 새로운 기능이 필요하면 언제든지 요청해주세요!
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramInfoModal;
