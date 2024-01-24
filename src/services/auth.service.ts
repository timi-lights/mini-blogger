import { LoginUserDto, RegisterUserDto } from '@/dtos/users.dto';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

class AuthService {
  public users = userModel;

  public async signup(userData: RegisterUserDto): Promise<User> {
    const findUser: User = await this.users.findOne({ email: { $regex: userData.email, $options: 'i' } });
    if (findUser) throw new HttpException(409, `User  with email ${userData.email} already exists`, { email: 'Email already exist' });

    const hashedPassword = await hash(userData.password, 10);
    console.log({ ...userData, password: hashedPassword });
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: LoginUserDto): Promise<{ token: string; findUser: User }> {
    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`, {});

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching", {});

    const { token } = this.createToken(findUser);

    return { token, findUser };
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    // const expiresIn: number = 60 * 60;

    return { token: sign(dataStoredInToken, secretKey) };
  }
}

export default AuthService;
