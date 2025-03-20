# language: de
Funktionalität: Todo-Liste Verwaltung
  Als Benutzer möchte ich meine Aufgaben verwalten können
  um meine täglichen Aktivitäten zu organisieren

  Szenario: Neue Aufgabe hinzufügen und als erledigt markieren
    Angenommen ich bin auf der TodoMVC Seite
    Wenn ich "Playwright lernen" als neue Aufgabe eingebe
    Dann sollte die Aufgabe in der Liste erscheinen
    Wenn ich die Aufgabe als erledigt markiere
    Dann sollte die Aufgabe als erledigt angezeigt werden

  Szenario: Aufgaben nach Status filtern
    Angenommen ich bin auf der TodoMVC Seite
    Und ich habe folgende Aufgaben eingegeben:
      | Aufgabe           |
      | Playwright lernen |
      | Tests schreiben   |
      | Awesome sein      |
    Wenn ich "Tests schreiben" als erledigt markiere
    Und ich auf "Aktiv" klicke
    Dann sollte ich 2 Aufgaben sehen
    Und "Tests schreiben" sollte nicht sichtbar sein
    Wenn ich auf "Erledigt" klicke
    Dann sollte ich 1 Aufgabe sehen
    Und "Tests schreiben" sollte sichtbar sein

  Szenario: Aufgabe bearbeiten
    Angenommen ich bin auf der TodoMVC Seite
    Und ich habe "Playwright lernen" als Aufgabe eingegeben
    Wenn ich die Aufgabe doppelklicke
    Und ich den Text zu "Playwright meistern" ändere
    Dann sollte die Aufgabe als "Playwright meistern" angezeigt werden

  Szenario: Alle Aufgaben als erledigt markieren und löschen
    Angenommen ich bin auf der TodoMVC Seite
    Und ich habe folgende Aufgaben eingegeben:
      | Aufgabe    |
      | Aufgabe 1  |
      | Aufgabe 2  |
      | Aufgabe 3  |
    Wenn ich alle Aufgaben als erledigt markiere
    Dann sollten alle Aufgaben als erledigt angezeigt werden
    Wenn ich auf "Erledigte löschen" klicke
    Dann sollte die Liste leer sein 