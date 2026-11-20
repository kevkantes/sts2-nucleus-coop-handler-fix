# Slay The Spire 2 – Nucleus Co-op handler fix (AMD iGPU freeze)

A patched version of the **Slay The Spire 2** handler for [Nucleus Co-op](https://github.com/SplitScreen-Me/splitscreenme-nucleus)
(Steam app 2868840). It fixes a freeze that hard-locks the whole PC on some AMD integrated-GPU systems.

**Credit:** the original handler is by **Escher**, shared in the Nucleus Co-op Discord:
<https://discord.com/channels/142649962839277568/1479310319489912843>.
Everything here is a small patch on top of that work. Download the original package (with its
`Slay The Spire 2` folder of Goldberg emu files and `settings.save`) from there or from the
[SplitScreen.Me hub](https://hub.splitscreen.me/).

## Symptom

On an affected machine, with the original handler:

- Setup finishes (instances launched and positioned). Then both game windows freeze when Nucleus
  shows "press End to lock inputs", or right after you press End.
- In the worst case the **whole PC hard-locks**: no keyboard, no Ctrl+Alt+Del, and you have to hold the power button.
  Windows logs only Kernel-Power 41. There's no crash dump and no GPU-reset event.
- Pressing End **before** setup finishes avoids it.
- The same handler works fine on a desktop with a discrete NVIDIA GPU.

The fix was tested on a mini PC with a Ryzen 7 8845HS and an integrated **Radeon 780M**, running two
instances split-screen on one monitor. Game version was v0.113.1, Nucleus Co-op 2.4.2, AMD driver 32.0.32029 (Nov 2026).

## Changes

1. **New "Graphics API" handler option, default Vulkan.** The game defaults to D3D12 on AMD iGPUs,
   and every hard lock happened with two D3D12 instances running. The handler now passes
   `--rendering-driver vulkan` (the same switch as the game's own `launch_vulkan.bat`). D3D12 and OpenGL are
   still selectable.
2. **Hooks are never uninstalled at runtime.** Nucleus runs `OnInputUnlocked` automatically at the end of
   setup if input isn't locked yet. The original callback then uninstalled most ProtoInput hooks, including
   `GetRawInputData`, `RegisterRawInput` and `MessageFilter`, and pressing End reinstalled them. Two problems:
   - With `SetRawInputBypass(true)`, ProtoInput forwards real input as `WM_INPUT` with fake handles that only
     the `GetRawInputData` hook can decode. Without the hook, Godot reads garbage.
   - Uninstalling and reinstalling hooks inside a running game was present in every failing run and absent from every working one.

   Now hooks are only added, once. Unlocking just flips message filters and raw-input bypass.
3. **The fake cursor overlay is no longer hidden and re-shown on unlock/lock.** ProtoInput's fake cursor is
   a full-desktop topmost window. Toggling it over the D3D12 game windows was also present in every failing run, so it now stays as-is.

What the guards change:

- While inputs are unlocked, the fake cursors stay visible.
- Each instance keeps its fake focus.
- The real mouse and keyboard still pass through, thanks to raw-input bypass.

Pressing End causes a **1–2 second pause**. That's expected: the lock step pulses each player's window for
a second to give it focus, which was already in the original handler.

The first commit in this repo is the original handler, so `git diff` shows exactly what changed.

## Install

1. Install the original Slay The Spire 2 handler (see Credit above).
2. Back up `<Nucleus folder>\handlers\Slay The Spire 2.js`, then replace it with the one from this repo.
   Nucleus re-reads the handler each time you press Play, so you don't need to restart it.
3. Optional: change **Graphics API** in the handler's options. Vulkan is the default.

## Controllers (PlayStation pads + DS4Windows)

If you use DS4Windows (or similar) to turn PlayStation pads into virtual Xbox controllers, the games
see **both** the real pad and its virtual copy. That causes double inputs, and every pad also controls
the other players' screens. The fix is to hide the real pads with **[HidHide](https://github.com/nefarius/HidHide)**:

1. Install HidHide and ViGEmBus. DS4Windows can install both.
2. Either turn on DS4Windows' option to hide the real controllers (it uses HidHide), or hide the real
   pads in the HidHide client yourself. In that case, add DS4Windows to HidHide's application list so it can still read them.
3. In Nucleus, assign one virtual Xbox controller to each player.

With HidHide turned on, each pad controls only its own player's screen and there are no double inputs.
No handler changes are needed for this.

## If it still freezes

- Update your AMD graphics driver.
- Try a different Graphics API option.
- As a workaround, press End before setup finishes, or set `Game.LockInputAtStart = true;` in the `.js`.
