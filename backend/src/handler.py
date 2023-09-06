# Define imports
try:
    import unzip_requirements
except ImportError:
    pass

import boto3
import json
import random
from decimal import Decimal


def convert_floats_to_decimal(obj):
    """Recursively convert all float values in the given object to Decimal."""
    if isinstance(obj, list):
        for i in range(len(obj)):
            obj[i] = convert_floats_to_decimal(obj[i])
        return obj
    if isinstance(obj, dict):
        for k, v in obj.items():
            obj[k] = convert_floats_to_decimal(v)
        return obj
    if isinstance(obj, float):
        return Decimal(str(obj))
    return obj


dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    body = json.loads(event['body'])
    action = body['action']
    try:
        table = dynamodb.Table('serverdata')
    except Exception as e:
        print(e)
    print("connected !")
    print(body)

    if(action == 'launch'):
        username = body['username']
        isAdmin = body['isAdmin']
        server_id = random.randint(10000,99999)
        table.put_item(
        Item={
            'username': [username], 
            'serverid': server_id, #implémenter comme étant le numéro de serveur
            'positions' : [],
            'circles' : [],
            "isAdmin": [isAdmin]
        }
        )
        return ({'statusCode': 200,
                'body': json.dumps({
                'message': server_id,
                'status': True})})

    elif action == 'join':
        isAdmin = body['isAdmin']
        username = body['username']
        server_id = int(body['serverId'])  # Ensure server_id is a string

        response = table.get_item(
            Key={'serverid': server_id},
            AttributesToGet=['isAdmin', 'username', 'circles', 'positions']
        )

        item = response.get('Item', {})

        # Extracting or initializing the lists
        listisAdmin = item.get('isAdmin', [])
        listusername = item.get('username', [])
        circles = item.get('circles', [])
        positions = item.get('positions', [])

        # Appending new values
        listisAdmin.append(isAdmin)
        listusername.append(username)

        # Updating the item with updated lists
        table.update_item(
            Key={'serverid': server_id},
            UpdateExpression="SET username = :u, circles = :c, positions = :p, isAdmin = :a",
            ExpressionAttributeValues={
                ':u': listusername,
                ':c': circles,
                ':p': positions,
                ':a': listisAdmin
            }
        )

        return ({'statusCode': 200,
                'body': json.dumps({
                'message': server_id,
                'status': True})})
        
    elif(action == 'sendCircle'):
        serverid = int(body['serverId'])
        coordinates = body['coordinates']
       
        response = table.get_item(
            Key={'serverid': serverid},
            AttributesToGet=['isAdmin', 'username', 'circles', 'positions']
        )

        item = response.get('Item', {})

        # Extracting or initializing the lists
        listisAdmin = item.get('isAdmin', [])
        listusername = item.get('username', [])
        circles = item.get('circles', [])
        positions = item.get('positions', [])

        # Appending new values
        circles.append(convert_floats_to_decimal(coordinates))

        # Updating the item with updated lists
        table.update_item(
            Key={'serverid': serverid},
            UpdateExpression="SET username = :u, circles = :c, positions = :p, isAdmin = :a",
            ExpressionAttributeValues={
                ':u': listusername,
                ':c': circles,
                ':p': positions,
                ':a': listisAdmin
            }
        )

    elif(action == 'sendPosition'):
        serverid = int(body['serverId'])
        coordinates = body['coordinates']
       
        response = table.get_item(
            Key={'serverid': serverid},
            AttributesToGet=['isAdmin', 'username', 'circles', 'positions']
        )

        item = response.get('Item', {})

        # Extracting or initializing the lists
        listisAdmin = item.get('isAdmin', [])
        listusername = item.get('username', [])
        circles = item.get('circles', [])
        positions = item.get('positions', [])

        # Appending new values
        positions.append(convert_floats_to_decimal(coordinates))

        # Updating the item with updated lists
        table.update_item(
            Key={'serverid': serverid},
            UpdateExpression="SET username = :u, circles = :c, positions = :p, isAdmin = :a",
            ExpressionAttributeValues={
                ':u': listusername,
                ':c': circles,
                ':p': positions,
                ':a': listisAdmin
            }
        )
        
    elif(action == 'disconnect'):
        username = body['username']
        table.delete_item(
        Key={
            'username': username
        }
    )
    else:   
        server_id = body['serverId']
        latitude = body['latitude']
        longitude = body['longitude']


    return {
    'statusCode': 200,
    'body': json.dumps({
        'message': 'Connected.',
        'status': True
    })
}

"""
def send_location(event):
    body = json.loads(event['body'])
    user_id = body['userId']
    server_id = body['serverId']
    latitude = body['latitude']
    longitude = body['longitude']

    location_data_table.put_item(
        Item={
            'serverId': server_id,
            'userId': user_id,
            'latitude': latitude,
            'longitude': longitude,
            'timestamp': int(event['requestContext']['timeEpoch'] / 1000)
        }
    )

    # Broadcast the location to other connected clients in the same server
    connections_in_server = connections_table.query(
        IndexName='serverId-index',  # you'd need to setup this GSI
        KeyConditionExpression=Key('serverId').eq(server_id)
    )

    payload = {
        'action': 'updateLocation',
        'userId': user_id,
        'latitude': latitude,
        'longitude': longitude
    }

    for connection in connections_in_server['Items']:
        connection_id = connection['connectionId']
        try:
            api_mgmt.post_to_connection(
                ConnectionId=connection_id,
                Data=json.dumps(payload)
            )
        except Exception as e:
            # Handle exceptions like GoneException which indicates the connection is no longer available
            print(f"Failed to post to connection {connection_id}: {str(e)}")

    return {
        'statusCode': 200,
        'body': 'Location broadcasted.'
    }
    """