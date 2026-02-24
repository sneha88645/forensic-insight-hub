import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, FileJson, Shield, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  const simulateUpload = useCallback(() => {
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setComplete(true);
          toast.success("File parsed successfully", {
            description: "14,829 artifacts extracted from UFDR container.",
          });
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    simulateUpload();
  }, [simulateUpload]);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <Upload className="w-6 h-6 text-primary" />
        File Upload
      </h1>

      <Card className="bg-card border-border">
        <CardContent className="p-8">
          {!uploading && !complete ? (
            <motion.div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
                isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
              onClick={simulateUpload}
              whileHover={{ scale: 1.01 }}
            >
              <FileJson className={`w-16 h-16 mx-auto mb-4 ${isDragging ? "text-primary" : "text-muted-foreground/40"}`} />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Drop .ufdr or .json file here
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                or click to simulate file upload
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3 h-3 text-primary" />
                <span className="font-mono">Supported: .ufdr, .json, .xml, .zip</span>
              </div>
            </motion.div>
          ) : uploading ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary animate-pulse-glow" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Parsing Forensic Data...</h3>
              <p className="text-sm text-muted-foreground mb-4 font-mono">Extracting artifacts from UFDR container</p>
              <Progress value={Math.min(progress, 100)} className="w-full max-w-sm mx-auto mb-2" />
              <p className="text-xs text-muted-foreground font-mono">{Math.min(Math.round(progress), 100)}%</p>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Analysis Complete</h3>
              <p className="text-sm text-muted-foreground mb-4">14,829 artifacts extracted and indexed</p>
              <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto text-center">
                <div>
                  <p className="text-xl font-bold font-mono text-foreground">47</p>
                  <p className="text-xs text-muted-foreground">Contacts</p>
                </div>
                <div>
                  <p className="text-xl font-bold font-mono text-suspicious">23</p>
                  <p className="text-xs text-muted-foreground">Flagged</p>
                </div>
                <div>
                  <p className="text-xl font-bold font-mono text-critical">6</p>
                  <p className="text-xs text-muted-foreground">AI Alerts</p>
                </div>
              </div>
              <Button className="mt-6" onClick={() => { setComplete(false); setProgress(0); }}>
                Upload Another File
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
