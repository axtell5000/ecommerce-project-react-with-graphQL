import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionPage from './collection.component';
import Spinner from '../../components/spinner/spinner.component';

// A Note - getCollectionsByTitle is a prebuilt query that is created in the bak-end, one cant use any old name.
// it must already exist in the back end
const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }

`;

const CollectionPageContainer = ({match}) => (
  <Query query={GET_COLLECTION_BY_TITLE} variables={{ title: match.params.collectionId}}>
    {
      ({loading, data}) => {
        if (loading) return <Spinner />;
        
        const {getCollectionsByTitle} = data;
        return <CollectionPage collection={getCollectionsByTitle} />
      }
    }
  </Query>
);

export default CollectionPageContainer