import * as React from 'react';
import { Alert, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';
import type {
  CustomerInfo,
  PurchasesOfferings,
} from '@revenuecat/purchases-typescript-internal';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
// import {
//   // DrawerNavigationProp,
//   // createDrawerNavigator,
//   // DrawerContentScrollView,
//   // DrawerItemList,
//   // DrawerItem,
// } from '@react-navigation/drawer';
// import { Appbar, Button, Drawer as PaperDrawer } from 'react-native-paper';

import { useConfig } from '../contexts/ConfigContext';
import Chat from '../components/Chat';
import Login from '../components/Login';
import Payment from '../components/Payment';
//import type { AppConfigType } from './config';

// interface RevenueCatStatus {
//   offerings?: PurchasesOfferings;
//   packages?: PurchasesPackage[];
// }

//const Drawer = createDrawerNavigator();

const Navigator = () => {
  const { config } = useConfig();
  const [offerings, setOfferings] = useState<PurchasesOfferings>(
    undefined as unknown as PurchasesOfferings
  );
  const [session, setSession] = useState<Session | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [msgCount, setMsgCount] = useState<number>(0);
  const [showLoginView, setShowLoginView] = useState<boolean>(
    config.initial_assistant_prompt === undefined
  );

  const onPurchaseCallback = (updatedCustomerInfo: CustomerInfo) => {
    setCustomerInfo(updatedCustomerInfo);
  };

  async function incMsgCount() {
    setMsgCount(msgCount + 1);
  }

  async function getMsgCount() {
    const { data } = await supabase
      .from('messages')
      .select('counter')
      //        .eq('id', user.id)
      .single();

    //console.log(`message counter: ${data?.counter}`);
    setMsgCount(data?.counter || 0);
  }

  function enableLoginView() {
    setShowLoginView(true);
  }

  // const signOut = async () => {
  //   const { error } = await supabase.auth.signOut();
  //   if (error) {
  //     console.error(`Failed to sign out: `, error);
  //   } else {
  //     setSession(null);
  //   }
  // };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: sessionParam } }) => {
      setSession(sessionParam);
    });

    supabase.auth.onAuthStateChange((_event, sessionParam) => {
      setSession(sessionParam);

      if (sessionParam) {
        getMsgCount();
      }
    });
  }, []);

  useEffect(() => {
    const setupRevenueCat = async () => {
      try {
        Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
        if (Platform.OS === 'android') {
          await Purchases.configure({
            apiKey: config.revenue_cat_api_keys.google,
          });
        } else {
          await Purchases.configure({
            apiKey: config.revenue_cat_api_keys.apple,
          });
        }
      } catch (error) {
        console.error(`RevenueCat setup failed: ${error}`);
      }

      try {
        const o = await Purchases.getOfferings();
        setOfferings(o);

        const cusInfo = await Purchases.getCustomerInfo();
        setCustomerInfo(cusInfo);
      } catch (error) {
        Alert.alert('Error getting offers', JSON.stringify(error));
      }
    };

    if (
      config.enable_subscription &&
      !__DEV__ &&
      session?.user.email !== config.admin_email
    ) {
      console.log(`setting up RevenueCat...`);
      setupRevenueCat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if ((session && session.user) || !showLoginView) {
    if (
      config.enable_subscription &&
      !__DEV__ &&
      msgCount > config.max_free_msg_count &&
      Object.entries(customerInfo?.entitlements.active || {}).length === 0 &&
      session?.user.email !== config.admin_email
    ) {
      return (
        <>
          <Payment offerings={offerings} onPurchase={onPurchaseCallback} />
        </>
      );
    }

    return (
      <>
        <Chat incMsgCount={incMsgCount} onGuestAction={enableLoginView} />
      </>
    );
  }

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1 }}>
      <Login />
    </View>
  );
};

export default Navigator;
