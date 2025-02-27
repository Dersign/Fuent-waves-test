document.querySelectorAll('.game-container').forEach((container) => {
    const draggables = container.querySelectorAll('.draggable');
    const dropAreas = container.querySelectorAll('.drop-area');
    const feedback = container.querySelector('.controls span'); // Updated selector for feedback
    const resetButton = container.querySelector('button');
    const wordColumn = container.querySelector('.word-column');

    let draggedWord = null;

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
        draggable.addEventListener('dragend', dragEnd);
    });

    dropAreas.forEach(dropArea => {
        dropArea.addEventListener('dragover', dragOver);
        dropArea.addEventListener('dragenter', dragEnter);
        dropArea.addEventListener('dragleave', dragLeave);
        dropArea.addEventListener('drop', drop);
    });

    function dragStart(e) {
        draggedWord = e.target.id;
        e.dataTransfer.setData('text/plain', draggedWord);
    }

    function dragEnd() {
        draggables.forEach(draggable => {
            draggable.style.opacity = '1';
        });
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        e.target.classList.add('highlight');
    }

    function dragLeave(e) {
        e.target.classList.remove('highlight');
    }

    function drop(e) {
        e.preventDefault();
        const dropArea = e.target.closest('.drop-area');
        const correctWord = dropArea.dataset.correct;

        if (draggedWord === correctWord) {
            dropArea.classList.add('correct');
            feedback.textContent = 'Correct!';
            feedback.style.color = 'green';

            if (Array.from(dropAreas).every(area => area.classList.contains('correct'))) {
                reorderWords();
            }
        } else {
            feedback.textContent = 'Try again!';
            feedback.style.color = 'red';
        }
        dropArea.classList.remove('highlight');
    }

    function reorderWords() {
        const correctOrder = Array.from(dropAreas)
            .filter(area => area.classList.contains('correct'))
            .map(area => area.dataset.correct);

        const reorderedWords = correctOrder
            .map(id => document.getElementById(id))
            .concat(
                Array.from(draggables).filter(word => !correctOrder.includes(word.id))
            );

        wordColumn.innerHTML = ''; // Clear the word column
        reorderedWords.forEach(word => wordColumn.appendChild(word)); // Rebuild with reordered words
    }

    resetButton.addEventListener('click', () => {
        draggables.forEach(word => {
            word.style.opacity = '1';
            wordColumn.appendChild(word);
        });
        dropAreas.forEach(area => area.classList.remove('correct'));
        feedback.textContent = '';
    });
});