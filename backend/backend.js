// AWS Lambda Dummy

module.exports.handler = async (_event) => {
  const responseMessage = 'One AWS To Go!'

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: responseMessage,
    }),
  }
}
