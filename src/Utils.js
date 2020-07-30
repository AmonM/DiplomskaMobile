export const Utils = {
  smoothData: input => {
    let output = new Array();

    for (var i = 0; i < input.length; i++) {
      if (i != 0 && i < input.length - 2) {
        output[i] = (input[i - 1] + input[i] + input[i + 1]) / 3;
      } else if (i == 0) {
        output[i] = (input[i + 1] + input[i]) / 2;
      } else {
        output[i] = (input[i - 1] + input[i]) / 2;
      }
    }

    return output;
  }
};

export default {};
