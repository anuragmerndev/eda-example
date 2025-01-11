import { Redis } from "ioredis";
import { eventType } from "../../../configs/events.js";

const redisClient = new Redis();
const redisClientPub = new Redis();

async function acceptRide() {
  try {
    redisClient.subscribe(eventType.RIDE_AVAILABLE, (err, chan) => {
      if (err) {
        console.error("Failed to subscribe: %s", err.message);
      } else {
        console.log(`subscribed to the event: ${chan}`);
      }
    });

    redisClient.on("message", (channel, message) => {
      if (channel === eventType.RIDE_AVAILABLE) {
        console.log(`Ride Available: ${message}`);
        redisClientPub.publish(
          eventType.RIDE_ACCEPTED,
          JSON.stringify({
            accepted: true,
          })
        );
      }
    });
  } catch (err) {
    console.log(err);
  }
}

acceptRide();
