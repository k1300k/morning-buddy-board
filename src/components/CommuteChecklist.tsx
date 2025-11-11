import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";

const CHECKLIST_ITEMS = [
  { id: "badge", label: "출입증" },
  { id: "handkerchief", label: "손수건" },
  { id: "card", label: "교통카드" },
  { id: "earphones", label: "이어폰" },
  { id: "lunchbox", label: "도시락" },
];

const CommuteChecklist = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem("commuteChecklist");
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, []);

  const handleCheck = (id: string, checked: boolean) => {
    const updated = { ...checkedItems, [id]: checked };
    setCheckedItems(updated);
    localStorage.setItem("commuteChecklist", JSON.stringify(updated));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            출근 체크리스트
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            {completedCount}/{CHECKLIST_ITEMS.length}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {CHECKLIST_ITEMS.map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              <Checkbox
                id={item.id}
                checked={checkedItems[item.id] || false}
                onCheckedChange={(checked) => handleCheck(item.id, checked as boolean)}
              />
              <label
                htmlFor={item.id}
                className={`text-base cursor-pointer transition-all ${
                  checkedItems[item.id] ? "line-through text-muted-foreground" : "text-foreground"
                }`}
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommuteChecklist;
