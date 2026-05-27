# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Vanilla HTML/CSS/JS drum kit — press keys A through L to trigger drum sounds with visual feedback. Part of the JavaScript30 course (Day 1).

- `index-START.html` — starter file with empty `<script>` for learners to implement
- `index-FINISHED.html` — completed reference implementation
- `style.css` — shared styles (`.playing` class drives the visual transition)
- `sounds/` — WAV audio files, one per key
- `background.jpg` — full-screen background image

## How to run

No build step or server required. Open `index-START.html` or `index-FINISHED.html` directly in a browser.

## Architecture

- **Key mapping:** `data-key` attributes on both `.key` divs and `<audio>` elements bind keyboard keys to sounds via `keyCode`. Keys: A(65)=clap, S(83)=hihat, D(68)=kick, F(70)=openhat, G(71)=boom, H(72)=ride, J(74)=snare, K(75)=tom, L(76)=tink.
- **`playSound(e)`:** on `keydown`, queries `audio[data-key="${e.keyCode}"]` and `div[data-key="${e.keyCode}"]`. If no matching audio, returns early. Resets `audio.currentTime = 0` so rapid presses retrigger the sound. Adds `.playing` class to the key div.
- **`removeTransition(e)`:** listens for `transitionend` on each `.key`, filters for `transform` property only, then removes `.playing`. This prevents the class from being removed prematurely by other transitioning properties.
