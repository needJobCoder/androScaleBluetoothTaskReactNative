import { View, Text, Touchable, TouchableOpacity, PermissionsAndroid, Alert, FlatList } from 'react-native'
import React, { useState } from 'react'
import RNBluetoothClassic, {
  BluetoothDevice
} from 'react-native-bluetooth-classic';


const requestAccessFineLocationPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Access fine location required for discovery',
      message:
        'In order to perform discovery, you must enable/allow ' +
        'fine location access.',
      buttonNeutral: 'Ask Me Later"',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK'
    }
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

const requestBluetoothScanPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the bluetooth');
    } else {
      console.log('Bluetooth scan permission failed');

    }
    return granted;
  } catch (err) {
    console.warn(err);
  }
};


const requestBluetoothConnectPermission = async () => {
  try {
    // Request Bluetooth connect permission
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: 'Bluetooth Permission',
        message: 'This app needs access to your Bluetooth.',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Bluetooth connect permission granted');
      // You can proceed with Bluetooth operations here
    } else {
      console.log('Bluetooth connect permission denied');
      // Handle the case where permission is denied
    }
    return granted;
  } catch (error) {
    console.warn('Error requesting Bluetooth connect permission:', error);
  }
};

const DiscoveredDevice = ({item}) => {
  if(typeof item === 'undefined')
  {
    return <Text>Null</Text>
  }
  else
  {
    return (
      <View>
        <Text style={{color:'grey'}}>Address</Text>
        <Text style={{color:'grey'}}>{item.address}</Text>
      </View>
    )
  }
}

const RenderDiscoveredBluetoothDevices = ({data=[]}) => {
  

  
  return (<View style={{ flex: 1}}>   
    <FlatList data={data} renderItem={({item})=> {
    return <DiscoveredDevice item={item} />
  }} />
    </View>
  
  )
}

const Bluetooth = () => {
  const StopDiscovery = async () => {
    try {
      const cancelled = await RNBluetoothClassic.cancelDiscovery();
      if (cancelled) {
        Alert.alert("Discovey Stopped")
        console.log(discoveredDevices);

      }
      else {
        Alert.alert("Something wrong happened with cancel discovery")
      }
    } catch (error) {
      Alert.alert("Something wrong happened with cancel discovery")
    }
  }

  const [discoveredDevices, setDiscoveredDevices] = useState<any>([]);
  return (
    <View style={{flex:1}}>
      <TouchableOpacity onPress={async () => {

        try {

          const isBluetoothEnabled = await RNBluetoothClassic.isBluetoothEnabled();
          if (isBluetoothEnabled === true) {
            const granted = await requestAccessFineLocationPermission();
            console.log(granted);


            if (granted) {
              const bluetoothScanPermission = await requestBluetoothScanPermission()
              const bluetoothConnectPermission = await requestBluetoothConnectPermission();
              console.log(bluetoothScanPermission);

              if (bluetoothScanPermission  && bluetoothConnectPermission) {
                try {
                  const unpaired = await RNBluetoothClassic.startDiscovery();
                  setDiscoveredDevices(unpaired)
                  console.log(discoveredDevices);
                }
                catch (error) {
                  Alert.alert(`${error}`)
                }

              }


            }



          }

        }
        catch (error) {
          console.log(error);

        }
      }}>
        <Text style={{color:'grey'}}>Scan For Devices</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        StopDiscovery()
      }}>
        <Text style={{color:'grey'}}>Stop Discovery</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> {
        discoveredDevices.map((val, idx)=>{
          console.log(val.address);
          
        })
      }}>
        <Text style={{color:'grey'}} >Check</Text>
      </TouchableOpacity>

      <RenderDiscoveredBluetoothDevices data={discoveredDevices} />
    </View>
  )
}

export default Bluetooth