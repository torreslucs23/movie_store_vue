import { Client } from "@stomp/stompjs";
import { WebSocket } from "ws";

Object.assign(global, WebSocket);

let client = null;

export function setupWebSocket(onMessageReceived) {
  if (!client) {
    client = new Client({
      brokerURL: "ws://localhost:8080/stomp",
      onConnect: () => {
        client.subscribe("/notification/movie", (message) => {
          onMessageReceived(message.body);
        });
      },
    });
    client.activate();
  }
}

export function disconnectWebSocket() {
  if (client) {
    client.deactivate();
    client = null;
  }
}
