export interface IRebootRequest {
  Server: string;
  RebootNow: boolean;
  RebootTime?: Date;
  Comment?: string;
}
