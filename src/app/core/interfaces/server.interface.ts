export interface IServer {
  Hostname: string;
  Status: 'UP' | 'DOWN';
  Health?: string;
  Logs?: string;
}
