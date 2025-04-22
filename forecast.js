document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
});

// Common chart options
const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                font: {
                    family: "'Poppins', sans-serif",
                    size: 12
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: {
                family: "'Poppins', sans-serif",
                size: 14
            },
            bodyFont: {
                family: "'Poppins', sans-serif",
                size: 12
            }
        }
    }
};

// Initialize charts
let seatChart, voteShareChart;

function initializeCharts() {
    // Seat Prediction Chart
    const seatCtx = document.getElementById('seatChart').getContext('2d');
    seatChart = new Chart(seatCtx, {
        type: 'bar',
        data: {
            labels: ['BJP', 'INC', 'AAP', 'Others'],
            datasets: [{
                label: 'Predicted Seats',
                data: [280, 120, 50, 50],
                backgroundColor: [
                    '#FF9933',
                    '#138808',
                    '#000080',
                    '#808080'
                ],
                borderColor: [
                    '#FF9933',
                    '#138808',
                    '#000080',
                    '#808080'
                ],
                borderWidth: 1
            }]
        },
        options: {
            ...commonOptions,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 50
                    }
                }
            }
        }
    });

    // Vote Share Chart
    const voteCtx = document.getElementById('voteShareChart').getContext('2d');
    voteShareChart = new Chart(voteCtx, {
        type: 'doughnut',
        data: {
            labels: ['BJP', 'INC', 'AAP', 'Others'],
            datasets: [{
                data: [38, 25, 15, 22],
                backgroundColor: [
                    '#FF9933',
                    '#138808',
                    '#000080',
                    '#808080'
                ],
                borderColor: [
                    '#FF9933',
                    '#138808',
                    '#000080',
                    '#808080'
                ],
                borderWidth: 1
            }]
        },
        options: {
            ...commonOptions,
            cutout: '60%'
        }
    });

    // Initialize state predictions
    const stateData = {
        'Uttar Pradesh': { bjp: 45, inc: 30, aap: 15 },
        'Maharashtra': { bjp: 40, inc: 35, aap: 10 },
        'West Bengal': { bjp: 35, inc: 40, aap: 5 }
    };
    updateStatePredictions(stateData);
}

// Update predictions
function updatePredictions(data) {
    // Update seat predictions
    seatChart.data.datasets[0].data = [
        data.bjpSeats,
        data.incSeats,
        data.aapSeats,
        data.otherSeats
    ];
    seatChart.update();

    // Update vote share predictions
    voteShareChart.data.datasets[0].data = [
        data.bjpVoteShare,
        data.incVoteShare,
        data.aapVoteShare,
        data.otherVoteShare
    ];
    voteShareChart.update();

    // Update state predictions
    updateStatePredictions(data.statePredictions);
}

// Update state predictions
function updateStatePredictions(stateData) {
    const container = document.getElementById('statePredictions');
    container.innerHTML = '';

    Object.entries(stateData).forEach(([state, predictions]) => {
        const card = document.createElement('div');
        card.className = 'state-card fade-in';
        card.innerHTML = `
            <h3>${state}</h3>
            <div class="prediction-bars">
                <div class="prediction-bar">
                    <div class="bar-label">
                        <span>BJP</span>
                        <span>${predictions.bjp}%</span>
                    </div>
                    <div class="bar-container">
                        <div class="bar-fill" style="width: ${predictions.bjp}%">${predictions.bjp}%</div>
                    </div>
                </div>
                <div class="prediction-bar">
                    <div class="bar-label">
                        <span>INC</span>
                        <span>${predictions.inc}%</span>
                    </div>
                    <div class="bar-container">
                        <div class="bar-fill" style="width: ${predictions.inc}%">${predictions.inc}%</div>
                    </div>
                </div>
                <div class="prediction-bar">
                    <div class="bar-label">
                        <span>AAP</span>
                        <span>${predictions.aap}%</span>
                    </div>
                    <div class="bar-container">
                        <div class="bar-fill" style="width: ${predictions.aap}%">${predictions.aap}%</div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Example data structure for updatePredictions
const exampleData = {
    bjpSeats: 250,
    incSeats: 120,
    aapSeats: 50,
    otherSeats: 80,
    bjpVoteShare: 35,
    incVoteShare: 25,
    aapVoteShare: 15,
    otherVoteShare: 25,
    statePredictions: {
        'Uttar Pradesh': { bjp: 45, inc: 30, aap: 15 },
        'Maharashtra': { bjp: 40, inc: 35, aap: 10 },
        'West Bengal': { bjp: 35, inc: 40, aap: 5 }
    }
}; 