import React, { useState } from 'react';
import { FlatList, Linking, Text, View } from 'react-native';

import { useConfig } from '../../contexts/ConfigContext';
import PackageItem from '../PackageItem';
import type { CustomerInfo, PurchasesOfferings } from 'react-native-purchases';
import styles from './styles';

interface PaymentProps {
  offerings: PurchasesOfferings;
  onPurchase: (arg: CustomerInfo) => void;
}

const Payment = ({ offerings, onPurchase }: PaymentProps) => {
  const { config } = useConfig();
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);

  const header = () => (
    <Text style={styles.header}>Subscribe to Unlock {'\n'}Pro Features</Text>
  );

  const footer = () => {
    // console.warn(
    //   "Modify this value to reflect your app's Privacy Policy and Terms & Conditions agreements. Required to make it through App Review."
    // );
    return (
      <>
        <Text style={styles.text}>
          You will be charged immediately and auto-renewed. You can cancel
          anytime.
        </Text>
        <Text style={styles.text}>
          Please check our{' '}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                'https://docs.google.com/document/d/e/2PACX-1vQ272k3xzqtA9oQ8zGgNsczeC_H7Oxg89ZZPd46u9iYTMC74Fnf48YzmrCB4dqfn9_LyOr4HVmtW-fR/pub'
              )
            }
          >
            Terms & Conditions
          </Text>
          {', '}
          and{' '}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                'https://docs.google.com/document/d/e/2PACX-1vQvlFsIE7X4K6TufCmJ6UL3ffcx0vqDPh8cOq9uZcTZ4cSiZNAcixOTciQeFFSoDdjEnifLlgwi5Gh6/pub'
              )
            }
          >
            Privacy Policies
          </Text>
          .
        </Text>
      </>
    );
  };

  return (
    <View style={styles.page}>
      {/* The paywall flat list displaying each package */}
      <FlatList
        data={offerings?.current?.availablePackages}
        renderItem={({ item }) => (
          <PackageItem
            purchasePackage={item}
            entitlementId={config.revenue_cat_entitlement_id}
            setIsPurchasing={setIsPurchasing}
            onPurchase={onPurchase}
          />
        )}
        keyExtractor={(item) => item.identifier}
        ListHeaderComponent={header}
        ListHeaderComponentStyle={styles.headerFooterContainer}
        ListFooterComponent={footer}
        ListFooterComponentStyle={styles.headerFooterContainer}
      />

      {isPurchasing && <View style={styles.overlay} />}
    </View>
  );
};

export default Payment;
