// import { initializeApp, getApps, getApp } from 'firebase/app'
// import {
//     getMessaging,
//     getToken,
//     onMessage,
//     isSupported,
// } from 'firebase/messaging'
// import { useStoreFcm } from './hooks/react-query/push-notification/usePushNotification'

// const firebaseConfig = {
//     apiKey: '',
//     authDomain: '',
//     projectId: '',
//     storageBucket: '',
//     messagingSenderId: '',
//     appId: '',
//     measurementId: '',
// }
// const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()
// const messaging = (async () => {
//     try {
//         const isSupportedBrowser = await isSupported()
//         if (isSupportedBrowser) {
//             return getMessaging(firebaseApp)
//         }

//         return null
//     } catch (err) {
//         return null
//     }
// })()

// export const fetchToken = async (setTokenFound, setFcmToken) => {
//     return getToken(await messaging, {
//         vapidKey:
//             '',
//     })
//         .then((currentToken) => {
//             if (currentToken) {
//                 setTokenFound(true)
//                 setFcmToken(currentToken)

//                 // Track the token -> client mapping, by sending to backend server
//                 // show on the UI that permission is secured
//             } else {
//                 setTokenFound(false)
//                 setFcmToken()
//                 // shows on the UI that permission is required
//             }
//         })
//         .catch((err) => {
//             console.error(err)
//             // catch error while creating client token
//         })
// }

// export const onMessageListener = async () =>
//     new Promise((resolve) =>
//         (async () => {
//             const messagingResolve = await messaging
//             onMessage(messagingResolve, (payload) => {
//                 resolve(payload)
//             })
//         })()
//     )







// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";

// // --- Firebase Config ---
// const firebaseConfig = {
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: "",
//   measurementId: "",
// };

// // --- Initialize Firebase ---
// const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// // --- Messaging Instance ---
// let messaging = null;
// (async () => {
//   try {
//     const supported = await isSupported();
//     if (supported) {
//       messaging = getMessaging(firebaseApp);
//     } else {
//       console.warn("Firebase messaging not supported in this browser.");
//     }
//   } catch (err) {
//     console.error("Error initializing messaging:", err);
//     messaging = null;
//   }
// })();

// // --- Fetch Token Safely ---
// export const fetchToken = async (setTokenFound, setFcmToken) => {
//   try {
//     if (!messaging) {
//       console.warn("Messaging instance not available.");
//       setTokenFound(false);
//       return;
//     }

//     // ⚠️ must provide a valid VAPID key from Firebase console
//     const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
//     if (!vapidKey) {
//       console.error("Missing VAPID key!");
//       setTokenFound(false);
//       return;
//     }

//     const currentToken = await getToken(messaging, { vapidKey });

//     if (currentToken) {
//       setTokenFound(true);
//       setFcmToken(currentToken);
//     } else {
//       setTokenFound(false);
//       setFcmToken();
//     }
//   } catch (err) {
//     console.error("fetchToken error:", err);
//     setTokenFound(false);
//     setFcmToken();
//   }
// };

// // --- Message Listener Safely ---
// export const onMessageListener = () =>
//   new Promise((resolve, reject) => {
//     try {
//       if (!messaging) {
//         console.warn("Messaging instance not available.");
//         return;
//       }
//       onMessage(messaging, (payload) => {
//         resolve(payload);
//       });
//     } catch (err) {
//       console.error("onMessageListener error:", err);
//       reject(err);
//     }
//   });




import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
};

// Initialize Firebase
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let messaging = null;

(async () => {
  try {
    if (await isSupported()) {
      messaging = getMessaging(firebaseApp);
    } else {
      console.warn("Firebase messaging not supported in this browser.");
    }
  } catch (err) {
    console.error("Error initializing messaging:", err);
    messaging = null;
  }
})();

// Fetch FCM Token safely
export const fetchToken = async (setTokenFound, setFcmToken) => {
  if (!messaging) return setTokenFound(false);

  const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
  if (!vapidKey) {
    console.warn("Missing VAPID key for Firebase messaging!");
    return setTokenFound(false);
  }

  try {
    const currentToken = await getToken(messaging, { vapidKey });
    if (currentToken) {
      setTokenFound(true);
      setFcmToken(currentToken);
    } else {
      setTokenFound(false);
      setFcmToken(null);
    }
  } catch (err) {
    console.error("fetchToken error:", err);
    setTokenFound(false);
    setFcmToken(null);
  }
};

// Listen for messages safely
export const onMessageListener = () =>
  new Promise((resolve, reject) => {
    if (!messaging) return;
    try {
      onMessage(messaging, (payload) => resolve(payload));
    } catch (err) {
      reject(err);
    }
  });

export default firebaseApp;
