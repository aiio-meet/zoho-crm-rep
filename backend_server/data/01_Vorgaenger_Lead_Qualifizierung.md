# Prozess 01: Lead-Erfassung und Qualifizierung
**Direkter Vorgängerprozess zum Anlegen eines Deals im CRM**

---

## Metadaten

| Attribut | Wert |
|---|---|
| Prozessname | Lead-Erfassung und Qualifizierung |
| Prozesstyp | Vorgängerprozess (vorgelagert zu: Deal anlegen) |
| Verantwortlich | Vertrieb / Marketing |
| Trigger | Eingehender Kontakt, Kampagnenreaktion, Partnerhinweis |
| Ergebnis (Output) | Qualifizierter Lead — bereit zur Konvertierung in einen Deal |
| Nachfolger | Prozess 02: Deal anlegen im CRM |
| System | Zoho CRM — Modul: Leads |

---

## 1. Zweck und Einordnung

Dieser Prozess beschreibt alles, was **vor** dem Anlegen eines Deals passiert.

Ein Lead ist ein potenzieller Interessent — noch kein qualifizierter Verkaufskontakt. Erst wenn ein Lead die Qualifizierungskriterien erfüllt, wird er in einen Deal (und ggf. Kontakt + Firma) konvertiert.

**Warum diese Trennung wichtig ist:**
- Nicht jeder Kontakt ist ein potenzieller Käufer.
- Unkualifizierte Leads in der Deal-Pipeline verzerren Forecast und Ressourceneinsatz.
- Die Qualifizierung filtert und fokussiert — nur reife Leads werden zu Deals.

---

## 2. Prozessauslöser (Trigger)

| Auslöser | Beschreibung | Beispiel |
|---|---|---|
| Inbound Webformular | Interessent füllt Kontaktformular auf Website aus | Anfrage über ProcessForge-Landingpage |
| LinkedIn / Social | Reaktion auf Post, Ad oder Direktnachricht | Kommentar auf BPM-Beitrag, InMail-Antwort |
| Messe / Event | Visitenkartenübergabe oder Badge-Scan | Kontakt auf DMS Expo oder PzM Summit |
| Partner-Referral | Partnerunternehmen empfiehlt potenziellen Kunden | Empfehlung durch Beratungspartner |
| Kaltakquise (Outbound) | Vertriebsmitarbeiter kontaktiert proaktiv | Telefonanruf oder XING-Nachricht an Zielkunden |
| Webinar / Content | Teilnehmer lädt Leadmagnet herunter oder registriert sich | Download „Laeuft's bei euch?"-Leadmagnet |
| Bestandskundennetzwerk | Empfehlung durch zufriedenen Kunden | „Sprich mal mit meinem Kollegen bei Firma X" |

---

## 3. Schritt-für-Schritt: Lead anlegen

### Schritt 1 — Lead im CRM erfassen

**Wo:** Zoho CRM → Modul „Leads" → „Lead erstellen"

**Pflichtfelder beim Lead:**
- Vorname / Nachname
- Firmenname
- E-Mail-Adresse
- Lead-Quelle (Pflicht für späteres Attribution-Reporting)

**Optionale, aber empfohlene Felder:**
- Telefonnummer
- Position / Funktion (wichtig zur späteren Einschätzung der Entscheidungsrolle)
- Branche
- Notizen aus dem Erstkontakt

> **Wenn/Dann:**
> | WENN … | DANN … |
> |---|---|
> | Lead kommt über Webformular | CRM legt Lead automatisch an (Webhook/Integration prüfen) |
> | Lead kommt über Messe / Event | Lead manuell anlegen, Lead-Quelle = „Messe", Event-Name in Notiz |
> | Lead wurde telefonisch erfasst | Gesprächsnotiz als erste Aktivität direkt anhängen |
> | Lead existiert bereits im CRM | Keinen Duplikat anlegen — bestehenden Datensatz aktualisieren |

---

### Schritt 2 — Lead-Quelle korrekt zuordnen

**Warum kritisch:** Die Lead-Quelle ist die Basis für die spätere Marketing-Attribution. Sie bleibt am Deal erhalten und wandert durch den gesamten Prozess bis zur Umsatzanalyse.

**Standardwerte:**
- Website / Webformular
- LinkedIn
- Google / SEO
- Messe / Event
- Partner-Referral
- Kaltakquise (Outbound)
- Empfehlung / Bestandskunde
- Webinar / Content
- Sonstiges

> **Wenn/Dann:**
> | WENN … | DANN … |
> |---|---|
> | Lead kommt aus einer konkreten Kampagne | Lead-Quelle + Kampagnenname in Notiz (z.B. „LinkedIn_BPM_Q1_2026") |
> | Lead-Quelle unklar | „Sonstiges" wählen + Herkunft in Notiz beschreiben |
> | Lead wurde zugekauft (Liste) | Lead-Quelle = „Zugekaufte Liste" — separate Kennzeichnung für DSGVO |

---

### Schritt 3 — Erstkontakt herstellen und dokumentieren

**Ziel:** Herausfinden, ob grundsätzliches Interesse und Bedarf vorhanden sind.

**Aktivitäten (im CRM unter dem Lead-Datensatz loggen):**
- Anruf / E-Mail / LinkedIn-Nachricht
- Reaktion des Leads (geantwortet? Termin vereinbart? Kein Interesse?)
- Nächsten Schritt als Aufgabe anlegen

**Was beim Erstkontakt herausgefunden werden sollte:**
- Gibt es ein konkretes Problem oder einen aktuellen Bedarf?
- Ist die Person der richtige Ansprechpartner oder gibt es einen besseren?
- Gibt es eine grundsätzliche Kaufbereitschaft / ein Budget?
- Welcher Zeitrahmen ist realistisch?

> **Wenn/Dann:**
> | WENN … | DANN … |
> |---|---|
> | Lead antwortet nicht (3 Versuche) | Status auf „Nicht erreichbar" setzen, Wiedervorlage in 30 Tagen |
> | Lead hat kein Interesse | Status auf „Nicht qualifiziert", Grund dokumentieren |
> | Lead ist falsche Zielgruppe (ICP-Miss) | Status auf „Disqualifiziert", kurze Begründung |
> | Lead zeigt Interesse, aber falscher Zeitpunkt | Status auf „Nurturing" — Marketing-Sequenz starten |
> | Lead hat konkreten Bedarf | Weiter mit Schritt 4: Qualifizierung |

---

### Schritt 4 — Lead qualifizieren (BANT / MEDDPICC)

**Ziel:** Sicherstellen, dass ein Lead alle Mindestkriterien für einen Deal erfüllt.

#### Qualifizierungsrahmen (Mindestkriterien vor Konvertierung)

| Kriterium | Frage | Pflicht? |
|---|---|---|
| **B**udget | Hat der Interessent ein Budget oder kann eines genehmigt werden? | Empfohlen |
| **A**uthority | Ist der Ansprechpartner entscheidungsbefugt oder hat Zugang zum Entscheider? | Ja |
| **N**eed | Gibt es einen konkreten, dokumentierten Bedarf? | Ja |
| **T**iming | Gibt es einen Zeitrahmen für eine Entscheidung? | Empfohlen |
| **ICP-Fit** | Passt das Unternehmen zum Ideal Customer Profile (Branche, Größe, Reifegrad)? | Ja |

**ICP-Mindestkriterien (beispielhaft):**
- Unternehmensgröße: ≥ 50 Mitarbeiter
- Branche: Industrie, Gesundheit, Dienstleistung, öffentliche Verwaltung
- Relevanter Prozessmaturity-Level: Bereitschaft zur Digitalisierung vorhanden
- Entscheidungsstruktur: Erreichbarkeit von Geschäftsführung oder Fachverantwortlichem

> **Wenn/Dann:**
> | WENN … | DANN … |
> |---|---|
> | Alle Mindestkriterien erfüllt | Weiter mit Schritt 5: Konvertierung zum Deal |
> | Budget fehlt, aber alle anderen Kriterien erfüllt | Deal anlegen + Wahrscheinlichkeit niedrig (10–20 %) + Notiz |
> | Kein Entscheider-Zugang | Deal anlegen + Maßnahme zur Entscheider-Identifikation als Nächster Schritt |
> | ICP-Fit fraglich | Interne Abstimmung vor Konvertierung — keine Ressourcen verschwenden |
> | Lead klar nicht qualifiziert | Disqualifizieren, Grund dokumentieren, nicht konvertieren |

---

### Schritt 5 — Lead konvertieren (Übergabe an Deal-Prozess)

**Wo:** Zoho CRM → Lead-Datensatz → Schaltfläche „Konvertieren"

**Was bei der Konvertierung passiert:**
- Aus dem Lead wird automatisch ein **Kontakt** und eine **Firma** (Account) angelegt
- Gleichzeitig wird ein neuer **Deal** erstellt (oder ein bestehender verknüpft)
- Alle Aktivitäten (Anrufe, E-Mails, Notizen) bleiben erhalten

**Checkliste vor der Konvertierung:**

| | Feld | Muss ausgefüllt sein |
|---|---|---|
| ☐ | Lead-Quelle | Ja |
| ☐ | Firmenname | Ja |
| ☐ | Ansprechpartner-Funktion | Empfohlen |
| ☐ | Qualifizierungsnotiz (Bedarf, Timing, Budget) | Ja |
| ☐ | Nächster vereinbarter Schritt | Ja |

> **Wenn/Dann:**
> | WENN … | DANN … |
> |---|---|
> | Firma existiert bereits im CRM | Bei Konvertierung bestehende Firma verknüpfen, keine Duplikat-Anlage |
> | Kontakt existiert bereits | Bestehenden Kontakt auswählen, nicht neu anlegen |
> | Deal soll nicht sofort angelegt werden | Häkchen bei „Deal anlegen" deaktivieren — später manuell erstellen |

---

## 4. Häufige Fehler und wie man sie vermeidet

| Fehler | Auswirkung | Lösung |
|---|---|---|
| Lead ohne Qualifizierung konvertieren | Falsche Deals in Pipeline, verfälschter Forecast | Immer BANT-Check vor Konvertierung |
| Lead-Quelle nicht ausfüllen | Attribution-Daten fehlen dauerhaft | Lead-Quelle ist Pflicht ab Ersterstellung |
| Duplikat-Leads anlegen | Doppelbearbeitung, Datenchaos | Vor Anlage immer CRM-Suche durchführen |
| Aktivitäten nicht loggen | Keine Gesprächshistorie für Kollegen | Jeder Kontaktversuch als Aktivität erfassen |
| Niemals disqualifizieren | Pipeline füllt sich mit toten Leads | Klarer Disqualifizierungsprozess mit Begründungspflicht |

---

## 5. Übergabe an Nachfolgeprozess

**Wenn dieser Prozess abgeschlossen ist, gilt:**

- Lead wurde erfolgreich qualifiziert
- Lead-Quelle ist dokumentiert
- Bedarf, Budget-Indikation und Zeitrahmen sind bekannt
- Entscheider ist identifiziert oder Maßnahme geplant
- Konvertierung hat Kontakt, Firma und Deal erzeugt

**Nächster Schritt:** → Prozess 02: Deal anlegen und pflegen im CRM

---

## 6. Glossar

| Begriff | Bedeutung |
|---|---|
| Lead | Potenzieller Interessent, noch nicht qualifiziert |
| Konvertierung | CRM-Aktion: Lead wird zu Kontakt + Firma + Deal |
| BANT | Budget, Authority, Need, Timing — klassisches Qualifizierungsframework |
| ICP | Ideal Customer Profile — Beschreibung des optimalen Zielkunden |
| Disqualifizierung | Bewusste Entscheidung: Dieser Lead wird nicht weiterverfolgt |
| Nurturing | Langfristige Beziehungspflege für Leads ohne sofortigen Bedarf |
| Lead-Quelle | Herkunftskanal des Leads — bleibt am Datensatz bis zum Abschluss |

---

*Erstellt: März 2026 | Version 1.0 | Verantwortlich: CMO*
*Nachfolger: → 02_Deal_anlegen_CRM.md*
