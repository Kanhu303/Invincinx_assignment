import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../Contants/Colors/Colors';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: [],
      loader: false,
      loading: false,
      footershow: true,
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData(moreData) {
    try {
      if (!moreData) {
        this.setState({
          loader: true,
        });
      }
      fetch(`https://reqres.in/api/users?page=${this.state.page}`)
        .then(res => res.json())
        .then(json => {
          console.log(json, 'json');
          if (json.data.length) {
            this.setState({
              data: [...this.state.data, ...json.data],
              loader: false,
              loading: false,
            });
          } else {
            alert('No More Data');
            this.setState({footershow: false, loader: false, loading: false});
          }
        });
    } catch (err) {
      alert('Developer Working on it');
      this.setState({footershow: false, loader: false, loading: false});
    }
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('ContactScreen', {item})}>
        <View style={styles.row}>
          <Image source={{uri: item.avatar}} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.first_name} {item.last_name}
                {'   '}
                {/* <Text style={{fontSize: 13}}>{'20:16'}</Text> */}
              </Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.email}</Text>
            </View>
          </View>
          <View>
            <AntDesign name="right" color={Colors.black} size={15} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  loadMore = () => {
    this.setState({page: this.state.page + 1, loading: true}, () =>
      this.getData('moreData'),
    );
  };
  renderFooter = () => {
    return (
      <View style={styles.footer}>
        {this.state.footershow ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.loadMore()}
            style={styles.loadMoreBtn}>
            <Text style={styles.btnText}>Load More</Text>
            {this.state.loading ? (
              <ActivityIndicator color="white" style={{marginLeft: 8}} />
            ) : null}
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.loader ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={Colors.blue} />
          </View>
        ) : (
          <FlatList
            ListFooterComponent={this.renderFooter}
            data={this.state.data}
            keyExtractor={item => {
              return item.id;
            }}
            renderItem={this.renderItem}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '400',
    color: '#222',
    fontSize: 16,
    width: 170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#777',
    fontSize: 13,
    marginLeft: 15,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});
