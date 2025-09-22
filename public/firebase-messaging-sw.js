importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-app-compat.js'
)
importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-messaging-compat.js'
)
firebase?.initializeApp({
  apiKey: "AIzaSyCVM27TaagPA6JrLLskYxtDp7aQzmKljCM",
  authDomain: "sopdia-foods.firebaseapp.com",
  databaseURL: "https://sopdia-foods-default-rtdb.firebaseio.com",
  projectId: "sopdia-foods",
  storageBucket: "sopdia-foods.appspot.com",
  messagingSenderId: "697258674622",
  appId: "1:697258674622:web:bde0e548a1032fd8e051ef",
  measurementId: "G-S25MSY3CFT"
})

// Retrieve firebase messaging
const messaging = firebase?.messaging()

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
})
