# Paket och samverkan i MVP-skelettet

Det här dokumentet visar hur paketen i kodskelettet samverkar. Bilderna är avsedda som stöd för utvecklare som är nya i Java och Spring Boot.

## Översikt

![Paketöversikt](diagrams/package_overview.png)

## Backendlager

![Backendlager](diagrams/backend_layers.png)

## Start av process

![Start av process](diagrams/start_process_sequence.png)

## Viktig princip

- `api` tar emot HTTP-anrop från de två gränssnitten.
- `auth` tolkar vem användaren är.
- `process`, `task`, `instance`, `permission`, `integration`, `audit` och `sync` innehåller processplattformens verksamhetslogik.
- `flowable` innehåller bara klienter mot Flowable REST.
- Exempelimplementationerna ligger i `examples/` och ska användas som stöd, inte som färdig produktionskod.
