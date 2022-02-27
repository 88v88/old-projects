from PIL import Image
import os.path
import sys
import numpy as np
path = "G:\\3dultra\\soundultra\\dataset\\ultra1\\val"
dirs = os.listdir(path)
def black():
    for item in dirs:
        fullpath = os.path.join(path,item)
        if os.path.isfile(fullpath):
            im = Image.open(fullpath)
            f, e=os.path.splitext(fullpath)
            black=im.crop((0,44,640,436))
            newsize = (640,480)
            newblack = Image.new("RGB",newsize)
            newblack.paste(black,(0,43))
            newblack.save(f + 'Cropped.bmp', "BMP", quality=100)
black()
print("done")