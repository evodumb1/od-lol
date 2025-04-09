import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Dimensions
} from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import { supabase } from '../../lib/supabaseClient';
import AnalyticsCard from '../../components/AnalyticsCard';

const { width } = Dimensions.get('window');

const EventAnalyticsScreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [analyticsData, setAnalyticsData] = useState({
    totalAttendees: 0,
    previousAttendees: 0,
    attendanceChange: 0,
    completionRate: 0,
    previousCompletionRate: 0,
    completionChange: 0,
    averageFeedback: 0,
    previousAverageFeedback: 0,
    feedbackChange: 0,
    odPoints: 0,
    registrationRate: 0,
    gender: { male: 0, female: 0, other: 0 },
    departments: []
  });
  
  // Initial fetch of data
  useEffect(() => {
    loadData();
    
    // If eventId is passed as param, select that event
    if (route.params?.eventId) {
      fetchEventDetails(route.params.eventId);
    }
  }, []);
  
  // Watch for route params changes to update selected event
  useEffect(() => {
    if (route.params?.eventId) {
      fetchEventDetails(route.params.eventId);
    }
  }, [route.params]);
  
  // Main data loading function
  const loadData = async () => {
    setRefreshing(true);
    await Promise.all([
      fetchEvents(),
      fetchAnalyticsOverview()
    ]);
    setRefreshing(false);
  };
  
  // Fetch club's events
  const fetchEvents = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // In a real app, fetch from Supabase
        // Simulated data for now
        const eventsData = [
          {
            id: 'e1',
            title: 'Leadership Workshop',
            date: '2025-04-15',
            attendees: 28,
            maxAttendees: 30,
            completionRate: 85,
            averageFeedback: 4.2
          },
          {
            id: 'e2',
            title: 'Networking Night',
            date: '2025-03-20',
            attendees: 45,
            maxAttendees: 50,
            completionRate: 92,
            averageFeedback: 4.7
          },
          {
            id: 'e3',
            title: 'Industry Panel',
            date: '2025-02-10',
            attendees: 32,
            maxAttendees: 40,
            completionRate: 78,
            averageFeedback: 3.9
          }
        ];
        
        setEvents(eventsData);
        
        // If no event is selected, select the first one
        if (!selectedEvent && eventsData.length > 0) {
          setSelectedEvent(eventsData[0]);
          fetchEventAnalytics(eventsData[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching events:', error.message);
    }
  };
  
  // Fetch specific event details
  const fetchEventDetails = async (eventId) => {
    try {
      // In a real app, fetch from Supabase
      // For now, find in our local array
      const event = events.find(e => e.id === eventId);
      if (event) {
        setSelectedEvent(event);
        fetchEventAnalytics(eventId);
      } else {
        // If not found in our current list, would fetch from API
        console.log('Event not found in current list');
      }
    } catch (error) {
      console.error('Error fetching event details:', error.message);
    }
  };
  
  // Fetch analytics overview (across all events)
  const fetchAnalyticsOverview = async () => {
    try {
      // In a real app, fetch from Supabase
      // Simulated data for now
      const overviewData = {
        totalAttendees: 105,
        previousAttendees: 90,
        attendanceChange: 16.7,
        completionRate: 85,
        previousCompletionRate: 80,
        completionChange: 6.25,
        averageFeedback: 4.3,
        previousAverageFeedback: 4.1,
        feedbackChange: 4.9,
        odPoints: 140,
        registrationRate: 78
      };
      
      setAnalyticsData(overviewData);
    } catch (error) {
      console.error('Error fetching analytics overview:', error.message);
    }
  };
  
  // Fetch analytics for a specific event
  const fetchEventAnalytics = async (eventId) => {
    try {
      // In a real app, fetch from Supabase
      // Simulated data for now - would use eventId to fetch specific data
      const eventData = {
        totalAttendees: selectedEvent?.attendees || 0,
        attendanceChange: 10,
        completionRate: selectedEvent?.completionRate || 0,
        completionChange: 5,
        averageFeedback: selectedEvent?.averageFeedback || 0,
        feedbackChange: 2.4,
        gender: { male: 40, female: 55, other: 5 },
        departments: [
          { name: 'Engineering', count: 12 },
          { name: 'Business', count: 8 },
          { name: 'Arts', count: 6 },
          { name: 'Science', count: 4 }
        ]
      };
      
      setAnalyticsData({...analyticsData, ...eventData});
    } catch (error) {
      console.error('Error fetching event analytics:', error.message);
    }
  };
  
  // Pull to refresh
  const onRefresh = () => {
    loadData();
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Event Analytics</Text>
      </View>
      
      <View style={styles.eventSelector}>
        <Text style={styles.sectionTitle}>Select Event</Text>
        <FlatList
          horizontal
          data={events}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[
                styles.eventItem,
                selectedEvent?.id === item.id && styles.selectedEventItem
              ]}
              onPress={() => {
                setSelectedEvent(item);
                fetchEventAnalytics(item.id);
              }}
            >
              <Text 
                style={[
                  styles.eventItemTitle,
                  selectedEvent?.id === item.id && styles.selectedEventItemText
                ]}
                numberOfLines={1}
              >
                {item.title}
              </Text>
              <Text 
                style={[
                  styles.eventItemDate,
                  selectedEvent?.id === item.id && styles.selectedEventItemText
                ]}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.eventList}
        />
      </View>
      
      <View style={styles.overviewSection}>
        <Text style={styles.sectionTitle}>
          {selectedEvent ? `${selectedEvent.title} Overview` : 'Overall Analytics'}
        </Text>
        
        <View style={styles.analyticsGrid}>
          <AnalyticsCard
            title="Attendance"
            value={`${analyticsData.totalAttendees} ${selectedEvent ? `/ ${selectedEvent.maxAttendees}` : ''}`}
            percentChange={analyticsData.attendanceChange}
            type="attendance"
            scale="small"
          />
          
          <AnalyticsCard
            title="Completion Rate"
            value={`${analyticsData.completionRate}%`}
            percentChange={analyticsData.completionChange}
            type="completion"
            scale="small"
          />
          
          <AnalyticsCard
            title="Feedback Score"
            value={analyticsData.averageFeedback.toFixed(1)}
            percentChange={analyticsData.feedbackChange}
            type="feedback"
            scale="small"
          />
          
          <AnalyticsCard
            title="OD Points"
            value={analyticsData.odPoints}
            scale="small"
          />
        </View>
      </View>
      
      {selectedEvent && (
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Demographics</Text>
          
          <AnalyticsCard
            title="Gender Distribution"
            scale="large"
            progress={100}
            progressLabel={`Male: ${analyticsData.gender.male}% · Female: ${analyticsData.gender.female}% · Other: ${analyticsData.gender.other}%`}
            barColor="#9C27B0"
          />
          
          <Text style={[styles.sectionTitle, {marginTop: 20}]}>Department Breakdown</Text>
          
          {analyticsData.departments.map((dept, index) => (
            <AnalyticsCard
              key={index}
              title={dept.name}
              value={dept.count}
              scale="large"
              progress={(dept.count / analyticsData.totalAttendees) * 100}
              barColor="#3F51B5"
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  eventSelector: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  eventList: {
    paddingVertical: 10,
  },
  eventItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedEventItem: {
    backgroundColor: '#2196F3',
  },
  eventItemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  eventItemDate: {
    fontSize: 12,
    color: '#666',
  },
  selectedEventItemText: {
    color: '#fff',
  },
  overviewSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailsSection: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
});

export default EventAnalyticsScreen;