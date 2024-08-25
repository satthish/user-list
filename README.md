# Task Details

Task Details:

1. Create a table for user list.

2. Table  columns  - Name, email, Linkedin URL, Gender, Address, Edit

3. Table can be expandable, show the address when it is expanded.

4. Have a "ADD" button top right of the table and use a form to get the above user details.

5. Add necessary validations for the form fields.

6. Place an "Edit" button in each row under the Edit column.  Enable "EDIT" functionality by using the same form

7. Also include the delete option with confirmation pop-up before delete


## System Overview

The System is a simple user inteface with option to list , add, update and delete(CRUD). It is build using Next.js for the frontend and api, and json files for data and configurations. It involves a data grid for listing the data and a form for add and delete.

## Architechture

1. Frontend: Next.js / MUI (UI Components)
2. Data Management: Static JSON Files for both location and users data
3. Form Validation: Formik for forms and Yup for validation
4. State Management: Context Api for state management
5. Config: JSON config file for defining the rules and configurations

## Modules
- Data Management module: User & location api is created in `/api/cities` and `/api/users` end point with static data.
- User List Module: Displays the list of users with expandable rows for address details.
- User Form Module: Handles the addition and editing of users with validation.
- Config Module: Manages settings for form fields (e.g., character limits, editability).

## Steps to run

To install the packages
```npm install```
To run development version 
```npm run dev```
To build and start the production version
```npm run build```
```npm start```
