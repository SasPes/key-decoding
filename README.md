# 🔑 Key Decoding



> **Note:** Only tested on LILYGO T-Embed CC1101.  
> For educational and red team use only. Don't be evil.

---

## 🏴‍☠️ What is this?

A Bruce app for hackers, tinkerers, and lock nerds.  
Decode, measure, and randomly generate key bitting patterns for a bunch of lock brands.  
Visualize the cuts, tweak the pins, and save/load your combos.  
Works on Bruce interpreter devices like the LILYGO T-Embed CC1101.


## 🚀 Features

- Brand Support: Titan, Kwikset, Master, Schlage, Yale, Best
- Visual Key Display: See your key's bitting and cuts
- Random Mode: Generate random bittings for practice or fun
- Decode Mode: Manually set and tweak pin values
- Save/Load: Store and recall your key configs as JSON
- Button Navigation: Hack your way with device buttons

## 🔒 Supported Brands

<table>
  <tr>
    <th style="text-align:center">Tested</th>
    <th style="text-align:center">Brand</th>
    <th style="text-align:center">Pin Options</th>
  </tr>
  <tr>
    <td style="text-align:center">✔️</td>
    <td style="text-align:center">Titan</td>
    <td style="text-align:center">5, 6 pins</td>
  </tr>
  <tr>
    <td style="text-align:center">✔️</td>
    <td style="text-align:center">Kwikset</td>
    <td style="text-align:center">5 pins</td>
  </tr>
  <tr>
    <td style="text-align:center"></td>
    <td style="text-align:center">Master</td>
    <td style="text-align:center">4, 5 pins</td>
  </tr>
  <tr>
    <td style="text-align:center"></td>
    <td style="text-align:center">Schlage</td>
    <td style="text-align:center">5, 6 pins</td>
  </tr>
  <tr>
    <td style="text-align:center"></td>
    <td style="text-align:center">Yale</td>
    <td style="text-align:center">5 pins</td>
  </tr>
  <tr>
    <td style="text-align:center"></td>
    <td style="text-align:center">Best</td>
    <td style="text-align:center">7 pins</td>
  </tr>
</table>

## ⚡ Install

1. Drop `LockKeyPinDecoding.js` onto your Bruce device.
2. Fire up the Bruce Interpreter.
3. Hack away.


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
  "pins": [3, 5, 2, 7, 4]
}
```


## 🔗 Links

- [Bruce Interpreter](https://github.com/pr3y/Bruce/wiki/Interpreter)
- [Deviant Ollam: Key-and-Pin-Decoding](https://github.com/deviantollam/Key-and-Pin-Decoding)
- [Flipper Zero: KeyCopier](https://github.com/zinongli/KeyCopier)

---

## ☠️ Disclaimer

For educational, CTF, and red team use only.  
Don't break the law. Don't be a jerk.
