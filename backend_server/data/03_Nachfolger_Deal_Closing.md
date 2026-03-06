# Prozess 03: Deal-Closing — Von der Opportunity zum unterschriebenen Vertrag
**Direkter Nachfolgeprozess nach dem Anlegen eines Deals im CRM**

---

## Metadaten

| Attribut | Wert |
|---|---|
| Prozessname | Deal-Closing und Vertragsabschluss |
| Prozesstyp | Nachfolgeprozess (vorgelagert zu: Order-to-Cash) |
| Verantwortlich | Vertrieb (Lead), Legal / Finance (Support) |
| Trigger | Deal wurde im CRM angelegt und ist aktiv |
| Ergebnis (Output) | Unterzeichneter Vertrag — Deal-Status: „Gewonnen" |
| Vorgänger | Prozess 02: Deal anlegen im CRM |
| Nachfolger | Prozess 04: Order-to-Cash / Onboarding |
| System | Zoho CRM, Zoho Sign / DocuSign, Zoho Books / ERP |

---

## 1. Zweck und Einordnung

Dieser Prozess beginnt in dem Moment, in dem ein Deal im CRM angelegt wurde — und endet mit dem unterzeichneten Vertrag (oder der bewussten Entscheidung: Deal verloren / pausiert).

**Phasen im Überblick:**

```
Deal angelegt
     ↓
Bedarfsanalyse vertieft
     ↓
Demo / Proof of Concept
     ↓
Angebot erstellt und versendet
     ↓
Verhandlung
     ↓
Vertrag erstellt und versendet
     ↓
Unterschrift → Deal = GEWONNEN
     ↓
Übergabe an Onboarding / Finance
```

---

## 2. Phase 1 — Bedarfsanalyse vertiefen

**Ziel:** Das vollständige Bild der Kundensituation verstehen, bevor ein Angebot erstellt wird.

**Aktivitäten:**
- Discovery-Call / Workshop mit dem Kunden
- Alle Stakeholder identifizieren (Entscheider, Champion, Beeinflusser, User)
- Anforderungen und Erfolgskriterien dokumentieren (→ CRM: Evaluation-Felder)
- Budget und Entscheidungsprozess klären

**Im CRM dokumentieren:**
- Feld „Entscheider" befüllen
- Feld „Probleme, Auswirkungen und Bedarfe" ausfüllen
- Feld „Anforderungen und Erfolgskriterien" ausfüllen
- Stakeholder-Tabelle vollständig befüllen

> **Wenn/Dann:**
> | WENN … | DANN … |
> |---|---|
> | Entscheider nicht erreichbar | Champion aktivieren — Strategie für Entscheider-Zugang im CRM notieren |
> | Bedarf unklar nach Discovery-Call | Zweiten Termin vereinbaren — nicht ohne klares Bedarfsbild anbieten |
> | Mehrere Abteilungen involviert | Alle Stakeholder in CRM-Stakeholder-Tabelle eintragen |
> | Kunde hat bereits RFP / Ausschreibung | RFP-Anforderungen direkt in „Anforderungen und Erfolgskriterien" übernehmen |

---

## 3. Phase 2 — Demo und Proof of Concept (PoC)

**Ziel:** Den Kunden von der Lösung überzeugen — auf Basis der dokumentierten Bedarfe.

**Vorbereitung:**
- Demo auf spezifische Use Cases des Kunden ausrichten (keine generische Demo)
- Bedarfe aus CRM-Feldern als Agenda nutzen
- „Demotermin"-Checkbox im CRM setzen

**Durchführung:**
- Demo mit konkreten Kundenbeispielen zeigen
- Einwände und Fragen live dokumentieren
- Kaufsignale notieren: Wer fragt nach Implementierung? Wer fragt nach Preisen?

**Nachbereitung (im CRM dokumentieren):**
- Feld „Erkenntnisse aus Demo und Trial" ausfüllen
- Offene Fragen als Aufgaben anlegen
- Wahrscheinlichkeit anpassen (nach positivem Demo: +20 %)
- Nächsten Schritt aktualisieren

**Trial / Pilotphase:**

> **Wenn/Dann:**
> | WENN … | DANN … |
> |---|---|
> | Kunde möchte Trial | „Trial"-Checkbox setzen, Zugangsdaten + Betreuungsplan dokumentieren |
> | Demo war positiv, kein Trial gewünscht | Direkt zu Angebotsphase |
> | Demo war negativ / Lücken identifiziert | Lücken dokumentieren, intern eskalieren, Roadmap-Kommunikation prüfen |
> | Trial läuft ohne Feedback | Aktiv nachfassen (max. 5 Werktage ohne Rückmeldung) |

---

## 4. Phase 3 — Angebot erstellen und versenden

**Ziel:** Ein präzises, individualisiertes Angebot, das auf den dokumentierten Bedarfen basiert.

### 4.1 Angebot vorbereiten

**Checkliste vor der Angebotserstellung:**

| | Punkt |
|---|---|
| ☐ | Alle Anforderungen des Kunden bekannt und dokumentiert |
| ☐ | Entscheider identifiziert |
| ☐ | Budget-Rahmen bekannt |
| ☐ | Hosting-Modell (Cloud / On-Premise) geklärt |
| ☐ | Anzahl Nutzer / Lizenzen bekannt |
| ☐ | Implementierungsaufwand abgeschätzt |

**Angebotsstruktur (Standard):**
1. Executive Summary — Problem und Nutzen in 3 Sätzen
2. Lösung — Was genau wird geliefert
3. Preisübersicht — Setup, Lizenzen, Support, optional Services
4. Implementierungsplan — Phasen und Zeitrahmen
5. Nächste Schritte — Was passiert nach Auftragserteilung
6. Gültigkeitsdatum — Standard: 30 Tage

### 4.2 CRM aktualisieren nach Angebotsversand

- Deal-Betrag mit exaktem Angebotswert aktualisieren
- Stufe auf „Angebot versendet" setzen
- Wahrscheinlichkeit anpassen (typisch: 50–70 %)
- Nächster Schritt: „Follow-up [Datum] — Rückmeldung zum Angebot"

> **Wenn/Dann:**
> | WENN … | DANN … |
> |---|---|
> | Angebot wird ohne Verhandlung akzeptiert | Direkt zu Phase 5: Vertrag |
> | Kunde reagiert nicht innerhalb 7 Tagen | Aktiv nachfassen — Angebot kurz zusammenfassen, konkreten Termin vorschlagen |
> | Kunde fordert Rabatt | Rabatt intern freigeben lassen, Gegenleistung vereinbaren (längere Laufzeit, Referenz) |
> | Angebot wird abgelehnt | Grund dokumentieren, Verlust-Analyse durchführen, Deal auf „Verloren" setzen |
> | Angebot läuft ab | Verlängerung aktiv anbieten — nicht stillschweigend verlängern |

---

## 5. Phase 4 — Verhandlung

**Ziel:** Einigung auf Konditionen — Preis, Laufzeit, Leistungsumfang, SLAs.

**Typische Verhandlungspunkte in B2B SaaS:**

| Punkt | Verhandlungsraum | Warnsignal |
|---|---|---|
| Preis / Rabatt | Bis 15 % mit interner Freigabe | Forderung über 30 % ohne strategischen Grund |
| Laufzeit | 12 / 24 / 36 Monate | Monatliche Kündigung ohne Preisaufschlag |
| Zahlungsbedingungen | 30 Tage netto, Jahresvorauszahlung mit Rabatt | Zahlung erst nach Vollabnahme (Risiko) |
| SLA / Supportlevel | Standard vs. Premium Support | Garantien über 99,9 % Uptime ohne techn. Grundlage |
| IP / Datenschutz | DSGVO-Verarbeitung, Datenhoheit | Forderung nach unbegrenzten IP-Rechten |
| Exit-Klauseln | Standardklausel: 3 Monate Datenmigrationszeitraum | Einseitige sofortige Kündbarkeit |

**Im CRM dokumentieren:**
- Jede Verhandlungsrunde als Notiz / Aktivität erfassen
- Wahrscheinlichkeit nach jeder Runde anpassen
- Geplanten Abschlusstermin im Feld „Abschlussdatum" aktuell halten

> **Wenn/Dann:**
> | WENN … | DANN … |
> |---|---|
> | Verhandlung dauert länger als 4 Wochen | Intern eskalieren — Entscheidungsblockade analysieren |
> | Kunde fordert unübliche Vertragsbedingungen | Legal einbinden, Risikobewertung dokumentieren |
> | Preis ist einziger Einwand | Nutzen-ROI gezielt gegensteuern (Beispielrechnung) |
> | Wettbewerber im Spiel | Champion aktivieren, Differenzierung schärfen |

---

## 6. Phase 5 — Vertrag erstellen und unterzeichnen

**Ziel:** Rechtsverbindlichen Vertrag aufsetzen, versenden und unterschreiben lassen.

### 6.1 Vertragserstllung

**Wer erstellt:** Vertrieb (Basisvertrag), Legal (Sonderklauseln / Anhänge)

**Vertragsbestandteile (Standard B2B SaaS):**
- Hauptvertrag / MSA (Master Service Agreement)
- Leistungsbeschreibung / SOW (Statement of Work)
- Auftragsverarbeitungsvertrag (AVV) — DSGVO-Pflicht
- SLA-Anhang
- Preisanlage / Order Form

### 6.2 Versand und Unterzeichnung

**Tool:** Zoho Sign / DocuSign (digitale Signatur)

**Ablauf:**
1. Vertrag als PDF vorbereiten
2. Signaturen-Felder setzen (beide Seiten)
3. Signaturanfrage versenden
4. Eingangsbestätigung abwarten
5. Unterzeichnetes Exemplar sichern und im CRM-Anhang ablegen

> **Wenn/Dann:**
> | WENN … | DANN … |
> |---|---|
> | Unterzeichnung verzögert sich | Nach 3 Werktagen aktiv nachfassen |
> | Kunde wünscht Änderungen am Vertrag | Version tracken, Legal einbinden, keine mündlichen Zusagen |
> | Kunde unterzeichnet, fordert aber Änderungen danach | Addendum-Prozess einleiten — Ursprungsvertrag nicht rückwirkend ändern |
> | Beide Seiten haben unterzeichnet | Deal-Status auf „Gewonnen" setzen → Übergabe an Onboarding / Finance |

---

## 7. Deal abschließen im CRM

### Wenn der Deal gewonnen wird:

1. Stufe auf **„Gewonnen"** setzen
2. Abschlussdatum auf tatsächliches Unterschriftsdatum setzen
3. Wahrscheinlichkeit: 100 %
4. Betrag: finaler Vertragswert (nicht Angebotswert, falls abgewichen)
5. Notiz: Vertragseckdaten, Laufzeit, Zahlungsmodell
6. Onboarding-Übergabe initiieren (→ Nachfolgeprozess)

### Wenn der Deal verloren wird:

1. Stufe auf **„Verloren"** setzen
2. Verlustgrund dokumentieren (Pflicht):
   - Preis zu hoch
   - Wettbewerber gewonnen (welcher?)
   - Kein Budget / Budget eingefroren
   - Entscheidung vertagt
   - Bedarf nicht ausreichend / Fehlkauf
   - Kein Feedback erhalten
3. Deal **nicht löschen** — Historiedaten für späteres Re-Engagement

> **Wenn/Dann:**
> | WENN … | DANN … |
> |---|---|
> | Verlust wegen Preis | Re-Engage-Datum in 6 Monaten setzen |
> | Verlust wegen Wettbewerber | Wettbewerber und Entscheidungsgrund für Competitive Intelligence dokumentieren |
> | Verlust wegen Timing | Automatische Wiedervorlage in 3–6 Monaten |
> | Verlust ohne Feedback | Abschließenden Call zur Verlustanalyse anbieten |

---

## 8. Übergabe an Nachfolgeprozess

**Wenn dieser Prozess abgeschlossen ist (Deal = Gewonnen), gilt:**

- Unterschriebener Vertrag liegt vor und ist im CRM abgelegt
- Deal-Status, Betrag und Abschlussdatum sind korrekt im CRM
- Onboarding-Team wurde informiert
- Finance wurde über neuen Kunden und Zahlungsmodalitäten informiert
- Customer-Success-Manager ist zugewiesen

**Nächster Schritt:** → Prozess 04: Order-to-Cash und Customer Onboarding

---

## 9. Glossar

| Begriff | Bedeutung |
|---|---|
| Champion | Interner Fürsprecher beim Kunden — treibt den Deal intern voran |
| Discovery | Strukturierter Gesprächsprozess zur Bedarfsermittlung |
| PoC | Proof of Concept — technische Testphase zur Lösung |
| MSA | Master Service Agreement — Rahmenvertrag |
| AVV | Auftragsverarbeitungsvertrag — DSGVO-Pflicht bei Datenverarbeitung |
| SOW | Statement of Work — Leistungsbeschreibung |
| Closed Won | Deal gewonnen, Vertrag unterzeichnet |
| Closed Lost | Deal verloren — dokumentiert und archiviert |

---

*Erstellt: März 2026 | Version 1.0 | Verantwortlich: CMO / Vertrieb*
*Vorgänger: → 02_Deal_anlegen_CRM.md*
*Nachfolger: → 04_Order_to_Cash_Onboarding.md*
