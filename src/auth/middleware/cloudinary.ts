import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";
import { v4 as uuidv4 } from 'uuid';

export class Cloudinary {
  constructor() {
    cloudinary.config({
      cloud_name: "dpjhtfacw",
      api_key: "593695585629384",
      api_secret: "VqucjVFQ5COozLv3tTqGB9CfNvk",
    });
  }
  
  uploadImage = async (imageToUpload: string): Promise<any> => {
  
    try {
        let uniqueSuffix = uuidv4();
        const cloudinaryImageUploadResponseData = await cloudinary.uploader.upload(
          imageToUpload,
          {
            public_id: uniqueSuffix as any,
          }
        );
        const { url } = cloudinaryImageUploadResponseData;
  
        if (!url) {
          unlinkSync(imageToUpload);
          return {
            isSuccess: false,
            message:
              "Couldn't upload your image at the moment. Please try again later.",
            statusCode: 400,
          };
        }
  
        unlinkSync(imageToUpload);
        return {
          isSuccess: true,
          message: "Successfully uploaded image.",
          statusCode: 200,
          imageURL: url,
        };
      } catch (error) {
        unlinkSync(imageToUpload);
        return {
          isSuccess: false,
          message: "Internal Server Error",
          statusCode: 500,
        };
      }
  }
}


export const cloudinaryInstance = new Cloudinary();
