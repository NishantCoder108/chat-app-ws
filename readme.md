# Steps to creating chat app:

1. Initialize the nodejs project
2. Install dependencies
3. `npm i ws`
4. Copy code from `https://www.npmjs.com/package/ws` and paste it in `index.ts`
5. Package.json file update with `"build": "tsc -b", "start": "node dist/index.js"`
6. Run `npm run build`
7. Run `npm run start`
8. create subscriptions object with rooms and ws
9. create a function to send message to all the users who are subscribed to that room
10. create a function to subscribe to a room
11. If any message from specific room is received, send it to all the users who are subscribed to that room
12. we can subscribe by Postman and also from [hoppscotch](https://hoppscotch.io/) for testing purposes
