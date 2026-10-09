# Ask Isabela — Knowledge Layer

This directory is the source registry for the portfolio assistant.

## Architecture

Ask Isabela has four distinct layers:

1. **Profile facts** — `../profile.json`
2. **Evidence** — `../evidence.json`
3. **Voice profile** — `../voice-profile.json`
4. **Knowledge sources** — `sources.json`

The evidence and source registry ground factual answers. The voice profile controls how an answer is expressed; it does not supply facts.

## Research and articles

Lattes, ORCID, Web of Science and Google Scholar establish the research identity and provide indexes. They are not enough by themselves to reproduce the substance of the research.

The next ingestion stage should add approved original article content or excerpts, with:

- title
- date
- publication
- URL
- abstract or short summary
- research question
- main thesis
- concepts
- evidence/examples
- conclusions
- related topics
- source authority

This allows Ask Isabela to answer research questions from the substance of the work while linking the reader to the original publication.

## Voice

The desired conversational identity is professional, intelligent, warm and human, with measured openness and clear boundaries. Humor may appear when natural. The assistant should never become flirtatious, overly familiar or self-promotional.

## Trust

- Never invent a career fact.
- Never attribute an opinion to Isabela without a source.
- Distinguish documented facts from interpretation.
- When the knowledge base is insufficient, say so.
- Ask Isabela is an AI representation, not a claim that the visitor is speaking directly with Isabela.


## Runtime behavior

- `qa.json` is the curated multilingual response corpus currently loaded by the static portfolio.
- `conversation-tests.json` contains acceptance cases for matching, language coverage, identity boundaries and unsupported facts.
- The browser app uses keyword/phrase matching and returns a prewritten answer. This is a grounded first version, **not** a generative AI service.
- Each answer entry records source IDs so its factual basis can be audited. If no intent matches, the assistant returns a safe fallback.
- Text input and browser speech synthesis remain available. No microphone access or always-on listening has been enabled.
- The voice profile is editorial guidance for answer style. It does not create new facts or replace source verification.

## Verification and remaining work

The first acceptance pass covers 22 questions across Portuguese, English and Spanish. It checks the intended answer category and that sensitive or undocumented information is not fabricated. The corpus is still limited to documented portfolio facts and editorially prepared answers.

The three listed LinkedIn articles remain `index_only`: the system must not state their specific arguments as facts until approved article text or reliable excerpts have been added. Generative responses, voice input, source links in the visible answer, and end-to-end browser checks are separate follow-up stages.
