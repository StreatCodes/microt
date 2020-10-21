# Microt
Does testing need a giant framework? Just write your test in JS and be done with it.

## Usage
`npx microt test/` Microt will import any `.js` files and execute any exported methods starting with `test`. Exits when a test fails printing the stacktrace.

## Caveats / TODO
 - Currently no way to do setup/teardown
 - Tests run in alphabetical order
 - No way to filter by specific test
 - No help/usage output