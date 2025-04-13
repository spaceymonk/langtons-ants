# langtons-ants

A simple implementation of Langont's Ants in [p5.js](https://p5js.org/) library.

## How To?

Simply run the `sketch.js` file in the [p5.js Web Editor](https://editor.p5js.org/) and select the file you want to run.

You can also try it [here](https://editor.p5js.org/brtknoz/full/AyXbv7y3_)!

## Writing your own _ants_

- Ant logic saved as `json` files. State names are the CSS colors.
- The canvas (the environment) is all white cells. So, starting state is `white`.
- States contains two element array in the order of `(direction, next_state)`

Here is an example code:

```json
{
  "white": [
    "right",
    "black"
  ],
  "black": [
    "left",
    "white"
  ]
}
```

---

Have fun!
