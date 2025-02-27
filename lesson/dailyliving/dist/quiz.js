
						function drag(event) {
							event.dataTransfer.setData("text", event.target.textContent);
							event.dataTransfer.setData("value", event.target);
						}
					
						const dropZones = document.querySelectorAll('.drop-zone');
					
						dropZones.forEach(zone => {
							zone.addEventListener('dragover', event => {
								event.preventDefault();
							});
					
							zone.addEventListener('drop', event => {
								event.preventDefault();
								const answer = event.dataTransfer.getData("text");
								const value = event.dataTransfer.getData("value");
								const currentZone = event.target;
					
								// Add the answer to the drop zone
								currentZone.textContent = answer;
					
								// Remove the answer from the original position
								value.remove();
							});
						});
					
						function checkAnswers() {
							dropZones.forEach(zone => {
								const selectedAnswer = zone.textContent.trim();
								const correctAnswer = zone.parentElement.getAttribute('data-answer');
					
								if (selectedAnswer.charAt(0) === correctAnswer) {
									zone.classList.add('correct');
								} else {
									zone.classList.add('incorrect');
								}
							});
						}
					
						function resetQuiz() {
							dropZones.forEach(zone => {
								zone.textContent = "Drop here";
								zone.classList.remove('correct', 'incorrect');
							});
					
							const options = document.querySelectorAll('.answer');
							options.forEach(option => {
								document.querySelector('.options').appendChild(option);
							});
						}
					