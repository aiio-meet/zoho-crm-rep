**Arbeitsanweisung**

Deal anlegen im CRM - vollständige Ausfüllanleitung

*Gültig für: Zoho CRM \| Modul: Deals \| Zielgruppe: Vertrieb &
Partnermanagement*

**1. Zweck und Kontext**

Ein Deal repräsentiert eine konkrete Verkaufschance mit einem
potenziellen oder bestehenden Kunden. Die sorgfältige Erfassung jedes
Deals ist entscheidend: Nur vollständige Daten ermöglichen präzise
Forecasts, saubere Pipeline-Übersichten und eine effektive
Team-Zusammenarbeit.

Diese Anleitung erklaert jedes Feld im Formular - warum es existiert,
wann es auszufuellen ist und was passiert, wenn es leer bleibt.

  -----------------------------------------------------------------------
  **⚠ Pflichtfelder:** Deal-Besitzer und Deal-Name sind Pflichtfelder
  (mit \* markiert). Ohne diese Angaben kann kein Deal gespeichert
  werden.

  -----------------------------------------------------------------------

**2. Bereich: Deal-Information**

Dieser Bereich bildet das Grundgerüst jedes Deals. Er steuert, in
welcher Pipeline der Deal erscheint, wer ihn besitzt und welche
wirtschaftliche Relevanz er hat.

**2.1 Deal-Besitzer \* (Pflichtfeld)**

Was es ist: Die Person im Team, die für diesen Deal verantwortlich ist
und ihn aktiv vorantreibt.

**Warum es Pflicht ist:**

-   Steuert, in wessen Aufgabenliste und Dashboard der Deal erscheint.

-   Ermöglicht korrekte Umsatzprognosen pro Mitarbeiter.

-   Basis für Benachrichtigungen und automatisierte Workflows.

  -------------------------------- --------------------------------------
  **WENN ...**                     **DANN ...**

  Du erstellst den Deal für dich   Wähle deinen eigenen Namen - er ist
  selbst                           oft vorausgewählt.

  Du erstellst den Deal im Auftrag Waehle deren Namen. Setze dich selbst
  einer Kollegin/eines Kollegen    in Co-Betreuung (Abschnitt 2.9).

  Ein Deal-Besitzer verlässt das   Deal sofort an Nachfolger übertragen,
  Unternehmen                      damit kein Deal verwaist.
  -------------------------------- --------------------------------------

**2.2 Deal-Name \* (Pflichtfeld)**

Was es ist: Der interne Kurzname, der den Deal eindeutig identifiziert.

**Namenskonvention (verbindlich):**

  ----------------------- -----------------------------------------------
  **Muster**              **Aufbau**

  **\[Kundenname\] -      Eindeutige Zuordnung auf den ersten Blick in
  \[Produkt/Projekt\]**   der Pipeline
  ----------------------- -----------------------------------------------

**Beispiele:**

-   Mustermann GmbH - ProcessForge Einführung

-   Nolen Klinikgruppe - ORBIT Pilotprojekt Q3 2026

-   Starkstrom IT - BPM Audit & Optimierung

  -----------------------------------------------------------------------
  **❌ Vermeiden:** Generische Namen wie Neuer Deal 1 oder Anfrage vom
  03.03. - diese sind in Listen und Berichten wertlos und erzeugen
  Suchaufwand.

  -----------------------------------------------------------------------

**2.3 Betrag (optional, aber strategisch wichtig)**

Was es ist: Der erwartete Umsatz aus diesem Deal in Euro (oder der
gewählten Währung).

**Warum es wichtig ist:**

-   Direkte Grundlage für den Umsatz-Forecast.

-   Filtert und priorisiert Deals in Pipeline-Ansichten.

-   Kombiniert mit Wahrscheinlichkeit errechnet das CRM den gewichteten
    Forecast-Wert.

  -------------------------------- --------------------------------------
  **WENN ...**                     **DANN ...**

  Angebot liegt bereits vor        Exakten Nettobetrag aus dem Angebot
                                   eingeben.

  Betrag ist noch offen / in       Schaetzbetrag eingeben und mit \~ im
  Verhandlung                      Feld Naechster Schritt vermerken.

  Rahmenvertrag mit variablem      Mindestumsatz p.a. eintragen, Notiz im
  Volumen                          Beschreibungsfeld.

  Feld bleibt leer                 Deal erscheint im Forecast mit €0 -
                                   verfälscht die Gesamtprognose.
  -------------------------------- --------------------------------------

Beispiel: 42.500 - ohne Punkt als Tausendertrenner, ohne Währungssymbol
(das Feld ergänzt € automatisch).

**2.4 Abschlussdatum (optional, aber forecast-kritisch)**

Was es ist: Das geplante Datum, an dem der Deal gewonnen oder
abgeschlossen sein soll.

Format: DD.MM.YYYY - Beispiel: 30.06.2026

**Warum es wichtig ist:**

-   Definiert, in welchem Quartal/Monat der Umsatz im Forecast
    erscheint.

-   Trigger für automatische Erinnerungen und Eskalationen.

-   Ermöglicht Reporting nach Closing-Zeitraum.

  -------------------------------- --------------------------------------
  **WENN ...**                     **DANN ...**

  Konkretes Datum aus              Dieses Datum direkt eintragen.
  Kundenaussage bekannt            

  Nur Quartal bekannt              Letzten Tag des Quartals eintragen
                                   (z.B. 31.03.2026 für Q1).

  Kein Zeitrahmen vereinbart       Realistisches Zieldatum setzen
                                   (Faustregel: +90 Tage) und laufend
                                   aktualisieren.

  Datum ist abgelaufen ohne        Sofort aktualisieren - abgelaufene
  Abschluss                        Deals verzerren den Forecast massiv.
  -------------------------------- --------------------------------------

**2.5 Firma-Name (optional)**

Was es ist: Die Firma (Account), mit der dieser Deal assoziiert ist.

Das Schloss-Symbol am Feld zeigt: Der Eintrag wird mit dem
Firmen-Stammdatensatz verknüpft (kein Freitext).

**Warum es wichtig ist:**

-   Verbindet den Deal mit der vollständigen Firmenhistorie (E-Mails,
    Anrufe, andere Deals).

-   Verhindert Doppelarbeit: Kollegen sehen alle Aktivitäten unter der
    Firma.

-   Ermöglicht Account-Level-Reporting (z.B. Gesamtumsatz pro Kunde).

  -------------------------------- --------------------------------------
  **WENN ...**                     **DANN ...**

  Firma existiert bereits im CRM   Aus Dropdown wählen - Suchfunktion
                                   nutzen (erste 3 Buchstaben tippen).

  Firma noch nicht im CRM          Zuerst einen neuen Firmendatensatz
                                   anlegen (Modul Firmen), dann Deal
                                   erstellen.

  Privatperson als Kunde           Feld leer lassen, nur Kontakt-Name
                                   füllen.
  -------------------------------- --------------------------------------

**2.6 Pipeline (wichtig für Übersicht)**

Was es ist: Die vertriebliche Struktur, in der dieser Deal geführt wird.

**Warum es wichtig ist:**

-   Trennt unterschiedliche Verkaufsprozesse (z.B. Direktvertrieb vs.
    Partnerkanal vs. Renewal).

-   Jede Pipeline hat eigene Stufen-Definitionen.

-   Falsche Pipeline = falsche Stufen-Optionen und falsches Reporting.

  -------------------------------- --------------------------------------
  **WENN ...**                     **DANN ...**

  Standard-Neukundengeschaeft      Pipeline Direktvertrieb waehlen.

  Geschaeft ueber                  Pipeline Partner oder Indirekt
  Partnerunternehmen               waehlen.

  Verlaengerung eines bestehenden  Pipeline Renewal/Bestandskunden
  Vertrags                         waehlen.

  Nur eine Pipeline vorhanden      Wird automatisch vorausgewählt -
                                   trotzdem prüfen.
  -------------------------------- --------------------------------------

**2.7 Stufe (zentrales Pipeline-Element)**

Was es ist: Die aktuelle Phase des Deals im Verkaufsprozess.

**Typische Stufen und ihre Bedeutung:**

  -------------------- ----------- ------------------ ------------------------
  **Feld**             **Typ**     **Beispiel**       **Warum wichtig**

  **Erstkontakt /      Stufe 1-2   Neuer Lead         Zeigt früheste Deals -
  Qualifizierung**                 kontaktiert        beeinflusst
                                                      Wahrscheinlichkeit
                                                      (niedrig)

  **Bedarfsanalyse**   Stufe 3     Demo vereinbart    Signalisiert aktives
                                                      Interesse des Kunden

  **Angebot /          Stufe 4-5   Angebot versandt   Hohes Engagement -
  Verhandlung**                                       Forecast-Gewichtung
                                                      steigt

  **Entscheidung       Stufe 6     Beim Kunden in     Kurz vor Abschluss -
  ausstehend**                     finaler Abstimmung regelmäßig aktualisieren

  **Gewonnen /         End-Stufe   Vertrag            Schließt den Deal ab -
  Verloren**                       unterzeichnet      nie für laufende Deals
                                                      nutzen
  -------------------- ----------- ------------------ ------------------------

  -----------------------------------------------------------------------
  **💡 Tipp:** Die Wahrscheinlichkeit (Feld 2.13) wird oft automatisch
  angepasst, wenn du die Stufe änderst. Prüfe den Wert nach jeder
  Stufen-Änderung.

  -----------------------------------------------------------------------

**2.8 Sales Track (optional)**

Was es ist: Eine ergänzende Kategorie, die den Verkaufsweg oder die
Kampagnenzugehörigkeit beschreibt.

Typische Werte: Inbound, Outbound, Partner-Referral, Messe, Webinar.

**Warum es wichtig ist:**

-   Ermöglicht Analyse: Welche Vertriebswege bringen die besten Deals?

-   Basis für Marketing-Attribution (welche Maßnahmen zahlen sich aus).

**2.9 Typ (optional, aber für Reporting relevant)**

Was es ist: Die Art des Geschäfts - hilft bei der Kategorisierung im
Reporting.

Beispielwerte: Neugeschäft, Upsell, Cross-Sell, Renewal,
Projektgeschäft, Lizenz.

  -------------------------------- --------------------------------------
  **WENN ...**                     **DANN ...**

  Neuer Kunde kauft erstmals       Typ = Neugeschaeft

  Bestehender Kunde kauft          Typ = Upsell oder Cross-Sell
  zusaetzliche Module              

  Vertragsverlaengerung ohne       Typ = Renewal
  Aenderung                        
  -------------------------------- --------------------------------------

**2.10 Hosting (produktspezifisch)**

Was es ist: Die technische Betriebsform der verkauften Lösung.

Typische Werte: Cloud (SaaS), On-Premise, Hybrid, Private Cloud.

**Warum es wichtig ist:**

-   Steuert nachgelagerte Prozesse: Vertragsvorlage,
    Implementierungsaufwand, Supportmodell.

-   Relevant für Preisgestaltung (SaaS vs. Lizenz).

**2.11 Erwartete Einnahmen (optional)**

Was es ist: Eine zusaetzliche Umsatzprognose - kann sich vom Betrag-Feld
unterscheiden.

**Unterschied zu Betrag:**

-   Betrag = verhandelter / angebotener Preis.

-   Erwartete Einnahmen = realistisch erwarteter Zahlungseingang (z.B.
    nach Rabatt oder bei Ratenzahlung).

  -----------------------------------------------------------------------
  **ℹ Hinweis:** Wenn beide Felder befüllt sind, zeigt das CRM-Reporting
  den Unterschied als Gap. Nutze das für transparente Rabattverfolgung.

  -----------------------------------------------------------------------

**2.12 Produktfokus (optional, aber segmentierungsrelevant)**

Was es ist: Das Hauptprodukt oder die Produktfamilie, um die es in
diesem Deal geht.

Beispielwerte: ProcessForge, ORBIT, BPM Suite, Consulting, Add-on.

**Warum es wichtig ist:**

-   Erlaubt Auswertung nach Produktlinie: Welches Produkt verkauft sich
    wie gut?

-   Steuert ggf. den zuständigen Product Owner oder die
    Implementierungsreihenfolge.

**2.13 Lead-Quelle (empfohlen)**

Was es ist: Der Kanal, über den der potenzielle Kunde erstmals auf uns
aufmerksam wurde.

Typische Werte: Website, Messe, LinkedIn, Kaltakquise, Empfehlung,
Partner, Webinar, Google.

**Warum es wichtig ist:**

-   Direkte Basis für Marketing-ROI-Analysen.

-   Zeigt, welche Kanäle Deals mit dem höchsten Wert generieren.

-   Ohne dieses Feld: Marketing-Budget-Entscheidungen treffen im
    Dunkeln.

  -------------------------------- --------------------------------------
  **WENN ...**                     **DANN ...**

  Lead kam ueber LinkedIn-Kampagne Lead-Quelle = LinkedIn +
                                   Kampagne-Quelle = Name der Kampagne

  Empfehlung durch bestehenden     Lead-Quelle = Empfehlung, Notiz im
  Kunden                           Beschreibungsfeld mit Empfehler

  Quelle unbekannt                 Sonstiges waehlen und im
                                   Beschreibungsfeld erlaeutern - nie
                                   leer lassen wenn bekannt
  -------------------------------- --------------------------------------

**2.14 Wahrscheinlichkeit (automatisch, manuell anpassbar)**

Was es ist: Die prozentuale Einschätzung, mit der dieser Deal gewonnen
wird (0-100 %).

Standard: 100 % (Defaultwert). Wird oft automatisch durch die gewählte
Stufe befüllt.

**Warum es wichtig ist:**

-   Multipliziert mit Betrag = gewichteter Forecast-Wert.

-   Beispiel: Deal über €50.000 mit 40 % Wahrscheinlichkeit = €20.000 im
    Forecast.

-   100 % als Default bedeutet: Dein Forecast ist nur dann realistisch,
    wenn du den Wert anpasst.

  -------------------------------- --------------------------------------
  **WENN ...**                     **DANN ...**

  Deal gerade erst qualifiziert    10-20 %

  Demo / Pilot positiv verlaufen   40-60 %

  Angebot akzeptiert, Vertrag in   80-90 %
  Klärung                          

  Formale Unterschrift steht noch  95 %
  aus                              

  Deal sicher (Handschlag,         Nur 100 % setzen wenn du dir wirklich
  mündliche Zusage)                sicher bist
  -------------------------------- --------------------------------------

**2.15 Nächster Schritt (operative Steuerung)**

Was es ist: Der konkrete, datierte nächste Schritt zur Vorantreibung
dieses Deals.

**Format-Empfehlung:**

\[Datum\] \[Aktion\] - Beispiel: 15.03.2026 Follow-up-Call nach Demo

**Warum es wichtig ist:**

-   Das wichtigste operative Feld: Stale Deals ohne Nächster Schritt
    werden vergessen.

-   Führungskräfte nutzen dieses Feld im Pipeline-Review.

-   Verhindert, dass Deals monatelang ohne Bewegung in der Pipeline
    stehen.

  -----------------------------------------------------------------------
  **Best Practice:** Kein Deal sollte ohne datierten Naechsten Schritt
  gespeichert werden. Wenn unklar: Naechste Aktion klaeren bis \[Datum\]

  -----------------------------------------------------------------------

**2.16 Kontakt-Name (empfohlen)**

Was es ist: Der primäre Ansprechpartner beim Kunden für diesen Deal
(verknüpft mit Kontaktstammdaten).

**Warum es wichtig ist:**

-   Verknüpft alle Aktivitäten (E-Mails, Anrufe) mit dieser Person.

-   Ermöglicht korrektes Kontakt-bezogenes Reporting.

  -------------------------------- --------------------------------------
  **WENN ...**                     **DANN ...**

  Hauptkontakt bereits im CRM      Name eingeben und aus Vorschlagsliste
                                   wählen.

  Mehrere Ansprechpartner          Primären hier eintragen, weitere im
  beteiligt                        Stakeholder-Bereich (Abschnitt 5).

  Kontakt noch nicht im CRM        Zuerst Kontaktstammdatensatz anlegen.
  -------------------------------- --------------------------------------

**2.17 Kampagne-Quelle (marketing-kritisch)**

Was es ist: Die konkrete Marketing-Kampagne, aus der dieser Deal
entstanden ist.

Beispiel: LinkedIn_LeadMagnet_BPM_Q1_2026 oder Messe_DMS_Expo_2026

**Warum es wichtig ist:**

-   Ermöglicht exakte Kampagnen-ROI-Messung: Welche Kampagne hat diesen
    €-Wert erzeugt?

-   Pflicht für alle Deals, die aus Marketing-Aktivitäten stammen.

**2.18 Co-Betreuung (optional)**

Was es ist: Weitere Teammitglieder, die diesen Deal unterstützen (aber
nicht der Hauptverantwortliche sind).

  -------------------------------- --------------------------------------
  **WENN ...**                     **DANN ...**

  Pre-Sales-Spezialist unterstützt Als Co-Betreuer eintragen.
  bei der Demo                     

  Deal-Besitzer im Urlaub, Kollege Kollegen vorübergehend als Co-Betreuer
  springt ein                      eintragen.

  Partnerunternehmen beteiligt     Partner-Kontakt hier ggf. nicht
                                   eintragen (datenschutzrechtlich
                                   prüfen).
  -------------------------------- --------------------------------------

**2.19 Währung & Wechselkurs (internationales Geschäft)**

Was es ist: Die Transaktionswährung des Deals und der aktuelle
Umrechnungskurs zu EUR.

Standard: EUR - Wechselkurs = 1.

  -------------------------------- --------------------------------------
  **WENN ...**                     **DANN ...**

  Kunden aus dem EUR-Raum          EUR / 1 - keine Änderung nötig.
  (Deutschland, AT, CH etc.)       

  UK-Kunde, Angebot in GBP         Währung = GBP, Wechselkurs aktuell
                                   eintragen (z.B. 0.85).

  US-Kunde                         Währung = USD, aktuellen Kurs
                                   eintragen.
  -------------------------------- --------------------------------------

**3. Bereich: Evaluation**

Der Evaluation-Bereich ist das Herzstück der Qualifizierung. Hier wird
festgehalten, was der Kunde wirklich braucht, wer entscheidet und welche
Erkenntnisse aus Demo und Trial gewonnen wurden. Diese Daten sind direkt
mit dem MEDDPICC-Framework verknüpft.

**3.1 Entscheider (strategisch wichtig)**

Was es ist: Der Name (oder die Funktion) der Person, die die finale
Kaufentscheidung trifft.

**Warum es wichtig ist:**

-   Ohne Zugang zum Entscheider kein Deal - das ist die wichtigste
    qualifikative Frage.

-   Ermöglicht gezielte Maßnahmen: Wer muss wie angesprochen werden?

-   Direkte Basis für das D (Decision Maker) im MEDDPICC-Scoring.

  -------------------------------- --------------------------------------
  **WENN ...**                     **DANN ...**

  Entscheider bekannt und direkt   Name + Funktion eintragen: z.B. Thomas
  ansprechbar                      Mueller, CFO

  Entscheider bekannt aber nicht   Eintragen + im Feld Naechster Schritt
  zugaenglich                      Strategie notieren.

  Entscheider unbekannt            Nicht identifiziert eintragen - aktive
                                   Qualifizierungsaufgabe!

  Entscheidung durch Komitee       Alle relevanten Personen nennen, z.B.
                                   IT-Komitee: CTO, CFO, COO
  -------------------------------- --------------------------------------

**3.2 Kaufabsicht (Checkbox)**

Was es ist: Eine binäre Einschätzung - hat der Kunde eine erkennbare,
aktive Kaufabsicht signalisiert?

  -------------------------------- --------------------------------------
  **WENN ...**                     **DANN ...**

  Kunde hat aktiv Budget anfrage   Haken setzen.
  gestellt oder RFP gesendet       

  Kunde hat Interesse bekundet,    Kein Haken.
  aber nichts Konkretes            

  Unbekannt                        Kein Haken - Klärung als nächsten
                                   Schritt planen.
  -------------------------------- --------------------------------------

**3.3 Probleme, Auswirkungen und Bedarfe (qualitativ wichtigstes Feld)**

Was es ist: Das dokumentierte Verständnis der Kundensituation -
Schmerzen, deren Auswirkungen und der daraus resultierende Bedarf.

**Empfohlene Struktur:**

-   Problem: Was funktioniert beim Kunden nicht?

-   Auswirkung: Was kostet dieses Problem (Zeit, Geld, Risiko)?

-   Bedarf: Was braucht der Kunde, um das Problem zu lösen?

*Beispiel-Eintrag:*

  -----------------------------------------------------------------------
  **Beispiel:** Problem: Manuelle Prozessdokumentation in Excel dauert 3
  Tage pro Audit. Auswirkung: Compliance-Risiko bei ISO-Rezertifizierung,
  Kosten \~€40k/Jahr für externe Berater. Bedarf: Automatisierte
  Prozesserfassung mit Audit-Trail.

  -----------------------------------------------------------------------

**Warum es kritisch ist:**

-   Basis für jeden Lösungsvorschlag und jede Demo.

-   Ohne dieses Wissen ist jede Präsentation Blindflug.

-   Direkte Grundlage für das Nutzenargument (Feld 3.6).

**3.4 Demotermin & Trial (Checkboxen)**

Was es ist: Statustracker - wurde eine Demo vereinbart und/oder ein
Trial gestartet?

  -------------------------------- --------------------------------------
  **WENN ...**                     **DANN ...**

  Demo-Termin ist fix terminiert   Demotermin-Haken setzen.
  oder bereits stattgefunden       

  Testphase (Trial) wurde          Trial-Haken setzen.
  vereinbart oder läuft            

  Nur Interesse bekundet, nichts   Beide Haken offen lassen.
  Konkretes                        
  -------------------------------- --------------------------------------

  -----------------------------------------------------------------------
  **ℹ Hinweis:** Diese Checkboxen steuern ggf. automatische Workflows
  (z.B. Onboarding-E-Mails nach Trial-Start). Korrekte Pflege ist deshalb
  prozessrelevant.

  -----------------------------------------------------------------------

**3.5 Erkenntnisse aus Demo und Trial (lernkritisch)**

Was es ist: Die dokumentierten Ergebnisse und Reaktionen des Kunden aus
Demo und/oder Testphase.

**Was hier rein sollte:**

-   Was hat den Kunden begeistert?

-   Was wurde kritisiert oder als Lücke identifiziert?

-   Welche Feature-Fragen wurden gestellt?

-   Gab es technische Probleme?

*Beispiel:*

  -----------------------------------------------------------------------
  **Beispiel:** Demo 12.02.2026: Prozessvisualisierung begeisterte COO.
  Kritik: Fehlende SAP-Schnittstelle. Frage nach DSGVO-Konformität der
  KI-Komponente. Trial-Feedback ausstehend.

  -----------------------------------------------------------------------

**3.6 Nutzen für den Kunden (Value Statement)**

Was es ist: Die dokumentierte Nutzenformulierung - warum unser Angebot
die richtige Lösung für diesen Kunden ist.

**Format-Empfehlung:**

\[Unser Produkt\] ermöglicht \[Kunde\] \[konkretes Ergebnis\], was
\[wirtschaftlichen Nutzen\] bedeutet.

  -----------------------------------------------------------------------
  **Beispiel:** ProcessForge ermöglicht Mustermann GmbH,
  Compliance-Dokumentationen um 80 % zu beschleunigen. Das spart €35.000
  jährlich und eliminiert das Rezertifizierungsrisiko.

  -----------------------------------------------------------------------

**Warum es wichtig ist:**

-   Direkte Grundlage für Angebots- und Vertragsargumentationen.

-   Wird in Executive Summaries und Entscheidungsvorlagen verwendet.

-   Zeigt dem nächsten Kollegen, der den Deal übernimmt, sofort den
    Kern.

**3.7 Anforderungen und Erfolgskriterien**

Was es ist: Die dokumentierten Muss- und Kann-Anforderungen des Kunden
sowie die Kriterien, nach denen der Kunden den Erfolg bewertet.

*Beispiel:*

  -----------------------------------------------------------------------
  **Beispiel:** Muss: DSGVO-Konformität, SSO-Integration, API-Zugang.
  Kann: Mobile App, SAP-Connector. Erfolgskriterien: Reduktion
  Audit-Aufwand auf 0,5 Tage, Zertifizierung bestanden.

  -----------------------------------------------------------------------

**Warum es wichtig ist:**

-   Verhindert späte Überraschungen im Vertragsabschluss.

-   Basis für die Implementierungsplanung.

-   Klarer Verhandlungsrahmen: Was ist verhandelbar, was nicht?

**4. Bereich: Beschreibung**

**4.1 Beschreibung (Freitext)**

Was es ist: Ein freies Textfeld für alle ergänzenden Informationen, die
in keine andere Kategorie passen.

**Empfohlene Inhalte:**

-   Hintergrundkontext zum Unternehmen und zur Situation.

-   Besonderheiten der Branche oder des Kunden.

-   Interne Hinweise für Kollegen (z.B. Sensibilitäten, Vorgeschichte).

-   Links zu relevanten Dokumenten (Angebote, RFPs, Präsentationen).

  -------------------------------- --------------------------------------
  **WENN ...**                     **DANN ...**

  Deal hat eine komplexe           Kurze Zusammenfassung der Chronologie.
  Vorgeschichte                    

  Besondere Vertragskonditionen    Konditionen und Status hier
  verhandelt                       dokumentieren.

  Interne Eskalation notwendig     Situation + Eskalationsweg
                                   beschreiben.
  -------------------------------- --------------------------------------

  -----------------------------------------------------------------------
  **⚠ Hinweis:** Keine sensiblen Daten (Passwörter, persönliche Daten
  gemäß DSGVO) in diesem Freitext eintragen. Das CRM ist kein
  Dokumentenarchiv.

  -----------------------------------------------------------------------

**5. Bereich: Stakeholder**

**5.1 Stakeholder-Tabelle**

Was es ist: Eine strukturierte Übersicht aller am Kaufprozess
beteiligten Personen und ihrer Rolle im VKC-Prozess
(Vertriebs-Kunden-Kontakt-Prozess).

**Felder:**

-   Kontakt: Name des Stakeholders (verknüpft mit Kontaktstammdaten).

-   Funktion im VKC-Prozess: Die Rolle dieser Person beim Kunden.

**Typische Funktionen im VKC-Prozess:**

  ------------------- ------------- ------------------ ------------------------
  **Feld**            **Typ**       **Beispiel**       **Warum wichtig**

  **Economic Buyer**  Entscheider   CFO Thomas Müller  Hat finale
                                                       Budget-Freigabe - muss
                                                       immer identifiziert sein

  **Champion**        Interner      Projektleiter Anna Treibt Deal intern
                      Fürsprecher   Weber              voran - höchste
                                                       Pflege-Priorität

  **Influencer**      Fachlicher    IT-Leiter          Kann Deal blockieren
                      Berater                          oder fördern

  **End User**        Anwender      Prozess-Team (5    Nutzerakzeptanz
                                    Personen)          entscheidend für Renewal

  **Gatekeeper**      Türsteher     Einkauf / Legal    Muss frühzeitig
                                                       eingebunden werden
  ------------------- ------------- ------------------ ------------------------

  -------------------------------- --------------------------------------
  **WENN ...**                     **DANN ...**

  Nur ein Ansprechpartner bekannt  Diesen eintragen - Tabelle kann
                                   jederzeit erweitert werden.

  Mehrere Personen am Prozess      Alle eintragen - mindestens Economic
  beteiligt                        Buyer + Champion.

  Stakeholder verlässt das         Zeile aktualisieren oder entfernen -
  Unternehmen                      Nachfolger ermitteln.
  -------------------------------- --------------------------------------

  -----------------------------------------------------------------------
  **🎯 Best Practice:** Deals mit dokumentierten Champions gewinnen
  signifikant häufiger. Identifiziere und pflege den internen Fürsprecher
  aktiv.

  -----------------------------------------------------------------------

**6. Speichern und Abschluss**

**6.1 Die drei Schaltflächen**

  ------------------ ------------------------ -----------------------------
  **Schaltfläche**   **Funktion**             **Wann nutzen?**

  **Speichern**      Speichert und öffnet den Standard - nach vollständiger
                     Deal-Datensatz           Erfassung

  **Speichern und    Speichert und öffnet     Wenn du mehrere Deals
  Neu**              sofort ein neues leeres  hintereinander anlegen musst
                     Deal-Formular            

  **Abbrechen**      Alle Eingaben werden     Nur wenn du den Deal bewusst
                     verworfen - keine        nicht anlegen willst
                     Sicherheitsabfrage!      
  ------------------ ------------------------ -----------------------------

  -----------------------------------------------------------------------
  **Wichtig:** Abbrechen loescht alle eingetragenen Daten ohne
  Rueckfrage. Nicht versehentlich anklicken!

  -----------------------------------------------------------------------

**6.2 Qualitätsprüfung vor dem Speichern**

**Überprüfe diese Mindestanforderungen vor dem Speichern:**

  ------- ----------------------------------------- ------------------------
  **✓**   **Feld**                                  **Qualitätskriterium**

  ☐       **Deal-Besitzer**                         Korrekte Person
                                                    ausgewählt

  ☐       **Deal-Name**                             Namenskonvention
                                                    eingehalten: \[Kunde\] -
                                                    \[Projekt\]

  ☐       **Betrag**                                Realistischer Wert
                                                    eingetragen (nicht leer,
                                                    nicht 0)

  ☐       **Abschlussdatum**                        Plausibles, nicht
                                                    bereits abgelaufenes
                                                    Datum

  ☐       **Pipeline & Stufe**                      Beide passend zur
                                                    aktuellen Verkaufsphase

  ☐       **Lead-Quelle**                           Quelle korrekt
                                                    zugeordnet

  ☐       **Entscheider**                           Identifiziert oder
                                                    Maßnahme zur
                                                    Identifikation geplant

  ☐       **Probleme & Bedarfe**                    Ausgefüllt (nicht leer)

  ☐       **Nächster Schritt**                      Datierter konkreter
                                                    Schritt eingetragen
  ------- ----------------------------------------- ------------------------

**7. Häufige Sonderfälle und Fehler**

**7.1 Doppelte Deals**

  -------------------------------- --------------------------------------
  **WENN ...**                     **DANN ...**

  Deal für denselben Kunden        Vor dem Anlegen immer nach bestehendem
  existiert bereits                Deal suchen. Doppelte Deals verzerren
                                   den Forecast.

  Zweites Projekt beim selben      Separaten Deal anlegen - gleiche
  Kunden                           Firma, anderer Deal-Name.
  -------------------------------- --------------------------------------

**7.2 Verlorene Deals**

  -------------------------------- --------------------------------------
  **WENN ...**                     **DANN ...**

  Kunde hat abgesagt               Stufe auf Verloren setzen - Deal nicht
                                   loeschen (Historiedaten!).

  Grund des Verlustes bekannt      Grund im Beschreibungsfeld
                                   dokumentieren (Preis, Funktion,
                                   Timing, Wettbewerb).
  -------------------------------- --------------------------------------

**7.3 Pausierte Deals**

  -------------------------------- --------------------------------------
  **WENN ...**                     **DANN ...**

  Kunde hat Entscheidung auf       Stufe auf On Hold setzen (falls
  unbestimmte Zeit verschoben      vorhanden) + Datum fuer Wiedervorlage
                                   im Naechsten-Schritt-Feld.

  Kein passende On Hold Stufe      Im Beschreibungsfeld dokumentieren,
  vorhanden                        Abschlussdatum weit in die Zukunft
                                   setzen.
  -------------------------------- --------------------------------------

**8. Glossar**

  ------------------- ------------------- ------------------ ------------------------------------
  **Feld**            **Typ**             **Beispiel**       **Warum wichtig**

  **Pipeline**        Prozess-Kategorie   Direktvertrieb     Organisationsebene für
                                                             Verkaufsprozesse

  **Stufe**           Phase               Angebot versendet  Aktuelle Position des Deals im
                                                             Prozess

  **VKC-Prozess**     Methodik            Economic Buyer,    Vertriebsqualifizierungs-Framework
                                          Champion           

  **Forecast**        Prognose            €420.000 Q2        Summierter gewichteter Dealwert pro
                                                             Zeitraum

  **Champion**        Stakeholder-Rolle   Projektleiterin    Interner Fürsprecher beim Kunden
                                          intern             

  **MEDDPICC**        Framework           Qualification      Vertriebsqualifizierungs-Methodik:
                                          Score              Metrics, Economic Buyer, Decision
                                                             Criteria etc.
  ------------------- ------------------- ------------------ ------------------------------------

*Erstellt: März 2026 \| Nächste Überprüfung: September 2026 \|
Verantwortlich: CMO*
