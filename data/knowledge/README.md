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
