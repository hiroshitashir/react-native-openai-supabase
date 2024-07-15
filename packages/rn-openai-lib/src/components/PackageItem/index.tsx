import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import Purchases, {
  CustomerInfo,
  PurchasesError,
  PurchasesPackage,
} from 'react-native-purchases';

import styles from './styles';

interface PackageItemProps {
  purchasePackage: PurchasesPackage;
  entitlementId: string;
  setIsPurchasing: (arg0: boolean) => void;
  onPurchase: (arg0: CustomerInfo) => void;
}

const PackageItem = ({
  purchasePackage,
  entitlementId,
  setIsPurchasing,
  onPurchase,
}: PackageItemProps) => {
  const {
    product: { title, description, priceString },
  } = purchasePackage;

  //const navigation = useNavigation();

  const onSelection = async () => {
    setIsPurchasing(true);

    try {
      const { customerInfo } = await Purchases.purchasePackage(purchasePackage);

      if (
        typeof customerInfo.entitlements.active[entitlementId] !== 'undefined'
      ) {
        onPurchase(customerInfo);
      }
    } catch (e) {
      const err = e as PurchasesError;
      if (!err.userCancelled) {
        Alert.alert('Error purchasing package', err.message);
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <Pressable onPress={onSelection} style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.terms}>{description}</Text>
      </View>
      <Text style={styles.title}>{priceString}</Text>
    </Pressable>
  );
};

export default PackageItem;
