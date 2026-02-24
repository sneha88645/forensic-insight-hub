import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockContacts, mockMessages, mockTimeline } from "@/data/mockForensicData";

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const results = query.length > 1 ? [
    ...mockContacts.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).map(c => ({ type: "Contact" as const, text: c.name, detail: c.phone })),
    ...mockMessages.filter(m => m.content.toLowerCase().includes(query.toLowerCase())).map(m => ({ type: "Message" as const, text: m.content.slice(0, 60), detail: m.from })),
    ...mockTimeline.filter(t => t.title.toLowerCase().includes(query.toLowerCase())).map(t => ({ type: "Event" as const, text: t.title, detail: t.timestamp.split("T")[0] })),
  ].slice(0, 8) : [];

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search artifacts..."
          className="w-64 lg:w-80 pl-9 bg-secondary border-border text-sm font-mono"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
        {query && (
          <button onClick={() => { setQuery(""); setIsOpen(false); }} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="w-3 h-3 text-muted-foreground" />
          </button>
        )}
      </div>
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden">
          {results.map((r, i) => (
            <div key={i} className="px-4 py-2.5 hover:bg-secondary cursor-pointer flex items-center justify-between border-b border-border/50 last:border-0">
              <div>
                <span className="text-xs font-mono text-primary mr-2">[{r.type}]</span>
                <span className="text-sm text-foreground">{r.text}</span>
              </div>
              <span className="text-xs text-muted-foreground font-mono">{r.detail}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
