import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Crown, Shield, Swords, MessageSquare, Users, Plus } from "lucide-react";
import { useState } from "react";

interface AllianceMember {
  id: string;
  name: string;
  level: number;
  role: 'leader' | 'officer' | 'member';
  contribution: number;
  lastActive: string;
}

interface AllianceViewProps {
  alliance?: {
    name: string;
    tag: string;
    level: number;
    members: AllianceMember[];
    description: string;
  };
  isInAlliance: boolean;
  onJoinAlliance: () => void;
  onCreateAlliance: () => void;
  onSendMessage: (message: string) => void;
}

export const AllianceView = ({ 
  alliance, 
  isInAlliance, 
  onJoinAlliance, 
  onCreateAlliance,
  onSendMessage 
}: AllianceViewProps) => {
  const [message, setMessage] = useState("");

  if (!isInAlliance) {
    return (
      <div className="space-y-6 p-4">
        <Card className="p-6 text-center">
          <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-bold mb-2">Join an Alliance</h2>
          <p className="text-muted-foreground mb-6">
            Team up with other players for protection and shared resources
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={onJoinAlliance} className="bg-gradient-royal">
              <Plus className="h-4 w-4 mr-2" />
              Find Alliance
            </Button>
            <Button variant="outline" onClick={onCreateAlliance}>
              Create Alliance
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* Alliance Header */}
      <Card className="p-4 bg-gradient-royal">
        <div className="flex items-center justify-between text-primary-foreground">
          <div>
            <h2 className="text-xl font-bold">[{alliance?.tag}] {alliance?.name}</h2>
            <p className="text-sm opacity-90">Level {alliance?.level} Alliance</p>
          </div>
          <Shield className="h-8 w-8" />
        </div>
        <p className="text-sm text-primary-foreground/80 mt-2">
          {alliance?.description}
        </p>
      </Card>

      {/* Alliance Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold">{alliance?.members.length}</p>
          <p className="text-xs text-muted-foreground">Members</p>
        </Card>
        <Card className="p-4 text-center">
          <Swords className="h-6 w-6 mx-auto mb-2 text-destructive" />
          <p className="text-2xl font-bold">1,247</p>
          <p className="text-xs text-muted-foreground">Total Power</p>
        </Card>
        <Card className="p-4 text-center">
          <Crown className="h-6 w-6 mx-auto mb-2 text-secondary" />
          <p className="text-2xl font-bold">#15</p>
          <p className="text-xs text-muted-foreground">Ranking</p>
        </Card>
      </div>

      {/* Alliance Chat */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Alliance Chat</h3>
        </div>
        
        <div className="space-y-3 mb-4 max-h-32 overflow-y-auto">
          <div className="text-sm">
            <span className="font-medium text-primary">KnightLord:</span>
            <span className="ml-2">Great raid yesterday team! 🏰</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-accent">WarriorQueen:</span>
            <span className="ml-2">Need help defending my castle at (45, 23)</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="min-h-[40px] resize-none"
          />
          <Button 
            onClick={() => {
              onSendMessage(message);
              setMessage("");
            }}
            disabled={!message.trim()}
            size="sm"
          >
            Send
          </Button>
        </div>
      </Card>

      {/* Members List */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Members ({alliance?.members.length})</h3>
        <div className="space-y-3">
          {alliance?.members.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {member.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{member.name}</span>
                    {member.role === 'leader' && (
                      <Crown className="h-3 w-3 text-secondary" />
                    )}
                    {member.role === 'officer' && (
                      <Shield className="h-3 w-3 text-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Level {member.level} • {member.lastActive}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="text-xs">
                  {member.contribution} pts
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};