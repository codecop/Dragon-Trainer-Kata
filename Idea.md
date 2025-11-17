# Legacy Code Example

## Goal

For a TDD training session we need a piece of code
that is so large that you cannot fully understand it within an hour
and that forms part of something larger.
For example, a system that uses interfaces.
Participants often say that the exercise is too small.

### Learning goals

What is the learning objective?

* Goal: Add a feature using TDD.
  * What does it need to have?
  * The code should be reasonable, but not well decoupled.

* Goal: First make the change easy, then make the easy change. That is, refactor first, then make the modification.
  * What does it need to have?
  * An architecture that is not suitable for the next feature.

* Goal: Understand the code through "Read by Refactoring".
  * What does it need to have?
  * It should contain code smells and be large enough that it is not easy to understand.

* Goal: Work with code that we do not yet understand.
  * Refactor without understanding the code -> difficult to understand (because size is the main reason something is considered "hard to understand").
  * Fix a bug without understanding the code (identify the "blast radius" and compare it with the tests) -> different blast radii and tests, variable boundaries in coupling.
  * Widespread refactoring -> architectural decisions in many places.

## Scope

* How large would it need to be?
* There is code that is easy to understand (e.g. Trivia, Gilded Rose) but hard to change.
* There is code that is hard to understand (e.g. TriviaOO) but easy to change.
* It needs more functionality than a typical kata.
* Around 2 kLoC across three services might be enough.
