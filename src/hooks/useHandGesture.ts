import { useEffect, useRef, useState } from 'react';
import { FilesetResolver, GestureRecognizer } from '@mediapipe/tasks-vision';
import { HandGesture } from '../types';

export const useHandGesture = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const [gesture, setGesture] = useState<HandGesture>(HandGesture.UNKNOWN);
  const [isDetecting, setIsDetecting] = useState(false);
  const gestureRecognizerRef = useRef<GestureRecognizer | null>(null);
  const runningModeRef = useRef<'IMAGE' | 'VIDEO'>('IMAGE');
  const webcamRunningRef = useRef(false);
  const lastVideoTimeRef = useRef<number>(-1);

  const createGestureRecognizer = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
    );

    gestureRecognizerRef.current = await GestureRecognizer.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
          delegate: 'GPU',
        },
        runningMode: runningModeRef.current,
      }
    );
  };

  // Function to predict gestures
  const predictWebcam = async () => {
    if (!gestureRecognizerRef.current || !videoRef.current) {
      return;
    }

    if (runningModeRef.current === 'IMAGE') {
      runningModeRef.current = 'VIDEO';
      await gestureRecognizerRef.current.setOptions({ runningMode: 'VIDEO' });
    }

    const video = videoRef.current;
    const nowInMs = Date.now();

    // Check if video has valid dimensions before processing
    if (video.videoWidth <= 0 || video.videoHeight <= 0) {
      // Video dimensions not ready yet, try again on next animation frame
      if (webcamRunningRef.current) {
        window.requestAnimationFrame(predictWebcam);
      }
      return;
    }

    if (video.currentTime !== lastVideoTimeRef.current) {
      lastVideoTimeRef.current = video.currentTime;
      try {
        const results = gestureRecognizerRef.current.recognizeForVideo(
          video,
          nowInMs
        );

        if (results.gestures.length > 0) {
          const categoryName = results.gestures[0][0].categoryName;
          const categoryScore = results.gestures[0][0].score;

          if (categoryScore > 0.7) {
            // Map gesture name to our enum
            switch (categoryName) {
              case 'Closed_Fist':
                setGesture(HandGesture.ONE);
                break;
              case 'Victory':
                setGesture(HandGesture.TWO);
                break;
              case 'Open_Palm':
                setGesture(HandGesture.THREE);
                break;
              case 'ILoveYou':
                setGesture(HandGesture.FOUR);
                break;
              case 'Thumb_Up':
                setGesture(HandGesture.THUMB_UP);
                break;
              default:
                setGesture(HandGesture.UNKNOWN);
            }
          }
        } else {
          setGesture(HandGesture.UNKNOWN);
        }
      } catch (error) {
        console.error('Error recognizing video:', error);
        // Continue trying to recognize on next frame
      }
    }

    if (webcamRunningRef.current) {
      window.requestAnimationFrame(predictWebcam);
    }
  };

  const startDetection = async () => {
    if (!gestureRecognizerRef.current) {
      await createGestureRecognizer();
    }

    if (videoRef.current && !webcamRunningRef.current) {
      // Wait for video dimensions to be available
      if (
        videoRef.current.videoWidth === 0 ||
        videoRef.current.videoHeight === 0
      ) {
        const checkVideoReady = () => {
          if (
            videoRef.current &&
            videoRef.current.videoWidth > 0 &&
            videoRef.current.videoHeight > 0
          ) {
            webcamRunningRef.current = true;
            setIsDetecting(true);
            predictWebcam();
          } else {
            // Check again after a short delay
            setTimeout(checkVideoReady, 100);
          }
        };

        checkVideoReady();
      } else {
        webcamRunningRef.current = true;
        setIsDetecting(true);
        predictWebcam();
      }
    }
  };

  const stopDetection = () => {
    webcamRunningRef.current = false;
    setIsDetecting(false);
  };

  useEffect(() => {
    createGestureRecognizer();

    return () => {
      if (gestureRecognizerRef.current) {
        gestureRecognizerRef.current.close();
      }
    };
  }, []);

  return {
    gesture,
    isDetecting,
    startDetection,
    stopDetection,
  };
};
