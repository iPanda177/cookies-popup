import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";

const GET_SHOP_INFO = `
 query shopInfo {
  shop {
    id 
    metafields(first:10){
      nodes {
        namespace
        id
        key
        value
      }
    }
  }
 } 
`;

const CREATE_SHOP_METAFIELD = `
mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
  metafieldsSet(metafields: $metafields) {
    metafields {
      namespace
      ownerType
      key
      value
    }
    userErrors {
      field
      message
    }
  }
}
`;

// Use these as arguments for the function below
// {key, namespace, ownerId, type, value}

export default async function createMetafield(session) {
  console.log("Session from create metafield", session);
  const graphqlClient = new shopify.api.clients.Graphql({ session });

  try {
    const shopInformation = await graphqlClient.query({
      data: {
        query: GET_SHOP_INFO,
      },
    });

    const shopId = shopInformation.body.data.shop.id;

    if (shopId) {
      const createdMetafield = await graphqlClient.query({
        data: {
          query: CREATE_SHOP_METAFIELD,
          variables: {
            metafields: {
              key: "country_locale",
              namespace: "country",
              ownerId: shopId,
              type: "single_line_text_field",
              value: "US",
            },
          },
        },
      });

      console.log(
        "CreatMetafield is",
        createdMetafield.body.data.metafieldsSet.metafields
      );
    }

    console.log("Shop id is", shopInformation.body.data.shop.id);
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}
