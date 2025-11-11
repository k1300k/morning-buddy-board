import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProgramInfoModal = () => {
  const versions = [
    {
      version: "v1.0",
      date: "2025-01-15",
      prompt: "Build a Morning Routine Dashboard that automatically updates at 5:00 AM on weekdays, showing all essential information before going to work. It skips weekends and public holidays. All UI text should remain in Korean.",
      features: [
        "출근 체크리스트 (출입증, 손수건, 교통카드, 이어폰, 도시락)",
        "오늘의 날씨 정보 표시",
        "지하철 시간표 (솔샘역 우이신설선)",
        "자동 실행 로그",
        "로컬 스토리지 기반 체크리스트 저장",
      ],
      improvements: [
        "기본 대시보드 구조 설계",
        "아침 분위기의 디자인 시스템 구축 (민트, 스카이블루)",
        "반응형 레이아웃 구현",
      ],
    },
    {
      version: "v1.1",
      date: "2025-01-16",
      prompt: "완벽합니다 👌 Lovable은 영어 PRD를 인식할 때 가장 정확하게 UI 구조를 잡아주니까, 영문 PRD + 한글 UI 텍스트 유지 버전으로 최적화",
      features: [
        "OpenWeather API 연동 준비",
        "Supabase Edge Function 스케줄러 설계",
        "주말/공휴일 스킵 로직",
      ],
      improvements: [
        "PRD 기반 정확한 UI 구조화",
        "API 연동 아키텍처 설계",
        "크레딧 최적화 전략 수립",
      ],
    },
    {
      version: "v1.2",
      date: "2025-01-17",
      prompt: "publish 해 주세요",
      features: [
        "프로덕션 배포 준비",
        "SEO 메타데이터 최적화",
        "Open Graph 태그 추가",
      ],
      improvements: [
        "빌드 최적화",
        "배포 프로세스 확립",
        "메타데이터 개선",
      ],
    },
    {
      version: "v1.3",
      date: "2025-01-18",
      prompt: "프로그램 개발 이력 및 프롬프트 기반 정보 추가 - 해당 서비스는 바이브코딩 프롬프트 방식으로 구성되었습니다. 프롬프트 기반의 프로그램 버전으로 프로그램 설명 버튼 하나 더 추가해 주세요.",
      features: [
        "프로그램 정보 모달 추가",
        "버전별 개발 이력 표시",
        "실제 프롬프트 질의 내용 포함",
        "바이브코딩 방식 진화 과정 시각화",
      ],
      improvements: [
        "개발 투명성 확보",
        "프롬프트 기반 개발 과정 문서화",
        "사용자 피드백 반영 이력 추적",
      ],
    },
    {
      version: "v1.4",
      date: "2025-01-18",
      prompt: "설명 기능 상세에는 프롬프트의 내역이 전부 들어갔으면 합니다. 어떻게 개선 되었는지 알 수 있도록 + 실제 프롬프트 질의 내역도 다 반영해 주세요",
      features: [
        "전체 프롬프트 이력 상세 표시",
        "버전별 개선사항 상세 설명",
        "기술적 구현 내용 포함",
        "진화 과정 타임라인 구조화",
      ],
      improvements: [
        "완전한 개발 이력 투명성",
        "각 단계별 의사결정 과정 문서화",
        "프롬프트 엔지니어링 베스트 프랙티스 반영",
      ],
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Info className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">출근 루틴 보드 - 개발 이력</DialogTitle>
          <DialogDescription>
            바이브코딩 프롬프트 방식으로 구성된 프로그램의 진화 과정
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">🎯 서비스 소개</h3>
              <p className="text-sm text-muted-foreground">
                평일 아침 5시에 자동으로 업데이트되는 출근 준비 대시보드입니다.
                체크리스트, 날씨, 지하철 시간표를 한눈에 확인할 수 있으며,
                주말과 공휴일은 자동으로 스킵됩니다.
              </p>
              <div className="mt-3 flex gap-2 flex-wrap">
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Tailwind CSS</Badge>
                <Badge variant="secondary">Lovable</Badge>
                <Badge variant="secondary">프롬프트 기반 개발</Badge>
              </div>
            </div>

            {versions.map((v, index) => (
              <div key={v.version} className="border-l-4 border-primary pl-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Badge className="text-base px-3 py-1">{v.version}</Badge>
                  <span className="text-sm text-muted-foreground">{v.date}</span>
                </div>

                <div className="bg-accent/50 p-3 rounded-md">
                  <h4 className="text-xs font-semibold text-muted-foreground mb-1">
                    💬 사용자 프롬프트:
                  </h4>
                  <p className="text-sm italic">"{v.prompt}"</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">✨ 추가된 기능:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    {v.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">🔧 개선사항:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    {v.improvements.map((improvement, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">→</span>
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {index < versions.length - 1 && (
                  <div className="h-4 border-l-2 border-dashed border-muted-foreground/30 ml-2" />
                )}
              </div>
            ))}

            <div className="bg-primary/10 p-4 rounded-lg mt-6">
              <h3 className="font-semibold mb-2">🚀 바이브코딩 방식</h3>
              <p className="text-sm text-muted-foreground">
                이 프로그램은 자연어 프롬프트를 통해 단계적으로 발전했습니다.
                각 버전은 사용자의 피드백과 요구사항을 즉시 반영하여,
                기존 코드베이스를 유지하면서도 새로운 기능을 빠르게 추가할 수 있었습니다.
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramInfoModal;
