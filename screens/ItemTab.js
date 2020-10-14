import React from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API, graphqlOperation } from 'aws-amplify';
import * as Query from '../src/graphql/queries'
import { Card, Button } from 'react-native-elements';
//native-baseがエラーが出てコンパイルできないため一旦react-native-elementsを使うことにする
//import { Container, Content, Card, CardItem } from 'native-base';
//import axios from 'axios';

export default class ItemTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        }
    }

    static navigationOptions = ({navigation}) => ({
        title: 'アイテム',
        headerLeft: () => <Icon name="bars" size={24} onPress={()=>{navigation.openDrawer()}} style={{paddingLeft: 20}}/>,
        headerRight:() => <Icon name='search' size={24} onPress={() => {navigation.navigate('SearchConditionModal')}} style={{paddingRight: 20}}/>
    });

    componentDidMount() {
        this.fetchItems();
    }

    //propsでアイテム情報が渡ってきた場合はそれをstateにそれ以外の時は全てのアイテムを取得する
    fetchItems = async () => {
        try {
            const res = await API.graphql(graphqlOperation(Query.searchItems, {}))
            console.log(res)
            this.setState({items: res.data.searchItems.items})
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        return (
            //iphoneXにも対応するViewの生成
            //<SafeAreaView>
            <ScrollView style={{flex: 1}}>
                {this.state.items.map((ele, i) => {
                    return <Card key={i}>
                        <Card.Title>{ele.name}</Card.Title>
                        <Card.Divider/>
                        <Card.Image style={styles.image} source={{ uri: ele.image_url }} />
                        <View key={i}>
                            <Text>{ele.size}</Text>
                            <Button title='press me for detail' onPress={() => this.props.navigation.navigate('ItemDetail', { item: ele })}/>
                        </View>
                    </Card>
                })}
            </ScrollView>
            //</SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        width: 220,
        height: 220
    },
    image: {
        width: 200,
        height: 200,
        overflow: 'hidden'
    }
})
