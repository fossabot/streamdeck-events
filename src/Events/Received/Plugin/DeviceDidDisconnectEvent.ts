import AbstractReceivedBaseEvent from '../AbstractReceivedBaseEvent';
import { DeviceDidDisconnectType } from '@/StreamdeckTypes/Sent';

export default class DeviceDidDisconnectEvent extends AbstractReceivedBaseEvent {
  public readonly event = 'deviceDidDisconnect';
  protected readonly eventPayload!: DeviceDidDisconnectType;

  public get device(): string {
    return this.eventPayload.device;
  }

  protected get validationType(): typeof DeviceDidDisconnectType {
    return DeviceDidDisconnectType;
  }
}
