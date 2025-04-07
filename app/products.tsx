import { View, Text, Image, StyleSheet, ActivityIndicator, ImageBackground, TouchableOpacity } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { FlatList } from 'react-native-gesture-handler';
import { Colors } from '@/constants/Colors';
import Header from '@/components/Header';
import LottieView from 'lottie-react-native';
import { useCart } from '@/context/CartContext';
import { Ionicons } from '@expo/vector-icons';


const GET_PRODUCTS = gql`
  query search($input: SearchInput!) {
    search(input: $input) {
      totalItems
      items {
        sku
        productId
        productVariantId
        productName
        slug
        description
        score
        inStock
        productAsset {
          id
          preview
        }
        currencyCode
        price {
          ... on PriceRange {
            min
            max
          }
          ... on SinglePrice {
            value
          }
        }
        priceWithTax {
          ... on PriceRange {
            min
            max
          }
          ... on SinglePrice {
            value
          }
        }
        facetIds
        facetValueIds
        collectionIds
        backgroundImgCard {
          id
          preview
          width
          height
          source
          name
        }
        backgroundAnimationCard {
          id
          preview
          width
          height
          source
          name
        }
        productImg {
          id
          preview
          width
          height
          source
          name
        }
        customProductVariantMappings {
          packageSize
        }
        popularity
        badges {
          id
          position
          assetId
          asset {
            id
            name
            preview
            source
          }
          collection {
            id
            name
          }
        }
      }
      collections {
        collection {
          id
          name
          slug
          parentId
        }
        count
      }
      facetValues {
        facetValue {
          id
          name
          facet {
            id
            name
            code
          }
        }
        count
      }
      prices {
        range {
          min
          max
        }
        rangeWithTax {
          min
          max
        }
      }
    }
  }
`;

export default function Products() {

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      input: {
        term: "", // no search term
        collectionId: "2", // name of the collectionId
        facetValueIds: [], // filtering color, size etc
        facetValueFilters: [], // filtering color, size etc
        groupByProduct: true, // show product as groups
        sort: { popularity: "DESC" }, // sort after popularity, descending
        take: 24, // number of products to get
        skip: 0 // number of products to skip
      }
    }
  });

  const { addToCart } = useCart();

  const formatPriceString = (price: string) => `${(parseInt(price) / 100).toFixed(2)} kr`;

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>

  const getItemVisuals = (item: any) => {
    console.log("alla produkter", item);
    if (item.backgroundAnimationCard?.source != undefined) {
      return <View style={styles.itemImageBackground}>
        <LottieView
          autoPlay
          style={StyleSheet.absoluteFillObject}
          source={{ uri: item.backgroundAnimationCard.source }}
        >
        </LottieView>
        <Image source={{ uri: item.productImg?.source }} style={styles.image} />
      </View>
    }
    return <ImageBackground style={styles.itemImageBackground} source={{ uri: item.backgroundImgCard?.source }}>
      <Image source={{ uri: item.productImg?.source }} style={styles.image} />
    </ImageBackground>
  }

  return (
    <View style={styles.container}>
      <Header showBackButton={true} />
      <FlatList
        data={data.search.items}
        keyExtractor={(item) => item.productId?.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            {getItemVisuals(item)}
            <View style={styles.itemInfoContainer}>
              <Text style={styles.itemTitle}>{item.productName}</Text>
              <Text style={styles.itemPrice}>{formatPriceString(item.priceWithTax?.max)}</Text>
              <Text style={styles.itemDescription}>{item.customProductVariantMappings?.packageSize}st / förp.</Text>
            </View>
            <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
              <Ionicons name="add-outline" size={60} color={Colors.hemglassDeepBlue} />
            </TouchableOpacity>
          </View>

        )}></FlatList>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: Colors.hemglassBackgroundBlue,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 15,

  },
  itemImageBackground: {
    aspectRatio: 1,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%'
  },
  itemInfoContainer: {
    width: '100%',
    paddingTop: 15,
    alignItems: 'center',
  },
  itemTitle: {
    fontFamily: 'Burbank',
    color: Colors.hemglassDeepBlue,
    fontSize: 24,
    textAlign: 'center',
  },
  itemPrice: {
    fontFamily: 'Burbank',
    color: Colors.hemglassDeepBlue,
    fontSize: 18,
    textAlign: 'center'
  },
  itemDescription: {
    fontFamily: 'Burbank',
    color: Colors.hemglassDeepBlue,
    fontSize: 16,
    textAlign: 'center'
  },
  addToCartButton: {
    position: 'absolute',
    right: 15,
    bottom: 15
  }
})