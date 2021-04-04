import {
  ApplicationDidLaunchEvent,
  ApplicationDidTerminateEvent,
  DeviceDidConnectEvent,
  DeviceDidDisconnectEvent,
  KeyDownEvent,
  KeyUpEvent,
  PropertyInspectorDidAppearEvent,
  PropertyInspectorDidDisappearEvent,
  SendToPluginIncomingEvent,
  TitleParametersDidChangeEvent,
  WillAppearEvent,
  WillDisappearEvent,
} from './plugin';

import AbstractIncomingBaseEvent from './AbstractIncomingBaseEvent';
import AbstractIncomingExtendedEvent from './AbstractIncomingExtendedEvent';
import DidReceiveGlobalSettingsEvent from './DidReceiveGlobalSettingsEvent';
import DidReceiveSettingsEvent from './DidReceiveSettingsEvent';
import { IncomingEvents } from './IncomingEvents';
import { IncomingPluginEvents } from './plugin/IncomingPluginEvents';
import MissingEventInPayloadError from './exception/MissingEventInPayloadError';
import { SendToPropertyInspectorIncomingEvent } from './propertyinspector';
import UnknownEventError from './exception/UnknownEventError';

interface BasicIncomingEvent {
  event: IncomingEvents | IncomingPluginEvents;
}

function isBasicIncomingEvent(event: unknown): event is BasicIncomingEvent {
  return (event as BasicIncomingEvent).hasOwnProperty('event') && (event as BasicIncomingEvent)['event'].length > 0;
}

type IncomingEventTypes =
  | AbstractIncomingBaseEvent
  | AbstractIncomingExtendedEvent
  | DeviceDidConnectEvent
  | DeviceDidDisconnectEvent
  | SendToPluginIncomingEvent;

export default class EventFactory {
  public createByEventPayload(payload: unknown): IncomingEventTypes {
    if (!isBasicIncomingEvent(payload)) {
      throw new MissingEventInPayloadError('no event type in received data: ' + JSON.stringify(payload));
    }

    switch (payload.event) {
      case IncomingEvents.DidReceiveSettings:
        return new DidReceiveSettingsEvent(payload);
      case IncomingEvents.DidReceiveGlobalSettings:
        return new DidReceiveGlobalSettingsEvent(payload);
      case IncomingPluginEvents.ApplicationDidLaunch:
        return new ApplicationDidLaunchEvent(payload);
      case IncomingPluginEvents.ApplicationDidTerminate:
        return new ApplicationDidTerminateEvent(payload);
      case IncomingPluginEvents.DeviceDidConnect:
        return new DeviceDidConnectEvent(payload);
      case IncomingPluginEvents.DeviceDidDisconnect:
        return new DeviceDidDisconnectEvent(payload);
      case IncomingPluginEvents.KeyDown:
        return new KeyDownEvent(payload);
      case IncomingPluginEvents.KeyUp:
        return new KeyUpEvent(payload);
      case IncomingPluginEvents.PropertyInspectorDidAppear:
        return new PropertyInspectorDidAppearEvent(payload);
      case IncomingPluginEvents.PropertyInspectorDidDisappear:
        return new PropertyInspectorDidDisappearEvent(payload);
      case IncomingPluginEvents.SendToPlugin:
        return new SendToPluginIncomingEvent(payload);
      case IncomingPluginEvents.SendToPropertyInspector:
        return new SendToPropertyInspectorIncomingEvent(payload);
      case IncomingPluginEvents.TitleParametersDidChange:
        return new TitleParametersDidChangeEvent(payload);
      case IncomingPluginEvents.WillAppear:
        return new WillAppearEvent(payload);
      case IncomingPluginEvents.WillDisappear:
        return new WillDisappearEvent(payload);
      default:
        throw new UnknownEventError('unknown event: ' + payload.event + ' in data: ' + JSON.stringify(payload));
    }
  }
}
