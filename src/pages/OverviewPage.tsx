import { motion } from "framer-motion";
import {
  Shield, Phone, MessageSquare, MapPin, AlertTriangle,
  FileText, Smartphone, Clock, Users, Brain
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { caseInfo, mockContacts, mockInsights, mockMessages, mockTimeline } from "@/data/mockForensicData";

const statCards = [
  { label: "Total Artifacts", value: "14,829", icon: FileText, color: "text-primary" },
  { label: "Flagged Items", value: "23", icon: AlertTriangle, color: "text-suspicious" },
  { label: "Contacts", value: "47", icon: Users, color: "text-info" },
  { label: "AI Alerts", value: "6", icon: Brain, color: "text-critical" },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export default function OverviewPage() {
  const criticalInsights = mockInsights.filter(i => i.severity === "critical" || i.severity === "high");
  const topContacts = mockContacts.sort((a, b) => (b.callCount + b.smsCount) - (a.callCount + a.smsCount)).slice(0, 5);
  const recentFlagged = mockTimeline.filter(t => t.flagged).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Case Header */}
      <motion.div {...fadeIn}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Suspect Overview
            </h1>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              Case {caseInfo.caseNumber} • {caseInfo.deviceModel} • Extracted {new Date(caseInfo.extractionDate).toLocaleDateString()}
            </p>
          </div>
          <Badge variant="outline" className="border-primary/30 text-primary font-mono text-xs w-fit">
            <Smartphone className="w-3 h-3 mr-1" />
            {caseInfo.extractionType}
          </Badge>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div key={stat.label} {...fadeIn} transition={{ delay: i * 0.1 }}>
            <Card className="bg-card border-border hover:border-primary/30 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1 font-mono">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color} opacity-60`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Contacts */}
        <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Most Contacted — Suspect Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        contact.riskLevel === "critical" ? "bg-critical" :
                        contact.riskLevel === "suspicious" ? "bg-suspicious" : "bg-safe"
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{contact.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{contact.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{contact.callCount}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{contact.smsCount}</span>
                      <Badge variant={contact.riskLevel === "critical" ? "destructive" : contact.riskLevel === "suspicious" ? "default" : "secondary"} className="text-xs font-mono">
                        {contact.riskLevel}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Location Heatmap Placeholder */}
        <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-suspicious" />
                Location Ping Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 bg-secondary/30 rounded-lg border border-border overflow-hidden">
                {/* Simulated heatmap grid */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-px p-2">
                  {Array.from({ length: 48 }).map((_, i) => {
                    const intensity = [3, 11, 12, 19, 20, 27, 28, 35, 36].includes(i)
                      ? "bg-critical/60" : [4, 13, 21, 29, 37, 10, 18, 26, 34].includes(i)
                      ? "bg-suspicious/40" : [5, 14, 22, 30, 38, 2, 9, 17, 25].includes(i)
                      ? "bg-primary/20" : "bg-secondary/20";
                    return <div key={i} className={`rounded-sm ${intensity} transition-colors`} />;
                  })}
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-4 text-xs text-muted-foreground font-mono">
                  <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-primary/20" /> Low</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-suspicious/40" /> Medium</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-critical/60" /> High</span>
                </div>
                <div className="absolute top-3 right-3 text-xs font-mono text-muted-foreground">
                  6 pings • 2 clusters
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Critical AI Alerts */}
      <motion.div {...fadeIn} transition={{ delay: 0.5 }}>
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-critical" />
              Priority Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {criticalInsights.map((insight) => (
                <div
                  key={insight.id}
                  className={`p-4 rounded-lg border ${
                    insight.severity === "critical"
                      ? "border-critical/30 bg-critical/5"
                      : "border-suspicious/30 bg-suspicious/5"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-semibold text-foreground">{insight.title}</h4>
                    <Badge variant={insight.severity === "critical" ? "destructive" : "default"} className="text-xs font-mono ml-2">
                      {insight.confidence}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Flagged Activity */}
      <motion.div {...fadeIn} transition={{ delay: 0.6 }}>
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-info" />
              Recent Flagged Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentFlagged.map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-suspicious animate-pulse-glow" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                    {new Date(event.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
