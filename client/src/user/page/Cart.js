import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { removeFromCart, adjustQuantity } from '../../redux/reducer/Cart';
import placeholder from '../../asset/image/placeholder.png';
import Header from '../../shared/others/Header';
import { UserDetails } from '../../redux/reducer/User';
import Icon from 'react-native-vector-icons/FontAwesome';

const Cart = () => {
  const cartData = useSelector(state => state.cart.item_cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userData = useSelector(UserDetails);
  const [itemQuantity, setItemQuantity] = useState(1);
  var total = 0;
  cartData.forEach(element => {
    total += element.price * element.quantity;
  });

  return (
    <>
      <Header />
      {cartData.length !== 0 ? (
        <View style={{flex: 1, position: 'relative'}}>
          <SwipeListView
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            rightOpenValue={-80}
            disableRightSwipe={true}
            data={cartData}
            keyExtractor={item => item.product_id}
            renderItem={(cart, rowMap) => {
              return (
                <View style={styles.cartContainer}>
                  <Image style={{width: 45, height: 45}} source={placeholder} />
                  <Text style={styles.name}>{cart.item.name}</Text>
                  <View style={{marginLeft: 'auto'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: 'white',
                      }}>
                      <Pressable
                        onPress={() => {
                          if (cart.item.quantity > 1) {
                            dispatch(
                              adjustQuantity({
                                isIncrease: false,
                                product_id: cart.item.product_id,
                                itemQuantity: 1,
                                user_id: userData._id,
                              }),
                            );
                          } else {
                            console.log('LOWEST NUMBER');
                            dispatch(
                              removeFromCart({
                                product_id: cart.item.product_id,
                                user_id: userData._id,
                              }),
                            );
                            // prompt modal or error here
                          }
                        }}
                        style={{
                          borderWidth: 1,
                          borderColor: '#ccc',
                          padding: 5,
                          alignSelf: 'center',
                        }}>
                        <Icon
                          name="minus"
                          size={20}
                          style={{marginHorizontal: 5}}
                        />
                      </Pressable>
                      <View
                        style={{
                          flexDirection: 'column',
                          borderWidth: 1,
                          borderColor: '#ccc',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 20,
                            width: 40,
                            textAlign: 'center',
                            alignSelf: 'center',
                          }}>
                          {cart.item.quantity ? `${cart.item.quantity}x` : null}
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => {
                          if (cart.item.quantity < cart.item.quantity_stock) {
                            dispatch(
                              adjustQuantity({
                                isIncrease: true,
                                product_id: cart.item.product_id,
                                itemQuantity: 1,
                                user_id: userData._id,
                              }),
                            );
                          } else {
                            console.log('MAXIMUM NUMBER');
                            // prompt modal or error here
                          }
                        }}
                        style={{
                          borderWidth: 1,
                          borderColor: '#ccc',
                          padding: 5,
                          alignSelf: 'center',
                        }}>
                        <Icon
                          name="plus"
                          size={20}
                          style={{marginHorizontal: 5}}
                        />
                      </Pressable>
                    </View>
                  </View>
                  <Text style={styles.price}>
                    ₱{cart.item.quantity * cart.item.price}
                  </Text>
                </View>
              );
            }}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() =>
                    dispatch(
                      removeFromCart({
                        product_id: data.item.product_id,
                        user_id: userData._id,
                      }),
                    )
                  }>
                  <Icons name="trash" color={'white'} size={30} />
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.operationsContainer}>
            <Text style={styles.totalPrice}>₱{total}</Text>
            <Button
              title="Checkout"
              onPress={() => navigation.navigate('Cart Checkout')}
            />
          </View>
        </View>
      ) : (
        <View style={styles.noItemContainer}>
          <View style={styles.noItem}>
            <Text
              style={[
                styles.text,
                {
                  marginTop: 25,
                  fontWeight: 'bold',
                  fontSize: 14,
                },
              ]}>
              It seems no displayed items here...
            </Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 18,
                },
              ]}>
              Add items to your cart to get started.
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: 80,
  },
  // ------------
  cartContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  price: {
    marginLeft: 'auto',
    fontSize: 17,
    fontWeight: 'bold',
  },
  // -------------
  operationsContainer: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    height: 50,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  totalPrice: {
    marginRight: 'auto',
    fontSize: 17,
    fontWeight: 'bold',
  },
  // -------------
  noItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noItem: {
    width: '70%',
    height: '30%',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
  },
  text: {
    height: '30%',
    textAlignVertical: 'center',
    paddingHorizontal: 5,
    textAlign: 'center',
  },
});
