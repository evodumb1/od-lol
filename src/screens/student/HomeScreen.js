import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl
} from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import { supabase } from '../../lib/supabaseClient';
import EventCard from '../../components/EventCard';
import ODCard from '../../components/ODCard';

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [totalODPoints, setTotalODPoints] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pendingODs, setPendingODs] = useState([]);
  
  // Fetch student profile
  const fetchStudentProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name, total_od_points')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setStudentName(data.first_name || 'Student');
          setTotalODPoints(data.total_od_points || 0);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    }
  };
  
  // Fetch upcoming events (demo data for now)
  const fetchUpcomingEvents = async () => {
    // This would be replaced with actual Supabase query
    // Simulated data for now
    setUpcomingEvents([
      {
        id: 'e1',
        title: 'Club Fair',
        clubName: 'Student Council',
        clubLogo: 'https://via.placeholder.com/60?text=SC',
        date: '2025-05-15',
        time: '12:00 PM - 3:00 PM',
        location: 'Main Quad',
        odPoints: 5,
        attendees: 45,
        maxAttendees: 100,
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        isRegistered: true
      },
      {
        id: 'e2',
        title: 'Leadership Workshop',
        clubName: 'Business Club',
        clubLogo: 'https://via.placeholder.com/60?text=BC',
        date: '2025-05-20',
        time: '4:00 PM - 6:00 PM',
        location: 'Room 102, Business Building',
        odPoints: 10,
        attendees: 28,
        maxAttendees: 30,
        isRegistered: false,
        isFull: true
      }
    ]);
  };
  
  // Fetch pending ODs (demo data for now)
  const fetchPendingODs = async () => {
    // This would be replaced with actual Supabase query
    // Simulated data for now
    setPendingODs([
      {
        id: 'od1',
        title: 'Event Planning Committee',
        clubName: 'Student Council',
        clubLogo: 'https://via.placeholder.com/60?text=SC',
        description: 'Help organize the spring festival events',
        pointsAwarded: 15,
        category: 'Leadership',
        status: 'pending',
        dateIssued: '2025-05-01',
        attendanceRequired: true,
        completionRequired: true
      }
    ]);
  };
  
  // Load all data
  const loadData = async () => {
    setRefreshing(true);
    await Promise.all([
      fetchStudentProfile(),
      fetchUpcomingEvents(),
      fetchPendingODs()
    ]);
    setRefreshing(false);
  };
  
  // Initial load
  useEffect(() => {
    loadData();
  }, []);
  
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
        <View>
          <Text style={styles.greeting}>Hi, {studentName}!</Text>
          <Text style={styles.subtitle}>Welcome back to your dashboard</Text>
        </View>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <MaterialIcons name="notifications" size={24} color="#333" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.pointsSummary}>
        <View style={styles.pointsCard}>
          <View style={styles.pointsHeader}>
            <MaterialIcons name="local-fire-department" size={24} color="#FF6B6B" />
            <Text style={styles.pointsTitle}>Total OD Points</Text>
          </View>
          <Text style={styles.pointsValue}>{totalODPoints}</Text>
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => navigation.navigate('MyODs')}
          >
            <Text style={styles.viewAllText}>View All ODs</Text>
            <MaterialIcons name="arrow-forward" size={16} color="#3498db" />
          </TouchableOpacity>
        </View>
      </View>
      
      {pendingODs.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pending ODs</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MyODs')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {pendingODs.map(od => (
            <ODCard
              key={od.id}
              title={od.title}
              clubName={od.clubName}
              clubLogo={od.clubLogo}
              description={od.description}
              pointsAwarded={od.pointsAwarded}
              category={od.category}
              status={od.status}
              dateIssued={od.dateIssued}
              attendanceRequired={od.attendanceRequired}
              completionRequired={od.completionRequired}
              feedbackRequired={od.feedbackRequired}
              onPress={() => navigation.navigate('MyODs', { screen: 'ODDetail', params: { odId: od.id } })}
            />
          ))}
        </View>
      )}
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Events')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map(event => (
            <EventCard
              key={event.id}
              title={event.title}
              clubName={event.clubName}
              clubLogo={event.clubLogo}
              date={event.date}
              time={event.time}
              location={event.location}
              odPoints={event.odPoints}
              attendees={event.attendees}
              maxAttendees={event.maxAttendees}
              imageUrl={event.imageUrl}
              isRegistered={event.isRegistered}
              onPress={() => navigation.navigate('EventDetail', { eventId: event.id })}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="event-busy" size={40} color="#ccc" />
            <Text style={styles.emptyStateText}>No upcoming events</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  pointsSummary: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  pointsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pointsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 8,
  },
  pointsValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  viewAllText: {
    fontSize: 14,
    color: '#3498db',
    marginRight: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#3498db',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
});

export default HomeScreen;