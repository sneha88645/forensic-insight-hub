import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Search, Trash2, Flag, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockMessages } from "@/data/mockForensicData";

export default function MessagesPage() {
  const [filter, setFilter] = useState("");
  const [showFlagged, setShowFlagged] = useState(false);

  const filtered = mockMessages.filter((m) => {
    const matchesText = m.content.toLowerCase().includes(filter.toLowerCase()) ||
      m.from.toLowerCase().includes(filter.toLowerCase());
    return matchesText && (!showFlagged || m.flagged);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-primary" />
          Messages
        </h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Filter messages..."
              className="pl-9 w-56 bg-secondary border-border text-sm font-mono"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <Button
            variant={showFlagged ? "default" : "outline"}
            size="sm"
            onClick={() => setShowFlagged(!showFlagged)}
            className="font-mono text-xs"
          >
            <Flag className="w-3 h-3 mr-1" />
            Flagged
          </Button>
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filtered.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`p-4 hover:bg-secondary/30 transition-colors ${msg.flagged ? "border-l-2 border-l-suspicious" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-foreground">{msg.from}</span>
                      <span className="text-xs text-muted-foreground">→</span>
                      <span className="text-sm text-muted-foreground">{msg.to}</span>
                      <Badge variant="secondary" className="text-xs font-mono">{msg.app}</Badge>
                      {msg.deleted && (
                        <Badge variant="destructive" className="text-xs font-mono">
                          <Trash2 className="w-2.5 h-2.5 mr-1" />
                          Deleted
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm ${msg.flagged ? "text-suspicious" : "text-foreground/80"}`}>
                      {msg.content}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-mono text-muted-foreground">
                      {new Date(msg.timestamp).toLocaleDateString()}
                    </p>
                    <p className="text-xs font-mono text-muted-foreground">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
