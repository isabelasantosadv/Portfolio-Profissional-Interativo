# ElevenLabs voice integration — Ask Isabela

## Current implementation

The public GitHub Pages app currently uses browser speech synthesis for spoken answers:
- Microphone input is activated only by an explicit click; it is not background or always-on recording.
- The recognized question is inserted into the question field and submitted to the curated knowledge base.
- The speaker button cleans formatting and navigation artifacts before speech synthesis.
- The browser fallback uses a slightly slower cadence (rate 0.96), pitch 1.05, and prioritizes the configured Brazilian Portuguese voice names when installed. The browser/OS still determines which voices are actually available.
- Text input remains available if speech recognition is unsupported, denied, or fails.

These browser adjustments improve the fallback but do not guarantee a neural voice. Browser voices vary by operating system and browser. They are not ElevenLabs voices.

## Target ElevenLabs configuration

When a secure server-side endpoint is available, use this starting configuration for Brazilian Portuguese and test it with real listening sessions:

```typescript
{
  model_id: "eleven_multilingual_v2",
  voice_settings: {
    stability: 0.5,
    similarity_boost: 0.8,
    style: 0.25,
    use_speaker_boost: true
  }
}
```

Recommended audio output: `mp3_44100_128` (streaming response where supported). These are initial tuning values, not a guarantee of quality across every voice, language, or content type. Tune the selected voice with representative portfolio answers before release.

## Speech-text preparation

The frontend `cleanSpeechText` function removes internal [ROTA:...] markers, turns Markdown links into their visible labels, removes URLs, strips Markdown headings and list markers, and normalizes whitespace before browser speech synthesis.

If a future conversational model generates spoken answers, its speech-specific response instruction should request short continuous prose (normally 2–3 concise sentences), without tables, bullets, numbering, URLs, or code. This instruction does not apply to the visible written answer; the text and spoken versions may have different formatting. The current public Q&A is a curated local knowledge base, not an LLM chat endpoint, so there is no `voice-assistant-chat` prompt to configure in this static repository.

## Secure production integration

A static GitHub Pages website cannot safely keep an ElevenLabs API key secret. Do not call ElevenLabs directly from browser JavaScript and do not commit an API key to GitHub.

The production integration uses a Vercel Serverless Function at `api/voice.js`, deployed with this repository. The browser sends only the text and language to `/api/voice`; the server calls ElevenLabs. The API key and Voice ID stay in Vercel Environment Variables:

1. In Vercel → Project → Settings → Environment Variables, store `ELEVENLABS_API_KEY` (already added by the account owner) and `ELEVENLABS_VOICE_ID` (the selected voice's ID). Set both for Production, then redeploy.
2. Store the selected voice ID as a non-secret configuration value, e.g. `ELEVENLABS_VOICE_ID`.
3. The `POST /api/voice` endpoint is implemented. It validates same-origin requests, limits text to 2,500 characters, applies a best-effort per-instance request limit, and calls ElevenLabs from the server.
4. The server calls ElevenLabs text-to-speech with the multilingual model, the settings above, and the secret API-key header. It returns MP3 audio to the browser.
5. The browser plays the returned audio and keeps browser speech synthesis as a fallback if the endpoint is unavailable.
6. Test voice quality in pt-BR, English and Spanish, mobile browsers, long answers, error responses, quota exhaustion, CORS, rate limiting, and whether the selected plan permits the intended use.

## Remaining activation step

- Add `ELEVENLABS_VOICE_ID` in Vercel → Project → Settings → Environment Variables. The Voice ID is not a secret, but it should be configured server-side with the API key.
- After saving, redeploy the Vercel project so the function receives both variables.
- Test the voice button on the Vercel deployment. If the endpoint is unavailable or ElevenLabs returns an error, the browser voice remains the fallback.

The API key is never sent to the browser or committed to GitHub. The endpoint has request validation and a best-effort in-memory limit; this is not a substitute for a persistent rate limiter if public traffic grows.
