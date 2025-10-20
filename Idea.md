# Legacy Code Beispiel

## Ziel

* für ein TDD Training brauche ein Stück Code
* das so gross ist dass man es in 1h nicht verstehen kann
* und ist Teil von etwas noch grösserem.
* z.B. Interfaces.
* weil die Leute sagen es ist zu klein
* Was ist Dein Learning Objective? für TDD, dann OK code aber nicht entkoppelt.
  * Ziel: First make the change easy then make the easy change. D.h. für Modifikation vorher Refactoren.
    * Was muss es haben?
      * Architektur für nächstes Feature nicht passend
  * Ziel: Code verstehen durch "Read by Refactoring".
    * Was muss es haben?
      * Code Smells und gross sein, dass es nicht
* anderes Training: mit Code arbeiten den wir nicht verstehen
  * refactoren ohne code zu verstehen -> schwer zu verstehen (weil Größe das Hauptargument für "schwer zu verstehen" ist)
  * bugfix ohne code zu verstehen (blast radius finden und mit tests vergleichen) -> unterschiedliche blast radius und tests, variable Grenze in Kopplung
  * widespread refactoring -> Architektur Entscheidung an vielen Stellen

## Scope

* Wie gross müsste es sein? Idee
  * es gibt leicht zu verstehen (e.g. Trivia, Gilded Rose) aber schwer zu ändern
  * es gibt schwer zu verstehen (? TriviaOO) aber leicht zu ändern?
  * mehr Funktionalität als typische Kata
  * 2kLoc in 3 Services wäre vielleicht genug
