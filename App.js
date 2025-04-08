import 'react-native-gesture-handler'; // Must be at the top
import React, { useState, useEffect, useContext, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { onAuthStateChanged } from 'firebase/auth'; // Still commented out
// import { doc, getDoc } from 'firebase/firestore'; // Still commented out
// import { auth, db } from './firebase'; // Still commented out
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'; // Keep View, Text, etc.
import { supabase } from './src/lib/supabaseClient'; // Import Supabase client

// Auth Screens - UNCOMMENTED
import AuthLandingScreen from './src/screens/auth/AuthLandingScreen';
import StudentLoginScreen from './src/screens/auth/StudentLoginScreen';
import StudentSignUpScreen from './src/screens/auth/StudentSignUpScreen';
import ClubLoginScreen from './src/screens/auth/ClubLoginScreen';
import ClubSignUpScreen from './src/screens/auth/ClubSignUpScreen';

// Placeholder Dashboard Screens - UNCOMMENTED
import StudentDashboardNavigator from './src/navigation/StudentDashboardNavigator'; // Assuming this will exist
import ClubDashboardNavigator from './src/navigation/ClubDashboardNavigator'; // Assuming this will exist


const Stack = createStackNavigator(); // UNCOMMENTED
// Provide user, userRole, and loading state
export const AuthContext = createContext({ user: null, userRole: null, loading: true });

// REVISED AuthProvider - Uses Supabase
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      setLoading(true);
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const currentUser = session?.user;
        setUser(currentUser ?? null);

        if (currentUser) {
          // Fetch profile based on user ID
          const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', currentUser.id)
              .single();

          if (profileError) {
            console.warn("Error fetching profile on initial load:", profileError.message);
            setUserRole(null);
            // Optionally sign out if profile is crucial and missing
            // await supabase.auth.signOut(); 
            // setUser(null);
          } else {
            setUserRole(profile?.role ?? null);
          }
        } else {
          setUserRole(null);
        }
      } catch (e) {
        console.error("Error in initial auth check:", e);
        setUser(null);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionAndProfile();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setLoading(true);
      const currentUser = session?.user;
      setUser(currentUser ?? null);

      if (currentUser) {
        // Fetch profile on auth change
        try {
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', currentUser.id)
                .single();

            if (profileError) {
                console.warn("Error fetching profile on auth change:", profileError.message);
                setUserRole(null);
                // Optionally sign out
            } else {
                setUserRole(profile?.role ?? null);
            }
        } catch (e) {
            console.error("Error fetching profile after auth change:", e);
            setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Provide auth state including role
  return (
    <AuthContext.Provider value={{ user, userRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
}; // End of REVISED AuthProvider

// REVISED AppNavigator - Conditional rendering based on auth state
const AppNavigator = () => {
  const { user, userRole, loading } = useContext(AuthContext);

  // Show loading indicator while checking auth state
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         {user && userRole ? (
            // If user logged in AND role is determined
            <> 
              {userRole === 'student' && (
                <Stack.Screen name="StudentDashboard" component={StudentDashboardNavigator} />
              )}
              {userRole === 'club' && (
                <Stack.Screen name="ClubDashboard" component={ClubDashboardNavigator} />
              )}
              {/* Add a fallback screen if role is unexpected? */}
              {!['student', 'club'].includes(userRole) && (
                  <Stack.Screen name="AuthFlow" component={AuthNavigator} /> // Or an error screen
              )}
            </>
         ) : (
           // If user is not logged in OR role is null/undetermined
           <Stack.Screen name="AuthFlow" component={AuthNavigator} />
         )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; // End of REVISED AppNavigator

// MODIFIED AuthNavigator - Change initial route
const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="AuthLanding" screenOptions={{ headerShown: true }}>
     <Stack.Screen
        name="AuthLanding"
        component={AuthLandingScreen}
        options={{ title: 'Select Login/Sign Up' }}
      />
     <Stack.Screen
         name="StudentLogin"
         component={StudentLoginScreen}
         options={{ title: 'Student Login' }}
     />
     <Stack.Screen
         name="StudentSignUp"
         component={StudentSignUpScreen}
         options={{ title: 'Student Sign Up' }}
     />
     <Stack.Screen
         name="ClubLogin"
         component={ClubLoginScreen}
         options={{ title: 'Club Login' }}
     />
     <Stack.Screen
         name="ClubSignUp"
         component={ClubSignUpScreen}
         options={{ title: 'Club Sign Up' }}
     />
  </Stack.Navigator>
);

// Simple placeholder styles (keep for loading indicator)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
});

// Modified App export - RESTORED
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
    // <View style={styles.container}>
    //   <Text style={styles.text}>App Preview Loaded!</Text>
    // </View>
  );
}