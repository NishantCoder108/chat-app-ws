import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const subscriptions: {
  [key: string]: {
    ws: WebSocket;
    rooms: string[];
  };
} = {};

wss.on("connection", function connection(userSocket) {
  //   userSocket.on("error", console.error);

  const id = randomId();

  subscriptions[id] = {
    ws: userSocket,
    rooms: [],
  };

  /*

  -> For subscribe:

  {
    "type":"SUBSCRIBE",
    "room": "room1"
}

-> For sendMessage:

{
  "type":"sendMessage",
  "message": "Hello",
  "roomId": "room1"
}


So, for every message, we need to send it to all the users who are subscribed to that room.
- i will take roomId from userSocket and send it to all the users who are subscribed to that room.

*/

  setInterval(() => {
    console.log("subscriptions", subscriptions);
  }, 5000);
  userSocket.on("message", function message(data) {
    console.log("data", data);
    const parsedMessage = JSON.parse(data as unknown as string);

    if (parsedMessage.type === "SUBSCRIBE") {
      if (subscriptions[id].rooms.includes(parsedMessage.room)) {
        return;
      }
      subscriptions[id].rooms.push(parsedMessage.room);
    }

    if (parsedMessage.type === "sendMessage") {
      const message = parsedMessage.message;
      const roomId = parsedMessage.roomId;

      Object.keys(subscriptions).forEach((userId) => {
        if (subscriptions[userId].rooms.includes(roomId)) {
          subscriptions[userId].ws.send(
            JSON.stringify({
              type: "message",
              message,
              roomId,
            })
          );
        }
      });
    }
  });
});

const randomId = () => {
  return Math.random();
};
