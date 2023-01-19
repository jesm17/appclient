import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type buyDocument = HydratedDocument<Buy>;

@Schema()
export class Buy {
  @Prop(
    raw({
      _id: { type: String },
      username: { type: String },
      email: { type: String },
    }),
  )
  client: Record<string, any>;

  @Prop()
  list: [];

  @Prop()
  total: number;
}
export const buySchema = SchemaFactory.createForClass(Buy);
