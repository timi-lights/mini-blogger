import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateASavingsDto {
  @IsString()
  public plan: Types.ObjectId;

  @IsNumber()
  amount: number;

  @IsOptional()
  frequency: string;

  @IsString()
  start_date: Date;

  @IsString()
  withdrawal_date: Date;

  @IsString()
  source: string;

  @IsNumber()
  interest: number;

  @IsBoolean()
  autosave: boolean;

  @IsOptional()
  invite_code: string;

  @IsOptional()
  title: string;

  @IsOptional()
  num_of_participants: number;

  @IsOptional()
  authorization_code: string;
}

export class UpdateSavingsDto {
  @IsNumber()
  amount: number;

  @IsOptional()
  frequency: string;

  @IsString()
  start_date: Date;

  @IsString()
  withdrawal_date: Date;

  @IsString()
  source: string;

  @IsNumber()
  interest: number;

  @IsBoolean()
  autosave: boolean;
}
export class TopUpSavings {
  @IsNumber()
  amount: number;
  @IsString()
  saving_id: string;
}
export class ExtendSavingsDto {
  @IsString()
  saving_id: string;
  @IsNumber()
  amount: number;
  @IsString()
  withdrawal_date: Date;
}
export class WithdrawSavingsDto {
  @IsString()
  saving_id: string;
  @IsNumber()
  amount: number;
  @IsString()
  destination: string;
}
export class JointSavingsDto {
  @IsString()
  saving_id: string;
}
export class ConfirmJointSavingsDto {
  @IsString()
  saving_id: string;
  @IsString()
  invite_code: string;
}
