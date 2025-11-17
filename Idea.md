# Legacy Code Example

## Goal

For a TDD training we need a piece of code
that is large enough that you cannot understand it within 1 hour
and that is part of something even larger.
For example, with interfaces.
Because people usually say the exercise is too small.

### By Learning Goals

What is the learning objective?

* Goal: Add a feature using TDD.
  * What does it need to have?
  * It needs to be OK code but not decoupled.

* Goal: First make the change easy, then make the easy change. That is, refactor first before making a modification.
  * What does it need to have?
  * An architecture that is not suitable for the next feature.

* Goal: Understand code through "Read by Refactoring".
  * What does it need to have?
  * Code smells and be large enough that it is not easy to understand.
  
* Goal: working with code that we do not understand
  * Refactor without understanding the code -> hard to understand (because size is the main argument for "hard to understand")
  * Bug fix without understanding the code (find the "blast radius" and compare it with the tests) -> different blast radius and tests, variable boundary in coupling
  * Widespread refactoring -> architectural decision in many places

## Scope

* How large would it need to be?
* There is code that is easy to understand (e.g. Trivia, Gilded Rose) but hard to change.
* There is code that is hard to understand (e.g. TriviaOO) but easy to change.
* It needs more functionality than a typical kata.
* Maybe 2 kLoC in 3 services might be enough.
