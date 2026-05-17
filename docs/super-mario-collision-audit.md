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
| cube-1-upper        | cube-1          | platform | 1540-1800   | 460    |
| cube-1-lower        | cube-1          | platform | 1380-1640   | 300    |
| pipe-1-top          | pipe-1          | pipe     | 2000-2160   | 304    |
| cube-2-top          | cube-2          | platform | 2740-3080   | 624    |
| cube-2-mid-high     | cube-2          | platform | 2500-2840   | 460    |
| cube-2-mid-low      | cube-2          | platform | 2180-2615   | 300    |
| cube-2-low          | cube-2          | platform | 2730-3260   | 222    |
| cube-3-top          | cube-3          | platform | 6740-7330   | 544    |
| cube-3-mid          | cube-3          | platform | 6580-7180   | 382    |
| cube-3-low          | cube-3          | platform | 6420-7010   | 222    |
| rock-1-2-top        | rocks-1-2       | platform | 7620-7810   | 464    |
| rock-3-8-top        | rocks-3-8       | platform | 8100-8240   | 304    |
| rock-3-8-mid        | rocks-3-8       | platform | 8010-8240   | 224    |
| rock-3-8-low        | rocks-3-8       | platform | 7930-8240   | 144    |
| rock-9-14-top       | rocks-9-14      | platform | 8410-8520   | 304    |
| rock-9-14-mid       | rocks-9-14      | platform | 8410-8610   | 224    |
| rock-9-14-low       | rocks-9-14      | platform | 8410-8690   | 144    |
| brick-stack-1-top   | bricks-1-16     | brick    | 10110-10450 | 304    |
| brick-stack-1-mid   | bricks-1-16     | brick    | 10020-10450 | 224    |
| brick-stack-1-low   | bricks-1-16     | brick    | 9930-10540  | 144    |
| brick-stack-2-mid   | bricks-17-19    | brick    | 10650-10760 | 224    |
| brick-stack-2-low   | bricks-17-19    | brick    | 10650-10850 | 144    |
| cube-4-top          | cube-4          | platform | 10900-11170 | 304    |
| pipe-2-top          | pipe-2          | pipe     | 9200-9360   | 224    |
| pipe-3-top          | pipe-3          | pipe     | 9520-9680   | 304    |
| pipe-4-top          | pipe-4          | pipe     | 11520-11680 | 304    |
| pipe-7-top          | pipe-7          | pipe     | 11840-12000 | 224    |
| final-pipe-zone-top | pipe-final      | pipe     | 12840-13280 | 215    |
| sky-cube-top        | cube-5          | platform | 6620-7140   | 1344   |
| sky-cloud-1-top     | clouds-1-4      | platform | 7190-7530   | 1104   |
| sky-cloud-2-top     | clouds-5-17     | platform | 7590-8650   | 1184   |

## Ceiling Inventory

| ID                | Owner           | X Range     | Height |
| ----------------- | --------------- | ----------- | ------ |
| box-1-2-bottom    | prize-boxes-1-2 | 1060-1240   | 214    |
| box-3-4-bottom    | prize-boxes-3-4 | 1300-1480   | 454    |
| box-5-bottom      | prize-box-5     | 2260-2370   | 374    |
| box-7-bottom      | prize-box-7     | 3700-3810   | 198    |
| box-8-bottom      | prize-box-8     | 7460-7570   | 134    |
| box-9-bottom      | prize-box-9     | 7360-7440   | 1254   |
| pipe-4-bottom     | pipe-4          | 11460-11650 | 444    |
| final-pipe-bottom | pipe-final      | 12850-13320 | 104    |

## Audit Notes

- Mario support is based on foot-hitbox overlap against this inventory.
- A surface supports Mario while at least half of the active foot hitbox overlaps it.
- The same inventory drives keyboard movement, scroll movement, falling, and landing.
