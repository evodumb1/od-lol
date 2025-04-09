import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

const ODCard = ({
  title,
  clubName,
  clubLogo,
  description,
  pointsAwarded,
  category,
  status = 'pending', // pending, approved, rejected, completed
  dateIssued,
  dateCompleted,
  attendanceRequired = false,
  completionRequired = false,
  feedbackRequired = false,
  progress = 0, // 0-100
  onPress,
  style
}) => {
  // Default placeholder image for club logo
  const defaultLogo = 'https://via.placeholder.com/150';
  
  // Format date string
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
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

  // Get status color and icon
  const getStatusInfo = () => {
    switch(status.toLowerCase()) {
      case 'pending':
        return { color: '#FFA000', icon: 'hourglass-empty' };
      case 'approved':
        return { color: '#4CAF50', icon: 'check-circle' };
      case 'rejected':
        return { color: '#F44336', icon: 'cancel' };
      case 'completed':
        return { color: '#3F51B5', icon: 'done-all' };
      case 'in progress':
        return { color: '#2196F3', icon: 'trending-up' };
      default:
        return { color: '#757575', icon: 'help' };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <TouchableOpacity 
      style={[styles.container, style]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.header}>
        <Image 
          source={{ uri: clubLogo || defaultLogo }}
          style={styles.logo}
          resizeMode="cover"
        />
        
        <View style={styles.headerContent}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.clubName} numberOfLines={1}>{clubName}</Text>
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
      
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <MaterialIcons name={getCategoryIcon()} size={16} color="#666" />
          <Text style={styles.infoText}>{category || 'General'}</Text>
        </View>
        
        <View style={styles.statusContainer}>
          <MaterialIcons name={statusInfo.icon} size={16} color={statusInfo.color} />
          <Text style={[styles.statusText, { color: statusInfo.color }]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.dateRow}>
        <View style={styles.dateItem}>
          <Text style={styles.dateLabel}>Issued:</Text>
          <Text style={styles.dateValue}>{formatDate(dateIssued)}</Text>
        </View>
        
        {dateCompleted && (
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Completed:</Text>
            <Text style={styles.dateValue}>{formatDate(dateCompleted)}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.requirementsRow}>
        {attendanceRequired && (
          <View style={[styles.requirement, styles.activeRequirement]}>
            <MaterialIcons name="event" size={14} color="#3498db" />
            <Text style={styles.requirementText}>Attendance</Text>
          </View>
        )}
        
        {completionRequired && (
          <View style={[styles.requirement, styles.activeRequirement]}>
            <MaterialIcons name="assignment-turned-in" size={14} color="#3498db" />
            <Text style={styles.requirementText}>Completion</Text>
          </View>
        )}
        
        {feedbackRequired && (
          <View style={[styles.requirement, styles.activeRequirement]}>
            <MaterialIcons name="rate-review" size={14} color="#3498db" />
            <Text style={styles.requirementText}>Feedback</Text>
          </View>
        )}
      </View>
      
      {progress > 0 && progress < 100 && (
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      )}
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
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 12,
  },
  headerContent: {
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 12,
    color: '#888',
    marginRight: 4,
  },
  dateValue: {
    fontSize: 12,
    color: '#333',
  },
  requirementsRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF2F8',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginRight: 8,
  },
  activeRequirement: {
    opacity: 1,
  },
  inactiveRequirement: {
    opacity: 0.5,
  },
  requirementText: {
    fontSize: 12,
    color: '#3498db',
    marginLeft: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 2,
  },
});

export default ODCard;