import { motion } from "framer-motion";
import { Brain, AlertTriangle, TrendingUp, ShieldAlert, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockInsights } from "@/data/mockForensicData";

const severityConfig = {
  low: { color: "bg-primary/20 text-primary border-primary/30", icon: "text-primary" },
  medium: { color: "bg-suspicious/20 text-suspicious border-suspicious/30", icon: "text-suspicious" },
  high: { color: "bg-suspicious/20 text-suspicious border-suspicious/30", icon: "text-suspicious" },
  critical: { color: "bg-critical/20 text-critical border-critical/30", icon: "text-critical" },
};

const typeIcons = {
  pattern: TrendingUp,
  anomaly: AlertTriangle,
  risk: ShieldAlert,
};

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary" />
          AI Insights Engine
        </h1>
        <Badge variant="outline" className="border-primary/30 text-primary font-mono text-xs">
          <Zap className="w-3 h-3 mr-1" />
          {mockInsights.length} Active Alerts
        </Badge>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {(["pattern", "anomaly", "risk"] as const).map((type) => {
          const count = mockInsights.filter(i => i.type === type).length;
          const Icon = typeIcons[type];
          return (
            <Card key={type} className="bg-card border-border">
              <CardContent className="p-4 flex items-center gap-3">
                <Icon className={`w-5 h-5 ${type === "risk" ? "text-critical" : type === "anomaly" ? "text-suspicious" : "text-primary"}`} />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{type}s</p>
                  <p className="text-xl font-bold font-mono text-foreground">{count}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Insight Cards */}
      <div className="space-y-4">
        {mockInsights.map((insight, i) => {
          const Icon = typeIcons[insight.type];
          const config = severityConfig[insight.severity];
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`bg-card border ${config.color}`}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${config.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-sm font-bold text-foreground">{insight.title}</h3>
                        <Badge className={`text-xs font-mono ${config.color}`}>
                          {insight.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{insight.description}</p>
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                          <div className="flex items-center gap-2">
                            <Progress value={insight.confidence} className="w-24 h-1.5" />
                            <span className="text-xs font-mono text-foreground">{insight.confidence}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Related Artifacts</p>
                          <p className="text-sm font-mono text-foreground">{insight.relatedArtifacts}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
