import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Castle, Swords, Users, TreePine } from "lucide-react";

interface MapLocation {
  id: string;
  x: number;
  y: number;
  type: 'player-castle' | 'enemy-castle' | 'npc-castle' | 'bandit-camp' | 'resource-node';
  name: string;
  level?: number;
  owner?: string;
  alliance?: string;
  distance?: number;
}

interface MapViewProps {
  locations: MapLocation[];
  playerPosition: { x: number; y: number };
  onAttack: (locationId: string) => void;
  onScout: (locationId: string) => void;
}

export const MapView = ({ locations, playerPosition, onAttack, onScout }: MapViewProps) => {
  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'player-castle':
      case 'enemy-castle':
      case 'npc-castle':
        return Castle;
      case 'bandit-camp':
        return Swords;
      case 'resource-node':
        return TreePine;
      default:
        return Castle;
    }
  };

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'player-castle':
        return 'text-primary';
      case 'enemy-castle':
        return 'text-destructive';
      case 'npc-castle':
        return 'text-muted-foreground';
      case 'bandit-camp':
        return 'text-orange-500';
      case 'resource-node':
        return 'text-accent';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Map Header */}
      <Card className="p-4 bg-gradient-stone">
        <h2 className="text-xl font-bold text-foreground mb-2">World Map</h2>
        <p className="text-sm text-muted-foreground">
          Current Position: ({playerPosition.x}, {playerPosition.y})
        </p>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-auto py-3 flex-col gap-2">
          <Swords className="h-5 w-5" />
          <span className="text-sm">Find Enemies</span>
        </Button>
        <Button variant="outline" className="h-auto py-3 flex-col gap-2">
          <TreePine className="h-5 w-5" />
          <span className="text-sm">Resource Nodes</span>
        </Button>
      </div>

      {/* Nearby Locations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Nearby Locations</h3>
        <div className="space-y-3">
          {locations.map((location) => {
            const Icon = getLocationIcon(location.type);
            const colorClass = getLocationColor(location.type);
            
            return (
              <Card key={location.id} className="p-4 hover:shadow-medieval transition-smooth">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${colorClass}`} />
                    <div>
                      <h4 className="font-medium">{location.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        {location.level && (
                          <Badge variant="outline" className="text-xs">
                            Level {location.level}
                          </Badge>
                        )}
                        {location.owner && location.owner !== 'You' && (
                          <span className="text-xs text-muted-foreground">
                            Owner: {location.owner}
                          </span>
                        )}
                        {location.alliance && (
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span className="text-xs">{location.alliance}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {location.distance && (
                      <span className="text-xs text-muted-foreground text-right">
                        {location.distance} tiles away
                      </span>
                    )}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onScout(location.id)}
                      >
                        Scout
                      </Button>
                      {location.type !== 'player-castle' && location.type !== 'resource-node' && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => onAttack(location.id)}
                        >
                          Attack
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};