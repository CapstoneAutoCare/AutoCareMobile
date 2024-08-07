import{ useEffect, React } from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../features/userSlice";
import { fetchCentreData } from "../../app/CusCare/homepageSlice";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const profile = useSelector((state) => state.user.profile);
  const centre = useSelector((state) => state.homepage.centre);
  const centreId = profile?.centreId; 

  useEffect(() => {
    const fetchGetProfile = async () => {
      await dispatch(getProfile());
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetchGetProfile();
    });

    fetchGetProfile();

    return unsubscribe;
  }, [dispatch, navigation]);

  useEffect(() => {
    if (centreId) {
      dispatch(fetchCentreData(centreId));
    }
  }, [dispatch, centreId]);

  const handleNavigation = (screenName, additionalProps = {}) => {
    navigation.navigate('HOMESCREENNAVIGATOR', {
      screen: screenName,
      params: {
        profile,
        centre,
        ...additionalProps,
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleNavigation('REQUESTLIST')}>
        <Card style={styles.card}>
          <ImageBackground source={{ uri: 'https://img.freepik.com/premium-vector/car-auto-garage-concept-premium-logo-design_645012-278.jpg' }} style={styles.image}>
            <View style={styles.overlay}>
              <Text style={styles.text}>Xem lịch đặt</Text>
            </View>
          </ImageBackground>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleNavigation('FEEDBACK')}>
        <Card style={styles.card}>
          <ImageBackground source={{ uri: 'https://img.freepik.com/premium-vector/car-auto-garage-concept-premium-logo-design_645012-278.jpg' }} style={styles.image}>
            <View style={styles.overlay}>
              <Text style={styles.text}>Xem phản hồi</Text>
            </View>
          </ImageBackground>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleNavigation('CREATEBOOKINGFORWALK-INGUEST')}>
        <Card style={styles.card}>
          <ImageBackground source={{ uri: 'https://img.freepik.com/premium-vector/car-auto-garage-concept-premium-logo-design_645012-278.jpg' }} style={styles.image}>
            <View style={styles.overlay}>
              <Text style={styles.text}>Tạo đơn</Text>
            </View>
          </ImageBackground>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  card: {
    width: 300,
    height: 150,
    marginVertical: 10,
    elevation: 3,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
