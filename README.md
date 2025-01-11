### Event Driven Architecture

A event driven architecture simulated for the uber like application

## stakeholders

- rider
- driver
- matching service (central)

## flow (steps)

A rider requests for the ride along with the their lat, long.
Matching service checks for how many drivers are available withing that area, matches the rider to driver. A driver recieves the requests, accepts the requests. Matching service notifies the rider that which driver has accepted.

## Events

- RIDE_REQUESTED
- DRIVER_ONLINE
- RIDE_ACCEPTED
- RIDE_MATCHED

## Technology

- Node.js (Server)
- Redis (Pub/Sub)
