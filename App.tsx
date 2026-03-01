import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.title}>Compteur persistant</Text>
      <Text style={styles.count}>{count}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.decrement]}
          onPress={() => setCount((c) => c - 1)}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.increment]}
          onPress={() => setCount((c) => c + 1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.reset} onPress={() => setCount(0)}>
        <Text style={styles.resetText}>Réinitialiser</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
  },
  count: {
    fontSize: 64,
    fontWeight: '700',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  increment: {
    backgroundColor: '#4CAF50',
  },
  decrement: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '600',
  },
  reset: {
    marginTop: 8,
  },
  resetText: {
    color: '#007AFF',
  },
});
