import { motion } from "framer-motion";
import { Clock, Phone, MessageSquare, Cpu, MapPin, Image, Globe, Flag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockTimeline } from "@/data/mockForensicData";

const typeIcons: Record<string, typeof Phone> = {
  call: Phone,
  sms: MessageSquare,
  app: Cpu,
  location: MapPin,
  media: Image,
  browser: Globe,
};

const typeColors: Record<string, string> = {
  call: "bg-info",
  sms: "bg-primary",
  app: "bg-suspicious",
  location: "bg-critical",
  media: "bg-muted-foreground",
  browser: "bg-critical",
};

export default function TimelinePage() {
  const sorted = [...mockTimeline].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <Clock className="w-6 h-6 text-primary" />
        Event Timeline
      </h1>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-4">
          {sorted.map((event, i) => {
            const Icon = typeIcons[event.type] || Cpu;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative pl-14"
              >
                {/* Node */}
                <div className={`absolute left-4 top-4 w-5 h-5 rounded-full flex items-center justify-center ${typeColors[event.type]} ${event.flagged ? "ring-2 ring-suspicious/50" : ""}`}>
                  <Icon className="w-3 h-3 text-background" />
                </div>

                <Card className={`bg-card border-border ${event.flagged ? "border-l-2 border-l-suspicious" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-foreground">{event.title}</h3>
                          {event.flagged && <Flag className="w-3 h-3 text-suspicious" />}
                        </div>
                        <p className="text-xs text-muted-foreground">{event.description}</p>
                        <p className="text-xs text-muted-foreground/60 font-mono mt-1">Source: {event.source}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-mono text-muted-foreground">{new Date(event.timestamp).toLocaleDateString()}</p>
                        <p className="text-xs font-mono text-primary">{new Date(event.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
