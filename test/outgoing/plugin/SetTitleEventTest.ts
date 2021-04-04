import 'mocha';

import { expect, use } from 'chai';

import SetTitleEvent from '../../../src/outgoing/plugin/SetTitleEvent';
import { SetTitleSchema } from '../types';
import { TargetEnum } from '../../../src/outgoing/plugin';
import jsonschema from 'chai-json-schema';

use(jsonschema);

describe('SetTitleEvent test', () => {
  it('validates a basic title event against the json schema', () => {
    const event = new SetTitleEvent('new title', 'context');
    expect(JSON.parse(JSON.stringify(event))).to.be.jsonSchema(SetTitleSchema);
  });
  it('validates a targetted event against the json schema', () => {
    const event = new SetTitleEvent('new title', 'context', TargetEnum.Hardware);
    expect(JSON.parse(JSON.stringify(event))).to.be.jsonSchema(SetTitleSchema);
  });
  it('validates an event with the sate set against the json schema', () => {
    const event = new SetTitleEvent('new title', 'context', TargetEnum.Software, 1);
    expect(JSON.parse(JSON.stringify(event))).to.be.jsonSchema(SetTitleSchema);
  });
  it('returns the right values for a basic event', () => {
    const event = new SetTitleEvent('new title', 'context');
    expect(JSON.parse(JSON.stringify(event)).payload.title).to.equal('new title');
    expect(JSON.parse(JSON.stringify(event)).payload.state).to.be.undefined;
  });
  it('returns the right values for a targetted event', () => {
    const event = new SetTitleEvent('new title2', 'context', TargetEnum.Software);
    expect(JSON.parse(JSON.stringify(event)).payload.title).to.equal('new title2');
    expect(JSON.parse(JSON.stringify(event)).payload.target).to.equal(TargetEnum.Software);
  });
  it('returns the right values for an event with a specified state', () => {
    const event = new SetTitleEvent('new title3', 'context', TargetEnum.Hardware, 1);
    expect(JSON.parse(JSON.stringify(event)).payload.title).to.equal('new title3');
    expect(JSON.parse(JSON.stringify(event)).payload.target).to.equal(TargetEnum.Hardware);
    expect(JSON.parse(JSON.stringify(event)).payload.state).to.equal(1);
  });
});
