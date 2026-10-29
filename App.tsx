import { requestRecordingPermissionsAsync, setAudioModeAsync, useAudioStream } from 'expo-audio';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const startedAtRef = useRef(0);
  const [timestampMs, setTimestampMs] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);

  const { stream } = useAudioStream({
    sampleRate: 48000,
    channels: 1,
    encoding: 'int16',
    onBuffer: (buffer) => {
      const timestamp = Math.round(buffer.timestamp * 1000);
      const elapsed = Date.now() - startedAtRef.current;
      setTimestampMs(timestamp);
      setElapsedMs(elapsed);
      console.log(`buffer.timestamp: ${timestamp}ms, elapsed: ${elapsed}ms`);
    },
  });

  const start = async () => {
    await requestRecordingPermissionsAsync();
    await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
    startedAtRef.current = Date.now();
    await stream.start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>buffer.timestamp: {timestampMs}ms</Text>
      <Text style={styles.text}>elapsed: {elapsedMs}ms</Text>
      <Button title="Start" onPress={start} />
      <Button title="Stop" onPress={() => stream.stop()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  text: {
    fontSize: 18,
  },
});
