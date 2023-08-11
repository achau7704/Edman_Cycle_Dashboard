import socketio
import time
import random
import requests

sio = socketio.Client()


# These are all the important variables that will be kept track of during the cycle.
tempData = [{}]
tempIndex = 0
flowData = {}
flowData["flowVolume"] = 0
edmanData = {}
currentStep = ""
totalNumCycles = 0
currentCycle = 1
edmanData["currentCycle"] = currentCycle
edmanData["currentTime"] = 0
edmanData["totalTime"] = 87.6
edmanData["currentStepTime"] = 0
edmanData["totalStepTime"] = 0
edmanData["currentProgress"] = 0
edmanData["currentStepNumber"] = 0
edmanData["isFinished"] = 0


@sio.event
def connect():
    print('Connected to server')

@sio.on('totalNumCyclesData')
def setTotalNumCycles(totalNumCyclesData):
    global totalNumCycles
    totalNumCycles = int(totalNumCyclesData)
    print('Received total # of cycles:', totalNumCycles)

@sio.event
def disconnect():
    print("I'm disconnected!")


def delay_minutes(minutes):
    seconds = minutes * 60
    time.sleep(seconds)


# This generates random temperatures to model.
def generate_random_temperature():
    min_temp = -20.0  # Minimum temperature value
    max_temp = 40.0   # Maximum temperature value
    # Generate a random temperature between the minimum and maximum values
    temperature = round(random.uniform(min_temp, max_temp), 1)
    return temperature


# These are the steps of the Edman Cycle

# This is the switch step.
def switch(switch):
    currentStep = "Switch - " + switch
    print(currentStep)
    edmanData["currentStep"] = currentStep
    sio.emit("readEdman", edmanData)
    del edmanData["currentStep"]
    return "Switch - " + switch
 

# This is the wash step.
def flow(solution, flowVolume):
    global flowIndex
    currentStep = "Flow - " + solution
    print(currentStep)
    edmanData["currentStep"] = currentStep
    sio.emit("readEdman", edmanData)
    del edmanData["currentStep"]
    flowData["flowVolume"] = flowVolume
    sio.emit("readFlow", flowData)
    return "Flow - " + solution


# This is the waste purge step.
def purge(waste):
    currentStep = waste + " Purge"
    print(currentStep)
    edmanData["currentStep"] = currentStep
    sio.emit("readEdman", edmanData)
    del edmanData["currentStep"]
    return waste + " Purge"


# This function takes in 1 step parameter and 1 time parameter and models a step in the Edman Cycle.
def cycleStep(step, cumulativeTime):
    global tempIndex
    global flowIndex
    currentStep = step
    edmanData["isFinished"] = 0
    oldTime = edmanData["currentTime"]
    edmanData["totalStepTime"] = cumulativeTime - oldTime
    edmanData["totalStepTime"] = round(edmanData["totalStepTime"], 2)
    sio.emit("readFlow", flowData)
    if edmanData["totalStepTime"] == 0:
        edmanData["currentStep"] = currentStep
        time.sleep(1)
    else:
        while edmanData["currentStepTime"] < edmanData["totalStepTime"]:
            temperature = generate_random_temperature()
            tempData.append({'x': tempIndex, 'y': temperature})
            sio.emit("readTemp", tempData)
            sio.emit("readFlow", flowData)
            edmanData["currentStep"] = step
            edmanData["currentStepTime"] += 0.05
            edmanData["currentStepTime"] = round(edmanData["currentStepTime"], 2)
            edmanData["currentTime"] += 0.05
            edmanData["currentTime"] = round(edmanData["currentTime"], 2)
            edmanData["totalTime"] = round(edmanData["totalTime"], 2)
            edmanData["currentProgress"] = round(edmanData["currentStepTime"] * 100 / edmanData["totalStepTime"])
            sio.emit("readEdman", edmanData)
            time.sleep(3)
            tempIndex += 3
        flowData["flowVolume"] = 0
        edmanData["currentStepTime"] = 0
        edmanData["totalStepTime"] = 0
    edmanData["isFinished"] = 1
    sio.emit("readEdman", edmanData)
    edmanData["currentStepNumber"] += 1


# This the function for running a single cycle of the Edman Cycle.
def cycle():
    cycleStep(switch("M1-11"), 0.1)
    cycleStep(flow("MeOH", 100), 1.2)
    cycleStep(switch("M1-12"), 1.3)
    cycleStep(flow("Alkaline", 100), 4.5)
    cycleStep(switch("M1-23"), 4.5)
    cycleStep(flow("PITC solution", 50), 34.7)
    cycleStep(switch("M1-32"), 34.7)
    cycleStep(flow("Alkaline", 100), 37.9)
    cycleStep(switch("M1-21"), 38.0)
    cycleStep(flow("MeOH", 100), 39.2)
    cycleStep(switch("M2-14"), 39.2)
    cycleStep(purge("Waste B"), 41.2)
    cycleStep(switch("M1-16"), 41.2)
    cycleStep(flow("DDH20", 100), 42.4)
    cycleStep(switch("MM1-68"), 42.4)
    cycleStep(switch("M2-18"), 42.4)
    cycleStep(switch("M1-61"), 42.5)
    cycleStep(flow("MeOH", 100), 43.7)
    cycleStep(switch("M1-14"), 43.7)
    cycleStep(flow("EA", 100), 43.9)
    cycleStep(switch("M2-14"), 43.9)
    cycleStep(purge("Waste B"), 44.5)
    cycleStep(switch("M2-41"), 44.5)
    cycleStep(flow("EA", 100), 45.7)
    cycleStep(switch("M1-45"), 45.7)
    cycleStep(flow("TFA Bath", 100), 76.0)
    cycleStep(switch("M1-54"), 76.0)
    cycleStep(flow("EA", 100), 77.2)
    cycleStep(switch("M2-15"), 77.2)
    cycleStep(purge("Waste A"), 78.4)
    cycleStep(switch("M2-52"), 78.4)
    cycleStep(flow("EA", 100), 79.1)
    cycleStep(switch("M2-25"), 79.1)
    cycleStep(purge("Waste A"), 79.3)
    cycleStep(switch("M1-41"), 79.3)
    cycleStep(switch("M2-51"), 79.3)
    cycleStep(flow("MeOH", 100), 80.5)
    cycleStep(switch("M1-16"), 80.6)
    cycleStep(flow("DDH20", 100), 81.8)
    cycleStep(switch("M1-61"), 81.8) 
    cycleStep(switch("MM1-18"), 87.6) 
    cycleStep(switch("M2-18"), 87.6) 
    

sio.connect("http://localhost:3001")

# Run one edman cycle
# cycle()

# Run Edman cycles
print("Awaiting user input for total number of cycles...")

@sio.on('totalNumCyclesData')
def runProgram(totalNumCyclesData):
    global totalNumCycles
    global currentCycle
    totalNumCycles = int(totalNumCyclesData)
    print('Received total # of cycles:', totalNumCycles)
    if totalNumCycles < 1:
        print("Please enter a valid number of cycles.")
    sio.emit("readEdman", edmanData)
    for i in range(totalNumCycles):
        cycle()
        currentCycle += 1
        edmanData["currentCycle"] = currentCycle
        edmanData["currentTime"] = 0
        edmanData["currentProgress"] = 0


