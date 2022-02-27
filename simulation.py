# Simulation code
# By angiebu
# Math of rotations 2-D & 3-D https://en.wikipedia.org/wiki/Rotation_matrix

# Simplified simulation for game cosmic rays, without collisions
import gv2
import math
import random
import time
import numpy as np
import scipy as sp
from scipy.sparse import linalg
from scipy import constants
from PIL import Image
from PIL import ImageFilter
from PIL import ImageEnhance
import cv2

# Graphical simulation with collisions
def initSim(app):
    app.imageSize = app.oldSettings[0]
    app.sky = np.zeros((app.imageSize,app.imageSize,3), dtype=float)
    app.skySize = app.oldSettings[1]
    app.eIntensity = app.oldSettings[2]
    app.ePerBeam = app.oldSettings[3]
    app.minutes = app.oldSettings[4]
    app.dt = app.oldSettings[5]
    app.divisions = app.oldSettings[6]
    app.viewingAxis = app.oldSettings[7]
    app.initVel = app.oldSettings[8]
    app.cloudPixels = 9
    app.mField = [0, 0.01, 0.0006] # T at auroral region
    app.frames = list()

    # Simulation initial conditions
    posX = np.random.rand(app.eIntensity*5) * app.skySize
    posY = np.random.rand(app.eIntensity*5) * app.skySize * 0.2
    posZ = np.random.rand(app.eIntensity*5) * app.skySize
    app.positions = np.column_stack((posX, posY, posZ))

    velX = np.random.rand(app.eIntensity*5) * 1000
    velY = np.random.rand(app.eIntensity*5) * 1000 + app.initVel
    velZ = np.random.rand(app.eIntensity*5) * 1000
    app.velocities = np.column_stack((velX, velY, velZ))

def simulate(app):
    steps = math.floor((app.minutes * 60) / app.dt)
    if app.state == 1:
        beams = app.positions
        velocity = app.velocities
    else:
        beams = app.positions.copy()
        velocity = app.velocities.copy()
    dxyz = app.skySize / app.divisions
    laplacian = getLaplacian(app, dxyz)

    for step in range(steps):
        # Update motions of beams
        newAccelerations = accelerate(app, beams, velocity, laplacian, dxyz)
        velocity += newAccelerations / 2 * app.dt
        beams += velocity * app.dt
        beams, velocity = addElectrons(app, beams, velocity)

        if app.state == 5:
            app.sky *= 0.04 # IIR filter to blend frames
            for index, beam in enumerate(beams):
                # Monte Carlo simulation of collisions and deflection
                collisionProbability = random.random()
                collisionMargin = (app.skySize/10)/(app.skySize-beam[1])
                if collisionProbability < collisionMargin:
                    velocity[index] *= (random.randint(60,80))/100
                    rotation3D = rotationMatrix()
                    deflected = np.matmul(np.array(rotation3D), velocity[index])
                    velocity[index] = deflected
                    addCollision(app, beam, app.cloudPixels)
            frame = renderFrame(app, app.sky.copy())
            app.frames.append(frame)
            print(f"Step {step + 1} out of {steps} completed")
    if app.state == 5:
        app.state = 6
        app.videoTitle = saveVideo(app, app.frames)

def rotationMatrix():
    rotation1 = random.random() / (math.pi/4)
    rotation2 = random.random() / (math.pi/4)
    rotation3 = random.random() / (math.pi/4)
    rotation3D = [[math.cos(rotation1)*math.cos(rotation2),
        math.cos(rotation1)*math.sin(rotation2)*
        math.sin(rotation3)-
        math.sin(rotation1)*math.cos(rotation3),
        math.cos(rotation1)*math.sin(rotation2)*
        math.cos(rotation3)+
        math.sin(rotation1)*math.sin(rotation3)],
        [math.sin(rotation1)*math.cos(rotation2),
        math.sin(rotation1)*math.sin(rotation2)*
        math.sin(rotation3)+
        math.cos(rotation1)*math.cos(rotation3),
        math.sin(rotation1)*math.sin(rotation2)*
        math.cos(rotation3)-
        math.cos(rotation1)*math.sin(rotation3)],
        [math.sin(rotation2)*-1, math.cos(rotation2)
        *math.sin(rotation3),
        math.cos(rotation2)*math.cos(rotation3)]]
    return rotation3D

# Distribution of oxygen vs nitrogen, and their emission wavelengths
# which are coincidentally close to red, green, and blue
def addCollision(app, positions, cloudSize):
    ONProbability = random.random()
    ONThreshold = (positions[1] / (0.5 * app.skySize)) - 1.5
    if ONProbability < ONThreshold:
        redProb = random.random()
        redThres = positions[1]/(app.skySize/2.5) - 2
        if redProb < redThres:
            drawCollision(app, positions, cloudSize, 2)
        else:
            drawCollision(app, positions, cloudSize, 0)
    else:
        greenProb = random.random()
        greenThres = positions[1]/(app.skySize/3) - 1
        if greenProb < greenThres:
            drawCollision(app, positions, cloudSize, 1)     
        else:
            drawCollision(app, positions, cloudSize, 2)

# Draw emissions as electron cloud
def drawCollision(app, positions, cloudSize, RGB):
    scale = app.imageSize / app.skySize
    if app.viewingAxis == 0:
        x, y = 1, 0
    elif app.viewingAxis == 1:
        x, y = 0, 2
    else:
        x, y = 1, 0
    imageX = math.floor(positions[x] * scale)
    imageY = math.floor(positions[y] * scale)
    app.sky[imageX][imageY][RGB] += 1
    for i in range(cloudSize):
        radius = random.random() * cloudSize
        angle = random.random() * math.pi * 2
        cloudX = imageX + math.floor(math.cos(angle) * radius)
        cloudY = imageY + math.floor(math.sin(angle) * radius)
        if (cloudX >= 0 and cloudY >= 0 and cloudX < 
            app.imageSize and cloudY < app.imageSize):
            app.sky[cloudX][cloudY][RGB] += 1
            app.sky[cloudX][cloudY][2] += 0.05

def accelerate(app, position, velocity, laplacian, dxyz):
    eCharge = sp.constants.elementary_charge * app.ePerBeam
    eMass = sp.constants.electron_mass * app.ePerBeam
    densities = getDensities(app, position, dxyz).flatten()
    ###
    # The framework of the electric field simulation was based on the 
    # equations of this, and the only code was finding out the fastest scipy solver
    # https://medium.com/swlh/create-your-own-plasma-pic-simulation-with-python-39145c66578b
    potentials = sp.sparse.linalg.spsolve(laplacian, 
        densities*app.ePerBeam)
    ###
    eField = np.gradient(potentials) * sp.constants.epsilon_0 * -1
    eField = np.reshape(eField, 
        (app.divisions, app.divisions, app.divisions))
    electronsField = np.zeros(position.shape)

    for index, beam in enumerate(position):
        electricField(app, eField, electronsField, beam, dxyz, index)
    
    accel = np.zeros(position.shape)
    for index, beam in enumerate(position):
        eField = electronsField[index]
        vel = velocity[index]
        force = eCharge * (eField + np.cross(vel, app.mField))
        acceleration = force / eMass * sp.constants.epsilon_0
        accel[index] = acceleration
    return accel

def electricField(app, eField, electronsField, beam, dxyz, index):
    x, y, z = beam[0], beam[1], beam[2]
    xLow = int(math.floor(x / dxyz) % app.divisions)
    yLow = int(math.floor(y / dxyz) % app.divisions)
    zLow = int(math.floor(z / dxyz) % app.divisions)
    xHigh, yHigh, zHigh = xLow, yLow, zLow
    if xLow + 1 < app.divisions:
        xHigh += 1
    if yLow + 1 < app.divisions:
        yHigh += 1
    if zLow + 1 < app.divisions:
        zHigh += 1
    totalEField = 0
    totalEField += (eField[xLow, yLow, zLow] * 
        (xHigh - x/dxyz)*(yHigh - y/dxyz)*(zHigh - z/dxyz))
    totalEField += (eField[xLow, yLow, zHigh] * 
        (xHigh - x/dxyz)*(yHigh - y/dxyz)*(z/dxyz - zLow))
    totalEField += (eField[xLow, yHigh, zLow] *
        (xHigh - x/dxyz)*(y/dxyz - yLow)*(zHigh - z/dxyz))
    totalEField += (eField[xLow, yHigh, zHigh] *
        (x/dxyz - xLow)*(yHigh - y/dxyz)*(zHigh - z/dxyz))
    totalEField += (eField[xHigh, yLow, zLow] *
        (x/dxyz - xLow)*(yHigh - y/dxyz)*(zHigh - z/dxyz))
    totalEField += (eField[xHigh, yLow, zHigh] *
        (x/dxyz - xLow)*(yHigh - y/dxyz)*(z/dxyz - zLow))
    totalEField += (eField[xHigh, yHigh, zLow] *
        (x/dxyz - xLow)*(y/dxyz - yLow)*(zHigh - z/dxyz))
    totalEField += (eField[xHigh, yHigh, zHigh] *
        (x/dxyz - xLow)*(y/dxyz - yLow)*(z/dxyz - zLow))
    electronsField[index] = totalEField

# Calculate charge density in 3-D grid, with interpolation
def getDensities(app, position, dxyz):
    density = np.zeros((app.divisions, app.divisions, app.divisions))
    for beam in position:
        x, y, z = beam[0], beam[1], beam[2]
        xLow = int((x // dxyz) % app.divisions)
        yLow = int((y // dxyz) % app.divisions)
        zLow = int((z // dxyz) % app.divisions)
        xHigh, yHigh, zHigh = xLow, yLow, zLow
        if xLow + 1 < app.divisions:
            xHigh += 1
        if yLow + 1 < app.divisions:
            yHigh += 1
        if zLow + 1 < app.divisions:
            zHigh += 1
        density[xLow, yLow, zLow] += abs((xHigh - x/dxyz)*(yHigh 
            - y/dxyz)*(zHigh - z/dxyz))
        density[xLow, yLow, zHigh] += abs((xHigh - x/dxyz)*(yHigh 
            - y/dxyz)*(z/dxyz - zLow))
        density[xLow, yHigh, zLow] += abs((xHigh - x/dxyz)*(y/dxyz 
            - yLow)*(zHigh - z/dxyz))
        density[xLow, yHigh, zHigh] += abs((xHigh - x/dxyz)*(y/dxyz 
            - yLow)*(z/dxyz - zLow))
        density[xHigh, yLow, zLow] += abs((x/dxyz - xLow)*(yHigh 
            - y/dxyz)*(zHigh - z/dxyz))
        density[xHigh, yLow, zHigh] += abs((x/dxyz - xLow)*(yHigh 
            - y/dxyz)*(z/dxyz - zLow))
        density[xHigh, yHigh, zLow] += abs((x/dxyz - xLow)*(y/dxyz 
            - yLow)*(zHigh - z/dxyz))
        density[xHigh, yHigh, zHigh] += abs((x/dxyz - xLow)*(y/dxyz 
            - yLow)*(z/dxyz - zLow))
    return density

# Pythagorean theorem 3-D
def dist3D(x1, y1, z1, x2, y2, z2):
    dx = (x1 - x2)**2
    dy = (y1 - y2)**2
    dz = (z1 - z2)**2
    distance = math.sqrt(dx+dy+dz)
    return distance

# Generate matrix for 1st and 2nd derivative approximation in 3D
def getLaplacian(app, dxyz):
    sixes = np.ones(app.divisions**3) * -6
    onesTile = np.ones(app.divisions - 1)
    onesTile = np.append(onesTile, 0)
    onesOne = np.tile(onesTile, app.divisions**2 - 1)
    onesOne = np.append(onesOne, np.ones(app.divisions - 1))

    twosTile = np.ones((app.divisions-1)*app.divisions)
    twosTile = np.append(twosTile, np.zeros(app.divisions))
    onesTwo = np.tile(twosTile, app.divisions - 1)
    onesTwo = np.append(onesTwo, np.ones((app.divisions-1)*app.divisions))

    onesThree = np.ones(app.divisions**3 - app.divisions**2)
    diagonal = [sixes, onesOne, onesOne, onesTwo, onesTwo,
        onesThree, onesThree]
    onesThree = np.ones(app.divisions)
    laplacian = sp.sparse.diags(diagonal, 
        [0,1,-1,app.divisions,app.divisions * -1,app.divisions**2,
        app.divisions**2 * -1]).toarray() / (dxyz**2)

    return sp.sparse.csr_matrix(laplacian)

def addElectrons(app, beams, velocity):
    # Add electron beams
    posX = np.random.rand(app.eIntensity) * app.skySize
    posY = np.ones(app.eIntensity)
    posZ = np.random.rand(app.eIntensity) * app.skySize
    newBeams = np.append(beams,np.column_stack((posX, posY, posZ)), axis=0)

    velX = np.random.rand(app.eIntensity) * 1000
    velY = np.random.rand(app.eIntensity) * 1000 + app.initVel
    velZ = np.random.rand(app.eIntensity) * 1000
    newVel = np.append(velocity, np.column_stack((velX, velY, velZ)), axis=0)
    # Remove electrons outside y and wrap boundaries of z
    deleteIndices = set()
    for index, row in enumerate(newBeams):
        x, y, z = row[0], row[1], row[2]
        if (x >= app.skySize or x < 0 or y >= app.skySize or 
            y < 0 or z >= app.skySize or z < 0):
            deleteIndices.add(index)
    for index, vel in enumerate(newVel):
        x, y, z = abs(vel[0]), abs(vel[1]), abs(vel[2])
        if (x > app.skySize / 10 or y > app.skySize / 10 or 
            z > app.skySize / 10 or x < 100 or y < 100 or z < 100):
            deleteIndices.add(index)
    killList = np.array(list(deleteIndices))
    newBeams = np.delete(newBeams, killList, axis=0)
    newVel = np.delete(newVel, killList, axis=0)
    return newBeams, newVel

# Calculates the image of a frame. Will add more parameters.
def renderFrame(app, image):
    maxValue = 1
    for value in np.nditer(image):
        if value > maxValue:
            maxValue = value
    colorScale = 255 / maxValue
    with np.nditer(image, op_flags=['readwrite']) as write:
        for value in write:
            value[...] = round(colorScale * value)
    theImage = Image.fromarray(image.astype('uint8'), 'RGB')
    blur = theImage.filter(ImageFilter.GaussianBlur(1))
    median = blur.filter(ImageFilter.MedianFilter(5))
    bright = ImageEnhance.Brightness(median)
    newBright = bright.enhance(5)
    return newBright

# Save simulation as video
# Adapted from last section of https://www.geeksforgeeks.org/python-create-video-using-multiple-images-using-opencv/
def saveVideo(app, frames):
    title = str(int((time.time() % 1000) // 1)) + ".mp4"
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    shape = np.array(app.frames[0]).shape[0:2]
    video = cv2.VideoWriter(title, fourcc, 20, (shape), True)
    for frame in frames:
        video.write(np.array(frame))
    video.release()
    cv2.destroyAllWindows()
    writeText = f"Your simulation is downloaded as {title}"
    return writeText