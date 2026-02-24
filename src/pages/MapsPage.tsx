import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockLocations } from "@/data/mockForensicData";

export default function MapsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <MapPin className="w-6 h-6 text-primary" />
        Location Analysis
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Placeholder */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <div className="relative h-96 bg-secondary/20 rounded-lg overflow-hidden">
                {/* Grid overlay */}
                <div className="absolute inset-0 scanline opacity-50" />
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(hsl(var(--border)) 1px, transparent 1px),
                    linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }} />

                {/* Simulated pins */}
                {mockLocations.map((loc, i) => {
                  const x = 15 + (i * 13) % 70;
                  const y = 15 + (i * 17) % 65;
                  return (
                    <motion.div
                      key={loc.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.15 }}
                      className="absolute"
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      <div className="relative">
                        <div className="w-4 h-4 rounded-full bg-critical border-2 border-background" />
                        <div className="absolute inset-0 rounded-full bg-critical/30 animate-ping" />
                      </div>
                    </motion.div>
                  );
                })}

                <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-md p-3 border border-border">
                  <p className="text-xs font-mono text-primary">GEOSPATIAL ANALYSIS</p>
                  <p className="text-xs text-muted-foreground mt-1">{mockLocations.length} location pings tracked</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location List */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Navigation className="w-4 h-4 text-info" />
              Location Pings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockLocations.map((loc) => (
                <div key={loc.id} className="p-3 rounded-lg bg-secondary/30 border border-border/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-primary">{loc.lat.toFixed(4)}°, {loc.lng.toFixed(4)}°</span>
                    <Badge variant="secondary" className="text-xs font-mono">{loc.source}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    {new Date(loc.timestamp).toLocaleString()} • ±{loc.accuracy}m
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
