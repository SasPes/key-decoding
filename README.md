# 🔑 Key Decoding

<img src="ss/ss5.png" width="250"/><img src="ss/ss4.png" width="250"/><img src="ss/ss3.png" width="250"/>
<img src="ss/ss2.png" width="250"/><img src="ss/ss6.png" width="250"/><img src="ss/ss7.png" width="250"/>

A Bruce app for hackers, tinkerers and lock nerds.  
Decode and randomly generate key bitting patterns for a bunch of lock brands.  
Visualize the cuts, tweak the pins, and save/load your keys.  
Works on Bruce interpreter devices like the LILYGO T-Embed CC1101.

## 🏴‍☠️ Supported Keys

| Tested | Brand    | Pin Options  |
|:------:|:--------:|:------------|
| ✔️     | Titan    | 5, 6 pins   |
| ✔️     | Kwikset  | 5 pins      |
|        | Master   | 4, 5 pins   |
|        | Schlage  | 5, 6 pins   |
|        | Yale     | 5 pins      |
|        | Best     | 7 pins      |

## ⚡ Install

1. Drop `KeyDecoding.js` onto your Bruce device
2. Fire up the Bruce Interpreter
3. Have fun

## 🕹️ Usage

### Navigation

- **SEL (Select):** Move to next pin, or to Save/Load (in Decode mode)
- **NEXT:** Increase pin depth / Save (when "Save" is highlighted) / Load (when "Load" is highlighted)
- **PREV:** Decrease pin depth
- **ESC:** Back to main menu

### ⚙️ Workflow

1. **Pick a Brand:** Choose your target lock or load a saved key
2. **Pin Count:** Select how many pins (brand-dependent)
3. **Mode:**
    - **Random:** Get a random bitting (good for challenge keys)
    - **Decode:** Set each pin yourself (for real-world decoding)
4. **Tweak Pins:** Use NEXT/PREV to set each pin's depth
5. **Save:** SEL to "Save", then NEXT to write your key JSON
6. **Load:** SEL to "Load", then NEXT to pick a saved key

## 📂 Key File Format

Keys are saved as JSON in `/keys/`:

```json
{
  "type": "Titan",
  "outline": "5 pins",
  "pins": [ 3, 5, 2, 7, 4 ]
}
```

## 🔗 Links

- [Bruce Interpreter](https://github.com/pr3y/Bruce/wiki/Interpreter)
- [Deviant Ollam: Key-and-Pin-Decoding](https://github.com/deviantollam/Key-and-Pin-Decoding)
- [Flipper Zero: KeyCopier](https://github.com/zinongli/KeyCopier)
- [LILYGO T-Embed CC1101](https://lilygo.cc/products/t-embed-cc1101)

## ☠️ Disclaimer

For educational, CTF and red team use only.  
Don't break the law. Don't be a jerk.
