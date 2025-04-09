import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5 } from 'react-native-vector-icons';
import ProgressBar from './ProgressBar';

const { width } = Dimensions.get('window');

const AnalyticsCard = ({ 
  title, 
  value, 
  previousValue, 
  percentChange, 
  icon, 
  type = 'default', // default, attendance, completion, feedback
  scale = 'small', // small, large
  progress, // 0-100 for progress bar
  progressLabel,
  onPress,
  barColor
}) => {
  
  // Calculate if it's an increase or decrease
  const isIncrease = percentChange > 0;
  const isNeutral = percentChange === 0;

  // Get color based on type and direction
  const getDirectionalColor = () => {
    if (isNeutral) return '#888888';
    
    switch (type) {
      case 'attendance':
        return isIncrease ? '#4CAF50' : '#F44336';
      case 'completion':
        return isIncrease ? '#4CAF50' : '#F44336';
      case 'feedback':
        return isIncrease ? '#4CAF50' : '#F44336';
      default:
        return isIncrease ? '#4CAF50' : '#F44336';
    }
  };

  // Get icon based on type
  const getTypeIcon = () => {
    switch (type) {
      case 'attendance':
        return <MaterialIcons name="group" size={24} color="#3498db" />;
      case 'completion':
        return <MaterialIcons name="check-circle" size={24} color="#2ecc71" />;
      case 'feedback':
        return <MaterialIcons name="star" size={24} color="#f1c40f" />;
      default:
        return icon || <MaterialIcons name="insert-chart" size={24} color="#3498db" />;
    }
  };

  // Get trend icon
  const getTrendIcon = () => {
    if (isNeutral) {
      return <MaterialIcons name="remove" size={16} color="#888888" />;
    }
    return isIncrease ? 
      <MaterialIcons name="arrow-upward" size={16} color={getDirectionalColor()} /> : 
      <MaterialIcons name="arrow-downward" size={16} color={getDirectionalColor()} />;
  };

  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        scale === 'large' ? styles.largeCard : styles.smallCard
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.headerRow}>
        {getTypeIcon()}
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      </View>
      
      <View style={styles.valueContainer}>
        <Text style={[
          styles.value, 
          scale === 'large' ? styles.largeValue : styles.smallValue
        ]}>
          {value}
        </Text>
        
        {percentChange !== undefined && (
          <View style={styles.changeContainer}>
            {getTrendIcon()}
            <Text style={[styles.changeText, { color: getDirectionalColor() }]}>
              {Math.abs(percentChange)}%
            </Text>
          </View>
        )}
      </View>
      
      {previousValue !== undefined && (
        <Text style={styles.previousValue}>
          Previous: {previousValue}
        </Text>
      )}
      
      {progress !== undefined && (
        <View style={styles.progressContainer}>
          <ProgressBar 
            progress={progress} 
            width={scale === 'large' ? width * 0.8 : width * 0.38} 
            color={barColor || '#3498db'}
          />
          {progressLabel && (
            <Text style={styles.progressLabel}>{progressLabel}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  smallCard: {
    width: width * 0.44,
  },
  largeCard: {
    width: width * 0.9,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
    flex: 1,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  value: {
    fontWeight: 'bold',
    color: '#333',
  },
  smallValue: {
    fontSize: 24,
  },
  largeValue: {
    fontSize: 32,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    marginLeft: 4,
  },
  previousValue: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  }
});

export default AnalyticsCard;