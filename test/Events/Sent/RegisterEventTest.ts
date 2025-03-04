import 'mocha';

import { expect, use } from 'chai';

import RegisterEvent from '@/Events/Sent/RegisterEvent';
import { Type } from '@sinclair/typebox';
import jsonschema from 'chai-json-schema';

use(jsonschema);

const schema = Type.Object({
  event: Type.String(),
  uuid: Type.String(),
});

describe('RegisterEvent test', () => {
  it('validates against the json schema', () => {
    const event = new RegisterEvent('eventname', 'uuid');
    expect(JSON.parse(JSON.stringify(event))).to.be.jsonSchema(schema);
  });
  it('returns the right values', () => {
    const event = new RegisterEvent('eventname', 'theuuid');
    const object = JSON.parse(JSON.stringify(event));
    expect(object.event).to.equal('eventname');
    expect(object.uuid).to.equal('theuuid');
  });
});
