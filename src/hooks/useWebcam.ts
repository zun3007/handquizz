import { useEffect, useRef, useState } from 'react';

export const useWebcam = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startWebcam = async () => {
    if (streamRef.current) {
      return; // Webcam already running
    }

    try {
      const constraints = {
        video: {
          width: { ideal: 640, min: 320 },
          height: { ideal: 480, min: 240 },
          facingMode: 'user',
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // Wait for video metadata to load to ensure dimensions are available
        await new Promise((resolve) => {
          if (videoRef.current) {
            // If metadata is already loaded, resolve immediately
            if (videoRef.current.readyState >= 2) {
              resolve(true);
            } else {
              // Otherwise wait for the metadata to load
              videoRef.current.onloadedmetadata = () => resolve(true);
            }
          }
        });

        await videoRef.current.play();

        // Double check that video dimensions are valid
        if (
          videoRef.current.videoWidth <= 0 ||
          videoRef.current.videoHeight <= 0
        ) {
          throw new Error('Video dimensions are not valid');
        }

        streamRef.current = stream;
        setIsWebcamReady(true);
        setError(null);
      }
    } catch (err) {
      console.error('Error accessing webcam:', err);
      setError(
        'Unable to access webcam. Please check permissions and try again.'
      );
      setIsWebcamReady(false);
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsWebcamReady(false);
  };

  useEffect(() => {
    // Cleanup function to stop webcam when component unmounts
    return () => {
      stopWebcam();
    };
  }, []);

  return {
    videoRef,
    isWebcamReady,
    error,
    startWebcam,
    stopWebcam,
  };
};
