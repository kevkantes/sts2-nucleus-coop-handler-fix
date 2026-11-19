# Slay The Spire 2 – Nucleus Co-op handler fix

A fix for the [Nucleus Co-op](https://github.com/SplitScreen-Me/splitscreenme-nucleus) handler for
**Slay The Spire 2** (Steam app 2868840). Without it, both game windows freeze at the end of setup,
when Nucleus shows "press End to lock inputs".

## Symptom

- All instances launch and get positioned. Then, as soon as setup finishes, **every game window freezes**.
  The audio usually keeps playing.
- If you lock inputs (End) **before** setup finishes, everything works.
- It depends on the machine. It reproduced every time on a Ryzen 7 8845HS / Radeon 780M (D3D12) mini PC,
  but never on a Ryzen 7 5800X3D / RTX 4090 desktop running the same handler.

## Cause

If inputs are still unlocked when setup completes, Nucleus calls the handler's
`Game.ProtoInput.OnInputUnlocked` callback. The original callback did two things:

1. `SetRawInputBypass(true)`: ProtoInput now forwards **all** real mouse/keyboard input to every
   instance as `WM_INPUT` messages. Each message carries a fake `HRAWINPUT` handle (`0xAB0000xx`),
   and only ProtoInput's `GetRawInputData` hook knows how to decode it.
2. `UninstallHook(GetRawInputDataHookID)` (plus `RegisterRawInputHookID` and `MessageFilterHookID`).

With the hook removed, Godot's `WM_INPUT` handler passes the fake handle to the real `GetRawInputData`.
The call fails and leaves the size variable uninitialised. Godot then allocates a garbage-sized
buffer for every input event, which hangs the game. Whether that garbage value is harmless depends
on the machine, which explains why only some machines are affected.

ProtoInput's own reference example (`readme Proto Input.txt` in the Nucleus folder) leaves
these three hooks installed for the whole session.

## Changes

- `OnInputUnlocked` no longer uninstalls the `GetRawInputData`, `RegisterRawInput` and `MessageFilter`
  hooks. They're installed at injection and stay installed. Raw input bypass still works while
  unlocked, so the real mouse can be used before locking.
- `OnInputLocked` no longer reinstalls those three hooks.
- Added a small state guard so repeated callbacks don't stack duplicate EasyHook hooks. Nucleus calls
  the current-state callback once more at the end of setup.

Nothing else is changed. The first commit is the original handler, so `git diff HEAD~1` shows exactly
what changed.

## Install

1. Install the Slay The Spire 2 handler from the [SplitScreen.Me hub](https://hub.splitscreen.me/) as
   usual. It provides the `Slay The Spire 2` folder with the Goldberg emu files and the default `settings.save`.
2. Replace `<Nucleus folder>\handlers\Slay The Spire 2.js` with the one in this repo. Back up the original first.

If you still see a freeze, set `Game.LockInputAtStart = true;` as a fallback. Nucleus then
locks input automatically about 5 seconds after setup.

Written for game version v0.113.1 and Nucleus Co-op 2.4.2.
