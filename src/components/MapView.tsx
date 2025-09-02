import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Castle, Swords, Users, TreePine, Mountain, Waves } from "lucide-react";

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
    <div className="h-full bg-gradient-terrain relative overflow-hidden">
      {/* World Map Grid */}
      <div className="absolute inset-0 p-4 overflow-auto">
        <div 
          className="relative grid grid-cols-8 gap-1 min-h-full"
          style={{ gridTemplateRows: 'repeat(12, minmax(0, 1fr))' }}
        >
          {/* Generate terrain tiles */}
          {Array.from({ length: 96 }, (_, i) => {
            const x = i % 8;
            const y = Math.floor(i / 8);
            const terrainType = getTerrainType(x, y);
            
            return (
              <div
                key={i}
                className={`relative aspect-square rounded-sm ${getTerrainClass(terrainType)} border border-white/20`}
              >
                {/* Terrain decorations */}
                {terrainType === 'forest' && (
                  <TreePine className="absolute top-1 left-1 h-3 w-3 text-green-800" />
                )}
                {terrainType === 'mountain' && (
                  <Mountain className="absolute top-1 left-1 h-3 w-3 text-gray-600" />
                )}
                {terrainType === 'water' && (
                  <Waves className="absolute top-1 left-1 h-3 w-3 text-blue-600" />
                )}
              </div>
            );
          })}
          
          {/* Place locations on the grid */}
          {locations.map((location) => {
            const Icon = getLocationIcon(location.type);
            const colorClass = getLocationColor(location.type);
            
            return (
              <div
                key={location.id}
                className="absolute flex flex-col items-center cursor-pointer transform hover:scale-110 transition-transform"
                style={{
                  left: `${(location.x % 8) * 12.5}%`,
                  top: `${Math.floor(location.x / 8) * 8.33}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => location.type !== 'player-castle' && onScout(location.id)}
              >
                <div className={`p-1.5 rounded-full bg-white shadow-md border-2 ${
                  location.type === 'player-castle' ? 'border-blue-500' :
                  location.type === 'enemy-castle' ? 'border-red-500' :
                  location.type === 'resource-node' ? 'border-green-500' :
                  'border-orange-500'
                }`}>
                  <Icon className={`h-4 w-4 ${colorClass}`} />
                </div>
                <div className="mt-1 px-2 py-0.5 bg-black/70 text-white text-xs rounded whitespace-nowrap">
                  {location.name}
                  {location.level && <span className="ml-1">({location.level})</span>}
                </div>
              </div>
            );
          })}
          
          {/* Player position indicator */}
          <div
            className="absolute flex flex-col items-center animate-pulse"
            style={{
              left: `${(playerPosition.x % 8) * 12.5}%`,
              top: `${Math.floor(playerPosition.x / 8) * 8.33}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="p-2 rounded-full bg-blue-600 shadow-lg border-2 border-white">
              <Castle className="h-5 w-5 text-white" />
            </div>
            <div className="mt-1 px-2 py-0.5 bg-blue-600 text-white text-xs rounded font-bold">
              YOU
            </div>
          </div>
        </div>
      </div>
      
      {/* Mini Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <Button
          size="sm"
          variant="outline"
          className="bg-white/90"
          onClick={() => onScout('find-enemies')}
        >
          <Swords className="h-4 w-4 mr-1" />
          Find Enemies
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-white/90"
          onClick={() => onScout('find-resources')}
        >
          <TreePine className="h-4 w-4 mr-1" />
          Resources
        </Button>
      </div>
      
      {/* Coordinates Display */}
      <div className="absolute bottom-4 left-4">
        <div className="px-3 py-2 bg-black/70 text-white text-sm rounded">
          Position: ({playerPosition.x}, {playerPosition.y})
        </div>
      </div>
    </div>
  );
  
  function getTerrainType(x: number, y: number): string {
    // Simple terrain generation
    const noise = (x * 7 + y * 11) % 100;
    if (noise < 20) return 'water';
    if (noise < 35) return 'forest';
    if (noise < 45) return 'mountain';
    return 'grass';
  }
  
  function getTerrainClass(type: string): string {
    switch (type) {
      case 'water': return 'bg-blue-400';
      case 'forest': return 'bg-green-500';
      case 'mountain': return 'bg-gray-500';
      default: return 'bg-green-300';
    }
  }
};