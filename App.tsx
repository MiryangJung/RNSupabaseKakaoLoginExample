import {login} from '@react-native-seoul/kakao-login';
import React, {useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {supabase} from './util/supabase';
import {User} from '@supabase/supabase-js';

function App(): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            padding: 20,
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            React Native Supabase Kakao Login Example
          </Text>

          <Pressable
            style={{
              padding: 10,
              backgroundColor: '#ffd900',
            }}
            onPress={async () => {
              const {idToken} = await login();
              if (!idToken) {
                Alert.alert('Login Error', 'Failed to login with Kakao.');
                return;
              }

              const {data, error} = await supabase.auth.signInWithIdToken({
                provider: 'kakao',
                token: idToken,
              });
              if (data) {
                setUser(data.user);
              }

              if (error) {
                Alert.alert('Login Error', JSON.stringify(error, null, 2));
              }
            }}>
            <Text>Kakao Login</Text>
          </Pressable>

          <Text
            style={{
              padding: 5,
              backgroundColor: '#f5f5f5',
              display: 'flex',
              flexDirection: 'column',
            }}>
            {JSON.stringify(user, null, 2)}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
