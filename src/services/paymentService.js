// HANDLE PAYMENT
import PaystackPop from '@paystack/inline-js'
import axios from 'axios';

export async function handlePayment (customerEmail, totalAmount, orderId, navigate, accessToken, refreshAccessToken, showAlert) {
    // const { customAlert, showAlert } = useContext(AlertContext);
    // const { accessToken, refreshAccessToken } = useContext(AuthContext); 
    const popup = new PaystackPop();

    popup.newTransaction({
        key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
        email: customerEmail,
        amount: totalAmount * 1, //100, // Convert amount to kobo
        onSuccess: async (transaction) => {
            console.log('onSuccess', transaction);
            try {
                const response = await axios.post("/customer/verify-transaction", { 
                    reference: transaction.reference,
                    customerEmail,
                    orderId
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                    }
                });

                if (response.data.status === "PaymentMismatch") {
                    navigate(`/order-review/${orderId}`); // Navigate to a pending review page
                } else if (response.status === 200) {
                    // Payment success
                    console.log("Payment verified successfully:", response.data);
                    navigate(`/account/order-tracking/${orderId}`);
                } 
                
            } catch (err) {
                console.error("Error verifying payment:", err);

                if (err.response) {
                    const status = err.response.status;
                    const errMessage = err.response.data.error;
    
                    if (status === 400 || status === 403 || status === 404 || status === 500) {
                        showAlert(status, errMessage)
                    } else if (status === 401) {
                        refreshAccessToken(() => {
                            handlePayment(
                                customerEmail,
                                totalAmount,
                                orderId,
                                navigate,
                                accessToken,
                                refreshAccessToken,
                                showAlert
                            );
                        });
                    }
                } else {
                    showAlert("Error", "An Unknow Error Occured!")
                }
            }
    
        },
    onLoad: (response) => {
      console.log("onLoad: ", response);
    },
    onCancel: () => {
      console.log("onCancel");
    },
    onError: (error) => {
      console.log("Error: ", error.message);
    }
    });

}

