# Prozess 04: Deal-to-Order-to-Cash-to-Use
**End-to-End-Gesamtprozess aus Sicht von Sales, Finance und Customer Success**

---

## Metadaten

| Attribut | Wert |
|---|---|
| Prozessname | Deal-to-Order-to-Cash-to-Use (D2O2C2U) |
| Prozesstyp | Übergreifender End-to-End-Prozess |
| Beteiligte Rollen | Sales, Finance / Accounting, Customer Success, Legal, Produkt |
| Trigger | Deal-Status wechselt auf „Gewonnen" (Closed Won) |
| Ergebnis (Output) | Zahlung eingegangen, Kunde aktiv in Nutzung, Renewal vorbereitet |
| Vorgänger | Prozess 03: Deal-Closing |
| System | Zoho CRM, Zoho Books / ERP, Projektmanagement-Tool, Support-System |

---

## 1. Überblick: Der vollständige Kundenlebenszyklus

```
SALES                  FINANCE               CUSTOMER SUCCESS
  │                       │                        │
  ▼                       │                        │
Deal = Gewonnen           │                        │
  │                       │                        │
  ├─── Bestellung ────────▶                        │
  │                       │                        │
  │                 Invoice erstellt               │
  │                       │                        │
  │                 Zahlung eingegangen             │
  │                       │                        │
  │                       ├──── Onboarding ────────▶
  │                       │                        │
  │                       │               Go-Live begleitet
  │                       │                        │
  │                       │               Health Monitoring
  │                       │                        │
  │                 Renewal-Invoice        Renewal vorbereitet
  │                       │                        │
  └───────────────────────┴────────────────────────┘
                    Renewal / Upsell
```

---

## 2. Phase 1: Order — Bestellung und Auftragsbestätigung

**Verantwortlich:** Sales (Übergabe), Finance (Verarbeitung)

### 2.1 Was passiert nach dem Vertragsabschluss

| Aktion | Wer | Wann | System |
|---|---|---|---|
| Deal auf „Gewonnen" setzen | Sales | Sofort nach Unterschrift | CRM |
| Onboarding-Team informieren | Sales | Innerhalb 24h | E-Mail / Slack |
| Finance über neuen Kunden informieren | Sales | Innerhalb 24h | E-Mail + CRM-Notiz |
| Kundenstammdaten anlegen | Finance | Innerhalb 48h | ERP / Zoho Books |
| Auftrag im ERP erfassen | Finance | Innerhalb 48h | Zoho Books / ERP |
| Auftragsbestätigung versenden | Finance | Nach ERP-Erfassung | Zoho Books |

### 2.2 Pflichtinformationen für Finance (aus CRM übergeben)

| Information | Quelle im CRM | Warum nötig |
|---|---|---|
| Firmenname + Rechtsform | Feld „Firma-Name" | Korrekte Rechnungsadresse |
| Ansprechpartner Buchhaltung | Stakeholder-Tabelle oder Notiz | Rechnungszustellung |
| Rechnungsadresse | Firmenstammdaten | Pflicht für Rechnung |
| Vertragsdetails (Betrag, Laufzeit) | Deal-Felder + Anhang | Basis für Invoice |
| Zahlungsmodalität | Vertragsnotiz | Zahlungsziel, Zahlungsart |
| USt-ID (bei EU-Kunden außer DE) | Firmenstammdaten | Korrekte Mehrwertsteuerbehandlung |
| Hosting-Modell | Deal-Feld „Hosting" | Produktkategorie für Buchung |

> **Wenn/Dann:**
> | WENN … | DANN … |
> |---|---|
> | Kunde ist in Deutschland ansässig | Standardrechnung mit 19 % MwSt. |
> | Kunde in EU (außer DE), USt-ID vorhanden | Reverse Charge — keine MwSt. ausweisen |
> | Kunde außerhalb EU | Export-Rechnung, länderspezifische Steuerregeln prüfen |
> | Jahresvorauszahlung vereinbart | Einmalrechnung über Jahresbetrag, Laufzeit auf Rechnung vermerken |
> | Monatliche Abrechnung vereinbart | Wiederkehrende Rechnung im ERP anlegen |
> | Projektanteile (Setup-Fee) enthalten | Separater Rechnungsposten, ggf. eigene Buchungsnummer |

---

## 3. Phase 2: Invoice — Rechnungsstellung

**Verantwortlich:** Finance

### 3.1 Rechnungsarten in B2B SaaS

| Rechnungstyp | Beschreibung | Typischer Auslöser |
|---|---|---|
| Setup-Fee / Onboarding-Rechnung | Einmalige Implementierungspauschale | Nach Vertragsunterzeichnung |
| Erstrechnung Lizenz | Erste Lizenzgebühr (anteilig oder voll) | Nach Go-Live oder Vertragsstart |
| Wiederkehrende Lizenzrechnung | Monatlich / jährlich | Automatisch nach Vertragslaufzeit |
| Zusatzleistungen | Workshops, Beratung, Support-Pakete | Nach Leistungserbringung |
| Renewal-Rechnung | Verlängerung des Abonnements | 30–60 Tage vor Vertragsende |

### 3.2 Rechnungsinhalt (Pflichtangaben DE)

- Vollständiger Name und Anschrift beider Vertragsparteien
- Steuernummer oder USt-ID des Rechnungsstellers
- Rechnungsnummer (fortlaufend, eindeutig)
- Rechnungsdatum
- Leistungsbeschreibung (klar und präzise)
- Leistungszeitraum
- Nettobetrag, MwSt.-Satz, MwSt.-Betrag, Bruttobetrag
- Zahlungsziel
- Bankverbindung / Zahlungsanweisungen

### 3.3 Zahlungsfristen und Mahnwesen

| Status | Aktion | Zeitpunkt |
|---|---|---|
| Rechnung versendet | Zahlungseingang monitoren | Ab Versanddatum |
| Zahlung fällig, nicht eingegangen | Freundliche Erinnerung | +3 Werktage nach Fälligkeit |
| 1. Mahnung | Formelle Zahlungserinnerung | +7 Tage nach Fälligkeit |
| 2. Mahnung | Mit Mahngebühr und Frist | +14 Tage nach Fälligkeit |
| 3. Mahnung / Inkasso | Letzte Frist, rechtlicher Hinweis | +30 Tage nach Fälligkeit |
| Eskalation | Account-Team informieren — kein Support-Entzug ohne Abstimmung mit CS | Nach 2. Mahnung |

> **Wenn/Dann:**
> | WENN … | DANN … |
> |---|---|
> | Rechnung kommt zurück (falsche Adresse) | Sales kontaktiert Kunden, Stammdaten korrigieren, neu versenden |
> | Kunde bittet um Zahlungsaufschub | Schriftliche Bestätigung, CRM-Notiz, Finance informiert |
> | Zahlung in Teilbeträgen angeboten | Nur nach schriftlicher Vereinbarung — Ratenzahlungsplan dokumentieren |
> | Kunde bestreitet Rechnung | Legal einbinden, Leistungsnachweis aus Projektdokumentation |
> | Rechnung stornieren | Storno-Rechnung (Gutschrift) ausstellen, neue korrekte Rechnung senden |

---

## 4. Phase 3: Onboarding — Kunden zum Erfolg führen

**Verantwortlich:** Customer Success (Lead), Produkt / Tech (Support)

### 4.1 Onboarding-Trigger und Übergabe

**Übergabe von Sales an Customer Success:**

| Information | Quelle | Warum wichtig für CS |
|---|---|---|
| Dokumentierte Bedarfe | CRM: Evaluation-Felder | CS muss wissen, was der Kunde erreichen will |
| Erfolgskriterien | CRM: Anforderungen und Erfolgskriterien | Basis für Erfolgsmessung |
| Stakeholder-Übersicht | CRM: Stakeholder-Tabelle | Richtiger Ansprechpartner für jede Phase |
| Vertragsdetails (Laufzeit, Lizenzumfang) | Finance / ERP | Was ist genau gebucht? |
| Technische Anforderungen | CRM-Notizen, Demo-Erkenntnisse | Integrationsbedarf, Hosting-Modell |
| Besonderheiten / Sensibilitäten | CRM-Beschreibungsfeld | Interne Warnsignale für CS |

**Onboarding Kick-off Meeting (innerhalb 5 Werktage nach Vertragsabschluss):**
- Teilnehmer: CS-Manager, technischer Ansprechpartner, Kundenseite (Champion + User)
- Agenda: Projektziele, Zeitplan, Verantwortlichkeiten, Kommunikationskanal

### 4.2 Standard-Onboarding-Phasen (B2B SaaS)

| Phase | Dauer (typisch) | Inhalt | Erfolgskriterium |
|---|---|---|---|
| Kick-off | Woche 1 | Ziele, Zeitplan, Zugänge | Beide Seiten committen zum Plan |
| Setup & Konfiguration | Woche 1–3 | Systemeinrichtung, Integration, Datenmigration | System läuft technisch korrekt |
| Schulung | Woche 2–4 | Adminschulung, User-Training | Nutzer können das System eigenständig bedienen |
| Pilotbetrieb | Woche 3–6 | Realbetrieb mit Begleitung, Fehleranalyse | Erste echte Prozesse laufen im System |
| Go-Live | Woche 4–8 | Produktiver Betrieb beginnt | Alle definierten Use Cases aktiv |
| Hypercare | Monat 2–3 | Intensive Begleitung, wöchentliche Check-ins | Keine kritischen offenen Punkte |

> **Wenn/Dann:**
> | WENN … | DANN … |
> |---|---|
> | Kunde treibt Onboarding nicht aktiv voran | CS eskaliert zu Champion — intern beim Kunden Dringlichkeit erzeugen |
> | Technische Integration scheitert | Tech-Eskalation, Timeline anpassen, proaktiv kommunizieren |
> | Schlüsselperson beim Kunden wechselt | Neuen Ansprechpartner identifizieren, Re-Kickoff erwägen |
> | Onboarding dauert deutlich länger als geplant | Ursache analysieren, Zeitplan neu vereinbaren, Finance über Verschiebung informieren |
> | Kunde möchte Scope erweitern | Upsell-Opportunity im CRM anlegen, Sales einbinden |

---

## 5. Phase 4: Customer Health — Laufende Betreuung und Erfolgsmessung

**Verantwortlich:** Customer Success

### 5.1 Customer Health Score — was wird gemessen

| Dimension | Indikator | Grün | Gelb | Rot |
|---|---|---|---|---|
| Produktnutzung | Login-Frequenz, aktive User | > 80 % der Lizenzen aktiv | 50–80 % | < 50 % |
| Engagement | Reaktion auf CS-Kontakte | Antwortet innerhalb 48h | Antwortet mit Verzögerung | Antwortet nicht |
| Support-Tickets | Anzahl und Schwere offener Tickets | Keine kritischen | 1–2 offene | Kritische offen |
| NPS / Zufriedenheit | Umfragewerte, Feedbackgespräche | > 8/10 | 6–8/10 | < 6/10 |
| Zahlungsverhalten | Pünktlichkeit der Zahlungen | Immer pünktlich | Gelegentlich verzögert | Mahnungen nötig |
| Renewal-Signal | Kommentare zu Verlängerung | Positive Signale | Neutral | Negative Signale |

### 5.2 Regelmäßige CS-Aktivitäten

| Aktivität | Frequenz | Ziel |
|---|---|---|
| Check-in Call | Monatlich (erster Monat: wöchentlich) | Offene Punkte, Feedback |
| Business Review (QBR) | Quartalsweise | Zielerreichung, Roadmap, Upsell |
| NPS-Umfrage | Halbjährlich | Zufriedenheitsmessung |
| Renewal-Gespräch | 90 Tage vor Vertragsende | Frühzeitig Verlängerung sichern |

> **Wenn/Dann:**
> | WENN … | DANN … |
> |---|---|
> | Health Score fällt auf Gelb | Ursache identifizieren, Maßnahmenplan erstellen |
> | Health Score fällt auf Rot | CS-Eskalation, Führungsebene einschalten, Rettungsplan |
> | Kunde signalisiert Unzufriedenheit | Sofort handeln — kein Abwarten bis zum nächsten regulären Check-in |
> | Kunde nutzt Produkt kaum | Adoption-Problem: Schulung anbieten, Use-Case-Workshop |
> | Kunde fragt nach mehr Funktionen | Upsell- oder Cross-Sell-Opportunity — Sales einbinden |
> | Schlüsselperson verlässt das Unternehmen | Neuen Champion identifizieren, Beziehung aufbauen |

---

## 6. Phase 5: Renewal und Expansion

**Verantwortlich:** Customer Success (Trigger), Sales (Verhandlung), Finance (Invoice)

### 6.1 Renewal-Prozess (Zeitplan)

| Zeitpunkt vor Vertragsende | Aktion | Verantwortlich |
|---|---|---|
| 90 Tage | Renewal-Gespräch initiieren: Zielerreichung, Zufriedenheit, Erweiterungsoptionen | CS |
| 60 Tage | Renewal-Angebot / Upsell-Optionen versenden | Sales / CS |
| 45 Tage | Verhandlung, bei Bedarf Eskalation | Sales |
| 30 Tage | Vertrag unterschrieben oder Kündigung bestätigt | Sales / Legal |
| 14 Tage | Finance: Renewal-Rechnung vorbereiten | Finance |
| 0 Tage | Neue Vertragslaufzeit beginnt | Alle |

### 6.2 Expansion (Upsell / Cross-Sell)

| Typ | Beschreibung | Beispiel |
|---|---|---|
| Upsell | Mehr vom Bestehenden | Mehr User-Lizenzen, höheres Service-Paket |
| Cross-Sell | Angrenzende Produkte | Kunde nutzt ProcessForge, kauft jetzt ORBIT |
| Renewal + Expansion | Verlängerung mit Erweiterung | Gleicher Vertrag + 20 % mehr Lizenzen |

**Im CRM:**
- Expansion als separaten Deal anlegen (Typ = „Upsell" oder „Cross-Sell")
- Verknüpfung mit bestehendem Account sicherstellen
- Customer-Success-Manager als Co-Betreuer eintragen

> **Wenn/Dann:**
> | WENN … | DANN … |
> |---|---|
> | Renewal 90 Tage vorher nicht initiiert | CS hat Prozessfehler — sofort nachholen, kein Vertrag sollte überraschend enden |
> | Kunde möchte nicht verlängern | Verlust-Analyse: Warum? Daten für Produkt-Feedback nutzen |
> | Kunde kündigt aber bleibt bis Ende | Offboarding-Checkliste, Datenmigration anbieten, auf positivem Abschluss bestehen |
> | Expansion-Gespräch während laufendem Onboarding | Timing prüfen — Upsell erst, wenn Kunde erste Erfolge erlebt hat |

---

## 7. Rollen und Verantwortlichkeiten im Überblick

| Phase | Sales | Finance | Customer Success | Legal / Tech |
|---|---|---|---|---|
| Deal Closing | **Lead** | Informiert | Informiert | Support bei Vertrag |
| Order / Auftragsbestätigung | Übergabe | **Lead** | Informiert | — |
| Invoice / Zahlung | Informiert | **Lead** | Eskalation bei Problemen | — |
| Onboarding | Support | Informiert | **Lead** | **Support** |
| Health Monitoring | Informiert | Informiert | **Lead** | Support |
| Renewal / Expansion | **Lead** | Vorbereitung Invoice | Trigger / Support | Support |

---

## 8. KPIs — Erfolgsmessung des End-to-End-Prozesses

### Sales KPIs
| KPI | Ziel | Frequenz |
|---|---|---|
| Win Rate | > 30 % qualifizierter Deals | Monatlich |
| Sales Cycle Length | < 60 Tage (Durchschnitt) | Monatlich |
| Average Deal Value | Zielwert je Segment | Quartalsweise |
| Forecast Accuracy | Abweichung < 15 % | Monatlich |

### Finance KPIs
| KPI | Ziel | Frequenz |
|---|---|---|
| Days Sales Outstanding (DSO) | < 30 Tage | Monatlich |
| Invoice-to-Cash-Cycle | < 14 Tage | Monatlich |
| MRR / ARR Genauigkeit | < 2 % Abweichung | Monatlich |
| Churn-Rate (Umsatz) | < 5 % p.a. | Quartalsweise |

### Customer Success KPIs
| KPI | Ziel | Frequenz |
|---|---|---|
| Onboarding Time-to-Value | < 45 Tage | Pro Kunde |
| NPS | > 40 | Halbjährlich |
| Renewal Rate | > 90 % | Quartalsweise |
| Expansion Revenue | > 20 % des ARR | Jährlich |
| Health Score Rot | < 10 % der Accounts | Monatlich |

---

## 9. Häufige Prozessbrüche und wie man sie vermeidet

| Prozessbruch | Auswirkung | Prävention |
|---|---|---|
| Schlechte Übergabe Sales → CS | CS kennt Kundenziele nicht, schlechtes Onboarding | Standardisierte Übergabe-Checkliste, CRM vollständig befüllt |
| Finance wird zu spät informiert | Verzögerte Rechnungsstellung, Cashflow-Probleme | Automatischer Trigger bei Deal = Gewonnen |
| Renewal ohne Vorwarnung | Verlust vermeidbarer Kunden | 90-Tage-Regel als Pflicht im CS-Prozess |
| Kundendaten im CRM veraltet | Falsche Ansprechpartner, fehlerhafte Rechnungen | Quartalsweise Datenpflege-Check |
| Expansion ohne CS-Beteiligung | Upsell ohne Vertrauensbasis, schlechte Adoption | CS muss Expansion-Readiness bestätigen |
| Eskalationen ohne Dokumentation | Wissen geht verloren, Probleme wiederholen sich | Jede Eskalation als CRM-Aktivität erfassen |

---

## 10. Systemlandschaft und Datenfluß

```
CRM (Zoho CRM)
  ├── Lead-Daten → Deal-Daten → Kundendaten
  ├── Trigger: Deal Gewonnen → Finance-Workflow
  └── CS-Aktivitäten, Health Scores

        ↓ Datentransfer
        
ERP / Zoho Books
  ├── Kundenstammdaten
  ├── Auftrag → Invoice → Zahlungseingang
  └── Wiederkehrende Rechnungen (Subscriptions)

        ↓ Information
        
CS-Tool / Projektmanagement
  ├── Onboarding-Projektplan
  ├── Health Score Tracking
  └── QBR-Dokumentation

        ↓ Feedback-Schleife

CRM (Renewal, Upsell als neue Deals)
```

---

## 11. Glossar

| Begriff | Bedeutung |
|---|---|
| ARR | Annual Recurring Revenue — jährlich wiederkehrender Umsatz |
| MRR | Monthly Recurring Revenue — monatlich wiederkehrender Umsatz |
| DSO | Days Sales Outstanding — durchschnittliche Zahlungsreichweite |
| Churn | Kundenverlust oder Umsatzverlust durch Kündigung |
| NPS | Net Promoter Score — Weiterempfehlungswahrscheinlichkeit |
| QBR | Quarterly Business Review — quartalsweises Strategiegespräch mit Kunden |
| Renewal | Vertragsverlängerung |
| Upsell | Erweiterung des bestehenden Vertrags (mehr vom Gleichen) |
| Cross-Sell | Verkauf eines zusätzlichen, anderen Produkts |
| Time-to-Value | Zeit bis der Kunde ersten messbaren Nutzen aus dem Produkt zieht |
| Health Score | Ampel-System zur Bewertung der Kundengesundheit |
| Champion | Interner Fürsprecher beim Kunden |
| Reverse Charge | MwSt.-Umkehrregelung im EU-Unternehmensgeschäft |
| AVV | Auftragsverarbeitungsvertrag (DSGVO-Pflicht) |

---

*Erstellt: März 2026 | Version 1.0 | Verantwortlich: CMO, CFO, Head of Customer Success*
*Vorgänger: → 03_Nachfolger_Deal_Closing.md*
*Prozessrahmen: Lead → Qualify → Deal → Close → Order → Invoice → Cash → Onboard → Use → Renew*
