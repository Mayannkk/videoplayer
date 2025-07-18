import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(localFilePath, {
      resource_type: 'auto',
    })
    .catch((error) => {
      fs.unlinkSync(localFilePath); // Clean up if needed
      console.log('ERR: ', error);
    });

  console.log('uploadResult', uploadResult);

  /**
   * this is the code from the cloudinary documentaion
   
  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url('shoes', {
    fetch_format: 'auto',
    quality: 'auto',
  });

  console.log('optimizeUrl', optimizeUrl);

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url('shoes', {
    crop: 'auto',
    gravity: 'auto',
    width: 500,
    height: 500,
  });

  console.log('autoCropUrl', autoCropUrl);

  */

  return uploadResult;
};

export { uploadOnCloudinary };
