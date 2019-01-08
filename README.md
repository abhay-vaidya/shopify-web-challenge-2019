# Toronto Waste Lookup
## Shopify Web Engineer Intern Challenge - Summer 2019

App deployed via Heroku can be accessed here: https://abhay-shopify-2019.herokuapp.com/

### Instructions from Shopify
- Reproduce the design as provided in the [screenshot](http://cdn.shopify.com/static/web-eng-challenge-summer-2019/design.png), which displays example search results.
- The data must be taken from the [Waste Wizard Lookup data (JSON)](https://www.toronto.ca/city-government/data-research-maps/open-data/open-data-catalogue/#5ed40494-a290-7807-d5da-09ab6a56fca2).
- Typing in the search field should *NOT* perform an API call.
- A search must be performed when hitting enter or clicking the search button.
- When the search input field is cleared, the list of results should also be cleared. 
- Performing a search should render a list of potential matching items based on keywords. Each item should:
   - Render the title and description of the item.
   - Render a grey star button *if the item is not already favourited*.
   - Render a green star icon *if the item is not already favourited*.
   - Clicking the star button should add the item to the favourites list.
- When the number of favourites is more than one, the app should render a list of items. Each saved item should:
   - Render the title and description of the item.
   - Render a green star button *if the item has been favourited*.
   - Clicking the green star button should remove the item from the saved list.

### Requirements
`Node 8.10.0` or later

### Environment Variables
You will need the following environment variables to serve the app:

|           Key          |              Suggested Value              |             Description             |
|:----------------------:|:-----------------------------------------:|:-----------------------------------:|
| `REACT_APP_API_BASE`   | `https://secure.toronto.ca/cc_sr_v1/data` | The Waste Wizard Lookup Data source |
| `REACT_APP_ITEM_LIMIT` | `1000`                                    | Item limit for data source          |


### Running locally
1. `npm install`
2. `npm run start` to begin the application on port `3000`

### Running Tests
`npm run test`

### Assumptions
The instructions state:
> Performing a search should render a list of potential matching items based on keywords

Each item in the data source contains a list of words/phrases separated by commas. I am assuming each "keyword" here is the word or phrase separated by the comma. You must search for the exact keyword or phrase to get results (i.e. rope, vacuum cleaner, etc.) in this current implementation.

### Implementation
###### Node.js, React, Redux, TypeScript, Jest

Since the Waste Wizard Lookup Data is a data-dump and not a typical API that accepts query parameters, I chose to download the data when the main App component loads, which is at the beginning. This raw data is transformed and stored in Redux, where it can be accessed by the various components in the application. When the user submits a query, the app performs a search through the stored data to find matches by keyword. Managing favourites is also handled via Redux.
