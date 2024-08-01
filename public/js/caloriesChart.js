document.addEventListener('DOMContentLoaded', function() {
    // Setup for duration chart
    const durationCtx = document.getElementById('durationChart').getContext('2d');

    // Setup for calories chart
    const caloriesCtx = document.getElementById('caloriesChart').getContext('2d');

    fetch('/workouts')
        .then(response => response.json())
        .then(data => {
            // Initialize accumulators
            const durationByCategory = {};
            const caloriesByCategory = {};
            const countByCategory = {};

            // Process data
            data.forEach(workout => {
                const category = workout.category;
                const duration = parseInt(workout.duration, 10); // Ensure duration is treated as a number
                const calories = parseInt(workout.calories, 10); // Ensure calories is treated as a number

                // Accumulate total duration and calories, and count number of workouts
                if (durationByCategory[category]) {
                    durationByCategory[category] += duration;
                    caloriesByCategory[category] += calories;
                    countByCategory[category] += 1;
                } else {
                    durationByCategory[category] = duration;
                    caloriesByCategory[category] = calories;
                    countByCategory[category] = 1;
                }
            });

            // Calculate averages
            const averageDurationByCategory = {};
            const averageCaloriesByCategory = {};
            for (const category in durationByCategory) {
                averageDurationByCategory[category] = durationByCategory[category] / countByCategory[category];
                averageCaloriesByCategory[category] = caloriesByCategory[category] / countByCategory[category];
            }

            // Duration Chart
            new Chart(durationCtx, {
                type: 'bar',
                data: {
                    labels: Object.keys(averageDurationByCategory),
                    datasets: [{
                        label: 'Average Workout Duration (minutes)',
                        data: Object.values(averageDurationByCategory),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Average Workout Duration (minutes)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Workout Category'
                            }
                        }
                    }
                }
            });

            // Calories Chart
            new Chart(caloriesCtx, {
                type: 'bar',
                data: {
                    labels: Object.keys(averageCaloriesByCategory),
                    datasets: [{
                        label: 'Average Calories Burned',
                        data: Object.values(averageCaloriesByCategory),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Average Calories Burned'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Workout Category'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching workout data:', error);
        });
});
