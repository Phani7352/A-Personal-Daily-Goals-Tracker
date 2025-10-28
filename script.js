// Get DOM elements
const form = document.getElementById('goal-form');
const input = document.getElementById('goal-input');
const list = document.getElementById('goals-list');

// Load from localStorage
let goals = JSON.parse(localStorage.getItem('goals')) || [];
renderGoals();

// Add new goal
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value.trim() === "") return;
  goals.push({ text: input.value.trim(), done: false });
  input.value = '';
  saveGoals();
  renderGoals();
});

// Render the goals
function renderGoals() {
  list.innerHTML = '';
  goals.forEach((goal, idx) => {
    const li = document.createElement('li');
    li.className = 'goal-item' + (goal.done ? ' done' : '');
    li.textContent = goal.text;

    // Actions (mark done/delete)
    const actions = document.createElement('span');
    actions.className = 'goal-actions';

    const markBtn = document.createElement('button');
    markBtn.textContent = goal.done ? 'Undo' : 'Done';
    markBtn.className = 'mark-btn';
    markBtn.onclick = () => {
      goals[idx].done = !goals[idx].done;
      saveGoals();
      renderGoals();
    };

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'del-btn';
    delBtn.onclick = () => {
      goals.splice(idx, 1);
      saveGoals();
      renderGoals();
    };

    actions.appendChild(markBtn);
    actions.appendChild(delBtn);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

// Save to localStorage
function saveGoals() {
  localStorage.setItem('goals', JSON.stringify(goals));
}
