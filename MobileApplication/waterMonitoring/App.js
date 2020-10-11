import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Image, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements';
import axios from "axios"

const model = async (temp, ph, setAns) => {
  console.log("temp, ph")
  console.log(temp, ph)
  var url = `https://watertensorflow.herokuapp.com/${temp}/${ph}`
  axios.get(url).then(data => {
    console.log(data.data.ans)
    setAns(data.data.ans)
  })
}

const fetchData = async (setTemp, setPh, setAns, t, p, setActivity) => {
  setActivity(1)
  const temp = "https://api.thingspeak.com/channels/1171829/fields/1.json?api_key=EQMSTCUEFF2GMM76&results=2"
  const ph = "https://api.thingspeak.com/channels/1171829/fields/2.json?api_key=EQMSTCUEFF2GMM76&results=2"
  var getTemp = await axios.get(temp)
  var getPH = await axios.get(ph)
  getTemp.data.feeds.forEach(data => {
    if (data.field1 !== null) {
      setTemp(data.field1)
      t = data.field1
    }
  })
  getPH.data.feeds.forEach(data => {
    if (data.field2 !== null) {
      setPh(data.field2)
      p = data.field2
    }
  })
  await model(t, p, setAns)
  setActivity(0)
}

const staticData = async (t, p, setAns,setActivity) => {
  setActivity(1)
  console.log(typeof (t))
  if (parseFloat(t) <= 0 || parseFloat(p) <= 0) {
    alert("Please enter valid Temp and Ph")
    setAns(0)
    return
  }
  else {
    setTimeout(()=>{}, 3000)
    console.log("hello ji")
    await model(t, p, setAns)
    setActivity(0)
  }
}

export default function App() {
  const [temp, setTemp] = useState(0);
  const [Ph, setPh] = useState(0);
  const [tempStatic, setTempStatic] = useState(0);
  const [PhStatic, setPhStatic] = useState(0);
  const [ans, setAns] = useState(0);
  const [activity, setActivity] = useState(0);
  return (
    activity === 0 ?
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Image
            source={require("./assets/fish.png")}
            style={{ height: 150, width: 150 }}
          />
          <Text style={{ fontSize: 30, color: 'white', paddingBottom: 20 }}>Water Monitoring</Text>
          <View style={{ display: 'flex', flexDirection: 'row', paddingBottom: 20 }}>
            <Text style={{ fontSize: 20, color: 'white', paddingRight: 10 }}>Temp:  {temp}</Text>
            <Text style={{ fontSize: 20, color: 'white' }}>PH:  {Ph}</Text>
          </View>
          <Button
            title="Fetch and Calculate D.O."
            onPress={() => { fetchData(setTemp, setPh, setAns, temp, Ph, setActivity) }}
          />
          <View style={{ width: 350, paddingTop: 10 }}>
            <Input
              placeholder="Temp"
              onChangeText={value => setTempStatic(value)}
              inputStyle={{ color: 'white' }}
            />
            <Input
              placeholder="Ph"
              inputStyle={{ color: 'white' }}
              onChangeText={value => setPhStatic(value)}
            />
          </View>
          <Text style={{ fontSize: 20, color: 'white', paddingBottom: 10 }}>Answer:  {ans}</Text>
          <Button
            title="Calculate D.O"
            onPress={() => { staticData(tempStatic, PhStatic, setAns, setActivity) }}
          />
          <View style={{ alignItems: 'center', paddingTop: 50 }}>
            <Text style={{ fontSize: 10, color: 'white' }}>Submitted to : Dr. Munesh Pal Singh</Text>
            <Text style={{ fontSize: 10, color: 'white' }}>By : Tarun Kantiwal</Text>
          </View>
        </View>
      </TouchableWithoutFeedback >
      :
      <View style={{flex:1, alignItems:"center", justifyContent: 'center', backgroundColor: 'black'}}>
        <Text style={{color: 'whitesmoke', fontSize: 40, paddingBottom: 10}}>Please Wait</Text>
        <Text style={{color: 'whitesmoke', paddingBottom: 50, fontSize: 20}}>Getting You Calculation Done...</Text>
        <ActivityIndicator size="large" color="#00ff00"/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingTop: 50
  },
});
