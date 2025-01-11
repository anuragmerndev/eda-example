import { Redis } from "ioredis";
import { eventType } from "../../../configs/events.js";

const redisClient = new Redis();
const redisClientPub = new Redis();

async function matchRide() {
  try {
    redisClient.subscribe(eventType.RIDE_ACCEPTED, (err, channel) => {
      if (err) {
        console.error("Failed to subscribe: %s", err.message);
      } else {
        console.log(`successfully subscribed to ${channel}`);
      }
    });

    redisClient.subscribe(eventType.RIDE_REQUESTED, (err, channel) => {
      if (err) {
        console.error("Failed to subscribe: %s", err.message);
      } else {
        console.log(`successfully subscribed to ${channel}`);
      }
    });

    redisClient.on("message", (channel, message) => {
      if (channel === eventType.RIDE_REQUESTED) {
        console.log(`Ride Requested: ${message}`);
        redisClientPub.publish(eventType.RIDE_AVAILABLE, message);
      }

      if (channel === eventType.RIDE_ACCEPTED) {
        console.log(`Ride Accepted: ${message}`);
        redisClientPub.publish(eventType.RIDE_MATCHED, message);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

matchRide();
