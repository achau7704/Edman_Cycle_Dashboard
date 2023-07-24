# This script is no longer needed (everything has been moved to edmanCycle.py).

import socketio
import time
import random
import requests

sio = socketio.Client()

def generate_random_temperature():
    min_temp = -20.0  # Minimum temperature value
    max_temp = 40.0   # Maximum temperature value
    
    # Generate a random temperature between the minimum and maximum values
    temperature = round(random.uniform(min_temp, max_temp), 1)
    
    return temperature

@sio.event
def connect():
    print('Connected to server')

@sio.on('data')
def on_data(data):
    print('Received data:', data)

@sio.event
def disconnect():
    print("I'm disconnected!")

sio.connect("http://localhost:3001")

data = [{}]
# Generate and print 10 random temperature values
for i in range(25):
    temperature = generate_random_temperature()
    print(temperature)
    data.append({'x': i, 'y': temperature})
    sio.emit("readTemp", data)
    time.sleep(2)


