from PIL import image
import os.path
import sys
import numpy as np
path = "G:\\3dultra\\soundultra\\dataset\\ultra1\\traintest"
dirs = os.listdir(path)
def black():
    for item in dirs:
        if os.path.isfile(os.path.join(path,item)):
                im = Image.open(os.path.join(path,item))
                f, e=os.path.splitext(os.path.join(path,item))
                black=im.crop(0,44,640,436)
                newsize = (640,480)
                newblack = Image.new("RGB",newsize)
                newblack.paste(black,(0,43))
                newblack.save(f + 'Cropped.bmp', "BMP", quality=100)
black()
print("done")