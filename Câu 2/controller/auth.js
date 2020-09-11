export const checkError = (book, tacgia) => {
  const error = { book: "", tacgia: "" };

  if (!book ) {
    error.book = "Not a valid book";
  }
  if (!tacgia) {
    error.tacgia = "Not a valid tacgia";
  }
  if (error.book || error.tacgia) {
    return {
      hasError: true,
      error: error,
    };
  }
  return {
    hasError: false,
  };
};


function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}