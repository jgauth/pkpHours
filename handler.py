import json
import boto3
import os
import uuid
from urllib.parse import parse_qs

dynamodb = boto3.resource('dynamodb', region_name='us-west-2')

def add_approve(event, context):
    data = parse_qs(event['body'])

    table = dynamodb.Table(os.environ['TABLE_APPROVE'])

    item = {
        'id': str(uuid.uuid1()),
        'uoId': data['uoId'][0],
        'numHours': data['numHours'][0],
        'date': data['date'][0],
        'proctor': data['proctor'][0]
    }

    table.put_item(Item=item)

    response = {
    "statusCode": 200,
    "body": json.dumps(item)
    }

    return response
