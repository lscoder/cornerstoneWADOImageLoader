function swap16(val) {
  return ((val & 0xFF) << 8)
    | ((val >> 8) & 0xFF);
}


function decodeBigEndian(imageFrame, pixelData) {
  if(imageFrame.bitsAllocated === 16) {
    var arrayBuffer = pixelData.buffer;
    var offset = pixelData.byteOffset;
    var length = pixelData.length;
    // if pixel data is not aligned on even boundary, shift it so we can create the 16 bit array
    // buffers on it
    if(offset % 2) {
      arrayBuffer = arrayBuffer.slice(offset);
      offset = 0;
    }

    if(imageFrame.pixelRepresentation === 0) {
      imageFrame.pixelData = new Uint16Array(arrayBuffer, offset, length / 2);
    } else {
      imageFrame.pixelData = new Int16Array(arrayBuffer, offset, length / 2);
    }
    // Do the byte swap
    for(var i=0; i < imageFrame.pixelData.length; i++) {
      imageFrame[i] = swap16(imageFrame.pixelData[i]);
    }

  } else if(imageFrame.bitsAllocated === 8) {
    imageFrame.pixelData = pixelData;
  }
  return imageFrame;
}

export default decodeBigEndian;
