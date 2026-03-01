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
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Text className="text-lg mb-3">Compteur persistant</Text>
      <Text className="text-6xl font-bold mb-6">{count}</Text>

      <View className="flex-row space-x-6 mb-5">
        <TouchableOpacity
          className="w-20 h-20 rounded-full bg-red-500 items-center justify-center"
          onPress={() => setCount((c) => c - 1)}
        >
          <Text className="text-white text-3xl font-semibold">-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-20 h-20 rounded-full bg-green-600 items-center justify-center"
          onPress={() => setCount((c) => c + 1)}
        >
          <Text className="text-white text-3xl font-semibold">+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setCount(0)}>
        <Text className="text-blue-600">Réinitialiser</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}
