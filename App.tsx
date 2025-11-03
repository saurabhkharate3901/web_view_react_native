import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, BackHandler, Platform, View, Dimensions } from 'react-native';
import WebView from 'react-native-webview';

const { height, width } = Dimensions.get('window');

const App = () => {
  const webviewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const handleBackPress = () => {
      if (canGoBack && webviewRef.current) {
        webviewRef.current.goBack();
        return true;
      }
      return false; 
    };

    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    }

    return () => {
      if (Platform.OS === 'android') {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      }
    };
  }, [canGoBack]);

  return (
    <View style={styles.container}>
      <View style={styles.webviewWrapper}>
        <WebView
          ref={webviewRef}
          source={{ uri: 'https://www.amazon.in/?&tag=googhydrabk1-21&ref=pd_sl_5szpgfto9i_e&adgrpid=155259813593&hvpone=&hvptwo=&hvadid=674893540034&hvpos=&hvnetw=g&hvrand=8365528401914133120&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9301870&hvtargid=kwd-64107830&hydadcr=14452_2316413&gad_source=1' }}
          onNavigationStateChange={navState => setCanGoBack(navState.canGoBack)}
          style={{ flex: 1, borderRadius: 10, overflow: 'hidden' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff',
  },
  webviewWrapper: {
    width: width * 0.9, 
    height: height * 0.5, 
    borderRadius: 10,
    overflow: 'hidden', 
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default App;
