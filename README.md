# expo-audio-stream-timestamp

Repro for `useAudioStream` reporting a `buffer.timestamp` on iOS that runs about 41x slower than wall clock.

```
npm install
npx expo run:ios
```

Tap Start and wait ~10s. `elapsed` reaches ~10000ms while `buffer.timestamp` stays around 240ms (Apple Silicon simulator). Android reports the right value.
