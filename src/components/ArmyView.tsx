import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sword, Shield, Zap, Plus, Clock } from "lucide-react";

interface Unit {
  id: string;
  name: string;
  count: number;
  attack: number;
  defense: number;
  speed: number;
  cost: {
    wood?: number;
    stone?: number;
    iron?: number;
    food?: number;
  };
  trainingTime: number;
}

interface TrainingQueue {
  unitId: string;
  unitName: string;
  quantity: number;
  timeRemaining: number;
}

interface ArmyViewProps {
  units: Unit[];
  trainingQueue: TrainingQueue[];
  onTrain: (unitId: string) => void;
}

export const ArmyView = ({ units, trainingQueue, onTrain }: ArmyViewProps) => {
  const totalUnits = units.reduce((sum, unit) => sum + unit.count, 0);

  return (
    <div className="space-y-6 p-4">
      {/* Army Overview */}
      <Card className="p-4 bg-gradient-royal">
        <h2 className="text-xl font-bold text-primary-foreground mb-2">Army Overview</h2>
        <div className="flex items-center gap-4 text-primary-foreground">
          <div className="flex items-center gap-2">
            <Sword className="h-4 w-4" />
            <span className="text-sm">Total Units: {totalUnits}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="text-sm">Defense Ready</span>
          </div>
        </div>
      </Card>

      {/* Training Queue */}
      {trainingQueue.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Training Queue</h3>
          {trainingQueue.map((item, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium">{item.unitName}</span>
                  <Badge variant="outline" className="ml-2">x{item.quantity}</Badge>
                </div>
                <div className="flex items-center gap-2 text-secondary">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{item.timeRemaining}m</span>
                </div>
              </div>
              <Progress value={75} className="h-2" />
            </Card>
          ))}
        </div>
      )}

      {/* Unit Types */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Available Units</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {units.map((unit) => (
            <Card key={unit.id} className="p-4 hover:shadow-medieval transition-smooth">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">{unit.name}</h4>
                  <Badge variant="secondary" className="mt-1">
                    Owned: {unit.count}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  onClick={() => onTrain(unit.id)}
                  className="bg-gradient-forest"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Train
                </Button>
              </div>

              {/* Unit Stats */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Sword className="h-3 w-3 text-destructive" />
                    <span>Attack: {unit.attack}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-primary" />
                    <span>Defense: {unit.defense}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-3 w-3 text-secondary" />
                  <span>Speed: {unit.speed}</span>
                </div>
              </div>

              {/* Cost */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Training Cost:</p>
                <div className="flex gap-2 text-xs">
                  {unit.cost.wood && <span>🌲 {unit.cost.wood}</span>}
                  {unit.cost.stone && <span>🏔️ {unit.cost.stone}</span>}
                  {unit.cost.iron && <span>⛏️ {unit.cost.iron}</span>}
                  {unit.cost.food && <span>🍎 {unit.cost.food}</span>}
                </div>
                <p className="text-xs text-muted-foreground">
                  Time: {unit.trainingTime}min
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};