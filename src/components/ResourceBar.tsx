interface Resource {
  type: string;
  amount: number;
  production: number;
  icon: string;
  color: string;
}

interface ResourceBarProps {
  resources: Resource[];
  playerName: string;
  playerLevel: number;
}

export const ResourceBar = ({ resources, playerName, playerLevel }: ResourceBarProps) => {
  return (
    <div className="bg-white border-b-2 border-border px-4 py-2 shadow-elevation">
      <div className="flex items-center justify-between">
        {/* Player Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-royal rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">{playerLevel}</span>
          </div>
          <span className="font-semibold text-foreground">{playerName}</span>
        </div>
        
        {/* Resources */}
        <div className="flex items-center gap-6">
          {resources.map((resource) => (
            <div key={resource.type} className="flex items-center gap-1.5">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
                style={{ backgroundColor: resource.color }}
              >
                {resource.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-foreground">
                  {resource.amount.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground leading-none">
                  +{resource.production}/h
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};