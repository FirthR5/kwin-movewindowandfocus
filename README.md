# Move Window and Focus to Desktop (KWin 6)

KWin script that moves the **active window** to a virtual desktop **and** switches
focus to that desktop in one action — something KWin doesn't do out of the box
(the built-in "Move Window to Desktop" leaves your focus on the old desktop).

Ported from [nightreveller/kwin-move-window-and-focus-to-desktop](https://github.com/nightreveller/kwin-move-window-and-focus-to-desktop)
(KWin 5 API) to the KWin 6 API (`workspace.activeWindow`, `window.desktops`,
`workspace.currentDesktop`).

## Shortcuts

| Keys | Action |
| --- | --- |
| `Meta+Shift+1` … `Meta+Shift+9` | Move active window and focus to desktop 1–9 |
| `Meta+Shift+0` | Move active window and focus to desktop 10 |
| `Meta+Shift+Z` | Move active window and focus to the previous desktop (back and forth) |

Every shortcut can be remapped in **System Settings → Shortcuts → KWin**.

## Installation

Requires Plasma 6 / KWin 6.

```sh
git clone https://github.com/FirthR5/kwin-movewindowandfocus
cd kwin-movewindowandfocus
kpackagetool6 --type KWin/Script -i .
```

To upgrade a previous install, use `-u` instead of `-i`.

## Enable it

1. **System Settings → Window Management → KWin Scripts**
2. Check **Move Window and Focus to Desktop** and click **Apply**.

The default shortcuts are registered automatically; change them any time under
**System Settings → Shortcuts → KWin**.

## License

[GPL-3.0](LICENSE)
