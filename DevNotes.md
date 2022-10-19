## 1. Draw-Calculate-Resolve vs. Calculate-Resolve-Draw
If one draws first, and then calculates-resolves, the modifications will be applied/drawn on the next frame, which means if the initial/current state is faulty, it'll still be drawn. This allows faulty states to be shown, and then corrected, if possible.

On the other hand, if one calculates and resolves first, and then draws, the viewer won't see any faulty state.

Let's say that there's a ball that continuously bounces between two walls. As long as the ball spawns between the walls (no intersection) and starts bouncing, it doesn't matter which method/order is used to drawn entities/shapes.

But, if the ball were to, mistakenly or not, spawn near/in a wall (with intersection), draw-calculate-resolve method presents a problem, that the viewer will see the faulty state. The resolved state (ball is pushed/drawn near the wall, no intersection) will be drawn on the next frame.

So the world/animation should be fault tolerant (show the faulty state) or not (fix and then show)?