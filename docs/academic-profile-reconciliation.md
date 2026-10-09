# Academic profile reconciliation

This document records the initial public-web audit of Isabela Schattgen's researcher profiles and provides a controlled update workflow.

## Scope

- [ORCID](https://orcid.org/0009-0002-2062-1915)
- [Web of Science](https://www.webofscience.com/wos/author/record/OGN-8088-2025)
- [Google Scholar](https://scholar.google.com/citations?user=PnHzrMcAAAAJ&hl=pt-BR)
- [Lattes/CNPq](http://lattes.cnpq.br/9267824305716826)

## Initial findings (9 October 2026)

- Google Scholar publicly identifies the profile as **Isabela Schattgen**, shows the affiliation **Pesquisadora, B2Law**, and displays the 2022 work *Advocacia 4.0 e startups: instrumentos de assessoramento jurídico no mercado da inovação*. The page returned an error while loading its metrics, so no citation counts or h-index are recorded here.
- The IDP repository provides an authoritative open-access record for *Advocacia 4.0 e startups: instrumentos de assessoramento jurídico no mercado da inovação*, attributed to **Santos, Isabela Maria Ferreira dos**, dated 2022, and categorized as a master's dissertation in the Academic Master's in Law program. [Institutional repository record](https://repositorio.idp.edu.br/handle/123456789/3885?mode=full).
- The accessible Web of Science view did not expose sufficient profile/publication details to complete a cross-check.
- Automated Lattes access stopped at a security-code page. Its contents remain unaudited.
- Automated ORCID retrieval may expose a sandbox/test representation; the live official record must be checked in a regular browser before edits.

## Decisions not to infer

The audit does not assume that missing data means a publication is absent. It does not infer a DOI, citation metrics, current affiliation, or degree nomenclature where primary evidence was unavailable. The master's degree/program name should be checked against the diploma and official institutional record before synchronizing all profiles.

## Update sequence

1. Export the Lattes CV (XML/PDF, if available) and inspect the full Google Scholar works list.
2. Export or review the Web of Science researcher record and publication list.
3. Open the official ORCID record and review works, education, employment, and external identifiers.
4. Reconcile each work using publisher pages, institutional repositories, DOI metadata, and the published work itself.
5. Prepare platform-specific updates from the canonical data in [academic-profile-master-record.json](../data/academic-profile-master-record.json).
6. Apply changes only through authenticated platform interfaces or official APIs with appropriate authorization.
7. Recheck the public records and update the audit date and status.

## Execution status

**Initial public audit: completed. External profile updates: not performed.** No write connector was available for the four academic platforms during this audit. This GitHub record is a working source of truth and does not claim that any external profile has changed.
