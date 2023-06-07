import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";
import { resErrMessage } from "src/utils/response";
import { resFunction } from "src/utils/response";
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
  
    return resFunction(async()=>{
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
        throw resErrMessage("Couldn't upload your image at the moment. Please try again later.")
      }

      unlinkSync(imageToUpload);
      return {
        isSuccess: true,
        message: "Successfully uploaded image.",
        statusCode: 200,
        imageURL: url,
      };
    })
  }

  deleteImage = async(name: string): Promise<any>=>{
    return resFunction(async()=>{
      const public_id = name.substring(name.lastIndexOf('/') + 1, name.lastIndexOf('.'))
      const { result } = await cloudinary.uploader.destroy(public_id);
      if(result === "ok"){
        return {
          success: true,
          statusCode: 200,
          message: "Succefully deleted"
        }
      }
      return {
        success: false,
        statusCode: 500,
        message: "Error in deleting image"
      }
    })
  }
}


export const cloudinaryInstance = new Cloudinary();
