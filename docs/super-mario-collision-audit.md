# Super Mario Collision Audit

Source: `src/components/super-mario/level-map.json`

## Summary

- Collision surfaces: 44
- Collision ceilings: 8
- Visual grounds: 6
- Visual cubes: 5
- Visual rocks: 18
- Visual bricks: 19
- Visual pipes: 7
- Prize boxes: 9
- Edge tolerance: 16px

## Surface Inventory

| ID                  | Owner           | Kind     | X Range     | Height |
| ------------------- | --------------- | -------- | ----------- | ------ |
| ground-1-top        | ground-1        | ground   | 0-3374      | 64     |
| ground-2-top        | ground-2        | ground   | 3360-5680   | 128    |
| ground-3-top        | ground-3        | ground   | 5920-7680   | 64     |
| ground-4-top        | ground-4        | ground   | 7840-8240   | 64     |
| ground-5-top        | ground-5        | ground   | 8480-11440  | 64     |
| ground-6-top        | ground-6        | ground   | 11520-20520 | 64     |
| box-1-2-top         | prize-boxes-1-2 | box      | 1120-1280   | 384    |
| box-3-4-top         | prize-boxes-3-4 | box      | 1360-1520   | 624    |
| box-5-top           | prize-box-5     | box      | 2320-2400   | 544    |
| box-6-top           | prize-box-6     | box      | 3520-3600   | 208    |
| box-7-top           | prize-box-7     | box      | 3760-3840   | 368    |
| box-8-top           | prize-box-8     | box      | 7520-7600   | 304    |
| box-9-top           | prize-box-9     | box      | 7360-7440   | 1424   |
| cube-1-upper        | cube-1          | platform | 1605-1835   | 460    |
| cube-1-lower        | cube-1          | platform | 1440-1675   | 300    |
| pipe-1-top          | pipe-1          | pipe     | 2000-2160   | 304    |
| cube-2-top          | cube-2          | platform | 2800-3114   | 624    |
| cube-2-mid-high     | cube-2          | platform | 2566-2874   | 460    |
| cube-2-mid-low      | cube-2          | platform | 2245-2635   | 300    |
| cube-2-low          | cube-2          | platform | 2806-3275   | 222    |
| cube-3-top          | cube-3          | platform | 6804-7353   | 544    |
| cube-3-mid          | cube-3          | platform | 6644-7193   | 382    |
| cube-3-low          | cube-3          | platform | 6485-7034   | 222    |
| rock-1-2-top        | rocks-1-2       | platform | 7680-7840   | 464    |
| rock-3-8-top        | rocks-3-8       | platform | 8160-8240   | 304    |
| rock-3-8-mid        | rocks-3-8       | platform | 8080-8240   | 224    |
| rock-3-8-low        | rocks-3-8       | platform | 8000-8240   | 144    |
| rock-9-14-top       | rocks-9-14      | platform | 8480-8560   | 304    |
| rock-9-14-mid       | rocks-9-14      | platform | 8480-8640   | 224    |
| rock-9-14-low       | rocks-9-14      | platform | 8480-8720   | 144    |
| brick-stack-1-top   | bricks-1-16     | brick    | 10160-10480 | 304    |
| brick-stack-1-mid   | bricks-1-16     | brick    | 10080-10480 | 224    |
| brick-stack-1-low   | bricks-1-16     | brick    | 10000-10560 | 144    |
| brick-stack-2-mid   | bricks-17-19    | brick    | 10720-10800 | 224    |
| brick-stack-2-low   | bricks-17-19    | brick    | 10720-10880 | 144    |
| cube-4-top          | cube-4          | platform | 10960-11200 | 304    |
| pipe-2-top          | pipe-2          | pipe     | 9200-9360   | 224    |
| pipe-3-top          | pipe-3          | pipe     | 9520-9680   | 304    |
| pipe-4-top          | pipe-4          | pipe     | 11520-11680 | 304    |
| pipe-7-top          | pipe-7          | pipe     | 11840-12000 | 224    |
| final-pipe-zone-top | pipe-final      | pipe     | 12840-13280 | 215    |
| sky-cube-top        | cube-5          | platform | 6725-7035   | 1344   |
| sky-cloud-1-top     | clouds-1-4      | platform | 7200-7520   | 1104   |
| sky-cloud-2-top     | clouds-5-17     | platform | 7600-8640   | 1184   |

## Ceiling Inventory

| ID                | Owner           | X Range     | Height |
| ----------------- | --------------- | ----------- | ------ |
| box-1-2-bottom    | prize-boxes-1-2 | 1120-1280   | 214    |
| box-3-4-bottom    | prize-boxes-3-4 | 1360-1520   | 454    |
| box-5-bottom      | prize-box-5     | 2320-2400   | 374    |
| box-7-bottom      | prize-box-7     | 3760-3840   | 198    |
| box-8-bottom      | prize-box-8     | 7520-7600   | 134    |
| box-9-bottom      | prize-box-9     | 7360-7440   | 1254   |
| pipe-4-bottom     | pipe-4          | 11520-11680 | 444    |
| final-pipe-bottom | pipe-final      | 12850-13320 | 104    |

## Audit Notes

- Surface and ceiling ranges are visual world-space bounds. The controller expands those bounds by the shared edge tolerance before measuring Mario's foot-hitbox overlap.
- A surface supports Mario while at least half of the active foot hitbox overlaps it.
- The same inventory drives keyboard movement, scroll movement, falling, and landing.
