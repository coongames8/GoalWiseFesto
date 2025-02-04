export const trackPayment = async (orderTrackingId, setNotification, setStatusData, setLoading, callBackFunction = () => {}) => {
    const paymentData = {
        orderTrackingId,
        consumerKey: "nbZBtDnSEt9X+l0cHNDFren+7dTQIJXl",
        consumerSecret: "3p2NhatNMO64hzQpqGUs062LTvE="
    };

    try {
        const res = await fetch(`https://api.254liquors.com/api/pesapal/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });
      
        if (!res.ok) {
            setLoading(false);
            return setNotification({
                isVisible: true,
                type: 'error',
                message: `HTTP error! status: ${res.status}`,
            });
        }
        
        setNotification({
            isVisible: true,
            type: 'success',
            message: "Payment Initialized",
        });
    
        await res.json().then((data) => {
            setLoading(false)
            setStatusData(data);

            setNotification({
                isVisible: true,
                type: 'success',
                message: 'Action completed successfully!',
              });
        });
      } catch (err) {
        setLoading(false)
        setNotification({
          isVisible: true,
          type: 'error',
          message: 'An Error Ocurred: ' + err.message,
        });
    }
}