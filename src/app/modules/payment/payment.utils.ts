import axios from 'axios';
import config from '../../config';

type TPaymentData = {
  name: string;
  amount: number;
  email: string;
  address: string;
  mobile: string;
  transactionId: string;
};

export const initialPayment = async (paymentData: TPaymentData) => {
  const result = await axios.post(config.payment_url as string, {
    store_id: config.store_id,
    signature_key: config.signature_key,
    tran_id: paymentData?.transactionId,
    success_url: `https://car-washing-system-ten.vercel.app/api/payment/success?transactionId=${paymentData.transactionId}`,
    fail_url: `https://car-washing-system-ten.vercel.app/api/payment/failed?transactionId=${paymentData.transactionId}`,
    cancel_url: 'http://localhost:5173/',
    amount: paymentData?.amount,
    currency: 'BDT',
    desc: 'Merchant Registration Payment',
    cus_name: paymentData?.name,
    cus_email: paymentData?.email,
    cus_add1: paymentData?.address,
    cus_add2: null,
    cus_city: null,
    cus_state: null,
    cus_postcode: null,
    cus_country: null,
    cus_phone: paymentData?.mobile,
    type: 'json',
  });
  return result.data;
};
