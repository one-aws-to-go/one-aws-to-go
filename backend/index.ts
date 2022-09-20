import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda'

// TODO: Actually do something :D
export const handler = async (e: APIGatewayEvent, _ctx: Context): Promise<APIGatewayProxyResult> => {
  const test = e.queryStringParameters?.test
  const responseMessage = `One AWS To Go${test ? `, ${test}` : ''}!`

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: responseMessage
    })
  }
}
