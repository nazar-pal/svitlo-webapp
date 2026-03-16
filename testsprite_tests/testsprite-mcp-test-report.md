# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata

- **Project Name:** svitlo-webapp
- **Date:** 2026-03-16
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

### Requirement: Organization Management

- **Description:** Create organizations, manage members, invite team members, switch between orgs.

#### Test TC001 Create a new organization from the dashboard sidebar and land on the new org settings page

- **Test Code:** [TC001_Create_a_new_organization_from_the_dashboard_sidebar_and_land_on_the_new_org_settings_page.py](./TC001_Create_a_new_organization_from_the_dashboard_sidebar_and_land_on_the_new_org_settings_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/13be2c78-4e7e-4d29-aeb5-b63280541cc5
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Organization creation flow works correctly. User can create a new org from the sidebar and is redirected to the settings page for the new organization.

---

#### Test TC002 View organization members list on settings

- **Test Code:** [TC002_View_organization_members_list_on_settings.py](./TC002_View_organization_members_list_on_settings.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/e7e4735c-91d8-4f4a-8d48-a86cdb0379fa
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Members list renders correctly on the organization settings page, displaying user roles and details as expected.

---

#### Test TC003 Invite a member by email and see a new pending invitation

- **Test Code:** [TC003_Invite_a_member_by_email_and_see_a_new_pending_invitation.py](./TC003_Invite_a_member_by_email_and_see_a_new_pending_invitation.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/4a285eb5-eac3-4452-abbe-266d88276355
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Admin can invite a member by email. The invitation appears in the pending invitations list immediately after submission.

---

#### Test TC050 Switch organization from sidebar dropdown updates dashboard context

- **Test Code:** [TC050_Switch_organization_from_sidebar_dropdown_updates_dashboard_context.py](./TC050_Switch_organization_from_sidebar_dropdown_updates_dashboard_context.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/090aa153-7428-433b-8b11-36bba61f0d43
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Organization switching from the sidebar dropdown correctly updates the dashboard context, loading the selected org's data.

---

### Requirement: Generator CRUD & Configuration

- **Description:** Create, edit, and configure generators with runtime limits, warning thresholds, and validation.

#### Test TC005 Create a generator with runtime limits and warning threshold

- **Test Code:** [TC005_Create_a_generator_with_runtime_limits_and_warning_threshold.py](./TC005_Create_a_generator_with_runtime_limits_and_warning_threshold.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/8c0788f7-6c7c-4cc2-8293-497420c4dd2f
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Generator creation with all fields (title, model, runtime limits, warning threshold) works correctly. The generator appears in the sidebar list after creation.

---

#### Test TC006 Create generator validation: required fields left blank

- **Test Code:** [TC006_Create_generator_validation_required_fields_left_blank.py](./TC006_Create_generator_validation_required_fields_left_blank.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/d013857d-a002-4832-8bc8-c33595e90b68
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Client-side validation correctly prevents generator creation when required fields are left blank. Appropriate error messages are displayed.

---

### Requirement: Runtime Session Tracking

- **Description:** Start/stop generator sessions, log manual sessions, track runtime hours, view session history.

#### Test TC010 Start and stop a live runtime session and verify it appears in history

- **Test Code:** [TC010_Start_and_stop_a_live_runtime_session_and_verify_it_appears_in_history.py](./TC010_Start_and_stop_a_live_runtime_session_and_verify_it_appears_in_history.py)
- **Test Error:** Stop button was clicked but the runtime history still shows an 'In progress' row instead of a completed duration. No new history row with a completed duration was added after the Stop action.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/2bb7e39e-9564-4daf-844f-b6eb0eac3989
- **Status:** ❌ Failed
- **Severity:** HIGH
- **Analysis / Findings:** After stopping a session, the UI does not immediately transition the session from "In progress" to a completed entry with duration. This may be a sync delay issue — the local-first PowerSync database may not update the UI fast enough, or the session history component may not reactively re-render when the session's `stopped_at` field is set.

---

#### Test TC011 Live session shows an increasing elapsed time counter while running

- **Test Code:** [TC011_Live_session_shows_an_increasing_elapsed_time_counter_while_running.py](./TC011_Live_session_shows_an_increasing_elapsed_time_counter_while_running.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/2fdf5cc0-bdd6-44ba-9664-7ee3ed9941ca
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** The elapsed time counter increments correctly while a session is running.

---

#### Test TC013 Log a manual past session and verify it appears in session history with duration

- **Test Code:** [TC013_Log_a_manual_past_session_and_verify_it_appears_in_session_history_with_duration.py](./TC013_Log_a_manual_past_session_and_verify_it_appears_in_session_history_with_duration.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/f836edd0-4f01-4a29-86d4-911a6418057b
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Manual session logging works correctly. The session appears in history with the correct duration calculated from the provided start and stop times.

---

#### Test TC014 Manual session validation: stop time earlier than start time shows an error and does not save

- **Test Code:** [TC014_Manual_session_validation_stop_time_earlier_than_start_time_shows_an_error_and_does_not_save.py](./TC014_Manual_session_validation_stop_time_earlier_than_start_time_shows_an_error_and_does_not_save.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/2bee2076-4647-43f1-8216-6bf2093049e7
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Validation correctly prevents saving a manual session where the stop time precedes the start time. An error message is shown to the user.

---

#### Test TC042 Stop an active runtime session from the dashboard active session card

- **Test Code:** [TC042_Stop_an_active_runtime_session_from_the_dashboard_active_session_card.py](./TC042_Stop_an_active_runtime_session_from_the_dashboard_active_session_card.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/a01dad04-5c14-4e40-816b-7a0c198376af
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Users can stop an active session directly from the dashboard's active session card. The card updates correctly after stopping.

---

### Requirement: Generator Status Monitoring

- **Description:** View generator status (running, resting, available) with rest period countdown and attention alerts.

#### Test TC015 Prevent starting a session when generator status is resting (error shown)

- **Test Code:** [TC015_Prevent_starting_a_session_when_generator_status_is_resting_error_shown.py](./TC015_Prevent_starting_a_session_when_generator_status_is_resting_error_shown.py)
- **Test Error:** Authentication requests failed with 'Failed to fetch' error. Sign-in did not complete, so the test could not reach the generator page to verify resting status behavior.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/6ce8e145-4295-41f9-b928-94646e1127c6
- **Status:** ❌ Failed
- **Severity:** LOW
- **Analysis / Findings:** This is an infrastructure/test environment failure, not an application bug. The authentication endpoint was unreachable during this test run ("Failed to fetch"), preventing the test from reaching the generator functionality. The test should be re-run.

---

#### Test TC016 Open organization dashboard and verify generator status indicators and active session card are visible

- **Test Code:** [TC016_Open_organization_dashboard_and_verify_generator_status_indicators_and_active_session_card_are_visible.py](./TC016_Open_organization_dashboard_and_verify_generator_status_indicators_and_active_session_card_are_visible.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/28252b33-15f5-4017-9918-d78c26324dc7
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Dashboard correctly displays generator status indicators (colored dots) and the active session card when a session is running.

---

#### Test TC017 From attention required alert, navigate to generator detail page

- **Test Code:** [TC017_From_attention_required_alert_navigate_to_generator_detail_page.py](./TC017_From_attention_required_alert_navigate_to_generator_detail_page.py)
- **Test Error:** No interactive alert item found in the 'Attention Required' section. The section shows 'All clear' (no alerts active), so no clickable alert element was available.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/cfb97125-0e27-40cf-a883-cabf249a7deb
- **Status:** ❌ Failed
- **Severity:** LOW
- **Analysis / Findings:** This is a test data/precondition issue rather than an application bug. The test requires a generator in a warning or resting state to produce an attention alert, but no such generator existed during the test run. The "All clear" state is expected when no generators need attention.

---

#### Test TC019 Warning indicator: click warning/attention item and verify generator detail displays warning state

- **Test Code:** [TC019_Warning_indicator_click_warningattention_item_and_verify_generator_detail_displays_warning_state.py](./TC019_Warning_indicator_click_warningattention_item_and_verify_generator_detail_displays_warning_state.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/fa040192-2ec3-41fb-8b08-e66d6c4fa454
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Clicking a warning/attention item correctly navigates to the generator detail page, which displays the warning state as expected.

---

#### Test TC022 Sync/status computation error: surface error message that generator status cannot be determined

- **Test Code:** [TC022_Syncstatus_computation_error_surface_error_message_that_generator_status_cannot_be_determined.py](./TC022_Syncstatus_computation_error_surface_error_message_that_generator_status_cannot_be_determined.py)
- **Test Error:** No error banner or "cannot be determined" message found on the page. The page shows "All changes synced" — no sync error state was triggered.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/c9754285-8823-40fe-8b1a-99632c7eb759
- **Status:** ❌ Failed
- **Severity:** MEDIUM
- **Analysis / Findings:** The app may not have an explicit error state for when generator status computation fails. Since PowerSync was connected and syncing normally, the error condition could not be triggered. This could indicate either (a) the feature doesn't exist yet, or (b) it requires simulating a sync failure, which wasn't possible in this test environment.

---

### Requirement: Maintenance Planning & Tracking

- **Description:** Create maintenance templates, record maintenance completion, track due dates.

#### Test TC023 Create a recurring run-hours maintenance template and verify it appears with due status indicators

- **Test Code:** [TC023_Create_a_recurring_run_hours_maintenance_template_and_verify_it_appears_with_due_status_indicators.py](./TC023_Create_a_recurring_run_hours_maintenance_template_and_verify_it_appears_with_due_status_indicators.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/b68ee7a8-a975-4f78-9abb-c9492680ae1f
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Maintenance template creation with run-hours trigger works correctly. The template appears with appropriate due status indicators.

---

#### Test TC025 Create a whichever-first (both) maintenance template and verify it appears

- **Test Code:** [TC025_Create_a_whichever_first_both_maintenance_template_and_verify_it_appears.py](./TC025_Create_a_whichever_first_both_maintenance_template_and_verify_it_appears.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/629f3ca5-ae8e-4d09-8fab-77b90db94a4a
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** "Whichever first" (combined hours + calendar days) maintenance template creation works correctly.

---

#### Test TC026 Record maintenance completion with notes and verify record appears in history

- **Test Code:** [TC026_Record_maintenance_completion_with_notes_and_verify_record_appears_in_history.py](./TC026_Record_maintenance_completion_with_notes_and_verify_record_appears_in_history.py)
- **Test Error:** No generators assigned to the user. 'My Generators' displays 'No generators assigned to you'. No maintenance templates or generator items available to record against.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/e1ac38da-f58b-44d7-b55e-cf97079078b6
- **Status:** ❌ Failed
- **Severity:** LOW
- **Analysis / Findings:** This is a test data/precondition issue. The test user had no assigned generators or maintenance templates, so there was nothing to record maintenance against. The test needs to first create a generator and maintenance template before attempting to record completion.

---

#### Test TC044 Upcoming maintenance list is shown and ranked by urgency

- **Test Code:** [TC044_Upcoming_maintenance_list_is_shown_and_ranked_by_urgency.py](./TC044_Upcoming_maintenance_list_is_shown_and_ranked_by_urgency.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/f6318ece-d72c-42de-ab83-12128bd59b32
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** The upcoming maintenance list renders correctly and items are ranked by urgency as expected.

---

#### Test TC045 Open a maintenance item and navigate to the generator detail page

- **Test Code:** [TC045_Open_a_maintenance_item_and_navigate_to_the_generator_detail_page.py](./TC045_Open_a_maintenance_item_and_navigate_to_the_generator_detail_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/d8e5c726-b6ff-4030-99d1-63623b20f4d1
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Clicking a maintenance item correctly navigates to the associated generator's detail page.

---

### Requirement: AI Maintenance Suggestions

- **Description:** Generate AI-powered maintenance plans from generator model using Google Gemini.

#### Test TC027 Generate AI maintenance suggestions and accept one to save a maintenance template

- **Test Code:** [TC027_Generate_AI_maintenance_suggestions_and_accept_one_to_save_a_maintenance_template.py](./TC027_Generate_AI_maintenance_suggestions_and_accept_one_to_save_a_maintenance_template.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/6ed9e855-b107-468c-8680-5dc51e947ce5
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** AI maintenance suggestion generation and acceptance flow works end-to-end. Suggestions are generated from the generator model and can be accepted to create maintenance templates.

---

#### Test TC028 AI suggestions appear after generating and can be reviewed

- **Test Code:** [TC028_AI_suggestions_appear_after_generating_and_can_be_reviewed.py](./TC028_AI_suggestions_appear_after_generating_and_can_be_reviewed.py)
- **Test Error:** Authentication failed with 'Failed to fetch' error on the sign-in page. AI suggestions could not be tested because login was unsuccessful.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/77e3f309-9d95-483d-af4d-d8702bf6ae0c
- **Status:** ❌ Failed
- **Severity:** LOW
- **Analysis / Findings:** Infrastructure/test environment failure — authentication endpoint was unreachable during this test run. Not an application bug. Should be re-run.

---

#### Test TC029 Accepting an AI suggestion creates a maintenance template visible after save

- **Test Code:** [TC029_Accepting_an_AI_suggestion_creates_a_maintenance_template_visible_after_save.py](./TC029_Accepting_an_AI_suggestion_creates_a_maintenance_template_visible_after_save.py)
- **Test Error:** 'Failed to get AI suggestions. Please try again.' message displayed in the Create Generator modal. No AI suggestions were generated.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/7b5d9219-7a7a-4e60-bc1d-d3571f23754d
- **Status:** ❌ Failed
- **Severity:** MEDIUM
- **Analysis / Findings:** The AI suggestion service returned an error. This could be due to the Google Gemini API being unavailable or rate-limited during the test, or a backend configuration issue. The error message "Failed to get AI suggestions" is correctly surfaced to the user, which is good UX — but the underlying AI service reliability should be investigated.

---

### Requirement: Employee Assignment

- **Description:** Assign organization members to specific generators for access control.

#### Test TC034 Admin assigns an organization member to a generator and sees them in the assigned list

- **Test Code:** [TC034_Admin_assigns_an_organization_member_to_a_generator_and_sees_them_in_the_assigned_list.py](./TC034_Admin_assigns_an_organization_member_to_a_generator_and_sees_them_in_the_assigned_list.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/6715c915-cda3-4aa8-b7e0-66dc114a51fa
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Admin can successfully assign a member to a generator. The assigned member appears in the list immediately.

---

#### Test TC035 Admin completes assignment confirmation and verifies assigned member appears

- **Test Code:** [TC035_Admin_completes_assignment_confirmation_and_verifies_assigned_member_appears.py](./TC035_Admin_completes_assignment_confirmation_and_verifies_assigned_member_appears.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/47810af2-ec08-43cc-b640-9eb34d9aa007
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Assignment confirmation flow works correctly. Member appears in the assigned list after confirmation.

---

#### Test TC036 Admin sees assigned member in list after assignment is confirmed

- **Test Code:** [TC036_Admin_sees_assigned_member_in_list_after_assignment_is_confirmed.py](./TC036_Admin_sees_assigned_member_in_list_after_assignment_is_confirmed.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/bfb16230-a56d-4434-8770-b8ccafe0176c
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Assigned member persists in the list after assignment is confirmed.

---

#### Test TC037 Admin unassigns an employee with confirmation and employee is removed from list

- **Test Code:** [TC037_Admin_unassigns_an_employee_with_confirmation_and_employee_is_removed_from_list.py](./TC037_Admin_unassigns_an_employee_with_confirmation_and_employee_is_removed_from_list.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/7496cabb-cd94-4d12-86c2-e173b88fe5ba
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Admin can unassign an employee with a confirmation dialog. The employee is correctly removed from the assigned list after confirmation.

---

#### Test TC040 Non-admin cannot assign members and sees admin-only permission error

- **Test Code:** [TC040_Non_admin_cannot_assign_members_and_sees_admin_only_permission_error.py](./TC040_Non_admin_cannot_assign_members_and_sees_admin_only_permission_error.py)
- **Test Error:** No permission error message displayed after clicking the 'Assign' button. A member selection dialog was shown instead of a permission denial, indicating the assignment UI was reachable by a non-admin user.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/42646c6e-b7e2-40ce-98f6-aad2f67c4fa2
- **Status:** ❌ Failed
- **Severity:** HIGH
- **Analysis / Findings:** **Potential authorization bug.** Non-admin users can access the assignment UI and see the member selection dialog. The assign button should either be hidden for non-admin users or show a permission error when clicked. This could allow unauthorized member assignments if the backend also lacks proper role checks. Verify that the backend mutation enforces admin-only access even if the UI allows the action.

---

### Requirement: Dashboard Overview & Navigation

- **Description:** Central dashboard with active sessions, generators list, alerts, upcoming maintenance, and sidebar navigation.

#### Test TC047 Navigate to generator detail by clicking a generator in the dashboard list

- **Test Code:** [TC047_Navigate_to_generator_detail_by_clicking_a_generator_in_the_dashboard_list.py](./TC047_Navigate_to_generator_detail_by_clicking_a_generator_in_the_dashboard_list.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/14af6d42-02a6-46d5-883d-3829ca22f216
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Clicking a generator in the dashboard list correctly navigates to its detail page.

---

## 3️⃣ Coverage & Matching Metrics

- **73.33%** of tests passed (22 out of 30)

| Requirement                     | Total Tests | ✅ Passed | ❌ Failed |
| ------------------------------- | ----------- | --------- | --------- |
| Organization Management         | 4           | 4         | 0         |
| Generator CRUD & Configuration  | 2           | 2         | 0         |
| Runtime Session Tracking        | 5           | 4         | 1         |
| Generator Status Monitoring     | 4           | 2         | 2         |
| Maintenance Planning & Tracking | 4           | 3         | 1         |
| AI Maintenance Suggestions      | 3           | 1         | 2         |
| Employee Assignment             | 5           | 4         | 1         |
| Dashboard Overview & Navigation | 1           | 1         | 0         |
| **Uncategorized (Infra)**       | **2**       | **0**     | **2**     |

---

## 4️⃣ Key Gaps / Risks

> **73.33% of tests passed.** Out of 8 failures, 3 are infrastructure/test-environment issues (auth endpoint unreachable, missing test data preconditions), not application bugs.

**Real application issues identified:**

1. **HIGH — Session stop does not immediately update history (TC010):** After stopping a runtime session, the session history table still shows "In progress" instead of transitioning to a completed entry with duration. This may indicate a reactivity/sync delay issue in the PowerSync local-first architecture.

2. **HIGH — Non-admin users can access assignment UI (TC040):** The assign button and member selection dialog are visible and interactive for non-admin users. This is a potential authorization gap — the UI should hide or disable the assign action for non-admin roles. Backend enforcement should also be verified.

3. **MEDIUM — AI suggestion service reliability (TC029):** The AI maintenance suggestion feature returned "Failed to get AI suggestions" during testing. While the error is correctly surfaced to users, the reliability of the Google Gemini backend integration should be monitored.

4. **MEDIUM — No sync error state UI (TC022):** No explicit error state exists for when generator status computation fails due to sync issues. Consider adding graceful degradation messaging when PowerSync connectivity is lost.

**Test environment issues (not app bugs — re-run recommended):**

- TC015, TC028: Authentication endpoint unreachable ("Failed to fetch") during test execution
- TC017, TC026: Test preconditions not met (no generators in alert state, no assigned generators/templates)

---
