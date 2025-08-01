# add your get-notes function here
import json

def get_handler(event, context):
    print(event)
    http_method = event["requestContext"]["http"]["method"].lower()
    invoker = None

    if http_method == "post" or http_method == "put":
        # POST and PUT use the request body to get info about the request
        body = json.loads(event["body"])
        invoker = body["invoker"]
    elif http_method == "get" or http_method == "delete":
        # GET and DELETE use query string parameters to get info about the request
        invoker = event["queryStringParameters"]["invoker"]
    
    return {
        "statusCode": 200,
        "body": json.dumps({
            "method": http_method,
            "invoker": invoker
        })
    }
