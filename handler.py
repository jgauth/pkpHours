import json
import boto3
import os
import uuid
from urllib.parse import parse_qs

dynamodb = boto3.resource('dynamodb', region_name='us-west-2')

def add_approve(event, context):

    #might be broken
    data = json.loads(event['body'])

    tableApprove = dynamodb.Table(os.environ['TABLE_APPROVE'])
    tableMain = dynamodb.Table(os.environ['TABLE_MAIN'])

    item = {
        'id': str(uuid.uuid1()),
        'uoId': data['uoId'][0],
        'numHours': data['numHours'][0],
        'date': data['date'][0],
        'proctor': data['proctor'][0]
    }

    # checkResponse = tableMain.get_item(
    #     Key={
    #         'uoId': data['uoId'][0]
    #     }
    # )
    #
    # # Item will only be in checkResponse if an item exists with the requested uoId
    # if 'Item' in checkResponse:
    #     tableApprove.put_item(Item=item)
    #     response = {} #fix this after testing
    # else:
    #     response = {} #fix this after testing

    response = {
        statusCode: 200,
        headers: {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Headers" : "*",
        "Access-Control-Allow-Methods" : "*"
        },
        body: json.dumps(item)
    }


    return response
