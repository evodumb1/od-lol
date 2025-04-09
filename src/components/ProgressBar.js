import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ 
  progress, 
  width = 200, 
  height = 8, 
  color = '#3498db', 
  backgroundColor = '#e0e0e0',
  borderRadius = 4
}) => {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  // Calculate fill width
  const fillWidth = (clampedProgress / 100) * width;
  
  return (
    <View 
      style={[
        styles.container, 
        { 
          width, 
          height, 
          backgroundColor,
          borderRadius
        }
      ]}
    >
      <View 
        style={[
          styles.fill, 
          { 
            width: fillWidth, 
            height, 
            backgroundColor: color,
            borderRadius
          }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    left: 0,
  }
});

export default ProgressBar;