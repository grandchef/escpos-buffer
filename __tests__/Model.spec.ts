import Model from '../src/Model';

describe('load model', () => {
  it('load model MP-4200 TH from Bematech', async () => {
    const model = new Model('MP-4200 TH');
    expect(model.name).toBe('Bematech MP-4200 TH');
  });

  it('load model TM-T20 from Epson', async () => {
    const model = new Model('TM-T20');
    expect(model.name).toBe('Epson TM-T20');
  });
});
