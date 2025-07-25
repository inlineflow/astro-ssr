### React Day Picker Input Fields

Fix input field within the calendar
[docs](https://daypicker.dev/guides/input-fields)

### Convenient and obvious selection of employee and service

Employees should have avatars next to their names. Services should be colored based on type.

Only available services for the selected employee and vice verca should be selectable. All non selectable elements should have lower opacity.

### Rework pickers

Make your own component for selecting services/employees

### Add service icons with fallback to employee picker

Add fallback

### Add i18n

### Add admin page

### Restyle pickers so they look good

### Use the Avatar component for the Employee Avatar in employee picker. Use suspense, and TanStack Query if you need to.

### Consider using Js Date.toISOString instead of parsing to Luxon DateTime and then DateTime.toISOString

### Consider moving the employee provider higher into the form

### Check if timeblocks correctly generate the blocks (seems like it generates too few)

# Rework timeblocks to accept the current service and re-render to show available blocks

# Fix timeblocks to reset the selection to none on re-render

# Fix timeblocks error message squishing the square placeholder
