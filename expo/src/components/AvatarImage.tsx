import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';

import { db, auth } from '../infra/firestore/firebaseConfig';

type UserAttr = {
  user_name: string;
  icon_url: string | null;
};

const AvatarImage: React.FC = () => {
  const [userAttr, setUserAttr] = useState<UserAttr | null>(null);

  const fetchData = async (): Promise<void> => {
    if (auth.currentUser === null) return;
    try {
      const docRef = doc(db, 'memo_app_users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserAttr(docSnap.data() as UserAttr);
      } else {
        console.warn('No such document!');
      }
    } catch (error) {
      console.error('Error fetching document: ', error);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  return (
    <View>
      <View style={styles.imageWrap}>
        <Image
          style={styles.image}
          source={
            auth.currentUser !== null && userAttr?.icon_url
              ? { uri: userAttr.icon_url }
              : require('../../assets/defaultAvatar.jpeg')
          }
        />
      </View>
      <Text>{userAttr?.user_name ?? 'ななし'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrap: {
    marginTop: 20,
    width: 75, // 画像の幅
    height: 75, // 画像の高さ
    borderRadius: 35.5, // 幅と高さの半分に設定することで円形になる
    overflow: 'hidden', // 余白をクリップするために必要
    borderWidth: 5,
    borderColor: '#999',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default AvatarImage;
