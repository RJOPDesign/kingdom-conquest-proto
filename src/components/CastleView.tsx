import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Plus, Hammer } from "lucide-react";
import castleHero from "@/assets/castle-hero.jpg";

interface Building {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  isUpgrading: boolean;
  upgradeTime?: number;
  produces?: string;
  productionRate?: number;
}

interface CastleViewProps {
  buildings: Building[];
  onUpgrade: (buildingId: string) => void;
  onBuild: () => void;
}

export const CastleView = ({ buildings, onUpgrade, onBuild }: CastleViewProps) => {
  return (
    <div className="space-y-6 p-4">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden">
        <img 
          src={castleHero} 
          alt="Your Castle" 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h2 className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
            Royal Castle
          </h2>
          <p className="text-sm text-muted-foreground">Level 5 Stronghold</p>
        </div>
      </div>

      {/* Buildings Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Buildings</h3>
          <Button onClick={onBuild} size="sm" className="bg-gradient-royal">
            <Plus className="h-4 w-4 mr-2" />
            Build
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {buildings.map((building) => (
            <Card key={building.id} className="p-4 hover:shadow-medieval transition-smooth">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">{building.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      Level {building.level}/{building.maxLevel}
                    </Badge>
                    {building.produces && (
                      <span className="text-xs text-muted-foreground">
                        +{building.productionRate}/h {building.produces}
                      </span>
                    )}
                  </div>
                </div>
                
                {building.isUpgrading ? (
                  <div className="flex items-center gap-2 text-secondary">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{building.upgradeTime}h</span>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onUpgrade(building.id)}
                    disabled={building.level >= building.maxLevel}
                    className="hover:bg-primary hover:text-primary-foreground"
                  >
                    <Hammer className="h-4 w-4 mr-1" />
                    Upgrade
                  </Button>
                )}
              </div>

              {building.isUpgrading && (
                <div className="space-y-2">
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-muted-foreground text-center">
                    Upgrading... 2h 15m remaining
                  </p>
                </div>
              )}

              {!building.isUpgrading && (
                <Progress 
                  value={(building.level / building.maxLevel) * 100} 
                  className="h-2"
                />
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};