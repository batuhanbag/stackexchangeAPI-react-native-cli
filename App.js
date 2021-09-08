/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Item from './item';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      isRefresh: false,
      page: 1,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser(page = 1, isLoadMore = false) {
    this.setState({loading: true});
    setTimeout(() => {
      const url = `https://api.stackexchange.com/2.2/users?page=${page}&order=desc&sort=reputation&site=stackoverflow`;
      axios
        .get(url)
        .then(res => {
          const {data} = this.state;

          let newData = isLoadMore
            ? data.concat(res.data.items)
            : res.data.items;
          this.setState({
            page,
            data: newData,
            loading: false,
            isRefresh: false,
          });
        })
        .catch(e => alert(e));
    }, 1000);
  }

  _renderItem = ({item}) => {
    return <Item item={item}></Item>;
  };

  onRefresh = () => {
    this.setState({isRefresh: true});
    this.fetchUser();
  };

  loadMore = () => {
    const {page} = this.state;
    var newPage = page + 1;
    this.fetchUser(newPage, true);
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
    return <ActivityIndicator style={{color: 'red'}} />;
  };

  render() {
    const {data, loading, isRefresh} = this.state;
    return (
      <SafeAreaView>
        <FlatList
          data={data}
          numColumns={1}
          refreshControl={
            <RefreshControl refreshing={isRefresh} onRefresh={this.onRefresh} />
          }
          keyExtractor={(item, index) => index}
          renderItem={this._renderItem}
          ListEmptyComponent={() => (
            <View>
              <Text> Veri Yok </Text>
            </View>
          )}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.5}
          onEndReached={this.loadMore}></FlatList>
      </SafeAreaView>
    );
  }
}
