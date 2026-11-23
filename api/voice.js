// Vercel Serverless Function — ElevenLabs text-to-speech proxy.
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 10;
const MAX_TEXT_LENGTH = 2_500;
const requestWindows = globalThis.__voiceRequestWindows || new Map();
globalThis.__voiceRequestWindows = requestWindows;

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const host = req.headers.host;
  const origin = req.headers.origin;
  if (!host || !origin) return res.status(403).json({ error: "Forbidden" });
  try {
    if (new URL(origin).host !== host) {
      return res.status(403).json({ error: "Forbidden" });
    }
  } catch {
    return res.status(403).json({ error: "Forbidden" });
  }

  const now = Date.now();
  const forwardedFor = req.headers["x-forwarded-for"];
  const clientIp = (typeof forwardedFor === "string" ? forwardedFor.split(",")[0] : "unknown").trim();
  const window = requestWindows.get(clientIp);
  if (window && now - window.startedAt < WINDOW_MS && window.count >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({ error: "Too many requests" });
  }
  if (!window || now - window.startedAt >= WINDOW_MS) {
    requestWindows.set(clientIp, { startedAt: now, count: 1 });
  } else {
    window.count += 1;
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  if (!apiKey || !voiceId) {
    return res.status(503).json({ error: "Voice service is not configured" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  const text = typeof body?.text === "string" ? body.text.trim() : "";
  const language = ["pt", "en", "es"].includes(body?.language) ? body.language : "pt";
  if (!text || text.length > MAX_TEXT_LENGTH) {
    return res.status(400).json({ error: "Text must contain 1 to 2500 characters" });
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg"
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          language_code: language === "pt" ? "pt" : language,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8,
            style: 0.25,
            use_speaker_boost: true
          }
        })
      }
    );

    if (!response.ok) {
      const status = response.status === 401 || response.status === 403 ? 502 :
        response.status === 429 ? 503 : 502;
      return res.status(status).json({ error: "Speech generation failed" });
    }

    const audio = Buffer.from(await response.arrayBuffer());
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", String(audio.length));
    return res.status(200).send(audio);
  } catch {
    return res.status(502).json({ error: "Speech service unavailable" });
  }
};
