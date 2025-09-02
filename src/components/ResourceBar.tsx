import { TreePine, Mountain, Pickaxe, Apple } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Resource {
  type: 'wood' | 'stone' | 'iron' | 'food';
  current: number;
  max: number;
  production: number;
}

interface ResourceBarProps {
  resources: Resource[];
}

const resourceIcons = {
  wood: TreePine,
  stone: Mountain,
  iron: Pickaxe,
  food: Apple,
};

const resourceColors = {
  wood: 'text-resources-wood',
  stone: 'text-resources-stone',
  iron: 'text-resources-iron',
  food: 'text-resources-food',
};

export const ResourceBar = ({ resources }: ResourceBarProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-card">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {resources.map((resource) => {
          const Icon = resourceIcons[resource.type];
          const percentage = (resource.current / resource.max) * 100;
          
          return (
            <div key={resource.type} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${resourceColors[resource.type]}`} />
                <span className="text-sm font-medium capitalize">{resource.type}</span>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{resource.current.toLocaleString()}</span>
                  <span className="text-muted-foreground">
                    +{resource.production}/h
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};