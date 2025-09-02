import { useState } from "react";
import { ResourceBar } from "@/components/ResourceBar";
import { NavigationTabs } from "@/components/NavigationTabs";
import { CastleView } from "@/components/CastleView";
import { ArmyView } from "@/components/ArmyView";
import { MapView } from "@/components/MapView";
import { AllianceView } from "@/components/AllianceView";
import { useToast } from "@/hooks/use-toast";
import { Castle, Sword, Map, Users } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("castle");
  const { toast } = useToast();

  // Mock data
  const playerData = {
    name: "Lord Commander",
    level: 15,
    alliance: "Knights of Valor"
  };

  const mockResources = [
    { type: "Wood", amount: 1250, production: 45, icon: "🌲", color: "#8B4513" },
    { type: "Stone", amount: 890, production: 35, icon: "🏔️", color: "#708090" },
    { type: "Iron", amount: 340, production: 25, icon: "⛏️", color: "#4682B4" },
    { type: "Food", amount: 2100, production: 60, icon: "🍎", color: "#228B22" },
  ];

  const buildings = [
    {
      id: "1",
      name: "Great Hall",
      level: 5,
      maxLevel: 10,
      isUpgrading: false,
    },
    {
      id: "2",
      name: "Lumber Mill",
      level: 3,
      maxLevel: 8,
      isUpgrading: true,
      upgradeTime: 2,
      produces: "Wood",
      productionRate: 450,
    },
    {
      id: "3",
      name: "Stone Quarry",
      level: 4,
      maxLevel: 8,
      isUpgrading: false,
      produces: "Stone",
      productionRate: 320,
    },
    {
      id: "4",
      name: "Barracks",
      level: 3,
      maxLevel: 6,
      isUpgrading: false,
    },
  ];

  const units = [
    {
      id: "spearman",
      name: "Spearman",
      count: 25,
      attack: 15,
      defense: 20,
      speed: 8,
      cost: { wood: 100, food: 50 },
      trainingTime: 5,
    },
    {
      id: "archer",
      name: "Archer",
      count: 18,
      attack: 25,
      defense: 10,
      speed: 12,
      cost: { wood: 150, iron: 75 },
      trainingTime: 8,
    },
    {
      id: "knight",
      name: "Knight",
      count: 5,
      attack: 40,
      defense: 35,
      speed: 15,
      cost: { iron: 200, food: 100 },
      trainingTime: 15,
    },
  ];

  const trainingQueue = [
    {
      unitId: "spearman",
      unitName: "Spearman",
      quantity: 5,
      timeRemaining: 12,
    },
  ];

  const mapLocations = [
    {
      id: "1",
      x: 45,
      y: 23,
      type: "enemy-castle" as const,
      name: "Iron Fortress",
      level: 4,
      owner: "DarkLord",
      distance: 8,
    },
    {
      id: "2",
      x: 38,
      y: 31,
      type: "bandit-camp" as const,
      name: "Abandoned Outpost",
      level: 2,
      distance: 12,
    },
    {
      id: "3",
      x: 52,
      y: 19,
      type: "resource-node" as const,
      name: "Ancient Forest",
      distance: 6,
    },
  ];

  const alliance = {
    name: "Knights of Valor",
    tag: "KOV",
    level: 8,
    description: "United we stand, divided we fall. Honor above all.",
    members: [
      {
        id: "1",
        name: "KnightLord",
        level: 20,
        role: "leader" as const,
        contribution: 2500,
        lastActive: "Online",
      },
      {
        id: "2",
        name: "WarriorQueen",
        level: 18,
        role: "officer" as const,
        contribution: 1800,
        lastActive: "2h ago",
      },
      {
        id: "3",
        name: "Lord Commander",
        level: 15,
        role: "member" as const,
        contribution: 1200,
        lastActive: "Online",
      },
    ],
  };

  const handleUpgrade = (buildingId: string) => {
    toast({
      title: "Upgrade Started",
      description: "Building upgrade has begun!",
    });
  };

  const handleBuild = () => {
    toast({
      title: "Construction",
      description: "Select a building to construct.",
    });
  };

  const handleTrain = (unitId: string) => {
    toast({
      title: "Training Started",
      description: "Unit training has begun!",
    });
  };

  const handleAttack = (locationId: string) => {
    toast({
      title: "Army Dispatched",
      description: "Your forces are marching to battle!",
    });
  };

  const handleScout = (locationId: string) => {
    toast({
      title: "Scout Sent",
      description: "Gathering intelligence...",
    });
  };

  const handleSendMessage = (message: string) => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the alliance.",
    });
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case "castle":
        return (
          <CastleView
            buildings={buildings}
            onUpgrade={handleUpgrade}
            onBuild={handleBuild}
          />
        );
      case "army":
        return (
          <ArmyView
            units={units}
            trainingQueue={trainingQueue}
            onTrain={handleTrain}
          />
        );
      case "map":
        return (
          <MapView
            locations={mapLocations}
            playerPosition={{ x: 42, y: 27 }}
            onAttack={handleAttack}
            onScout={handleScout}
          />
        );
      case "alliance":
        return (
          <AllianceView
            alliance={alliance}
            isInAlliance={true}
            onJoinAlliance={() => {}}
            onCreateAlliance={() => {}}
            onSendMessage={handleSendMessage}
          />
        );
      case "settings":
        return (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Settings</h2>
            <p className="text-muted-foreground">Settings panel coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ResourceBar 
        resources={mockResources} 
        playerName="Lord Commander" 
        playerLevel={15}
      />
      <NavigationTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />
      
      <main className="flex-1 overflow-hidden">
        {renderActiveView()}
      </main>
    </div>
  );
};

export default Index;
