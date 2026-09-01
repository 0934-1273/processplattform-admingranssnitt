# MVP-skelett för processplattformen

MVP:n ska visa att processplattformen kan köra verklighetsnära processer ovanpå Flowable utan att bygga hela målarkitekturen direkt. Fokus är att skapa en liten, begriplig och utbyggbar kodbas som utvecklarna kan lära sig av.

## Vad MVP:n ska bevisa

MVP:n ska visa att processplattformen kan:

1. deploya BPMN/DMN till Flowable,
2. lista processdefinitioner,
3. starta en processinstans,
4. skapa och visa användaruppgifter,
5. slutföra tasks,
6. hantera enkel behörighet,
7. skapa instansdeltagare,
8. visa integrationsstatus,
9. auditlogga viktiga händelser,
10. ha separata gränssnitt för plattformsadministration och processanvändning.

## Scope för första MVP

### Process A: Preboarding

Preboarding-exemplet bygger på den uppladdade Excel-filen `Preboarding funktionell och teknisk struktur.xlsx`.

MVP-flödet bör visa:

1. MIM skickar standardpayload till `POST /api/processes/preboarding.standard/instances`.
2. Backendens generiska `ProcessInstanceStartService` validerar payloaden, hanterar behörighet, skapar interna instansdata och startar Flowable-processen `preboarding.standard`.
3. Organisationsträds-worker hämtar ansvarig chef för organisatorisk enhet.
4. Backend tilldelar ansvarig chef som `instance_participant`.
5. Mail-worker skickar meddelande till ansvarig chef.
6. Eventuell medansvarig administratör hämtas automatiskt eller läggs till manuellt.
7. Chef eller medansvarig hanterar User Tasks:
   - U1 Hantera välkomstmail
   - U2 Beställa utrustning och behörigheter
   - U3 Inför första arbetsdagen
8. Introduktionskollega kan väljas i U3 utan att själv få appbehörighet.
9. Processplattformen auditloggar viktiga åtgärder.
10. Preboarding avslutas enligt tidsstyrning.

Denna process testar integration, instansdeltagare, taskhantering, behörighet, variabler, mailutskick och audit.

### Process B: Behörighetsändring

1. Chef startar behov av ändring.
2. IT bedömer.
3. Worker-stub simulerar tekniskt anrop.
4. Chef bekräftar.
5. Processen avslutas.

Den testar att modellen inte bara är byggd för Preboarding.

## Förenklad datamodell i MVP

Första versionen bör bara använda dessa tabeller:

- `principal`
- `platform_role`
- `principal_platform_role`
- `process_definition_catalog`
- `process_permission`
- `workflow_instance`
- `instance_participant`
- `integration_job`
- `external_reference`
- `audit_log`
- `flowable_sync_state`

Vänta med den fulla målmodellen tills ni har verkliga processer att testa mot.

## Föreslagen byggordning

1. Flowable-koppling: deploy, start, tasks, complete task.
2. Processkatalog och workflow_instance.
3. Två separata gränssnitt.
4. Enkel behörighet och instansdeltagare.
5. Worker-stubbar för organisationsträd och mail.
6. Audit och synk.
7. Stabilisering, dokumentation och kodgenomgång.

## Skarp kodstruktur med endast metodsignaturer

Repo:t innehåller nu även en skarp kodstruktur i:

```text
backend/src/main/java/se/trollhattan/processplattform/
frontend-admin/src/api/
frontend-user/src/api/
workers/organisation-tree-worker-stub och mail-worker-stub/src/main/java/
```

Dessa filer är inte tänkta som färdig implementation. De är ett startläge för utvecklarna:

- Java-paketen visar vilka moduler som ska finnas.
- Interfaces och records visar vilka metodsignaturer och dataobjekt som behövs.
- Exempelkoden i `examples/` visar hur metoderna kan implementeras.

Utvecklarna ska alltså bygga i de skarpa mapparna och använda `examples/` som stöd.
