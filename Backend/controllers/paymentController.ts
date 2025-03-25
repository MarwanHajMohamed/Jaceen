import { APIContracts, APIControllers } from 'authorizenet';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const processPayment = async (req, res) => {
  const { paymentToken, amount } = req.body;

  // Ensure that paymentToken and amount are provided
  if (!paymentToken || !amount) {
    return res.status(400).json({ error: 'Missing payment details' });
  }

  try {
    // Prepare the transaction request object
    const merchantAuth = new APIContracts.MerchantAuthenticationType();
    merchantAuth.setName(process.env.AUTHORIZE_NET_API_LOGIN_ID); // From .env
    merchantAuth.setTransactionKey(process.env.AUTHORIZE_NET_TRANSACTION_KEY); // From .env

    const opaqueData = new APIContracts.OpaqueDataType();
    opaqueData.setDataDescriptor('COMMON.ACCEPT.INAPP.PAYMENT');
    opaqueData.setDataValue(paymentToken);

    const paymentType = new APIContracts.PaymentType();
    paymentType.setOpaqueData(opaqueData);

    const transactionRequest = new APIContracts.TransactionRequestType();
    transactionRequest.setTransactionType(APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequest.setAmount(amount);
    transactionRequest.setPayment(paymentType);

    const createRequest = new APIContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuth);
    createRequest.setTransactionRequest(transactionRequest);

    // Initialize controller to send the request
    const controller = new APIControllers.CreateTransactionController(createRequest.getJSON());

    // Execute the request with proper error handling
    return new Promise((resolve, reject) => {
      controller.execute(() => {
        const apiResponse = controller.getResponse();
        
        // Check if we have a valid response
        if (!apiResponse) {
          return res.status(500).json({ error: 'No response from payment gateway' });
        }
        
        const response = new APIContracts.CreateTransactionResponse(apiResponse);

        // Check if the transaction was successful
        if (response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
          return res.status(200).json({
            success: true,
            transactionId: response.getTransactionResponse().getTransId(),
            message: 'Payment processed successfully',
          });
        } else {
          let errorText = 'Payment processing failed';
          
          // Extract the error message if available
          if (response.getMessages() && response.getMessages().getMessage() && response.getMessages().getMessage().length > 0) {
            errorText = response.getMessages().getMessage()[0].getText();
          }
          
          return res.status(400).json({ error: errorText });
        }
      });
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    return res.status(500).json({ error: 'Payment processing failed: ' + error.message });
  }
};

export { processPayment };