import { motion } from "framer-motion";
import { Image as ImageIcon, Video, Flag, MapPin, Calendar, Hash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockMedia } from "@/data/mockForensicData";

export default function MediaPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <ImageIcon className="w-6 h-6 text-primary" />
        Evidence Gallery
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockMedia.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={`bg-card border-border overflow-hidden group hover:border-primary/30 transition-colors ${item.flagged ? "ring-1 ring-suspicious/30" : ""}`}>
              {/* Simulated thumbnail */}
              <div className="relative h-40 bg-secondary/30 flex items-center justify-center">
                <div className="absolute inset-0 scanline opacity-30" />
                {item.type === "video" ? (
                  <Video className="w-12 h-12 text-muted-foreground/30" />
                ) : (
                  <ImageIcon className="w-12 h-12 text-muted-foreground/30" />
                )}
                {item.flagged && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="destructive" className="text-xs font-mono">
                      <Flag className="w-2.5 h-2.5 mr-1" />
                      Flagged
                    </Badge>
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="text-xs font-mono uppercase">
                    {item.type}
                  </Badge>
                </div>
              </div>

              {/* Metadata overlay */}
              <CardContent className="p-3 space-y-2">
                <p className="text-sm font-mono text-foreground truncate">{item.filename}</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span className="font-mono">{new Date(item.dateTaken).toLocaleString()}</span>
                  </div>
                  {item.gps && (
                    <div className="flex items-center gap-2 text-xs text-info">
                      <MapPin className="w-3 h-3" />
                      <span className="font-mono">{item.gps.lat.toFixed(4)}°, {item.gps.lng.toFixed(4)}°</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Hash className="w-3 h-3" />
                    <span className="font-mono">SHA: {item.hash}</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">{item.size}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
