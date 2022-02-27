# Code snippets from ultrasound project
# Uses Mask R-CNN library by Waleed Abdulla under MIT License
# Adapted from balloon example

class Ultra1Dataset(utils.Dataset):
	def load_ultra1(self, dataset_dir, subset):
		self.add_class("ultra1", 1, "ultra1")

		assert subset in ["train", "val"]
		dataset_dir = os.path.join(dataset_dir, subset)

	# Load annotations
	# VGG Image Annotator (up to version 3) saves each image in the form:
	#
	# file_list = ["trainingset (1).bmp"]
	# spatial_coordinates = [7,339.649,195.789,322.807,176.14,299.649,171.228,282.807,180.351,283.508,188.772,295.438,194.386,308.771,201.403,296.842,204.21,272.982,201.403,264.561,217.544,282.105,230.175,303.157,237.894,329.824,230.175,315.087,213.333,317.192,205.614,340.35,204.912]
	#
	# * 7 = type for polygon. The coordinates are listed as [x,y,x,y,...]

		imglist = []
		imgfile = []
		xcoord = []
		ycoord = []

	# Read the CSV for file names and vertex coordinates
		with open(os.path.join(dataset_dir,"annotation.csv"),"r") as annotations:
			anread = list(csv.reader(annotations))
			for ind,row in enumerate(anread):
				file = json.loads(row[1])[0]
				imglist.append(file)
				xcoord.append([])
				ycoord.append([])
				coords = json.loads(row[4])
				for index, xy in enumerate(coords):
					if index % 2 == 0 and index != 0:
						xcoord[ind].append(xy)
					elif index != 0:
						ycoord[ind].append(xy)

	# Add images
		for num, filepath in enumerate(imglist):
			# Get the x, y coordinates of points of the polygons that make up
			# the outline of each object instance. These are stored in xcoord and ycoord.
			img_path = os.path.join(dataset_dir,filepath)
			self.add_image(
				"ultra1",
				image_id=str(num),
				path=img_path,
				width=640, height=480,
				xcoord=xcoord[num], ycoord=ycoord[num])
	def load_mask(self, image_id):
		# Put non-brainstems into parent class
		image_info = self.image_info[image_id]
		if image_info["source"] != "ultra1":
			return super(self.__class__, self).load_mask(image_id)

		# Convert polygons to a bitmap mask of shape
		# [height, width, instance_count]
		info = self.image_info[image_id]
		mask = np.zeros((480, 640,1),
			dtype=np.uint8)
		# Get indices of pixels inside the polygon and set them to 1
		rr, cc = skimage.draw.polygon(info["xcoord"],info["ycoord"])
		mask[rr, cc,0] = 1

		# Return mask, and array of class IDs of each instance. Since we have
		# one class ID only, we return an array of 1s
		return mask.astype(np.bool), np.ones([mask.shape[-1]], dtype=np.int32)

	def image_reference(self, image_id):
		info = self.image_info[image_id]
		if info["source"] == "ultra1":
			return info["path"]
		else:
			super(self.__class__, self).image_reference(image_id)

def brainstem_isol(image, mask):
	# Make a blackened copy of the image
	black = skimage.color.gray2rgb(skimage.color.rgb2gray(image)) * 0
	# Copy color pixels from the original color image where mask is set
	if mask.shape[-1] > 0:
		mask = (np.sum(mask, -1, keepdims=True) >= 1)
		isol = np.where(mask, image, black).astype(np.uint8)
	else:
		isol = black.astype(np.uint8)
	return isol

