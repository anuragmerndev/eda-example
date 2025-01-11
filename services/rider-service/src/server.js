import { Redis } from "ioredis";
import { eventType } from "../../../configs/events.js";

const redisClient = new Redis();
const redisClientPub = new Redis();

async function startRide() {
  try {
    redisClientPub.publish(
      eventType.RIDE_REQUESTED,
      JSON.stringify({
        lat: 12.28,
        long: 27.34,
      })
    );

    redisClient.subscribe(eventType.RIDE_MATCHED, (err, channel) => {
      if (err) {
        console.error("Failed to subscribe: %s", err.message);
      } else {
        console.log(`subscribed to the event: ${channel}`);
      }
    });

    redisClient.on("message", (channel, message) => {
      if (channel === eventType.RIDE_MATCHED) {
        console.log(`Ride Matched: ${message}`);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

startRide();
