import { Castle, Swords, Map, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'castle', label: 'Castle', icon: Castle },
  { id: 'army', label: 'Army', icon: Swords },
  { id: 'map', label: 'Map', icon: Map },
  { id: 'alliance', label: 'Alliance', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const NavigationTabs = ({ activeTab, onTabChange }: NavigationTabsProps) => {
  return (
    <nav className="bg-card border-t border-border p-2 shadow-card">
      <div className="flex justify-center">
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <Button
                key={tab.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col gap-1 h-auto py-2 px-3 transition-smooth ${
                  isActive ? 'bg-primary text-primary-foreground shadow-glow' : ''
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs">{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};