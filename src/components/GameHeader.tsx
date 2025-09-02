import { Shield, Crown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface GameHeaderProps {
  playerName: string;
  level: number;
  alliance?: string;
}

export const GameHeader = ({ playerName, level, alliance }: GameHeaderProps) => {
  return (
    <header className="bg-card border-b border-border p-4 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold bg-gradient-royal bg-clip-text text-transparent">
              Lords & Knights
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Crown className="h-4 w-4 text-secondary" />
            <span className="text-sm text-muted-foreground">Level {level}</span>
          </div>
          
          {alliance && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-accent" />
              <Badge variant="outline" className="text-xs">
                {alliance}
              </Badge>
            </div>
          )}
          
          <Button variant="outline" size="sm">
            {playerName}
          </Button>
        </div>
      </div>
    </header>
  );
};