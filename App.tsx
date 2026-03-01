import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@counter_value';

export default function App() {
  const [count, setCount] = useState<number>(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw !== null) setCount(Number(raw));
      } catch (e) {
        // ignore read errors for now
      } finally {
        setReady(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORAGE_KEY, String(count)).catch(() => {
      /* ignore write errors */
    });
  }, [count, ready]);

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#ffffff' }}
    >
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Compteur persistant</Text>
      <Text style={{ fontSize: 64, fontWeight: '700', marginBottom: 24 }}>{count}</Text>

      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <TouchableOpacity
          style={{ width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EF4444', marginRight: 16 }}
          onPress={() => setCount((c) => c - 1)}
        >
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: '600' }}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#16A34A' }}
          onPress={() => setCount((c) => c + 1)}
        >
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: '600' }}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setCount(0)}>
        <Text style={{ color: '#007AFF' }}>Réinitialiser</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}
