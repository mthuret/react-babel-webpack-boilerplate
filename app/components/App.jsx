import React from 'react';
import {InstantSearch, Index, Hits, SearchBox, Configure} from 'react-instantsearch/dom';
import Autosuggest from 'react-autosuggest';
import { connectAutoComplete } from 'react-instantsearch/connectors';

require('./App.css');


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
       <InstantSearch
        appId="latency"
        apiKey="6be0576ff61c053d5f9a3225e2a90f76"
        indexName="ikea"
      >
        <AutoComplete />
        <Configure hitsPerPage={1} />
        <Index indexName="bestbuy" />
        <Index indexName="airbnb" />
      </InstantSearch>
    );
  }
}

const AutoComplete = connectAutoComplete(
  ({ hits, currentRefinement, refine }) =>
    <Autosuggest
      suggestions={hits}
      multiSection={true}
      onSuggestionsFetchRequested={({ value }) => refine(value)}
      onSuggestionsClearRequested={() => refine('')}
      getSuggestionValue={hit => hit.name}
      renderSuggestion={hit =>
        <div>
          <div>{hit.name}</div>
        </div>}
      inputProps={{
        placeholder: 'Type a product',
        value: currentRefinement,
        onChange: () => {},
      }}
      renderSectionTitle={section => section.index}
      getSectionSuggestions={section => section.hits}
    />
);

