import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Plus, Pencil, Trash2, X, Check } from "lucide-react";

interface ChecklistItem {
  id: string;
  label: string;
}

const DEFAULT_ITEMS: ChecklistItem[] = [
  { id: "badge", label: "출입증" },
  { id: "handkerchief", label: "손수건" },
  { id: "card", label: "교통카드" },
  { id: "earphones", label: "이어폰" },
  { id: "lunchbox", label: "도시락" },
];

const CommuteChecklist = () => {
  const [items, setItems] = useState<ChecklistItem[]>(DEFAULT_ITEMS);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingLabel, setEditingLabel] = useState("");
  const [newItemLabel, setNewItemLabel] = useState("");

  useEffect(() => {
    const savedChecked = localStorage.getItem("commuteChecklist");
    const savedItems = localStorage.getItem("commuteChecklistItems");
    
    if (savedChecked) {
      setCheckedItems(JSON.parse(savedChecked));
    }
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  const handleCheck = (id: string, checked: boolean) => {
    const updated = { ...checkedItems, [id]: checked };
    setCheckedItems(updated);
    localStorage.setItem("commuteChecklist", JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!newItemLabel.trim()) return;
    const newItem: ChecklistItem = {
      id: `item_${Date.now()}`,
      label: newItemLabel.trim(),
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem("commuteChecklistItems", JSON.stringify(updatedItems));
    setNewItemLabel("");
  };

  const handleEdit = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setEditingId(id);
      setEditingLabel(item.label);
    }
  };

  const handleSaveEdit = () => {
    if (!editingLabel.trim() || !editingId) return;
    const updatedItems = items.map((item) =>
      item.id === editingId ? { ...item, label: editingLabel.trim() } : item
    );
    setItems(updatedItems);
    localStorage.setItem("commuteChecklistItems", JSON.stringify(updatedItems));
    setEditingId(null);
    setEditingLabel("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingLabel("");
  };

  const handleDelete = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("commuteChecklistItems", JSON.stringify(updatedItems));
    
    const updatedChecked = { ...checkedItems };
    delete updatedChecked[id];
    setCheckedItems(updatedChecked);
    localStorage.setItem("commuteChecklist", JSON.stringify(updatedChecked));
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
            {completedCount}/{items.length}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-2 group">
              {editingId === item.id ? (
                <>
                  <Input
                    value={editingLabel}
                    onChange={(e) => setEditingLabel(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveEdit();
                      if (e.key === "Escape") handleCancelEdit();
                    }}
                    className="flex-1"
                    autoFocus
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleSaveEdit}
                    className="h-8 w-8"
                  >
                    <Check className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleCancelEdit}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4 text-red-600" />
                  </Button>
                </>
              ) : (
                <>
                  <Checkbox
                    id={item.id}
                    checked={checkedItems[item.id] || false}
                    onCheckedChange={(checked) => handleCheck(item.id, checked as boolean)}
                  />
                  <label
                    htmlFor={item.id}
                    className={`flex-1 text-base cursor-pointer transition-all ${
                      checkedItems[item.id] ? "line-through text-muted-foreground" : "text-foreground"
                    }`}
                  >
                    {item.label}
                  </label>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(item.id)}
                      className="h-8 w-8"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(item.id)}
                      className="h-8 w-8 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
          
          <div className="flex items-center space-x-2 pt-2 border-t">
            <Input
              placeholder="새 항목 추가..."
              value={newItemLabel}
              onChange={(e) => setNewItemLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAdd();
              }}
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={handleAdd}
              disabled={!newItemLabel.trim()}
              className="h-10 w-10"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommuteChecklist;
