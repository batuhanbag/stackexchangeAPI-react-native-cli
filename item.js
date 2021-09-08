import React from 'react';
import {Text,View,TouchableOpacity,Image,StyleSheet} from 'react-native';

const Item = ({item}) => {
    return(
        <View style={style.card}>
            

            
          <Image style={style.avatar} source={{uri:item.profile_image}} />
          <View>
            <Text style={{color:'red',marginLeft:10,fontWeight:"700"}}>{item.display_name}</Text>
            <Text style={style.location}>{item.location}</Text>
            <Text style={style.web}>{item.website_url}</Text>
            
          </View>
          
          
          
            
        </View>

    )
}

const style = StyleSheet.create({
    card:{
        flex:1,
        padding:10,
        paddingVertical:15,
        backgroundColor:'#ddd',
        marginBottom:5,
        borderBottomWidth:1,
        borderColor:'white',
        flexDirection:'row',
        
        
    },
    avatar:{
        borderRadius:50,
        width:60,
        height:60,
        borderWidth:2,
        borderColor:'black',
        
    },
    location:{
        marginLeft:10
    },
    web:{
        marginLeft:10,
        
    }
})



export default Item;