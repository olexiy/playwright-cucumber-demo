# language: de
@form @ui @pending
Funktionalität: Formular Handhabung
  Als Benutzer möchte ich Formulare ausfüllen können
  um Daten einzugeben und zu überprüfen

  @input
  Szenario: Einfache Nachricht eingeben
    Angenommen ich bin auf der Formular-Demo-Seite
    Wenn ich "Hallo Playwright!" als Nachricht eingebe
    Und ich auf dem Formular auf "Wert abrufen" klicke
    Dann sollte die Nachricht "Hallo Playwright!" angezeigt werden

  @calculation
  Szenario: Zwei Zahlen addieren
    Angenommen ich bin auf der Formular-Demo-Seite
    Wenn ich folgende Zahlen eingebe:
      | Erste Zahl | Zweite Zahl |
      | 5          | 7           |
    Und ich auf dem Formular auf "Summe berechnen" klicke
    Dann sollte das Ergebnis "12" sein 