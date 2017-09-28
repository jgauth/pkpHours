import json
import boto3
import os
import uuid

dynamodb = boto3.resource('dynamodb', region_name='us-west-2')

def add_approve(event, context):

    data = json.loads(event['body'])

    tableApprove = dynamodb.Table(os.environ['TABLE_APPROVE'])
    tableMain = dynamodb.Table(os.environ['TABLE_MAIN'])

    item = {
        'id': str(uuid.uuid4()),
        'uoId': data['uoId'],
        'numHours': data['numHours'],
        'date': data['date'],
        'proctor': data['proctor']
    }


    checkId = tableMain.get_item(
        Key={
            'uoId': data['uoId']
        }
    )

    response = {
        'headers': {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Credentials' : True
        }
    }

    if 'Item' in checkId:
        tableApprove.put_item(Item=item)
        response['statusCode'] = 200
        response['body'] = "goodId"
    else:
        response['statusCode'] = 400
        response['body'] = "badId"


    return response
