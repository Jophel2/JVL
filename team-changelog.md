# PisofMind — Term Project Changelog

---

## May 22, 2026 — Project Requirements

### Docs: Low-level requirements
Successfully defined low-level requirements for the term project including context rules, additional rules, and user flows.

Status: Done

---

## June 2, 2026 — Backend Files

### Added: Project folder structure
Successfully created all necessary directories for both backend and frontend modules.
Includes: dto, enums, entities, repositories, services, controllers, exceptions

Status: Done

### Added: DTO files
Successfully created all necessary files for Data Transfer Objects (DTOs).

Includes: AddExpenseRequest.java, AuthResponse.java,  BudgetResponse.java,  CategoryBudgetResponse.java,  ExpenseResponse.java,  LoginRequest.java,  LoginResponse.java,  RegisterRequest.java,  SetBudgetRequest.java

Status: Done

---

## June 3, 2026 — Backend Files (continued)

### Added: Enum files
Successfully created all files for enums — shared value types used across entities, DTOs, and services.

Includes: BudgetPeriod.java, ExpenseCategory.java, UserRank.java

Status: Done

### Added: Entity files
Successfully created all files for entities — domain models of the application.

Includes: CategoryBudget.java, ExpenseCategory.java, UserRank.java

Status: Done

### Added: Repository files
Successfully created all files for repositories — interfaces for data access.

Includes: CategoryBudgetRepository.java, Expense.java, User.java

Status: Done

### Added: Service files
Successfully created all files for services — business logic handling processes across DTOs, entities, and repositories.

Includes: AuthService.java, BudgetServicePort.java, ExpenseService.java, RankService.java, SummaryService.java

Status: Done

### Added: Controller files
Successfully created all files for controllers — API endpoints of the application.

Includes: AuthController.java, BugdetController.java, ExpenseController.java, SummaryController.java

Status: Done

### Added: Exception files
Successfully created all files for exceptions — centralized exception handlers.

Includes: ErrorResponse.java, GlobalExceptionHandler.java

Status: Done

### Added: Configuration files
Successfully created all files for configurations — covers security, CORS, profiles, and other runtime configurations.

Includes: SecurityConfig.java

Status: Done

### Added: Properties files and DB migration folder
Successfully created all files for properties and sql

Includes: application.properties, application-h2.properties, V1__Create_Users_Table, V2__Create_Category_Budget_Table, V3__Add_budget_period_to_category_budgets

Status: Done

### Added: maven files
Successfully created all maven files.

Includes pom.xml, mvnw, mvnw.cmd

Status: Done

### Added: Guide files
Successfully created all files for guides

Includes create_bd.jsh, DB_SETUP_GUIDE.md, HELP.md

Status: Done

### Added: Project Requirements file
Successfully created all files for the guide to the requirements of the project

Includes Project Requirements.txt

Status: Done

### Added: Context Rules file
Successfully created all files that contains the rules to be followed

Includes Context-rules.txt, Additional-Rules-and-Flows.txt

Status: Done

---

## June 3, 2026 — Frontend Files

### Added: Project folder structure
Successfully created all necessary directories and base configuration files for the frontend.

Includes: components, context, pages, services, styles, types, assets, public

Status: Done

### Added: Component files
Successfully created all necessary component files for the UI.

Includes: BudgetCard.tsx, ExpenseForm.tsx, ExpenseList.tsx, SummaryView.tsx

Status: Done

### Added: Page files
Successfully created all page files for routing and views.

Includes: DashboardPage.tsx, LoginPage.tsx, RegisterPage.tsx

Status: Done

### Added: Context files
Successfully created all context files for global state management.

Includes: AuthContext.tsx

Status: Done

### Added: Service files
Successfully created all service files for API communication.

Includes: api.ts

Status: Done

### Added: Style files
Successfully created all CSS files for component and page styling.

Includes: App.css, Auth.css, BudgetCard.css, Dashboard.css, ExpenseForm.css, ExpenseList.css, SummaryView.css, index.css

Status: Done

### Added: Type files
Successfully created all TypeScript type definition files.

Includes: index.ts

Status: Done

### Added: Configuration and root files
Successfully added all root-level configuration and entry point files.

Includes: App.tsx, main.tsx, index.html, index.css, vite.config.ts, tsconfig.json, tsconfig.app.json, tsconfig.node.json, eslint.config.js, package.json, package-lock.json, .gitignore, README.md

Status: Done
