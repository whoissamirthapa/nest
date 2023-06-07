import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UploadedFile } from '@nestjs/common';
import { ValidatorFn } from 'enum/auth';

@Injectable()
export class FileUploadPipe implements PipeTransform {
  constructor(private readonly validators: any[]) {}

  async transform(@UploadedFile() file: Express.Multer.File): Promise<Express.Multer.File> {
    for (const validator of this.validators) {
      const isValid = await validator.validate(file);
      if (!isValid) {
        throw new BadRequestException(validator.errorMessage);
      }
    }
    return file;
  }
}

export const maxFileSizeValidator: any = async (file: Express.Multer.File) => {
    return file.size <= 1000; // Maximum file size: 1000 bytes
  };
  
  export const fileTypeValidator: any = async (file: Express.Multer.File) => {
    return file.mimetype === 'image/jpeg'; // Allowed file type: image/jpeg
  };




export class MaxFileSizeValidator {
    constructor(private readonly maxSize: number) {}
  
    async validate(file: Express.Multer.File): Promise<boolean> {
      return file.size <= this.maxSize;
    }
  
    get errorMessage(): string {
      return `File size exceeds the maximum limit of ${this.maxSize} bytes.`;
    }
  }

  export class FileTypeValidator {
    constructor(private readonly fileType: string) {}
  
    async validate(file: Express.Multer.File): Promise<boolean> {
      return file.mimetype === this.fileType;
    }
  
    get errorMessage(): string {
      return `Invalid file type. Expected ${this.fileType}.`;
    }
  }