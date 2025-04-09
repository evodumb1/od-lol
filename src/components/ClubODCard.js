import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

const ClubODCard = ({
  name,
  logoUrl,
  description,
  pointsAwarded,
  category,
  dateCreated,
  isUnlocked = false,
  onPress,
  style
}) => {
  // Default placeholder image for club logo
  const defaultLogo = 'https://via.placeholder.com/150';
  
  // Format date string
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

  // Get category icon based on category name
  const getCategoryIcon = () => {
    switch(category?.toLowerCase()) {
      case 'academic':
        return 'school';
      case 'sports':
        return 'sports';
      case 'arts':
        return 'palette';
      case 'service':
        return 'volunteer-activism';
      case 'leadership':
        return 'campaign';
      case 'cultural':
        return 'diversity-3';
      default:
        return 'star';
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, style]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.header}>
        <Image 
          source={{ uri: logoUrl || defaultLogo }}
          style={styles.logo}
          resizeMode="cover"
        />
        
        <View style={styles.headerContent}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          
          <View style={styles.categoryRow}>
            <MaterialIcons name={getCategoryIcon()} size={16} color="#666" />
            <Text style={styles.category}>{category || 'General'}</Text>
          </View>
        </View>
        
        <View style={styles.pointsContainer}>
          <MaterialIcons name="local-fire-department" size={16} color="#FF6B6B" />
          <Text style={styles.points}>{pointsAwarded} pts</Text>
        </View>
      </View>
      
      {description && (
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      )}
      
      <View style={styles.footer}>
        <Text style={styles.dateText}>Created {formatDate(dateCreated)}</Text>
        
        <View style={styles.statusContainer}>
          <MaterialIcons 
            name={isUnlocked ? "lock-open" : "lock"} 
            size={16} 
            color={isUnlocked ? "#4CAF50" : "#FFA000"} 
          />
          <Text 
            style={[
              styles.statusText, 
              { color: isUnlocked ? "#4CAF50" : "#FFA000" }
            ]}
          >
            {isUnlocked ? "Unlocked" : "Locked"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4F4',
    padding: 6,
    borderRadius: 16,
  },
  points: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#888',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
});

export default ClubODCard;