---
description:  Implementation Workflow
auto_execution_mode: 1
---

# Implementation Workflow

Each implementation step should follow this workflow:

1. **Implement** - Write or update the service class and/or its tests.
2. **Run ESLint** - Check code quality with the strict linting rules (`npm run lint`).
3. **Run tests** - Execute the tests relevant to the current change (`npm test`).
4. **Verify** - Run both lint and tests together (`npm run verify`).
5. **Present results** - Review and, if needed, share lint output, test results, coverage, and any issues.
6. **Wait for feedback** - Pause for review and approval before proceeding.
7. **Commit** - Create a git commit with a clear, descriptive message.
