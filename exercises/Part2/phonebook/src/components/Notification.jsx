const Notification = ({ message }) => {
  const successMessage = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  const errorMessage = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };
  if (message === null) return null;
  if (message.includes('failed')) {
    return <div style={errorMessage}>{message}</div>;
  }
  return <div style={successMessage}>{message}</div>;
};

export default Notification;
