import tennisBallPositions from '../data/tennisBall.json';

type ModelResults = {
  bbox: [number, number, number, number],
  score: number
}


class MockModel {
  tennisBallPositions: any;

  constructor() {
    this.tennisBallPositions = tennisBallPositions;
  }

  detect(imdata: ImageData): Promise<ModelResults> {
    /// Extract composite key and produce index for stubbed data
    const playheadIndex = this.generatePlayheadIndex(imdata);

    const bbox = this.tennisBallPositions[playheadIndex];

    const results: ModelResults = {
      bbox,
      score: 1.0
    }

    return Promise.resolve(results);
  }

  generatePlayheadIndex(imdata: ImageData): number {
    const numPixels = 14;
    const n = (numPixels * 3) + (numPixels - 1);
    const pixels = imdata.data.slice(0, n);

    let bits = '';
    let i = 0;
    const len = pixels.length;

    while (i < len) {
      let value = pixels[i];

      if (value > 200) {
        bits = bits.concat('1');
      } else {
        bits = bits.concat('0');
      }

      i += 4;
    }

    return parseInt(bits, 2);
  }
}

export { MockModel, ModelResults };