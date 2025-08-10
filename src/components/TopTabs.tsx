import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, BookOpen, Users, Archive } from 'lucide-react';

export type TabType = 'series' | 'calendar' | 'collaborators' | 'archived';

interface TopTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TopTabs: React.FC<TopTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'series' as TabType, label: 'Sermon Series', icon: BookOpen },
    { id: 'calendar' as TabType, label: 'Calendar', icon: Calendar },
    { id: 'collaborators' as TabType, label: 'Collaborators', icon: Users },
    { id: 'archived' as TabType, label: 'Archived Series', icon: Archive },
  ];

  return (
    <div className="border-b bg-background">
      <div className="flex items-center gap-1 py-2 pl-20 pr-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TopTabs;