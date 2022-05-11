import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  ActivityIndicator
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../Contants/Colors/Colors';
export default class ContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loader: false,
    };
  }
  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    try {
      this.setState({loader: true});
      fetch(`https://reqres.in/api/users/${this.props.route.params.item.id}`)
        .then(res => res.json())
        .then(json => {
          console.log(json, 'json');
          this.setState({data: json.data, loader: false});
        });
    } catch (err) {
      alert('Developer Working on it');
      this.setState({loader: false});
    }
  };
  goback = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <ScrollView bounces={false} style={styles.container}>
        {this.state.loader ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={Colors.blue} />
          </View>
        ) : (
          <>
            {/* <View style={{marginTop: Platform.OS === 'ios' ? '9%' : '0%'}}>
          <AntDesign name="left" color={Colors.black} size={15} />
        </View> */}
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#ec5a36', '#e67722', '#f29a37']}
              style={styles.header}>
              <View style={styles.headerContent}>
                <View
                  style={{
                    marginTop: Platform.OS === 'ios' ? '9%' : '0%',
                    // backgroundColor: 'blue',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      marginLeft: 20,
                      marginTop: 10,
                    }}>
                    <AntDesign
                      onPress={() => this.goback()}
                      name="arrowleft"
                      color={Colors.white}
                      size={20}
                    />
                  </View>
                </View>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: this.state.data?.avatar,
                  }}
                />

                <Text style={styles.name}>
                  {this.state.data?.first_name} {this.state.data?.last_name}
                </Text>
                <Text style={styles.email}>{this.state.data.email}</Text>
              </View>
            </LinearGradient>
            <View style={{top: -25, zIndex: 100, elevation: 5}}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#d55d83', '#ba62de', '#ba62de']}
                style={styles.smallgradient}>
                <View style={{flexDirection: 'row', padding: 8}}>
                  <TouchableOpacity
                    onPress={() => this.goback()}
                    activeOpacity={0.8}
                    style={styles.backiconStyleSmall}>
                    <AntDesign
                      name="arrowleft"
                      color={Colors.black}
                      size={20}
                    />
                  </TouchableOpacity>
                  <View style={styles.backiconStyleSmall2}>
                    <Text style={styles.backHome}>Back to {'\n'} Home</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            <View style={{margin: 20}}>
              <Text style={styles.accountInfo}>Account Info</Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign name="user" color={'#d55d83'} size={25} />
                <View style={{marginLeft: 10}}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: Colors.black,
                    }}>
                    Name
                  </Text>
                  <Text
                    style={{fontSize: 13, fontWeight: 'bold', color: 'gray'}}>
                    {this.state.data?.first_name} {this.state.data?.last_name}
                  </Text>
                </View>
              </View>
              {/* <View style={{flexDirection: 'row', alignItems: 'center',marginTop:20}}>
            <AntDesign name="user" color={'#d55d83'} size={25} />
            <View style={{marginLeft:10}}>
              <Text style={{fontSize:15,fontWeight:'bold',color:Colors.black}}>Name</Text>
              <Text style={{fontSize:13,fontWeight:'bold',color:'gray'}}>{this.state.data?.support?.text} {this.state.data?.last_name}</Text>
            </View>
          </View> */}
            </View>
          </>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#DCDCDC',
  },
  detailsText: {
    fontSize: 15,
  },
  accountInfo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backHome: {
    fontSize: 10,
    color: Colors.white,
    fontWeight: 'bold',
  },
  email: {
    color: Colors.white,
  },
  smallgradient: {
    width: '70%',
    alignSelf: 'center',
    borderRadius: 40,
  },
  backiconStyleSmall: {
    backgroundColor: Colors.white,
    borderRadius: 50 / 2,
    width: '10%',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backiconStyleSmall2: {
    // backgroundColor: Colors.white,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    // padding: 30,
    alignItems: 'center',
    marginBottom: 50,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    // borderWidth: 4,
    // borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: Colors.white,
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    color: '#778899',
    fontWeight: '600',
  },
  body: {
    backgroundColor: '#778899',
    height: 500,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: '#FFFFFF',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});
