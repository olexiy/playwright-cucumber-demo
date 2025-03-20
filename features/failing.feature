# language: de
Funktionalität: Absichtlich fehlschlagende Tests
  Als Tester möchte ich fehlschlagende Tests sehen
  um Fehlerberichte und Screenshots zu überprüfen

  Szenario: Fehlschlagender Test mit Screenshot
    Angenommen ich bin auf der TodoMVC Seite
    Wenn ich "Fehlschlagender Test" als neue Aufgabe eingebe
    Dann sollte ein nicht vorhandenes Element sichtbar sein
    Und die Aufgabe sollte einen falschen Text haben 