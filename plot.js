document.addEventListener('DOMContentLoaded', function () {
  const weightInputs = document.querySelectorAll('.weight-input');
  const biasInput = document.getElementById('bias');
  const outputInput = document.getElementById('output');
  const updateButton = document.getElementById('updateButton');

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateRandomInputs() {
    return [getRandomInt(-5, 5), getRandomInt(-5, 5), getRandomInt(-5, 5)];
  }

  function getWeightValues() {
    return Array.from(weightInputs).map(input => parseFloat(input.value));
  }

  function getBiasValue() {
    return parseFloat(biasInput.value);
  }

  function calculateOutput() {
    const weights = getWeightValues();
    const inputs = [1.2, -1, 3];  // Use the fixed inputs
    const bias = getBiasValue();

    // dot
    return inputs.reduce((acc, input, index) => acc + input * weights[index], bias);
  }

  function updateOutput() {
    const output = calculateOutput();
    outputInput.value = output;
    updateChart(output);
  }

  function generatePlotData(output) {
    return [
      { x: -5 - output, y: -5 - output },
      { x: output, y: output },
      { x: 5 + output, y: 5 + output },
    ];
  }

  function updateChart(output) {
    const newData = generatePlotData(output);
    myChart.data.datasets[0].data = newData;
    myChart.update();
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Simple Perceptron with Linear Activation Function',
        data: generatePlotData(calculateOutput()),
        backgroundColor: ['black', 'red', 'black'],
        showLine: true,
        pointRadius: 5,
        pointHoverRadius: 8,
      }]
    },
    options: {
      responsive: false,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          min: -50,
          max: 50,
        },
        y: {
          type: 'linear',
          position: 'left',
          min: -50,
          max: 50,
        }
      }
    }
  });

  weightInputs.forEach(input => input.addEventListener('input', updateOutput));
  biasInput.addEventListener('input', updateOutput);
  updateButton.addEventListener('click', updateOutput);
});
