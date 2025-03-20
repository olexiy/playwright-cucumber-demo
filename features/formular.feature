# language: en
Feature: Form Handling
  As a user
  I want to interact with text-box forms
  So that I can submit my information correctly

  @form @smoke
  Scenario: Fill and submit a complete user details form
    Given I navigate to the text-box demo page
    When I fill out the form with following details:
      | Full Name          | John Doe                         |
      | Email              | john.doe@example.com             |
      | Current Address    | 123 Main Street, City, Country   |
      | Permanent Address  | 456 Second Avenue, Town, Country |
    And I submit the form
    Then I should see all my information displayed correctly

  @form
  Scenario: Verify form submission with only name and email
    Given I navigate to the text-box demo page
    When I fill in "John Smith" as my full name
    And I fill in "john.smith@example.com" as my email
    And I submit the form
    Then I should see my name "John Smith" displayed in the output
    And I should see my email "john.smith@example.com" displayed in the output

  @form @validation
  Scenario: Verify email validation on the form
    Given I navigate to the text-box demo page
    When I fill in "Jane Doe" as my full name
    And I fill in "invalid-email" as my email
    And I submit the form
    Then I should see email validation errors 