import path from 'path';
import catchAsync from '../../utils/catchAsync';
import fs from 'fs';
import Booking from '../booking/booking.model';
import axios from 'axios';
import config from '../../config';

const confirmPayment = catchAsync(async (req, res) => {
  const { transactionId } = req.query;

  // Adjust the path to point to the location of `success.html` in the `dist` directory
  const filePath = path.join(__dirname, '../../views/success.html');

  fs.readFile(filePath, 'utf8', async (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    const checkPayment = await axios.get(
      `https://sandbox.aamarpay.com/api/v1/trxcheck/request.php?request_id=${transactionId}&store_id=${config.store_id}&signature_key=${config.signature_key}&type=json`,
    );
    if (checkPayment?.data?.pay_status === 'Successful') {
      await Booking.updateOne(
        { transactionId },
        { paymentStatus: 'completed' },
      );
    }
    // const updatePaymentStatus = Booking.updateOne();
    res.send(data);
  });
});

const failedPayment = catchAsync(async (req, res) => {
  const { transactionId } = req.query;
  // Adjust the path to point to the location of `success.html` in the `dist` directory
  const filePath = path.join(__dirname, '../../views/failed.html');
  fs.readFile(filePath, 'utf8', async (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    await Booking.updateOne({ transactionId }, { paymentStatus: 'failed' });
    res.send(data);
  });
});

export const paymentController = { confirmPayment, failedPayment };
