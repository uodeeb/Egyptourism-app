import { AppRegistry } from "react-native";
import App from "./App";

AppRegistry.registerComponent("App", () => App);

AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});
/*____________________ add service worker function ___________________*/

// service worker registration — register directly if supported
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./registerServiceWorker.js').catch((err) => {
    // don't let a service worker registration failure block the app
    console.warn('Service worker registration failed:', err);
  });
}