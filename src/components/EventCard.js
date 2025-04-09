import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import { format } from 'date-fns';

const EventCard = ({
  title,
  clubName,
  clubLogo,
  date,
  time,
  location,
  odPoints,
  attendees,
  maxAttendees,
  imageUrl,
  isRegistered = false,
  isPast = false,
  onPress,
  style
}) => {
  // Default placeholder images
  const defaultLogo = 'https://via.placeholder.com/60';
  const defaultImage = 'https://via.placeholder.com/400x200?text=Event';
  
  // Format date if it's a date object or ISO string
  const formattedDate = date instanceof Date ? 
    format(date, 'EEE, MMM d, yyyy') : 
    typeof date === 'string' ? 
      format(new Date(date), 'EEE, MMM d, yyyy') : 
      date;
  
  // Calculate if the event is full
  const isFull = maxAttendees && attendees >= maxAttendees;
  
  // Calculate capacity percentage
  const capacityPercentage = maxAttendees ? 
    Math.min(Math.round((attendees / maxAttendees) * 100), 100) : 0;
  
  // Get attendance color based on capacity
  const getAttendanceColor = () => {
    if (capacityPercentage < 50) return '#4CAF50'; // Green
    if (capacityPercentage < 80) return '#FFC107'; // Yellow
    return '#F44336'; // Red/full
  };

  return (
    <TouchableOpacity 
      style={[styles.container, style, isPast && styles.pastEvent]}
      onPress={onPress}
      disabled={!onPress}
    >
      {imageUrl ? (
        <Image 
          source={{ uri: imageUrl || defaultImage }}
          style={styles.coverImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholderCover}>
          <MaterialIcons name="event" size={60} color="#ddd" />
        </View>
      )}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Image 
            source={{ uri: clubLogo || defaultLogo }}
            style={styles.logo}
          />
          
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <Text style={styles.clubName} numberOfLines={1}>{clubName}</Text>
          </View>
          
          {odPoints > 0 && (
            <View style={styles.pointsContainer}>
              <MaterialIcons name="local-fire-department" size={16} color="#FF6B6B" />
              <Text style={styles.points}>{odPoints}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <MaterialIcons name="event" size={16} color="#666" />
            <Text style={styles.detailText}>{formattedDate}</Text>
          </View>
          
          {time && (
            <View style={styles.detailRow}>
              <MaterialIcons name="access-time" size={16} color="#666" />
              <Text style={styles.detailText}>{time}</Text>
            </View>
          )}
          
          {location && (
            <View style={styles.detailRow}>
              <MaterialIcons name="location-on" size={16} color="#666" />
              <Text style={styles.detailText} numberOfLines={1}>{location}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.footer}>
          {maxAttendees > 0 && (
            <View style={styles.attendanceContainer}>
              <Text style={styles.attendanceText}>
                {attendees}/{maxAttendees} {isFull ? '(Full)' : ''}
              </Text>
              <View style={styles.capacityBar}>
                <View 
                  style={[
                    styles.capacityFill, 
                    { 
                      width: `${capacityPercentage}%`,
                      backgroundColor: getAttendanceColor()
                    }
                  ]} 
                />
              </View>
            </View>
          )}
          
          {isRegistered && (
            <View style={styles.registeredBadge}>
              <MaterialIcons name="check-circle" size={12} color="#fff" />
              <Text style={styles.registeredText}>Registered</Text>
            </View>
          )}
          
          {isPast && (
            <View style={styles.pastBadge}>
              <MaterialIcons name="history" size={12} color="#fff" />
              <Text style={styles.pastText}>Past</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  pastEvent: {
    opacity: 0.7,
  },
  coverImage: {
    height: 120,
    width: '100%',
  },
  placeholderCover: {
    height: 120,
    width: '100%',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  clubName: {
    fontSize: 14,
    color: '#666',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4F4',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 12,
    marginLeft: 6,
  },
  points: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginLeft: 2,
  },
  detailsContainer: {
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  attendanceContainer: {
    flex: 1,
  },
  attendanceText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  capacityBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  capacityFill: {
    height: '100%',
    borderRadius: 2,
  },
  registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  registeredText: {
    fontSize: 10,
    color: '#fff',
    marginLeft: 3,
    fontWeight: '500',
  },
  pastBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#607D8B',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  pastText: {
    fontSize: 10,
    color: '#fff',
    marginLeft: 3,
    fontWeight: '500',
  },
});

export default EventCard;