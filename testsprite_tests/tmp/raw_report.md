
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** svitlo-webapp
- **Date:** 2026-03-16
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 Create a new organization from the dashboard sidebar and land on the new org settings page
- **Test Code:** [TC001_Create_a_new_organization_from_the_dashboard_sidebar_and_land_on_the_new_org_settings_page.py](./TC001_Create_a_new_organization_from_the_dashboard_sidebar_and_land_on_the_new_org_settings_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/13be2c78-4e7e-4d29-aeb5-b63280541cc5
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 View organization members list on settings
- **Test Code:** [TC002_View_organization_members_list_on_settings.py](./TC002_View_organization_members_list_on_settings.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/e7e4735c-91d8-4f4a-8d48-a86cdb0379fa
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003 Invite a member by email and see a new pending invitation
- **Test Code:** [TC003_Invite_a_member_by_email_and_see_a_new_pending_invitation.py](./TC003_Invite_a_member_by_email_and_see_a_new_pending_invitation.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/4a285eb5-eac3-4452-abbe-266d88276355
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005 Create a generator with runtime limits and warning threshold
- **Test Code:** [TC005_Create_a_generator_with_runtime_limits_and_warning_threshold.py](./TC005_Create_a_generator_with_runtime_limits_and_warning_threshold.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/8c0788f7-6c7c-4cc2-8293-497420c4dd2f
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 Create generator validation: required fields left blank
- **Test Code:** [TC006_Create_generator_validation_required_fields_left_blank.py](./TC006_Create_generator_validation_required_fields_left_blank.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/d013857d-a002-4832-8bc8-c33595e90b68
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010 Start and stop a live runtime session and verify it appears in history
- **Test Code:** [TC010_Start_and_stop_a_live_runtime_session_and_verify_it_appears_in_history.py](./TC010_Start_and_stop_a_live_runtime_session_and_verify_it_appears_in_history.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Stop button was clicked but the runtime history still shows an 'In progress' row for Mar 16, 2026 02:22 instead of a completed duration.
- No new history row with a duration corresponding to the recently stopped session was added to the Runtime history table.
- The runtime UI did not transition the session from 'In progress' to a completed entry after the Stop action.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/2bb7e39e-9564-4daf-844f-b6eb0eac3989
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011 Live session shows an increasing elapsed time counter while running
- **Test Code:** [TC011_Live_session_shows_an_increasing_elapsed_time_counter_while_running.py](./TC011_Live_session_shows_an_increasing_elapsed_time_counter_while_running.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/2fdf5cc0-bdd6-44ba-9664-7ee3ed9941ca
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC013 Log a manual past session and verify it appears in session history with duration
- **Test Code:** [TC013_Log_a_manual_past_session_and_verify_it_appears_in_session_history_with_duration.py](./TC013_Log_a_manual_past_session_and_verify_it_appears_in_session_history_with_duration.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/f836edd0-4f01-4a29-86d4-911a6418057b
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC014 Manual session validation: stop time earlier than start time shows an error and does not save
- **Test Code:** [TC014_Manual_session_validation_stop_time_earlier_than_start_time_shows_an_error_and_does_not_save.py](./TC014_Manual_session_validation_stop_time_earlier_than_start_time_shows_an_error_and_does_not_save.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/2bee2076-4647-43f1-8216-6bf2093049e7
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC015 Prevent starting a session when generator status is resting (error shown)
- **Test Code:** [TC015_Prevent_starting_a_session_when_generator_status_is_resting_error_shown.py](./TC015_Prevent_starting_a_session_when_generator_status_is_resting_error_shown.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Authentication requests failed: 'Failed to fetch' error is displayed after Sign In and Sign Up submissions.
- Sign In and Sign Up buttons were clicked multiple times (Sign In clicked 2 times, Sign Up clicked 2 times) without successful authentication or redirect.
- Dashboard or generator list could not be accessed because authentication did not complete.
- Unable to start a generator session or verify the required 'Resting' warning because the user is not authenticated and network requests are failing.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/6ce8e145-4295-41f9-b928-94646e1127c6
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC016 Open organization dashboard and verify generator status indicators and active session card are visible
- **Test Code:** [TC016_Open_organization_dashboard_and_verify_generator_status_indicators_and_active_session_card_are_visible.py](./TC016_Open_organization_dashboard_and_verify_generator_status_indicators_and_active_session_card_are_visible.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/28252b33-15f5-4017-9918-d78c26324dc7
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC017 From attention required alert, navigate to generator detail page
- **Test Code:** [TC017_From_attention_required_alert_navigate_to_generator_detail_page.py](./TC017_From_attention_required_alert_navigate_to_generator_detail_page.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- No interactive alert item found in the 'Attention Required' section to click.
- The 'All clear' entry is rendered as non-interactive text, preventing verification of routing behavior.
- Unable to validate that clicking an attention-required alert routes to a generator detail page because there is no clickable alert element present.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/cfb97125-0e27-40cf-a883-cabf249a7deb
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC019 Warning indicator: click warning/attention item and verify generator detail displays warning state
- **Test Code:** [TC019_Warning_indicator_click_warningattention_item_and_verify_generator_detail_displays_warning_state.py](./TC019_Warning_indicator_click_warningattention_item_and_verify_generator_detail_displays_warning_state.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/fa040192-2ec3-41fb-8b08-e66d6c4fa454
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC022 Sync/status computation error: surface error message that generator status cannot be determined
- **Test Code:** [TC022_Syncstatus_computation_error_surface_error_message_that_generator_status_cannot_be_determined.py](./TC022_Syncstatus_computation_error_surface_error_message_that_generator_status_cannot_be_determined.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Error banner for generator status failure ('cannot be determined' message) not found on the dashboard.
- The text "cannot be determined" is not present on the page.
- The text "sync" is not present; the page shows "All changes synced" (no 'sync' error state message found).
- No UI element indicating generator status could not be computed due to sync issues was found.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/c9754285-8823-40fe-8b1a-99632c7eb759
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC023 Create a recurring run-hours maintenance template and verify it appears with due status indicators
- **Test Code:** [TC023_Create_a_recurring_run_hours_maintenance_template_and_verify_it_appears_with_due_status_indicators.py](./TC023_Create_a_recurring_run_hours_maintenance_template_and_verify_it_appears_with_due_status_indicators.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/b68ee7a8-a975-4f78-9abb-c9492680ae1f
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC025 Create a whichever-first (both) maintenance template and verify it appears
- **Test Code:** [TC025_Create_a_whichever_first_both_maintenance_template_and_verify_it_appears.py](./TC025_Create_a_whichever_first_both_maintenance_template_and_verify_it_appears.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/629f3ca5-ae8e-4d09-8fab-77b90db94a4a
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC026 Record maintenance completion with notes and verify record appears in history
- **Test Code:** [TC026_Record_maintenance_completion_with_notes_and_verify_record_appears_in_history.py](./TC026_Record_maintenance_completion_with_notes_and_verify_record_appears_in_history.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- No generators assigned to the user: 'My Generators' displays 'No generators assigned to you'.
- No maintenance tasks configured: 'Upcoming Maintenance' displays 'No maintenance tasks configured'.
- Maintenance record cannot be created because there are no maintenance templates or generator items available to record against.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/e1ac38da-f58b-44d7-b55e-cf97079078b6
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC027 Generate AI maintenance suggestions and accept one to save a maintenance template
- **Test Code:** [TC027_Generate_AI_maintenance_suggestions_and_accept_one_to_save_a_maintenance_template.py](./TC027_Generate_AI_maintenance_suggestions_and_accept_one_to_save_a_maintenance_template.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/6ed9e855-b107-468c-8680-5dc51e947ce5
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC028 AI suggestions appear after generating and can be reviewed
- **Test Code:** [TC028_AI_suggestions_appear_after_generating_and_can_be_reviewed.py](./TC028_AI_suggestions_appear_after_generating_and_can_be_reviewed.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Submit sign-in request failed due to network error: 'Failed to fetch' is displayed on the sign-in page
- Authentication did not complete; AI suggestions could not be requested because login was unsuccessful
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/77e3f309-9d95-483d-af4d-d8702bf6ae0c
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC029 Accepting an AI suggestion creates a maintenance template visible after save
- **Test Code:** [TC029_Accepting_an_AI_suggestion_creates_a_maintenance_template_visible_after_save.py](./TC029_Accepting_an_AI_suggestion_creates_a_maintenance_template_visible_after_save.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- 'Failed to get AI suggestions. Please try again.' message is displayed in the Create Generator modal, preventing AI suggestions from being accepted.
- No AI-generated maintenance tasks were added to the Maintenance Tasks list in the modal.
- The generator could not be saved with AI suggestions because the suggestions were not generated.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/7b5d9219-7a7a-4e60-bc1d-d3571f23754d
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC034 Admin assigns an organization member to a generator and sees them in the assigned list
- **Test Code:** [TC034_Admin_assigns_an_organization_member_to_a_generator_and_sees_them_in_the_assigned_list.py](./TC034_Admin_assigns_an_organization_member_to_a_generator_and_sees_them_in_the_assigned_list.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/6715c915-cda3-4aa8-b7e0-66dc114a51fa
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC035 Admin completes assignment confirmation and verifies assigned member appears
- **Test Code:** [TC035_Admin_completes_assignment_confirmation_and_verifies_assigned_member_appears.py](./TC035_Admin_completes_assignment_confirmation_and_verifies_assigned_member_appears.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/47810af2-ec08-43cc-b640-9eb34d9aa007
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC036 Admin sees assigned member in list after assignment is confirmed
- **Test Code:** [TC036_Admin_sees_assigned_member_in_list_after_assignment_is_confirmed.py](./TC036_Admin_sees_assigned_member_in_list_after_assignment_is_confirmed.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/bfb16230-a56d-4434-8770-b8ccafe0176c
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC037 Admin unassigns an employee with confirmation and employee is removed from list
- **Test Code:** [TC037_Admin_unassigns_an_employee_with_confirmation_and_employee_is_removed_from_list.py](./TC037_Admin_unassigns_an_employee_with_confirmation_and_employee_is_removed_from_list.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/7496cabb-cd94-4d12-86c2-e173b88fe5ba
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC040 Non-admin cannot assign members and sees admin-only permission error
- **Test Code:** [TC040_Non_admin_cannot_assign_members_and_sees_admin_only_permission_error.py](./TC040_Non_admin_cannot_assign_members_and_sees_admin_only_permission_error.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Permission error message not displayed after clicking the 'Assign' button; no error banner or inline message referencing 'admin' or 'permission' is visible on the page.
- A member selection dialog was shown instead of a permission denial, indicating the assignment UI was reachable rather than blocked for this non-admin user.
- No visible text matching 'admin' was found on the page after attempting the assign action.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/42646c6e-b7e2-40ce-98f6-aad2f67c4fa2
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC042 Stop an active runtime session from the dashboard active session card
- **Test Code:** [TC042_Stop_an_active_runtime_session_from_the_dashboard_active_session_card.py](./TC042_Stop_an_active_runtime_session_from_the_dashboard_active_session_card.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/a01dad04-5c14-4e40-816b-7a0c198376af
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC044 Upcoming maintenance list is shown and ranked by urgency
- **Test Code:** [TC044_Upcoming_maintenance_list_is_shown_and_ranked_by_urgency.py](./TC044_Upcoming_maintenance_list_is_shown_and_ranked_by_urgency.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/f6318ece-d72c-42de-ab83-12128bd59b32
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC045 Open a maintenance item and navigate to the generator detail page
- **Test Code:** [TC045_Open_a_maintenance_item_and_navigate_to_the_generator_detail_page.py](./TC045_Open_a_maintenance_item_and_navigate_to_the_generator_detail_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/d8e5c726-b6ff-4030-99d1-63623b20f4d1
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC047 Navigate to generator detail by clicking a generator in the dashboard list
- **Test Code:** [TC047_Navigate_to_generator_detail_by_clicking_a_generator_in_the_dashboard_list.py](./TC047_Navigate_to_generator_detail_by_clicking_a_generator_in_the_dashboard_list.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/14af6d42-02a6-46d5-883d-3829ca22f216
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC050 Switch organization from sidebar dropdown updates dashboard context
- **Test Code:** [TC050_Switch_organization_from_sidebar_dropdown_updates_dashboard_context.py](./TC050_Switch_organization_from_sidebar_dropdown_updates_dashboard_context.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4df61117-2355-471e-b2a4-1a0ade66e64b/090aa153-7428-433b-8b11-36bba61f0d43
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **73.33** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---