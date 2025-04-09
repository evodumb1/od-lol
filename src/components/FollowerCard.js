import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

const FollowerCard = ({ 
  name, 
  username, 
  profileImage, 
  followerSince, 
  eventsAttended = 0,
  totalEvents = 0,
  eventRatio,
  onPress,
  onRemove,
  removable = false 
}) => {
  // Default placeholder image for profile
  const defaultImage = 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70);
  
  // Calculate attendance percentage if not provided directly
  const attendancePercentage = eventRatio ? 
    eventRatio : 
    totalEvents > 0 ? Math.round((eventsAttended / totalEvents) * 100) : 0;
  
  // Format date string (could be expanded in the future)
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.content}>
        <Image 
          source={{ uri: profileImage || defaultImage }}
          style={styles.profileImage}
        />
        
        <View style={styles.textContent}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <Text style={styles.username} numberOfLines={1}>@{username}</Text>
          
          <View style={styles.statsRow}>
            <MaterialIcons name="event" size={14} color="#888" />
            <Text style={styles.statText}>
              {eventsAttended} / {totalEvents} events ({attendancePercentage}%)
            </Text>
          </View>
          
          <View style={styles.statsRow}>
            <MaterialIcons name="calendar-today" size={14} color="#888" />
            <Text style={styles.statText}>
              Following since {formatDate(followerSince)}
            </Text>
          </View>
        </View>
        
        {removable && (
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={onRemove}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <MaterialIcons name="close" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContent: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  username: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  statText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
  removeButton: {
    padding: 5,
  }
});

export default FollowerCard;