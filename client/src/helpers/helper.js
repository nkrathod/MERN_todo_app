const isEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Simple regex to validate email format
};

export {
    isEmail
}
