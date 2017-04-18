import { expect } from 'chai';
import imageLoader from '../src/imageLoader';

describe('imageLoader', function () {
  describe('#getMessage', function () {
    it('should return the expected message', function () {
      expect(imageLoader.getMessage()).to.be.equal('Cornerstone WADO Image Loader');
    });
  });
});
