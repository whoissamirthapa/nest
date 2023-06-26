/* eslint-disable prettier/prettier */
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './auth.schema';
import { authTypeReq, loginAuth } from 'enum/auth';
import { resErrMessage, resFunction, resMessage } from 'src/utils/response';
import * as bycript from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { cloudinaryInstance } from './middleware/cloudinary';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Auth.name)
    private authModel: Model<AuthDocument>,
  ) {}

  async addAuth(data: authTypeReq) {
    // console.log(data);
    return resFunction(async () => {
      if (data.email.trim() === '')
        throw { devError: 'Email is required', error: 'Email is required!' };

      if (data.password.trim() === '')
        throw {
          devError: 'Password is required',
          error: 'Password is required!',
        };

      const userExist = await this.authModel.findOne({
        email: data.email,
      });
      if (userExist)
        throw {
          devError: 'User already exists',
          error: 'User already exists!',
        };

      const password = await bycript.hash(data.password, 12);
      const res = await this.authModel.create({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        display_name: data.first_name + ' ' + data.last_name,
        password,
        image_url: '/',
      });
      if (res) {
        return resMessage(res, 'Successfully registered');
      }
      throw {
        devError: 'Error while registering',
        error: 'Something went wrong',
      };
    });
  }
  async loginAuth(data: loginAuth) {
    // console.log(data);
    return await resFunction(async () => {
      const res = await this.authModel.findOne({
        email: data.email,
      });
      if (!res)
        throw {
          devError: 'Error while logging in user',
          error: 'Something went wrong!',
        };

      const match = await bycript.compare(data.password, res.password);
      if (!match)
        throw {
          devError: 'Error while logging in user password donot match',
          error: 'Credential do not match!',
        };

      const token = this.jwtService.sign(
        {
          email: res.email,
          first_name: res.first_name,
          last_name: res.last_name,
          display_name: res.display_name,
          roles: res.roles,
          image_url: res.image_url,
          following: res.following,
          follower: res.follower,
          _id: res._id,
        },
        {
          secret: 'hello',
        },
      );

      return resMessage(
        {
          token,
          data: {
            email: res.email,
            first_name: res.first_name,
            last_name: res.last_name,
            display_name: res.display_name,
            roles: res.roles,
            image_url: res.image_url,
            following: res.following,
            follower: res.follower,
            _id: res._id,
          },
        },
        'Succefully loggedin!',
      );
    });
  }

  async getUsers() {
    return resFunction(async () => {
      const res = await this.authModel.find().select('-password');
      if (!res)
        throw {
          devError: 'Error while getting users',
          error: 'Something went wrong!',
        };
      return resMessage(res, 'Successfully found users');
    });
  }

  async getProfile(id: string) {
    return resFunction(async () => {
      const res = await this.authModel.findById(id).select('-password');
      console.log(res);
      if (!res)
        throw {
          devError: 'Error while getting profile',
          error: 'Something went wrong!',
        };
      return resMessage(res, 'Successfully found user');
    });
  }

  async updateProfile(
    id: string,
    path: string,
    data: {
      first_name: string;
      last_name: string;
      email: string;
      roles: string[];
      image_url: string;
    },
  ) {
    return resFunction(async () => {
      let image_url = '';
      if (path.trim() !== '') {
        let resCloudinary = {
          statusCode: 200,
        };
        if (data?.image_url !== '/') {
          resCloudinary = await cloudinaryInstance.deleteImage(data.image_url);
        }
        // console.log(resCloudinary)
        if (resCloudinary?.statusCode === 200) {
          const { imageURL } = await cloudinaryInstance.uploadImage(path);
          image_url = imageURL;
          // console.log(imageURL);
        }
      }
      // console.log(image_url);
      const newData: {
        first_name: string;
        last_name: string;
        roles: string[];
        email: string;
        display_name: string;
        image_url?: string;
      } = {
        first_name: data.first_name,
        last_name: data.last_name,
        roles: data.roles,
        email: data.email,
        display_name: data.first_name + ' ' + data.last_name,
      };
      if (image_url.trim() !== '') {
        newData.image_url = image_url;
      }
      console.log('new data', newData);
      const res = await this.authModel
        .findOneAndUpdate(
          {
            _id: id,
          },
          newData,
          {
            new: true,
          },
        )
        .select('-password');

      if (!res)
        throw {
          devError: 'Error while updating user',
          error: 'Something went wrong!',
        };

      return resMessage(res, 'Successfully updated');
    });
  }

  toggleFollow(id: string, user_id: string) {
    return resFunction(async () => {
      //exist and valid users are those users who follows and is being followed respectively.
      if (id?.toString() === user_id?.toString())
        return resErrMessage({
          devError: 'following and follower are same',
          error: 'Something went wrong',
        });
      const [existUser, validUser] = await Promise.all([
        this.authModel.findOne({ _id: user_id }),
        this.authModel.findOne({ _id: id }),
      ]);

      if (!existUser || !validUser)
        throw {
          devError: 'User does not exist while toggling user follow',
          error: 'Something went wrong',
        };

      const existFollowing = existUser?.following?.filter(
        (i) => i?.toString() === validUser?._id?.toString(),
      );

      if (existFollowing?.length <= 0) {
        // console.log(existFollowing);
        existUser?.following?.push(validUser?._id);
      }
      if (existFollowing?.length > 0) {
        // console.log('exist yes', existFollowing);
        // console.log(validUser);
        const existFl = existUser?.following?.filter(
          (i) => i?.toString() !== validUser?._id?.toString(),
        );
        existUser.following = existFl;
      }
      const existFollower = validUser?.follower?.filter(
        (i) => i?.toString() === existUser?._id?.toString(),
      );
      if (existFollower?.length <= 0) {
        validUser?.follower?.push(existUser?._id);
      }
      if (existFollower?.length > 0) {
        const existFr = validUser?.following?.filter(
          (i) => i?.toString() !== existUser?._id?.toString(),
        );
        validUser.follower = existFr;
      }

      const [existUserRes, validUserRes] = await Promise.all([
        await existUser.save(),
        await validUser.save(),
      ]);

      if (!existUserRes || !validUserRes) {
        throw {
          devError:
            'User does not exist while saving user following and follower',
          error: 'Something went wrong',
        };
      }
      return resMessage(
        { user: existUserRes, following: validUserRes },
        'Successfully followed!',
      );
    });
  }
}

// {
//     fieldname: 'file',
//     originalname: 'Screenshot 2023-05-30 172539.png',
//     encoding: '7bit',
//     mimetype: 'image/png',
//     destination: './public/image',
//     filename: 'fed861a8-6d10-4cce-b3ed-830d862b0954.png',
//     path: 'public\\image\\fed861a8-6d10-4cce-b3ed-830d862b0954.png',
//     size: 120217
//   }
