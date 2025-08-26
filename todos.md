# React Day Picker Input Fields

Fix input field within the calendar
[docs](https://daypicker.dev/guides/input-fields)

### Rework pickers

Make your own component for selecting services/employees

### Add admin page

### Restyle pickers so they look good

### Use the Avatar component for the Employee Avatar in employee picker. Use suspense, and TanStack Query if you need to.

### Consider using Js Date.toISOString instead of parsing to Luxon DateTime and then DateTime.toISOString

### Consider moving the employee provider higher into the form

### Re-factor the form to load the skeleton instantly and load up employees and services after using TanStack Query and Suspense (research if TanStack Query is actually necessary)

# Rework timeblocks to accept the current service and re-render to show available blocks

# Localize calendar to KG

# Add localization to KG

# Make the brands view on larger screens a grid of items

# Add search to brands view (should call the backend)

# Consider if using Suspense in the Form is a good idea

# Make the language picker look good

# Remove hidden inputs and adjust labels accordingly

The standard way of integrating shadcn/ui DatePicker with react-hook-form via FormField and Controller is the correct and highly accessible approach. It leverages the built-in accessibility features of react-day-picker, shadcn/ui's components, and react-hook-form's robust form management, without needing redundant hidden inputs. Focus instead on ensuring you:

Provide a clear FormLabel.

Handle validation and display FormMessage appropriately.

Ensure the button that triggers the date picker has an accessible label if its visual content isn't sufficient (e.g., using aria-label if it's just an icon).

# Refactor MSW mocks, load testing data from JSON

# Rework top-nav: replace brand with Locations (named like Search or Services) and put the brand nav from each owned location

Don't make brand the first thing the user sees, it should be a bit more hidden.

The user should be able to search by service in an area close to them, if they allow us to get geodata.

Move search to location/index.astro

# Consider changing employee title/role to a tag based system for i18n purposes

# Add sheet search for mobile

# Expand Service type to show how long the procedure takes and show the cost

<!-- # Add api to api url and calls -->

<!-- # Fix separator spacing --- change card gap -->

# Make good styles for the location dialog

# Consider allowing multiple location types per location and tie location services to location types, then out of all possible services for a given location type store the services a location actually provides.

This way it will be easier to filter, because a single location could be found both by type (generic) and specific services that it offers (specific).

# Implement dashboard with a collapsible sidebar, on mobile toggle the sidebar via hamburger menu

# Check this out for navbar

https://www.shadcnblocks.com/block/navbar1

# Add autocomplete to forms

https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands/

# consider fetching locataion type metadata to store location type value in location type picker

# finish selection of multiple location types for a location

perhaps derive them from picked services

improve dashboard

# implement the location edit page

make the LocationCreateForm React component take in a filled-in location as the optional argument, in order to make the edit and create use the same code

# store location address at [lat, lng] combination, look up address name at runtime (optionally cash results for some time in case user has poor network connection)

# update validations for nominatim data, consider which fields are truly necessary and how to prompt the user to pick a different address

also allow an escape hatch for inputting the address string manually (lat and long should still be picked on the map)

# fix all errors in location form and make services have UUIDs

# start storing provided services in location form

# re organize all the type stuff

# consider moving MSW to an astro integration

# fetch location types and ltToServices from API (locationTypes should be cached on the API at startup)

# fetch services on the client

### Add auth
