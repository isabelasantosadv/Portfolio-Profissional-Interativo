# ElevenLabs voice integration — Ask Isabela

## Current implementation

The public GitHub Pages app has a safe browser-based baseline:
- Click the microphone button to dictate one question. The browser asks for microphone permission when required; there is no background or always-on recording.
- The recognized question is inserted into the question field and submitted to the curated knowledge base.
- The speaker button reads the answer with the browser's speech synthesis voice, when supported.
- Text input remains available if speech recognition is unsupported, denied, or fails.

Browser voices vary by operating system and browser. They are not ElevenLabs voices.

## What to do in ElevenLabs

1. Create/sign in to an account at https://elevenlabs.io/.
2. Open **Voices** / **Voice Library** and preview voices. Choose a voice suitable for a professional Brazilian Portuguese portfolio; test English and Spanish too if multilingual coverage matters.
3. Open the selected voice and copy its **Voice ID**. Save the ID; it is not a secret.
4. In **Developers / API Keys** (the exact menu label may vary), create an API key with only the permissions needed for text-to-speech. Set a usage limit if your plan allows it.
5. **Do not paste the API key into this chat, commit it to GitHub, or put it in `assets/app.js`, HTML, or any other browser code.** The public portfolio source is readable by every visitor.

## Required secure integration

A static GitHub Pages website cannot safely keep an ElevenLabs API key secret. The production integration needs a small server-side proxy, for example a Supabase Edge Function or another serverless endpoint:

1. Store the API key as a server-side secret (for Supabase, use the project's Edge Function secrets), e.g. `ELEVENLABS_API_KEY`.
2. Store the chosen voice ID as a non-secret configuration value, e.g. `ELEVENLABS_VOICE_ID`.
3. Implement an endpoint such as `POST /api/voice` that accepts a bounded text string and selected language, validates length and allowed origin, applies rate limits, and calls ElevenLabs from the server.
4. The server calls ElevenLabs text-to-speech with the voice ID, a supported multilingual model, and the secret API-key header. It returns audio bytes (for example MP3) to the browser. The browser plays the returned audio with an audio element.
5. Keep the current browser-speech button as a fallback if the server is unavailable, and show a clear status message rather than failing silently.
6. Before launch, test voice quality in pt-BR, English and Spanish, mobile browsers, long answers, error responses, quota exhaustion, CORS, rate limiting, and whether the selected plan permits the intended use.

## What you need to provide for the next implementation step

- The **Voice ID** (safe to share; not the API key).
- Which account/project will host the backend endpoint: ideally the Supabase project you want to use, or another serverless provider.
- Once the backend is created, its public endpoint URL. Add the API key directly to that backend's secret manager yourself; never send the key to me.

No ElevenLabs key is currently present in the public frontend, and the static app does not yet call ElevenLabs. This document is the implementation plan, not a claim that the ElevenLabs connection is already live.