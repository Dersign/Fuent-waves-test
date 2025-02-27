
        document.getElementById('submit').addEventListener('click', function() {
            // Correct answers
            const answers = {
                q1: 'Paris',
                q2: 'Jupiter',
                q3: '0',
                q4: 'Derry',
                q5: '2019',
                q6: 'Iceland',
                q7: '2012',
                q8: '2001',
                q9: 'London',
                q10: '1998'
            };

            // Get user answers
            const userAnswers = {
                q1: document.getElementById('q1').value.trim(),
                q2: document.getElementById('q2').value.trim(),
                q3: document.getElementById('q3').value.trim(),
                q4: document.getElementById('q4').value.trim(),
                q5: document.getElementById('q5').value.trim(),
                q6: document.getElementById('q6').value.trim(),
                q7: document.getElementById('q7').value.trim(),
                q8: document.getElementById('q8').value.trim(),
                q9: document.getElementById('q9').value.trim(),
                q10: document.getElementById('q10').value.trim()
            };

            // Evaluate answers
            let score = 0;
            let totalQuestions = Object.keys(answers).length;

            for (let key in answers) {
                if (userAnswers[key].toLowerCase() === answers[key].toLowerCase()) {
                    score++;
                }
            }

            // Display result
            const resultDiv = document.getElementById('result');
            resultDiv.style.display = 'block';
            resultDiv.textContent = `You scored ${score} out of ${totalQuestions}.`;
        });
