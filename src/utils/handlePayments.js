export const handlePayment = async (amount, email, description,redirectPath, setLoading, setNotification, setUrl) => {
    const paymentData = {
      amount,
      email,
      //paymentMethod: "MPESA",
      description,
      countryCode: "KE",
      currency: "USD",//"KES",
      url: window.location.origin + location.pathname,
      callbackUrl: window.location.origin + redirectPath,
      consumerKey: "nbZBtDnSEt9X+l0cHNDFren+7dTQIJXl",
      consumerSecret: "3p2NhatNMO64hzQpqGUs062LTvE="
    }; 

    setLoading(true);
    try {
      const res = await fetch('https://api.254liquors.com/api/pesapal/', {
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

      await res.json().then((myData) => {
        setUrl(myData.redirect_url);
        setLoading(false)
      });
    } catch (err) {
      setLoading(false);
      setNotification({
        isVisible: true,
        type: 'error',
        message: err.message,
      });
    }
  };