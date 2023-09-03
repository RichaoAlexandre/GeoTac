# Define imports
try:
    import unzip_requirements
except ImportError:
    pass

import boto3
import json
import random

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    body = json.loads(event['body'])
    action = body['action']
    try:
        table = dynamodb.Table('LocationData')
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
            'username': username, 
            'serverId': server_id, #implémenter comme étant le numéro de serveur
            'longitudes' : [],
            'latitudes' : [],
            "isAdmin": isAdmin
        }
        )
        return ({'statusCode': 200,
                'body': json.dumps({
                'message': f'le numéro du serveur est {server_id}',
                'status': True})})

    elif(action == 'join'):
        isAdmin = body['isAdmin']
        username = body['username']
        server_id = body['serverId']
        response = table.scan(
            FilterExpression=boto3.dynamodb.conditions.Attr('serverId').eq(server_id)
        )
        if not response['Items']:
            raise Exception("Ce serveur n'existe pas")
  
        table.put_item(
        Item={
            'username': username, 
            'serverId': server_id, #implémenter comme étant le numéro de serveur
            'longitudes' : [],
            'latitudes' : [],
            "isAdmin": isAdmin
        }
    )
        return ({'statusCode': 200,
                'body': json.dumps({
                'message': 'Connected.',
                'status': True})})
        
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