import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { SermonSeries } from '@/types/sermon';
import SermonSeriesList from './SermonSeriesList';
import SeriesDetail from './SeriesDetail';
import CalendarView from './CalendarView';
import ArchivedSeriesList from './ArchivedSeriesList';
import SeriesForm from './SeriesForm';
import CollaboratorsPage from './CollaboratorsPage';

interface MainContentProps {
  activeTab: string;
}

const MainContent: React.FC<MainContentProps> = ({ activeTab }) => {
  const { sermonSeries, updateSeries, addSeries } = useAppContext();
  const [selectedSeries, setSelectedSeries] = useState<SermonSeries | null>(null);
  const [editingSeries, setEditingSeries] = useState<SermonSeries | null>(null);

  const handleSelectSeries = (series: SermonSeries) => {
    console.log('🎯 Selected series:', series);
    setSelectedSeries(series);
    setEditingSeries(null);
  };

  const handleSelectSeriesById = (seriesId: string) => {
    const series = sermonSeries.find(s => s.id === seriesId);
    if (series) {
      console.log('🎯 Selected series by ID from calendar:', series);
      // For calendar, we don't want to navigate away from calendar view
      // Instead, we could show a modal or sidebar with series details
      // For now, let's just log it and keep the calendar view
      console.log('Calendar series clicked:', series.title);
    }
  };

  const handleBackToList = () => {
    console.log('🔙 Going back to list');
    setSelectedSeries(null);
    setEditingSeries(null);
  };

  const handleUpdateSeries = (updatedSeries: SermonSeries) => {
    console.log('🔄 Updating series in MainContent:', updatedSeries);
    updateSeries(updatedSeries);
    setSelectedSeries(updatedSeries);
  };

  const handleEditSeries = () => {
    if (selectedSeries) {
      console.log('✏️ Editing series:', selectedSeries);
      setEditingSeries(selectedSeries);
    }
  };

  const handleSaveSeries = (seriesData: SermonSeries) => {
    console.log('💾 Saving series:', seriesData);
    if (editingSeries) {
      updateSeries(seriesData);
      setSelectedSeries(seriesData);
    } else {
      addSeries(seriesData);
      setSelectedSeries(seriesData);
    }
    setEditingSeries(null);
  };

  const handleCancelEdit = () => {
    console.log('❌ Cancelled series editing');
    setEditingSeries(null);
  };

  // Calendar tab - always show calendar view
  if (activeTab === 'calendar') {
    return <CalendarView onSeriesSelect={handleSelectSeriesById} />;
  }

  if (activeTab === 'archived') {
    return (
      <div>
        {selectedSeries && !editingSeries ? (
          <SeriesDetail
            series={selectedSeries}
            onBack={handleBackToList}
            onUpdateSeries={handleUpdateSeries}
            onEditSeries={handleEditSeries}
          />
        ) : editingSeries ? (
          <SeriesForm
            series={editingSeries}
            onSave={handleSaveSeries}
            onCancel={handleCancelEdit}
          />
        ) : (
          <ArchivedSeriesList onSelectSeries={handleSelectSeries} />
        )}
      </div>
    );
  }

  if (activeTab === 'collaborators') {
    return <CollaboratorsPage />;
  }

  // Main series tab
  if (editingSeries) {
    return (
      <SeriesForm
        series={editingSeries}
        onSave={handleSaveSeries}
        onCancel={handleCancelEdit}
      />
    );
  }

  if (selectedSeries) {
    return (
      <SeriesDetail
        series={selectedSeries}
        onBack={handleBackToList}
        onUpdateSeries={handleUpdateSeries}
        onEditSeries={handleEditSeries}
      />
    );
  }

  return (
    <SermonSeriesList
      onSelectSeries={handleSelectSeries}
    />
  );
};

export default MainContent;