export const login = (email, password) => {
  const error = { email: "", password: "" };

  if (!email || !validateEmail(email)) {
    error.email = "Not a valid email";
  }
  if (!password || password.length < 6) {
    error.password = "Not a valid password";
  }
  if (error.email || error.password) {
    return {
      hasError: true,
      error: error,
    };
  }
  firebase.auth().signInWithEmailAndPassword(email, password);
  return {
    hasError: false,
  };
};
export const register = async (
  email,
  displayName,
  password,
  confirmPassword
) => {
  const error = {
    email: "",
    displayName: "",
    password: "",
    confirmPassword: "",
  };

  if (!email || !validateEmail(email)) {
    error.email = "Not a valid email";
  }
  if (!password || password.length < 6) {
    error.password = "Not a valid password";
  }
  if (!displayName) {
    error.displayName = "Not a valid name";
  }
  if (!confirmPassword) {
    error.confirmPassword = "Blank password";
  }
  if (confirmPassword !== password) {
    error.confirmPassword = "Password does not match";
  }
  if (
    error.email ||
    error.password ||
    error.displayName ||
    error.confirmPassword
  ) {
    return {
      hasError: true,
      error: error,
    };
  }
  try {
    const response = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
    firebase.auth().currentUser.updateProfile({
      displayName: displayName,
    });
    firebase.auth().currentUser.sendEmailVerification();
    return {
      hasError:false
    }
  }
  catch (err){
    return {
      hasError:true,
      error: err,
    }
  }
  
    
  console.log(response);

  if (response) {
    return {
      hasError: false,
    };
  } else {
    return {
      hasError: true,
    };
  }
};
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
