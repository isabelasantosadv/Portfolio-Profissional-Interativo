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

The production integration needs a small server-side proxy, for example a Supabase Edge Function or another serverless endpoint:

1. Store the API key as a server-side secret (for Supabase, use the project's Edge Function secrets), e.g. `ELEVENLABS_API_KEY`.
2. Store the selected voice ID as a non-secret configuration value, e.g. `ELEVENLABS_VOICE_ID`.
3. Implement an endpoint such as `POST /api/voice` that accepts a bounded text string and selected language, validates length and allowed origin, applies rate limits, and calls ElevenLabs from the server.
4. The server calls ElevenLabs text-to-speech with the voice ID, multilingual model, the settings above, and the secret API-key header. It returns audio bytes (for example MP3) to the browser.
5. The browser plays the returned audio with an audio element and keeps browser speech synthesis as a fallback if the endpoint is unavailable.
6. Test voice quality in pt-BR, English and Spanish, mobile browsers, long answers, error responses, quota exhaustion, CORS, rate limiting, and whether the selected plan permits the intended use.

## Inputs needed before enabling ElevenLabs

- The selected **Voice ID** (safe to share; it is not an API key).
- The backend project/provider that will host the endpoint.
- The public endpoint URL after deployment.
- The API key must be added directly by the account owner to the backend secret manager. Never send it in chat or commit it to GitHub.

No ElevenLabs API key or backend endpoint is currently configured in this public repository. The browser fallback is implemented; the ElevenLabs connection is not live. Do not describe the portfolio as using ElevenLabs until a secured endpoint has been deployed and tested.
